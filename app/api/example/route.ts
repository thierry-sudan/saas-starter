import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Feature = 'basic' | 'advanced' | 'premium';

// Limites par plan
const PLAN_LIMITS: Record<string, { requests: number; features: Feature[] }> = {
  free: { requests: 0, features: [] },
  simple: { requests: 1000, features: ['basic'] },
  premium: { requests: 10000, features: ['basic', 'advanced'] },
  pro: { requests: -1, features: ['basic', 'advanced', 'premium'] }, // -1 = illimité
};

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'API key depuis les headers
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key manquante' },
        { status: 401 }
      );
    }

    // Vérifier l'utilisateur et son plan
    const userDoc = await getDoc(doc(db, 'users', apiKey));
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'API key invalide' },
        { status: 401 }
      );
    }

    const userData = userDoc.data();
    const userPlan = userData.plan || 'free';

    // Vérifier si l'utilisateur a un abonnement actif
    if (userPlan !== 'free' && userData.subscriptionStatus !== 'active') {
      return NextResponse.json(
        { error: 'Abonnement inactif' },
        { status: 403 }
      );
    }

    // Vérifier les limites du plan
    const planLimits = PLAN_LIMITS[userPlan] || PLAN_LIMITS.free;

    if (planLimits.requests === 0) {
      return NextResponse.json(
        { error: 'Plan gratuit - veuillez souscrire à un abonnement' },
        { status: 403 }
      );
    }

    // TODO: Implémenter le comptage des requêtes mensuelles
    // Cela nécessiterait un système de tracking supplémentaire

    // Votre logique API ici
    return NextResponse.json({
      success: true,
      plan: userPlan,
      limits: planLimits,
      message: 'Accès autorisé',
      data: {
        // Vos données ici
        example: 'Hello from API',
      },
    });

  } catch (error: any) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key manquante' },
        { status: 401 }
      );
    }

    const userDoc = await getDoc(doc(db, 'users', apiKey));
    
    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: 'API key invalide' },
        { status: 401 }
      );
    }

    const userData = userDoc.data();
    const userPlan = userData.plan || 'free';

    // Exemple: Feature premium uniquement
    const planLimits = PLAN_LIMITS[userPlan] || PLAN_LIMITS.free;
    
    if (!planLimits.features.includes('premium' as Feature)) {
      return NextResponse.json(
        { error: 'Cette fonctionnalité nécessite un plan Pro' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Votre logique API ici
    return NextResponse.json({
      success: true,
      message: 'Opération effectuée',
      data: body,
    });

  } catch (error: any) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
