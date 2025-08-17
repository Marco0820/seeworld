/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { PAYPAL_CONFIG } from '@/lib/paypal';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('paypal-transmission-sig');
    const certId = request.headers.get('paypal-cert-id');
    const transmissionId = request.headers.get('paypal-transmission-id');
    const timestamp = request.headers.get('paypal-transmission-time');

    // 验证 Webhook 签名（生产环境中必须实现）
    if (PAYPAL_CONFIG.ENVIRONMENT === 'production') {
      const isValid = await verifyWebhookSignature(
        body,
        signature,
        certId,
        transmissionId,
        timestamp
      );
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(body);
    console.log('PayPal Webhook Event:', event.event_type);

    // 处理不同类型的事件
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePaymentCompleted(event);
        break;
        
      case 'BILLING.SUBSCRIPTION.ACTIVATED':
        await handleSubscriptionActivated(event);
        break;
        
      case 'BILLING.SUBSCRIPTION.CANCELLED':
        await handleSubscriptionCancelled(event);
        break;
        
      case 'BILLING.SUBSCRIPTION.PAYMENT.COMPLETED':
        await handleSubscriptionPaymentCompleted(event);
        break;
        
      case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
        await handleSubscriptionPaymentFailed(event);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// 处理一次性支付完成
async function handlePaymentCompleted(event: Record<string, unknown>) {
  const payment = event.resource as any;
  const customId = payment?.purchase_units?.[0]?.payments?.captures?.[0]?.custom_id;
  const amount = parseFloat(payment?.purchase_units?.[0]?.amount?.value || '0');
  const payerEmail = payment?.payer?.email_address;

  console.log(`Payment completed: ${payment.id}, Amount: $${amount}, Email: ${payerEmail}`);

  // TODO: 更新用户积分
  // const creditsToAdd = calculateCreditsFromPayment(amount);
  // await updateUserCreditsByEmail(payerEmail, creditsToAdd);
}

// 处理订阅激活
async function handleSubscriptionActivated(event: Record<string, unknown>) {
  const subscription = event.resource as any;
  const subscriberEmail = subscription?.subscriber?.email_address;
  const planId = subscription?.plan_id;

  console.log(`Subscription activated: ${subscription?.id}, Plan: ${planId}, Email: ${subscriberEmail}`);

  // TODO: 更新用户订阅状态
  // await updateUserSubscription(subscriberEmail, {
  //   subscriptionId: subscription.id,
  //   planId: planId,
  //   status: 'active',
  //   startDate: subscription.start_time,
  //   nextBillingDate: subscription.billing_info?.next_billing_time
  // });
}

// 处理订阅取消
async function handleSubscriptionCancelled(event: Record<string, unknown>) {
  const subscription = event.resource as any;
  const subscriberEmail = subscription?.subscriber?.email_address;

  console.log(`Subscription cancelled: ${subscription?.id}, Email: ${subscriberEmail}`);

  // TODO: 更新用户订阅状态
  // await updateUserSubscriptionStatus(subscriberEmail, 'cancelled');
}

// 处理订阅付款完成
async function handleSubscriptionPaymentCompleted(event: Record<string, unknown>) {
  const payment = event.resource as any;
  const subscriptionId = payment?.billing_agreement_id;
  const amount = parseFloat(payment?.amount?.total || '0');

  console.log(`Subscription payment completed: ${payment?.id}, Subscription: ${subscriptionId}, Amount: $${amount}`);

  // TODO: 为用户添加月度积分
  // const monthlyCredits = getMonthlyCreditsForSubscription(subscriptionId);
  // await addMonthlyCreditsToUser(subscriptionId, monthlyCredits);
}

// 处理订阅付款失败
async function handleSubscriptionPaymentFailed(event: Record<string, unknown>) {
  const payment = event.resource as any;
  const subscriptionId = payment?.billing_agreement_id;

  console.log(`Subscription payment failed: ${payment?.id}, Subscription: ${subscriptionId}`);

  // TODO: 处理付款失败逻辑
  // 可能需要暂停用户服务或发送通知
}

// 验证 Webhook 签名（简化版本，生产环境需要完整实现）
async function verifyWebhookSignature(
  body: string,
  signature: string | null,
  certId: string | null,
  transmissionId: string | null,
  timestamp: string | null
): Promise<boolean> {
  // 这是一个简化的签名验证
  // 生产环境中需要按照 PayPal 官方文档实现完整的签名验证
  // https://developer.paypal.com/docs/api/webhooks/v1/#verify-webhook-signature
  
  if (!signature || !certId || !transmissionId || !timestamp) {
    return false;
  }

  // TODO: 实现完整的签名验证逻辑
  return true;
}
