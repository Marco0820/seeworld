"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Check, Zap, Star } from 'lucide-react';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  requiredCredits: number;
}

export default function UpgradePlanModal({
  isOpen,
  onClose,
  currentCredits,
  requiredCredits
}: UpgradePlanModalProps) {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      credits: 100,
      features: [
        '100 free credits per month',
        'Standard task queue'
      ],
      current: true,
      type: 'free'
    },
    {
      name: 'Plus',
      price: { monthly: 16, yearly: 13 },
      credits: 2000,
      features: [
        '2000 free credits per month',
        'Priority task queue',
        'Enhanced stability with dedicated resources'
      ],
      current: false,
      type: 'plus'
    },
    {
      name: 'Pro',
      price: { monthly: 166, yearly: 138 },
      credits: 25000,
      features: [
        '25000 free credits per month',
        'Priority task queue',
        'Enhanced stability with dedicated resources'
      ],
      current: false,
      type: 'pro'
    }
  ];

  const handleUpgrade = (planType: string) => {
    console.log(`Upgrading to ${planType} plan`);
    // Add actual upgrade logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <Card className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Upgrade your plan</h2>
          <p className="text-gray-500 text-base">Create more amazing video works with CrePal</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center pb-8">
          <div className="bg-gray-900 rounded-full p-1 flex">
            <Button
              onClick={() => setBillingType('monthly')}
              variant={billingType === 'monthly' ? 'default' : 'ghost'}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingType === 'monthly'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBillingType('yearly')}
              variant={billingType === 'yearly' ? 'default' : 'ghost'}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors relative ${
                billingType === 'yearly'
                  ? 'bg-blue-500 text-white shadow-sm hover:bg-blue-600'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                -17%
              </span>
            </Button>
          </div>
        </div>

        {/* Plans */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl overflow-hidden transition-all ${
                  plan.type === 'free'
                    ? 'border border-gray-200 bg-white'
                    : plan.type === 'plus'
                    ? 'bg-gradient-to-b from-green-400 via-green-500 to-yellow-400 text-white border-0'
                    : 'bg-gradient-to-b from-blue-400 via-blue-500 to-purple-500 text-white border-0'
                }`}
              >
                {/* Plan Content */}
                <div className="p-8">
                  {/* Plan Name */}
                  <div className="flex items-center gap-2 mb-6">
                    {plan.type === 'plus' && <Zap className="w-5 h-5 text-white" />}
                    {plan.type === 'pro' && <Star className="w-5 h-5 text-white" />}
                    <h3 className={`text-xl font-bold ${
                      plan.type === 'free' ? 'text-gray-900' : 'text-white'
                    }`}>
                      {plan.name}
                    </h3>
                  </div>
                  
                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className={`text-5xl font-bold ${
                        plan.type === 'free' ? 'text-gray-900' : 'text-white'
                      }`}>
                        ${plan.price[billingType]}
                      </span>
                      {plan.price[billingType] > 0 && (
                        <span className={`ml-2 text-base ${
                          plan.type === 'free' ? 'text-gray-500' : 'text-white/80'
                        }`}>
                          / month
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Upgrade Button */}
                  <Button
                    onClick={() => handleUpgrade(plan.type)}
                    disabled={plan.current}
                    className={`w-full mb-8 py-3 rounded-full font-semibold text-base ${
                      plan.current
                        ? 'bg-transparent border-2 border-gray-300 text-gray-400 cursor-not-allowed hover:bg-transparent'
                        : plan.type === 'free'
                        ? 'bg-transparent border-2 border-gray-300 text-gray-400 hover:bg-gray-50'
                        : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
                    }`}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>

                  {/* Divider */}
                  <div className={`border-t mb-6 ${
                    plan.type === 'free' ? 'border-gray-200' : 'border-white/20'
                  }`}></div>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.type === 'free' ? 'text-green-500' : 'text-white'
                        }`} />
                        <span className={`text-sm leading-relaxed ${
                          plan.type === 'free' ? 'text-gray-600' : 'text-white'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="text-center text-sm text-gray-500">
            Need more features or credits for your business?{' '}
            <Button variant="link" className="text-blue-600 hover:text-blue-700 font-medium p-0">
              Contact us
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
