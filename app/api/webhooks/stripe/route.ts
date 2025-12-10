import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Récupérer les informations de l'abonnement
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        // Déterminer le plan basé sur le price_id
        let plan: 'simple' | 'premium' | 'pro' = 'simple';
        const priceId = subscription.items.data[0].price.id;
        
        if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_SIMPLE) {
          plan = 'simple';
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM) {
          plan = 'premium';
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
          plan = 'pro';
        }

        // Mettre à jour Firestore avec les infos de l'abonnement
        const userRef = doc(db, 'users', session.client_reference_id || session.metadata?.userId || '');
        
        await updateDoc(userRef, {
          plan,
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Trouver l'utilisateur avec ce subscriptionId
        // Note: En production, il faudrait indexer par stripeSubscriptionId
        let plan: 'simple' | 'premium' | 'pro' = 'simple';
        const priceId = subscription.items.data[0].price.id;
        
        if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_SIMPLE) {
          plan = 'simple';
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM) {
          plan = 'premium';
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO) {
          plan = 'pro';
        }

        // Mettre à jour le statut de l'abonnement
        // Note: Cette requête est simplifiée, en production utiliser une query
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Rétrograder l'utilisateur au plan gratuit
        // Note: En production, chercher l'utilisateur par stripeSubscriptionId
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
