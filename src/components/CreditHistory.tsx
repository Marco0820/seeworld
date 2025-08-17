"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  CreditCard,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { type Transaction } from '@/types/payment';

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: 'user1',
    type: 'credit_usage',
    amount: 2.5,
    credits: -250,
    description: 'Video generation - Fast mode',
    status: 'completed',
    metadata: {
      videoGenerationId: 'vid_123'
    },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user1',
    type: 'credit_purchase',
    amount: 10,
    credits: 1200,
    description: 'Popular Pack purchase',
    status: 'completed',
    metadata: {
      packId: 'popular'
    },
    createdAt: '2024-01-14T15:22:00Z'
  },
  {
    id: '3',
    userId: 'user1',
    type: 'subscription',
    amount: 16,
    credits: 2000,
    description: 'Plus subscription - Monthly credits',
    status: 'completed',
    metadata: {
      planType: 'plus'
    },
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    userId: 'user1',
    type: 'credit_usage',
    amount: 5,
    credits: -500,
    description: 'Video generation - Quality mode',
    status: 'completed',
    metadata: {
      videoGenerationId: 'vid_124'
    },
    createdAt: '2024-01-13T09:15:00Z'
  }
];

interface CreditHistoryProps {
  showHeader?: boolean;
}

export default function CreditHistory({ showHeader = true }: CreditHistoryProps) {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filter, setFilter] = useState<'all' | 'purchases' | 'usage'>('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'purchases') return tx.type === 'credit_purchase' || tx.type === 'subscription';
    if (filter === 'usage') return tx.type === 'credit_usage';
    return true;
  });

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'credit_purchase':
      case 'subscription':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'credit_usage':
        return <TrendingDown className="w-4 h-4 text-orange-400" />;
      case 'credit_refund':
        return <RefreshCw className="w-4 h-4 text-blue-400" />;
      default:
        return <CreditCard className="w-4 h-4 text-white/60" />;
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    const colors = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      refunded: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };

    return (
      <Badge className={`text-xs ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Credit History</h2>
            <p className="text-white/70">Track your credit purchases and usage</p>
          </div>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? "default" : "outline"}
          onClick={() => setFilter('all')}
          className={`${
            filter === 'all'
              ? 'bg-white text-klein-blue hover:bg-white/90'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          All
        </Button>
        <Button
          variant={filter === 'purchases' ? "default" : "outline"}
          onClick={() => setFilter('purchases')}
          className={`${
            filter === 'purchases'
              ? 'bg-white text-klein-blue hover:bg-white/90'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Purchases
        </Button>
        <Button
          variant={filter === 'usage' ? "default" : "outline"}
          onClick={() => setFilter('usage')}
          className={`${
            filter === 'usage'
              ? 'bg-white text-klein-blue hover:bg-white/90'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Usage
        </Button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="p-4 bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/10 rounded-full">
                  {getTransactionIcon(transaction.type)}
                </div>
                
                <div>
                  <h3 className="text-white font-medium">{transaction.description}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-white/40" />
                    <span className="text-white/60 text-sm">
                      {formatDate(transaction.createdAt)}
                    </span>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-lg font-bold flex items-center gap-1 ${
                  transaction.credits > 0 ? 'text-green-400' : 'text-orange-400'
                }`}>
                  <Sparkles className="w-4 h-4" />
                  {transaction.credits > 0 ? '+' : ''}{transaction.credits.toLocaleString()}
                </div>
                <div className="text-white/60 text-sm">
                  ${transaction.amount.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-white font-medium mb-2">No transactions found</h3>
          <p className="text-white/60 text-sm">
            {filter === 'all' 
              ? 'You haven\'t made any transactions yet.'
              : `No ${filter} transactions found.`
            }
          </p>
        </Card>
      )}
    </div>
  );
}
