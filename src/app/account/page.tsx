"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User,
  CreditCard,
  Sparkles,
  Star,
  Crown,
  Calendar,
  Settings,
  ArrowLeft,
  Plus,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { type Subscription, type User as UserType, SUBSCRIPTION_PLANS } from '@/types/payment';
import CreditHistory from '@/components/CreditHistory';
import Link from 'next/link';

// Mock user data
const mockUser: UserType = {
  id: 'user1',
  email: 'user@example.com',
  credits: 150,
  subscription: {
    id: 'sub1',
    userId: 'user1',
    planType: 'plus',
    status: 'active',
    currentPeriodStart: '2024-01-01T00:00:00Z',
    currentPeriodEnd: '2024-02-01T00:00:00Z',
    cancelAtPeriodEnd: false,
    monthlyCredits: 2000,
    remainingCredits: 1850,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  createdAt: '2023-12-01T00:00:00Z',
  updatedAt: '2024-01-15T10:30:00Z'
};

export default function AccountPage() {
  const [user, setUser] = useState<UserType>(mockUser);
  const [activeTab, setActiveTab] = useState<'overview' | 'subscription' | 'history'>('overview');

  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.type === user.subscription?.planType);

  const handleCancelSubscription = () => {
    if (confirm('Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.')) {
      // TODO: Implement subscription cancellation logic
      console.log('Canceling subscription...');
    }
  };

  const handleReactivateSubscription = () => {
    // TODO: Implement subscription reactivation logic
    console.log('Reactivating subscription...');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      canceled: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      expired: 'bg-red-500/20 text-red-400 border-red-500/30',
      pending: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };

    return (
      <Badge className={colors[status as keyof typeof colors] || colors.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/generate">
            <Button variant="outline" className="bg-gray-100 text-black border-gray-300 hover:bg-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generate
            </Button>
          </Link>
          
          <div>
            <h1 className="text-3xl font-bold text-black">Account Management</h1>
            <p className="text-gray-600">Manage your subscription and credits</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === 'overview' ? "default" : "outline"}
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'bg-white text-klein-blue hover:bg-white/90'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'subscription' ? "default" : "outline"}
            onClick={() => setActiveTab('subscription')}
            className={`${
              activeTab === 'subscription'
                ? 'bg-white text-klein-blue hover:bg-white/90'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Subscription
          </Button>
          <Button
            variant={activeTab === 'history' ? "default" : "outline"}
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'bg-white text-klein-blue hover:bg-white/90'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Account Info */}
            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-full">
                  <User className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-white font-semibold">Account Info</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Member since</p>
                  <p className="text-white">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </Card>

            {/* Current Credits */}
            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-full">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-white font-semibold">Available Credits</h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{user.credits.toLocaleString()}</div>
              <p className="text-white/60 text-sm mb-4">Current balance</p>
              <Link href="/credits">
                <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Buy More Credits
                </Button>
              </Link>
            </Card>

            {/* Subscription Status */}
            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-full">
                  {currentPlan?.type === 'pro' ? (
                    <Crown className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Star className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <h3 className="text-white font-semibold">Current Plan</h3>
              </div>
              {user.subscription ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-lg font-medium">{currentPlan?.name}</span>
                    {getStatusBadge(user.subscription.status)}
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Monthly Credits</p>
                    <p className="text-white">{user.subscription.monthlyCredits.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Remaining this month</p>
                    <p className="text-white">{user.subscription.remainingCredits.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-white/60 mb-4">No active subscription</p>
                  <Link href="/credits">
                    <Button className="bg-white text-klein-blue hover:bg-white/90">
                      Choose Plan
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'subscription' && user.subscription && (
          <div className="max-w-4xl">
            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Subscription Details</h3>
                {getStatusBadge(user.subscription.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Plan Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Plan:</span>
                      <span className="text-white">{currentPlan?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Price:</span>
                      <span className="text-white">${currentPlan?.price}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Monthly Credits:</span>
                      <span className="text-white">{user.subscription.monthlyCredits.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Billing Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/60">Current Period:</span>
                      <span className="text-white text-sm">
                        {formatDate(user.subscription.currentPeriodStart)} - {formatDate(user.subscription.currentPeriodEnd)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Next Billing:</span>
                      <span className="text-white">{formatDate(user.subscription.currentPeriodEnd)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Auto-renewal:</span>
                      <span className="text-white">
                        {user.subscription.cancelAtPeriodEnd ? 'Disabled' : 'Enabled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {user.subscription.cancelAtPeriodEnd && (
                <Card className="p-4 bg-orange-500/10 border-orange-500/20 mb-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-orange-400 font-medium">Subscription Canceled</p>
                      <p className="text-orange-300/80 text-sm">
                        Your subscription will end on {formatDate(user.subscription.currentPeriodEnd)}. 
                        You can reactivate it anytime before then.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex gap-3">
                <Link href="/credits">
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Settings className="w-4 h-4 mr-2" />
                    Change Plan
                  </Button>
                </Link>

                {user.subscription.cancelAtPeriodEnd ? (
                  <Button
                    onClick={handleReactivateSubscription}
                    className="bg-green-500 hover:bg-green-400 text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reactivate Subscription
                  </Button>
                ) : (
                  <Button
                    onClick={handleCancelSubscription}
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    Cancel Subscription
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <CreditHistory showHeader={false} />
        )}
      </div>
    </div>
  );
}
