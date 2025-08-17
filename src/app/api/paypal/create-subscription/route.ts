import { NextRequest, NextResponse } from 'next/server';
import { paypalClient, SUBSCRIPTION_PLAN_IDS, PAYPAL_CONFIG } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const { planType, isYearly, userEmail, userName } = await request.json();

    if (!planType || !userEmail) {
      return NextResponse.json(
        { error: 'Plan type and user email are required' },
        { status: 400 }
      );
    }

    // 获取对应的计划 ID
    const planKey = `${planType}_${isYearly ? 'yearly' : 'monthly'}` as keyof typeof SUBSCRIPTION_PLAN_IDS;
    const planId = SUBSCRIPTION_PLAN_IDS[planKey];

    if (!planId) {
      return NextResponse.json(
        { error: 'Invalid plan type' },
        { status: 400 }
      );
    }

    // 创建订阅请求
    const subscriptionData = {
      plan_id: planId,
      start_time: new Date(Date.now() + 60000).toISOString(), // 1分钟后开始
      subscriber: {
        name: {
          given_name: userName?.split(' ')[0] || 'User',
          surname: userName?.split(' ')[1] || 'Name'
        },
        email_address: userEmail
      },
      application_context: {
        brand_name: 'SeeWorld AI',
        locale: 'en-US',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'SUBSCRIBE_NOW',
        payment_method: {
          payer_selected: 'PAYPAL',
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        },
        return_url: `${PAYPAL_CONFIG.RETURN_URL}?type=subscription`,
        cancel_url: `${PAYPAL_CONFIG.CANCEL_URL}?type=subscription`
      }
    };

    // 使用 fetch 直接调用 PayPal API（因为新 SDK 可能还没有订阅控制器）
    const accessToken = await getPayPalAccessToken();
    
    const response = await fetch(`${getPayPalBaseUrl()}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'PayPal-Request-Id': `subscription-${Date.now()}-${Math.random()}`
      },
      body: JSON.stringify(subscriptionData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`PayPal API error: ${JSON.stringify(errorData)}`);
    }

    const subscription = await response.json();

    return NextResponse.json({
      id: subscription.id,
      status: subscription.status,
      links: subscription.links,
      planId: planId
    });

  } catch (error) {
    console.error('PayPal create subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

// 获取 PayPal 访问令牌
async function getPayPalAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// 获取 PayPal 基础 URL
function getPayPalBaseUrl(): string {
  return PAYPAL_CONFIG.ENVIRONMENT === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}
