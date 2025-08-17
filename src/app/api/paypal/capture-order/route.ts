import { NextRequest, NextResponse } from 'next/server';
import { PAYPAL_CONFIG } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const { orderID, userID } = await request.json();

    if (!orderID) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // 获取 PayPal 访问令牌
    const accessToken = await getPayPalAccessToken();
    
    // 使用 fetch 直接调用 PayPal API
    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`PayPal API error: ${JSON.stringify(errorData)}`);
    }

    const captureData = await response.json();
    
    // 处理支付成功后的业务逻辑
    if (captureData.status === 'COMPLETED') {
      const purchaseUnit = captureData.purchaseUnits?.[0];
      const amount = parseFloat(purchaseUnit?.amount?.value || '0');
      
      // 这里应该更新用户的积分
      // 根据支付金额计算应该给用户多少积分
      const creditsToAdd = calculateCreditsFromPayment(amount);
      
      // TODO: 实际更新数据库中用户的积分
      // await updateUserCredits(userID, creditsToAdd);
      
      console.log(`Payment completed for user ${userID}, adding ${creditsToAdd} credits`);
    }

    return NextResponse.json({
      id: captureData.id,
      status: captureData.status,
      payerEmail: captureData.payer?.emailAddress,
      amount: captureData.purchaseUnits?.[0]?.amount,
    });

  } catch (error) {
    console.error('PayPal capture order error:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment' },
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

// 根据支付金额计算积分
function calculateCreditsFromPayment(amount: number): number {
  // 按照积分包的定价来计算
  if (amount <= 5) return 500;
  if (amount <= 10) return 1200;
  if (amount <= 20) return 2500;
  if (amount <= 45) return 6000;
  
  // 默认按 1 美元 = 100 积分计算
  return Math.floor(amount * 100);
}
