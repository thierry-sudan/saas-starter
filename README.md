# SaaS Starter - Next.js + Firebase + Stripe

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

Ultra-simple foundation to create a SaaS that give API token with authentication and subscription management.


## ✨ Features

✅ **Complete Authentication**
- Email/Password (Firebase Auth)
- Google OAuth
- Session management
- Password reset

✅ **Stripe Subscription Management**
- 3 predefined plans (Simple, Premium, Pro)
- Integrated Stripe Checkout
- Customer portal to manage subscription
- Webhook for automatic synchronization

✅ **Modern Interface**
- Dark mode with next-themes
- Responsive Tailwind CSS
- Clean and professional design

✅ **User Dashboard**
- Current plan display
- Plan selection and switching
- API key to access your API

✅ **Protected API**
- API key protection
- Plan verification
- Configurable limits per plan

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase account
- A Stripe account

### Installation

```bash
# Clone the project
git clone https://github.com/thierry-sudan/saas-starter.git
cd saas-starter

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### Quick Setup (5 minutes)

1. **Firebase** - 
   - Create a project
   - Enable Authentication (Email + Google)
   - Create a Firestore database

2. **Stripe** - 
   - Create 3 products with subscriptions
   - Get the price_id values
   - Configure the webhook

3. **Environment Variables**
   ```env
   NEXT_PUBLIC_SITE_NAME=My SaaS
   NEXT_PUBLIC_SITE_DESCRIPTION=My SaaS Description
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
   # ... see .env.local.example
   ```

4. **Launch**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

📖 **[Complete Getting Started Guide](QUICKSTART.md)**

## 📚 Documentation

- [Quick Start Guide](QUICKSTART.md) - 5-minute installation
- [Complete Documentation](docs/) - Detailed guides
- [Contribution Guide](CONTRIBUTING.md) - How to contribute
- [API Documentation](docs/API.md) - Using the API

## 🗃️ Project Structure

```
saas-starter/
├── app/
│   ├── api/              # API routes
│   │   ├── webhooks/     # Stripe webhook
│   │   └── example/      # Example API with plan verification
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── dashboard/        # User dashboard
├── components/           # Reusable components
├── contexts/            # React contexts (Auth)
├── lib/                 # Configurations (Firebase, Stripe)
└── docs/                # Documentation
```

## 🛠️ Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Auth**: [Firebase Authentication](https://firebase.google.com/products/auth)
- **Database**: [Cloud Firestore](https://firebase.google.com/products/firestore)
- **Payments**: [Stripe](https://stripe.com/)
- **Deployment**: [Vercel](https://vercel.com/) / [Jelastic](https://jelastic.com/)

## 💳 Subscription Plans

| Plan | Price | API Requests | Features |
|------|------|--------------|----------|
| Free | €0 | 0 | None |
| Simple | €9/month | 1000/month | Basic features |
| Premium | €29/month | 10000/month | Advanced features |
| Pro | €99/month | Unlimited | All features |

## 🤝 Contributing

Contributions are welcome! See the [contribution guide](CONTRIBUTING.md).

### Desired Features

- [ ] Twitter/GitHub authentication
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] Analytics
- [ ] add more languages (i18n)
- [ ] E2E tests
- [ ] And more...

See all [open issues](https://github.com/thierry-sudan/saas-starter/issues).

## 📄 License

This project is under MIT license. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

- 🐛 [Report a bug](https://github.com/thierry-sudan/saas-starter/issues/new?template=bug_report.md)
- 💡 [Suggest a feature](https://github.com/thierry-sudan/saas-starter/issues/new?template=feature_request.md)
- 💬 [Discussions](https://github.com/thierry-sudan/saas-starter/discussions)

---

Made with ❤️ by the community

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication > Email/Password
3. Create a Firestore database
4. Get credentials from Project Settings

### 3. Stripe Configuration

1. Create a Stripe account at https://stripe.com
2. Create 3 products with monthly subscriptions:
   - Simple (e.g., €9/month)
   - Premium (e.g., €29/month)
   - Pro (e.g., €99/month)
3. Get the `price_id` for each product
4. Get API keys (publishable and secret)

### 4. Stripe Webhook Configuration

```bash
# Install Stripe CLI
stripe login

# Start webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Get the displayed webhook secret
```

### 5. Create .env.local File

```bash
cp .env.local.example .env.local
```

Fill with your credentials:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Prices
NEXT_PUBLIC_STRIPE_PRICE_SIMPLE=price_...
NEXT_PUBLIC_STRIPE_PRICE_PREMIUM=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run in Development

```bash
npm run dev
```

Open http://localhost:3000

## Firestore Structure

`users` collection:
```json
{
  "email": "user@example.com",
  "plan": "free" | "simple" | "premium" | "pro",
  "stripeCustomerId": "cus_...",
  "stripeSubscriptionId": "sub_...",
  "subscriptionStatus": "active" | "canceled" | "past_due",
  "createdAt": Timestamp
}
```

## Deployment on Jelastic

### 1. Prepare the Build

```bash
npm run build
```

### 2. On Your Jelastic Server

```bash
# Clone or upload the project
cd /home/jelastic/ROOT

# Install dependencies
npm install --production

# Create .env.local file with your variables

# Build
npm run build

# Start with PM2
pm2 start npm --name "saas-starter" -- start
pm2 save
```

### 3. Stripe Webhook Configuration in Production

1. In Stripe dashboard, go to Developers > Webhooks
2. Add an endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook secret to `.env.local`

## Routes

- `/` - Home page
- `/login` - Login
- `/signup` - Signup
- `/dashboard` - User dashboard with subscription management

## API Routes

- `POST /api/create-checkout-session` - Create a Stripe payment session
- `POST /api/create-portal-session` - Create a subscription management session
- `POST /api/webhooks/stripe` - Stripe webhook

## API Usage

The user retrieves their API key (their userId) from the dashboard.

To verify a user's plan in your API:

```typescript
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function checkUserPlan(userId: string) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();
  
  return userData?.plan || 'free';
}
```


## Support

For any questions, check:
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
