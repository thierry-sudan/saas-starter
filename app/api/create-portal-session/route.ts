import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'ID de l'utilisateur depuis le token/session
    // Pour simplifier, on passe l'userId dans le body (à sécuriser en production)
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer le customerId Stripe depuis Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();

    if (!userData?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Aucun client Stripe trouvé' },
        { status: 404 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Erreur Stripe Portal:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
