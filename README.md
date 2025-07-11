# BizBoost AI - Social Media Content Generator

A comprehensive SaaS platform that helps small businesses generate engaging social media content using AI.

## 🚀 Features

- **AI-Powered Content Generation**: Generate captions, hashtags, and post ideas using GPT-4
- **Multi-Platform Support**: Optimized content for Instagram, LinkedIn, Facebook, and Twitter
- **User Authentication**: Secure Firebase Authentication with email/password
- **Subscription Management**: Stripe integration with multiple pricing tiers
- **Credit System**: Track usage with a flexible credit-based system
- **Content History**: Save and access previously generated content
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI**: OpenAI GPT-4 API
- **Payments**: Stripe with webhooks
- **Deployment**: Vercel

## 📁 Project Structure

```
bizboost-ai/
├── app/
│   ├── api/                 # API routes
│   │   ├── generate/        # Content generation endpoint
│   │   ├── checkout/        # Stripe checkout
│   │   ├── webhook/         # Stripe webhooks
│   │   ├── user/           # User data endpoint
│   │   └── history/        # Content history
│   ├── dashboard/          # Protected dashboard
│   ├── login/             # Authentication pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   └── AuthGuard.tsx      # Route protection
├── lib/
│   ├── firebase.ts        # Firebase configuration
│   ├── openai.ts         # OpenAI integration
│   ├── stripe.ts         # Stripe configuration
│   ├── firestore.ts      # Database operations
│   └── auth.ts           # Authentication helpers
└── hooks/
    └── useAuth.ts         # Authentication hook
```

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd bizboost-ai
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

### 3. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Get your Firebase config and add to `.env.local`

### 4. OpenAI Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com)
2. Add `OPENAI_API_KEY` to `.env.local`

### 5. Stripe Setup

1. Create a Stripe account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Create products and prices for your subscription plans
3. Set up webhook endpoint: `your-domain.com/api/webhook/stripe`
4. Add all Stripe keys to `.env.local`

### 6. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Content history - users can only access their own
    match /contentHistory/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 7. Run Development Server

```bash
npm run dev
```

## 🔐 Authentication Flow

1. User signs up/logs in with email and password
2. Firebase creates user account
3. Firestore user document created with 3 free credits
4. User can generate content until credits run out
5. Stripe checkout for subscription upgrades

## 💳 Payment Flow

1. User selects subscription plan
2. Stripe Checkout session created
3. After successful payment, webhook updates user credits
4. User can access premium features

## 🤖 Content Generation

1. User fills out generation form (business type, tone, platform)
2. System checks user credits
3. OpenAI GPT-4 generates content
4. Content saved to history
5. User credit deducted

## 📊 Database Schema

### Users Collection
```typescript
{
  id: string;
  email: string;
  credits: number;
  subscriptionId?: string;
  customerId?: string;
  plan?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Content History Collection
```typescript
{
  id: string;
  userId: string;
  input: {
    businessType: string;
    tone: string;
    platform: string;
    description?: string;
  };
  output: {
    caption: string;
    hashtags: string[];
    postIdeas: string[];
  };
  createdAt: Timestamp;
}
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to update these for production:
- `NEXT_PUBLIC_BASE_URL`: Your production domain
- All Firebase, OpenAI, and Stripe keys for production

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📝 API Endpoints

- `POST /api/generate` - Generate content with AI
- `GET /api/user` - Get user data and credits
- `GET /api/history` - Get user's content history
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/portal` - Create Stripe customer portal session
- `POST /api/webhook/stripe` - Handle Stripe webhooks

## 🎯 Business Model

- **Free Tier**: 3 credits for new users
- **Starter Plan**: 50 credits/month
- **Professional Plan**: 200 credits/month  
- **Enterprise Plan**: 500 credits/month

## 🔒 Security Features

- Firebase Authentication with secure rules
- API route protection with user verification
- Stripe webhook signature verification
- Input validation and sanitization
- Rate limiting on content generation

## 📈 Scaling Considerations

- Implement Redis for caching frequently generated content
- Add rate limiting with Upstash Redis
- Use Vercel Edge Functions for better performance
- Implement content moderation for generated text
- Add analytics with Vercel Analytics or Google Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.# BizBoost-AI
