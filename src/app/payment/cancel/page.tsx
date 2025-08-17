"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, CreditCard, HelpCircle } from 'lucide-react';
import Link from 'next/link';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const paymentType = searchParams.get('type'); // 'subscription' or 'credit'

  return (
    <div className="min-h-screen bg-klein-blue pt-14">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-white/70 text-lg">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold text-white">
              {paymentType === 'subscription' ? 'Subscription Not Created' : 'Credits Not Purchased'}
            </h2>
            
            <p className="text-white/70">
              {paymentType === 'subscription' 
                ? 'Your subscription was not activated and no billing has been set up.'
                : 'No credits were added to your account and no payment was processed.'
              }
            </p>

            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <p className="text-orange-400 text-sm">
                If you experienced any issues during the payment process, please try again or contact our support team for assistance.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/credits">
              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </Link>
            
            <Link href="/generate">
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                Continue with Free Credits
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/account">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <CreditCard className="w-4 h-4 mr-2" />
                View Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-8 p-4 bg-white/5 border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-medium mb-2">Need Help?</h3>
              <div className="space-y-1 text-sm text-white/70">
                <p>• Check if your PayPal account has sufficient funds</p>
                <p>• Ensure your payment method is verified</p>
                <p>• Try using a different payment method</p>
                <p>• Contact our support team if the issue persists</p>
              </div>
              
              <div className="mt-4">
                <Button size="sm" variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Alternative Options */}
        <Card className="mt-6 p-4 bg-white/5 border-white/10 backdrop-blur-sm">
          <h3 className="text-white font-medium mb-3">Alternative Options</h3>
          <div className="space-y-3">
            {paymentType !== 'subscription' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">Subscribe for better value</p>
                  <p className="text-white/60 text-xs">Get monthly credits at a lower cost</p>
                </div>
                <Link href="/credits?mode=subscription">
                  <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    View Plans
                  </Button>
                </Link>
              </div>
            )}
            
            {paymentType !== 'credit' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">Buy credits as needed</p>
                  <p className="text-white/60 text-xs">Pay only for what you use</p>
                </div>
                <Link href="/credits?mode=payasyougo">
                  <Button size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Buy Credits
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-klein-blue pt-14 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <PaymentCancelContent />
    </Suspense>
  );
}
