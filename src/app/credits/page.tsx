"use client";

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Sparkles, 
  Star, 
  Crown, 
  Zap,
  Check,
  ArrowLeft,
  Plus,
  Gift,
  TrendingUp
} from 'lucide-react';
import { SUBSCRIPTION_PLANS, CREDIT_PACKS, type SubscriptionPlan, type CreditPack } from '@/types/payment';
import PayPalSubscription from '@/components/PayPalSubscription';
import PayPalCreditPurchase from '@/components/PayPalCreditPurchase';
import Link from 'next/link';

export default function CreditsPage() {
  const [paymentMode, setPaymentMode] = useState<'subscription' | 'payasyougo'>('subscription');
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [userCredits, setUserCredits] = useState(150); // Mock user current credits

  const handleSubscriptionSuccess = (subscriptionId: string, planType: string) => {
    setSelectedPlan(planType);
    setUserCredits(prev => {
      const plan = SUBSCRIPTION_PLANS.find(p => p.type === planType);
      return prev + (plan?.monthlyCredits || 0);
    });
    console.log('Subscription successful:', subscriptionId, planType);
  };

  const handleSubscriptionError = (error: string) => {
    console.error('Subscription failed:', error);
    alert('Subscription failed: ' + error);
  };

  const handleCreditPurchaseSuccess = (credits: number, orderId: string) => {
    setUserCredits(prev => prev + credits);
    console.log('Credit purchase successful:', credits, orderId);
  };

  const handleCreditPurchaseError = (error: string) => {
    console.error('Credit purchase failed:', error);
    alert('Credit purchase failed: ' + error);
  };

  const getPlanIcon = (type: string) => {
    switch (type) {
      case 'free': return Zap;
      case 'plus': return Star;
      case 'pro': return Crown;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="pt-14">
        <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link href="/generate">
              <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Generate
              </Button>
            </Link>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-gray-900 font-medium">Current Credits: {userCredits}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect video generation plan for you and unleash unlimited AI creativity
          </p>
        </div>

        {/* Payment Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setPaymentMode('subscription')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                paymentMode === 'subscription'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Subscription Plans
            </button>
            <button
              onClick={() => setPaymentMode('payasyougo')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                paymentMode === 'payasyougo'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus className="w-4 h-4" />
              Pay-as-you-go
            </button>
          </div>
        </div>

        {paymentMode === 'subscription' && (
          <PayPalSubscription
            onSubscriptionSuccess={handleSubscriptionSuccess}
            onSubscriptionError={handleSubscriptionError}
            userEmail="user@example.com" // TODO: Get actual user email
            userName="User Name" // TODO: Get actual user name
          />
        )}

        {paymentMode === 'payasyougo' && (
          <div>
            {/* Pay-as-you-go Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Credit Packs</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Purchase credits as needed, flexible usage, never expire
              </p>
            </div>

            {/* PayPal Credit Purchase Component */}
            <PayPalCreditPurchase
              onPurchaseSuccess={handleCreditPurchaseSuccess}
              onPurchaseError={handleCreditPurchaseError}
            />

            {/* Usage Guide */}
            <Card className="mt-12 p-8 bg-white border border-gray-200 shadow-sm rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                Credit Usage Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-gray-900 font-semibold text-lg">Fast Mode</h4>
                  <p className="text-gray-600">250 credits/video</p>
                  <p className="text-gray-500 text-sm">Fast generation, good quality</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-gray-900 font-semibold text-lg">Quality Mode</h4>
                  <p className="text-gray-600">500 credits/video</p>
                  <p className="text-gray-500 text-sm">High-quality generation, longer processing time</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-gray-900 font-semibold text-lg">Advanced Models</h4>
                  <p className="text-gray-600">400-800 credits/video</p>
                  <p className="text-gray-500 text-sm">Professional AI models (subscription required)</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-gray-900 font-semibold text-lg">Credits Never Expire</h4>
                  <p className="text-gray-600">Use anytime</p>
                  <p className="text-gray-500 text-sm">No monthly limits</p>
                </div>
              </div>
            </Card>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
