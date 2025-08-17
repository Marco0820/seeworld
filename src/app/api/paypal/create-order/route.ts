import { NextRequest, NextResponse } from 'next/server';
import { PAYPAL_CONFIG, formatAmount, generatePaymentId } from '@/lib/paypal';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'USD', items } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // 获取 PayPal 访问令牌
    const accessToken = await getPayPalAccessToken();
    
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: formatAmount(amount),
          },
          description: items?.[0]?.name || 'SeeWorld Credits',
          custom_id: generatePaymentId(),
        }
      ],
      application_context: {
        return_url: PAYPAL_CONFIG.RETURN_URL,
        cancel_url: PAYPAL_CONFIG.CANCEL_URL,
        user_action: 'PAY_NOW',
        brand_name: 'SeeWorld AI',
      }
    };

    const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`PayPal API error: ${JSON.stringify(errorData)}`);
    }

    const orderResult = await response.json();

    return NextResponse.json({
      id: orderResult.id,
      status: orderResult.status,
      links: orderResult.links,
    });

  } catch (error) {
    console.error('PayPal create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
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
