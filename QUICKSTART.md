# 🚀 Quick Start Guide - SaaS Starter

## 5-Minute Installation

### 1️⃣ Extract and Install

```bash
# On your  server
cd /PATH-TO-NODEJS-DIRECTORY-HOME
tar -xzf saas-starter.tar.gz
cd saas-starter
npm install
```

### 2️⃣ Firebase Configuration (2 min)

1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable **Authentication** > Email/Password
4. Create a **Firestore Database**
5. In **Project Settings**, get the configuration

### 3️⃣ Stripe Configuration (2 min)

1. Go to https://dashboard.stripe.com
2. Enable Test mode
3. **Products** > Create 3 products:
   - Simple: €9/month recurring
   - Premium: €29/month recurring  
   - Pro: €99/month recurring
4. Note the **price_id** values (price_xxxxx)
5. **Developers** > **API Keys**: note pk_test and sk_test

### 4️⃣ Create .env.local

```bash
cp .env.local.example .env.local
nano .env.local
```

Fill in:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123...
NEXT_PUBLIC_FIREBASE_APP_ID=1:123...

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_STRIPE_PRICE_SIMPLE=price_...
NEXT_PUBLIC_STRIPE_PRICE_PREMIUM=price_...
NEXT_PUBLIC_STRIPE_PRICE_PRO=price_...

NEXT_PUBLIC_APP_URL=https://your-jelastic-domain.com
```

### 5️⃣ Stripe Webhook

**In local development**:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the whsec_... to .env.local
```

**In production**:

1. Stripe Dashboard > **Developers** > **Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret to `.env.local`


## ✅ You're Ready!

Your SaaS is now accessible on your Jelastic domain.

## 🧪 Testing

1. Create an account at `/signup`
2. Log in at `/login`
3. View the dashboard at `/dashboard`
4. Test a subscription (Stripe test mode)

## 📊 Stripe Test Cards

In test mode, use:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- Date: any future date
- CVC: any 3 digits

## 🔧 Useful Commands

```bash
# View logs
pm2 logs saas-starter

# Restart
pm2 restart saas-starter

# Stop
pm2 stop saas-starter

# Status
pm2 status
```

## 📝 Next Steps

1. Customize prices in `/lib/stripe.ts`
2. Build your API in `/app/api/`
3. Use the example `/app/api/example/route.ts`
4. Add your features according to plans

## 🎯 Plan Structure

- **Free**: 0 API requests
- **Simple**: 1000 requests/month, basic features
- **Premium**: 10000 requests/month, advanced features
- **Pro**: Unlimited, all features

## 🔑 Using the API

In your client code:

```javascript
const response = await fetch('https://your-domain.com/api/example', {
  headers: {
    'x-api-key': 'user_uid_from_firebase'
  }
});
```

## 🆘 Common Issues

**Webhook not working**:
- Check that STRIPE_WEBHOOK_SECRET is correct
- In production, verify the webhook URL is accessible

**Firebase error**:
- Check that all NEXT_PUBLIC_FIREBASE_* variables are filled in
- Verify that Authentication Email/Password is enabled

**Stripe error**:
- Check that you're in Test mode
- Verify the price_id match the created products

## 📚 Documentation

- [Complete README](README.md)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
