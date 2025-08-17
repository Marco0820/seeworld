import { Client, Environment } from '@paypal/paypal-server-sdk';

// PayPal 客户端配置
const environment = process.env.PAYPAL_ENVIRONMENT === 'production' 
  ? Environment.Production 
  : Environment.Sandbox;

export const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  },
  environment,
});

// PayPal 配置常量
export const PAYPAL_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  CURRENCY: 'USD',
  INTENT: 'CAPTURE',
  ENVIRONMENT: process.env.PAYPAL_ENVIRONMENT || 'sandbox',
  
  // 应用程序 URL
  RETURN_URL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
  
  // Webhook 配置
  WEBHOOK_SECRET: process.env.PAYPAL_WEBHOOK_SECRET!,
} as const;

// 订阅计划 ID（需要在 PayPal 开发者控制台创建）
export const SUBSCRIPTION_PLAN_IDS = {
  plus_monthly: process.env.PAYPAL_PLUS_MONTHLY_PLAN_ID || 'P-5ML4271244454362WXNWU5NQ',
  plus_yearly: process.env.PAYPAL_PLUS_YEARLY_PLAN_ID || 'P-19T21123AB123456N7XNWU5NQ',
  pro_monthly: process.env.PAYPAL_PRO_MONTHLY_PLAN_ID || 'P-6XY4271244454362WXNWU5NQ',
  pro_yearly: process.env.PAYPAL_PRO_YEARLY_PLAN_ID || 'P-20T21123AB123456N7XNWU5NQ',
} as const;

// PayPal 错误处理
export class PayPalError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'PayPalError';
  }
}

// 格式化金额（PayPal 要求字符串格式）
export const formatAmount = (amount: number): string => {
  return amount.toFixed(2);
};

// 生成唯一的支付 ID
export const generatePaymentId = (): string => {
  return `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 验证 PayPal 环境配置
export const validatePayPalConfig = (): boolean => {
  const requiredVars = [
    'PAYPAL_CLIENT_ID',
    'PAYPAL_CLIENT_SECRET',
    'NEXT_PUBLIC_PAYPAL_CLIENT_ID'
  ];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      console.error(`Missing required environment variable: ${varName}`);
      return false;
    }
  }
  
  return true;
};
