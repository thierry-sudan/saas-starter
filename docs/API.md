# Documentation API

## Authentification

Toutes les requêtes API nécessitent une clé API valide dans les headers.

```bash
curl -H "x-api-key: VOTRE_USER_ID" https://votre-domaine.com/api/example
```

### Obtenir votre clé API

1. Connectez-vous à votre compte
2. Allez sur le dashboard
3. Votre clé API est affichée (c'est votre User ID Firebase)

## Endpoints

### GET /api/example

Endpoint d'exemple pour tester l'accès à l'API.

**Headers requis:**
```
x-api-key: string (required)
```

**Response Success (200):**
```json
{
  "success": true,
  "plan": "premium",
  "limits": {
    "requests": 10000,
    "features": ["basic", "advanced"]
  },
  "message": "Accès autorisé",
  "data": {
    "example": "Hello from API"
  }
}
```

**Response Error (401):**
```json
{
  "error": "API key manquante"
}
```

**Response Error (403):**
```json
{
  "error": "Plan gratuit - veuillez souscrire à un abonnement"
}
```

### POST /api/example

Endpoint d'exemple pour les opérations POST (nécessite plan Pro).

**Headers requis:**
```
x-api-key: string (required)
Content-Type: application/json
```

**Body:**
```json
{
  "data": "your data"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Opération effectuée",
  "data": {
    "data": "your data"
  }
}
```

**Response Error (403):**
```json
{
  "error": "Cette fonctionnalité nécessite un plan Pro"
}
```

## Limites par plan

| Plan | Requêtes/mois | Features disponibles |
|------|---------------|---------------------|
| Free | 0 | Aucune |
| Simple | 1000 | basic |
| Premium | 10000 | basic, advanced |
| Pro | Illimité | basic, advanced, premium |

## Codes d'erreur

| Code | Description |
|------|-------------|
| 200 | Succès |
| 400 | Requête invalide |
| 401 | Non authentifié (API key manquante ou invalide) |
| 403 | Accès refusé (plan insuffisant ou abonnement inactif) |
| 500 | Erreur serveur |

## Rate Limiting

TODO: Implémenter le rate limiting par plan.

## Exemples

### JavaScript/Fetch

```javascript
const response = await fetch('https://votre-domaine.com/api/example', {
  headers: {
    'x-api-key': 'your_user_id'
  }
});

const data = await response.json();
console.log(data);
```

### cURL

```bash
curl -X GET \
  https://votre-domaine.com/api/example \
  -H 'x-api-key: your_user_id'
```

### Python

```python
import requests

headers = {
    'x-api-key': 'your_user_id'
}

response = requests.get('https://votre-domaine.com/api/example', headers=headers)
print(response.json())
```

### Node.js (Axios)

```javascript
const axios = require('axios');

const config = {
  headers: {
    'x-api-key': 'your_user_id'
  }
};

axios.get('https://votre-domaine.com/api/example', config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

## Créer votre propre endpoint

Pour créer un nouvel endpoint protégé :

1. Créer un fichier dans `app/api/votre-endpoint/route.ts`
2. Importer les utilitaires :

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  // Récupérer l'API key
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key manquante' },
      { status: 401 }
    );
  }

  // Vérifier l'utilisateur
  const userDoc = await getDoc(doc(db, 'users', apiKey));
  
  if (!userDoc.exists()) {
    return NextResponse.json(
      { error: 'API key invalide' },
      { status: 401 }
    );
  }

  const userData = userDoc.data();
  const userPlan = userData.plan || 'free';

  // Vérifier le plan
  if (userPlan === 'free') {
    return NextResponse.json(
      { error: 'Abonnement requis' },
      { status: 403 }
    );
  }

  // Votre logique ici
  return NextResponse.json({
    success: true,
    data: { /* vos données */ }
  });
}
```

## Support

Pour toute question sur l'API, créez une issue sur GitHub.
