"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Star, 
  Crown, 
  Zap, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Check
} from 'lucide-react';
import { SUBSCRIPTION_PLANS, type SubscriptionPlan } from '@/types/payment';

interface PayPalSubscriptionProps {
  onSubscriptionSuccess?: (subscriptionId: string, planType: string) => void;
  onSubscriptionError?: (error: string) => void;
  userEmail?: string;
  userName?: string;
}

export default function PayPalSubscription({ 
  onSubscriptionSuccess, 
  onSubscriptionError,
  userEmail = 'user@example.com',
  userName = 'User Name'
}: PayPalSubscriptionProps) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isYearly, setIsYearly] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'free': return Zap;
      case 'plus': return Star;
      case 'pro': return Crown;
      default: return Star;
    }
  };

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    if (plan.type === 'free') return; // Free plan doesn't require payment
    setSelectedPlan(plan);
    setMessage(null);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    try {
      setIsProcessing(true);
      setMessage(null);

      const response = await fetch('/api/paypal/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: selectedPlan.type,
          isYearly,
          userEmail,
          userName,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      // Redirect to PayPal subscription page
      const approvalLink = data.links?.find((link: { rel: string; href: string }) => link.rel === 'approve');
      if (approvalLink) {
        window.location.href = approvalLink.href;
      } else {
        throw new Error('No approval link found');
      }

    } catch (error) {
      console.error('Error creating subscription:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to create subscription' 
      });
      setIsProcessing(false);
      onSubscriptionError?.(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const filteredPlans = SUBSCRIPTION_PLANS.filter(plan => plan.type !== 'free');

  return (
    <div className="space-y-6">
      {/* Message Display */}
      {message && (
        <Alert className={`${
          message.type === 'success' 
            ? 'border-green-500/50 bg-green-500/10' 
            : 'border-red-500/50 bg-red-500/10'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <AlertDescription className={
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              !isYearly
                ? 'bg-blue-500 text-white'
                : 'text-white hover:text-white/80'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
              isYearly
                ? 'bg-blue-500 text-white'
                : 'text-white hover:text-white/80'
            }`}
          >
            <span>Yearly</span>
            <Badge className="bg-green-500 text-white text-xs">Save 17%</Badge>
          </button>
        </div>
      </div>

      {/* Subscription Plans - Raphael AI Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="relative p-8 bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-900">¥0</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <p className="text-gray-500 text-sm">Perfect for light usage</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 text-center justify-center">
              <Star className="w-5 h-5 text-orange-500" />
              <span className="text-gray-900 font-semibold text-lg">100 credits/month</span>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Standard task queue</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Basic video generation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Community support</span>
              </li>
            </ul>
          </div>

          <Button 
            className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl font-semibold text-lg"
            disabled
          >
            Current Plan
          </Button>
        </Card>

        {/* Plus Plan */}
        <Card className="relative p-8 bg-white rounded-3xl border-2 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Recommended
            </Badge>
          </div>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-900">¥{isYearly ? '99' : '119'}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            {isYearly && (
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Save $40 with yearly
              </div>
            )}
            <p className="text-gray-500 text-sm mt-2">Perfect for professional creators</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 text-center justify-center">
              <Star className="w-5 h-5 text-orange-500" />
              <span className="text-gray-900 font-semibold text-lg">2000 credits/month</span>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Priority task queue</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">High-quality video generation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dedicated stable resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Email support</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={() => handlePlanSelect(SUBSCRIPTION_PLANS.find(p => p.type === 'plus')!)}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold text-lg shadow-lg"
          >
            Get Started
          </Button>
        </Card>

        {/* Pro Plan */}
        <Card className="relative p-8 bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold text-gray-900">¥{isYearly ? '599' : '699'}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            {isYearly && (
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Save $200 with yearly
              </div>
            )}
            <p className="text-gray-500 text-sm mt-2">Perfect for team collaboration</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 text-center justify-center">
              <Star className="w-5 h-5 text-orange-500" />
              <span className="text-gray-900 font-semibold text-lg">25000 credits/month</span>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Highest priority queue</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Ultra high-quality video generation</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dedicated server resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dedicated customer support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">API access</span>
              </li>
            </ul>
          </div>

          <Button 
            onClick={() => handlePlanSelect(SUBSCRIPTION_PLANS.find(p => p.type === 'pro')!)}
            className="w-full py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold text-lg"
          >
            Get Started
          </Button>
        </Card>
      </div>

      {/* Subscription Action */}
      {selectedPlan && (
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                Subscribe to {selectedPlan.name} Plan
              </h3>
              <p className="text-white/70">
                {isYearly ? 'Billed annually' : 'Billed monthly'} • Cancel anytime
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white">
                  {selectedPlan.name} ({isYearly ? 'Yearly' : 'Monthly'})
                </span>
                <span className="text-white font-bold">
                  ${isYearly ? selectedPlan.yearlyPrice : selectedPlan.price}/month
                </span>
              </div>
              {isYearly && selectedPlan.price > 0 && (
                <div className="text-sm text-green-400 mt-1">
                  Total: ${(selectedPlan.yearlyPrice * 12).toFixed(2)}/year 
                  (Save ${((selectedPlan.price - selectedPlan.yearlyPrice) * 12).toFixed(0)})
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Subscribe with PayPal'
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setSelectedPlan(null)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>

            <div className="text-center text-xs text-white/60">
              Secure payment powered by PayPal
            </div>
          </div>
        </Card>
      )}

      {/* Terms and Info */}
      <Card className="p-4 bg-white/5 border-white/10">
        <div className="space-y-2 text-sm text-white/60">
          <p>• Subscriptions automatically renew unless cancelled</p>
          <p>• You can cancel or change your plan anytime in account settings</p>
          <p>• Unused monthly credits don't roll over to the next month</p>
          <p>• All payments are processed securely through PayPal</p>
        </div>
      </Card>
    </div>
  );
}
