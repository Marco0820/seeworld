// 积分系统相关类型定义

export interface User {
  id: string;
  email: string;
  credits: number;
  subscription: Subscription | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planType: 'free' | 'plus' | 'pro';
  status: 'active' | 'canceled' | 'expired' | 'pending';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  monthlyCredits: number;
  remainingCredits: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'free' | 'plus' | 'pro';
  price: number;
  yearlyPrice: number;
  monthlyCredits: number;
  features: string[];
  popular: boolean;
  color: string;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus: number; // 赠送积分
  popular: boolean;
  savings: string; // 节省百分比
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'subscription' | 'credit_purchase' | 'credit_usage' | 'credit_refund';
  amount: number; // 金额（美元）
  credits: number; // 积分变化
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  metadata?: {
    planType?: string;
    videoGenerationId?: string;
    packId?: string;
  };
  createdAt: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface VideoGeneration {
  id: string;
  userId: string;
  prompt: string;
  model: string;
  generationMode: 'fast' | 'quality';
  creditsUsed: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  createdAt: string;
  completedAt?: string;
}

// 积分消耗规则
export const CREDIT_COSTS = {
  FAST_MODE: 250,
  QUALITY_MODE: 500,
  PREMIUM_MODELS: {
    'Google Veo 3 Fast (Plus)': 400,
    'Google Veo 3 (Plus)': 800,
    'KLING 2.1 Master': 600,
  }
} as const;

// 订阅计划配置
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    type: 'free',
    price: 0,
    yearlyPrice: 0,
    monthlyCredits: 100,
    features: [
      '100 free credits per month',
      'Standard models only',
      'Fast mode generation',
      'Basic support'
    ],
    popular: false,
    color: 'gray'
  },
  {
    id: 'plus',
    name: 'Plus',
    type: 'plus',
    price: 16,
    yearlyPrice: 13.33,
    monthlyCredits: 2000,
    features: [
      '2000 credits per month',
      'All standard models',
      'Fast & Quality modes',
      'Priority generation queue',
      'Email support'
    ],
    popular: true,
    color: 'blue'
  },
  {
    id: 'pro',
    name: 'Pro',
    type: 'pro',
    price: 166,
    yearlyPrice: 138,
    monthlyCredits: 25000,
    features: [
      '25000 credits per month',
      'All models including Plus',
      'Highest priority queue',
      'Advanced features',
      'Priority support',
      'Commercial license'
    ],
    popular: false,
    color: 'purple'
  }
];

// 积分包配置
export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 500,
    price: 5,
    bonus: 0,
    popular: false,
    savings: ''
  },
  {
    id: 'popular',
    name: 'Popular Pack',
    credits: 1200,
    price: 10,
    bonus: 200,
    popular: true,
    savings: '17% more credits'
  },
  {
    id: 'value',
    name: 'Value Pack',
    credits: 2500,
    price: 20,
    bonus: 500,
    popular: false,
    savings: '25% more credits'
  },
  {
    id: 'mega',
    name: 'Mega Pack',
    credits: 6000,
    price: 45,
    bonus: 1500,
    popular: false,
    savings: '33% more credits'
  }
];
