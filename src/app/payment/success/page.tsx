"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, CreditCard, Calendar } from 'lucide-react';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<{
    type: 'subscription' | 'credit';
    id: string;
    planName?: string;
    packName?: string;
    amount: number;
    credits: number;
    bonus?: number;
    billingCycle?: string;
    nextBilling?: string;
  } | null>(null);
  
  const paymentType = searchParams.get('type'); // 'subscription' or 'credit'
  const subscriptionId = searchParams.get('subscription_id');
  const orderId = searchParams.get('payment_id');

  useEffect(() => {
    // Mock fetching payment info from backend
    if (paymentType === 'subscription' && subscriptionId) {
      setPaymentData({
        type: 'subscription',
        id: subscriptionId,
        planName: 'Plus',
        amount: 16.00,
        credits: 2000,
        billingCycle: 'monthly',
        nextBilling: '2024-02-15T00:00:00Z'
      });
    } else if (paymentType === 'credit' && orderId) {
      setPaymentData({
        type: 'credit',
        id: orderId,
        packName: 'Popular Pack',
        amount: 10.00,
        credits: 1200,
        bonus: 200
      });
    }
  }, [paymentType, subscriptionId, orderId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-klein-blue pt-14">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-white/70 text-lg">
            Thank you for your purchase. Your account has been updated.
          </p>
        </div>

        {paymentData && (
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">
                  {paymentData.type === 'subscription' ? 'Subscription Activated' : 'Credits Purchased'}
                </h2>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Completed
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-white/60 text-sm">
                      {paymentData.type === 'subscription' ? 'Plan' : 'Package'}
                    </p>
                    <p className="text-white font-medium">
                      {paymentData.planName || paymentData.packName}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-sm">Amount Paid</p>
                    <p className="text-white font-medium">${paymentData.amount.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/60 text-sm">Payment ID</p>
                    <p className="text-white/40 text-sm font-mono">{paymentData.id}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <span className="text-white font-medium">Credits Added</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-500">
                      {paymentData.credits.toLocaleString()}
                      {paymentData.bonus && (
                        <span className="text-sm text-green-400 ml-2">
                          (+{paymentData.bonus.toLocaleString()} bonus)
                        </span>
                      )}
                    </div>
                    {paymentData.type === 'subscription' && (
                      <p className="text-white/60 text-sm mt-1">Monthly allocation</p>
                    )}
                  </div>

                  {paymentData.type === 'subscription' && paymentData.nextBilling && (
                    <div>
                      <p className="text-white/60 text-sm">Next Billing</p>
                      <p className="text-white font-medium">
                        {formatDate(paymentData.nextBilling)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/generate">
              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white">
                Start Creating Videos
              </Button>
            </Link>
            
            <Link href="/account">
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                <CreditCard className="w-4 h-4 mr-2" />
                View Account
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/credits">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Buy More Credits
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="mt-8 p-4 bg-white/5 border-white/10 backdrop-blur-sm">
          <h3 className="text-white font-medium mb-3">What's Next?</h3>
          <div className="space-y-2 text-sm text-white/70">
            {paymentData?.type === 'subscription' ? (
              <>
                <p>• Your subscription is now active and will auto-renew monthly</p>
                <p>• You'll receive {paymentData.credits.toLocaleString()} credits every month</p>
                <p>• You can cancel or modify your subscription anytime in account settings</p>
                <p>• You now have access to all premium features and models</p>
              </>
            ) : (
              <>
                <p>• Your credits have been added to your account</p>
                <p>• Credits never expire and can be used anytime</p>
                <p>• You can purchase more credits whenever you need them</p>
                <p>• Check your credit balance in the top navigation</p>
              </>
            )}
            <p>• A confirmation email has been sent to your registered email address</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-klein-blue pt-14 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
