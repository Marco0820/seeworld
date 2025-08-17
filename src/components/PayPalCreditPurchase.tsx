"use client";

import { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Gift,
  TrendingUp
} from 'lucide-react';
import { CREDIT_PACKS, type CreditPack } from '@/types/payment';
import { PAYPAL_CONFIG } from '@/lib/paypal';

interface PayPalCreditPurchaseProps {
  onPurchaseSuccess?: (credits: number, orderId: string) => void;
  onPurchaseError?: (error: string) => void;
}

export default function PayPalCreditPurchase({ 
  onPurchaseSuccess, 
  onPurchaseError 
}: PayPalCreditPurchaseProps) {
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const paypalOptions = {
    clientId: PAYPAL_CONFIG.CLIENT_ID,
    currency: PAYPAL_CONFIG.CURRENCY,
    intent: PAYPAL_CONFIG.INTENT,
  };

  const handlePackSelect = (pack: CreditPack) => {
    setSelectedPack(pack);
    setMessage(null);
  };

  const createOrder = async () => {
    if (!selectedPack) return '';

    try {
      setIsProcessing(true);
      
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPack.price,
          currency: 'USD',
          items: [{
            name: selectedPack.name,
            description: `${selectedPack.credits + selectedPack.bonus} credits for SeeWorld AI`,
            quantity: 1,
            price: selectedPack.price,
          }]
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      return data.id;
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to create payment order. Please try again.' 
      });
      setIsProcessing(false);
      return '';
    }
  };

  const onApprove = async (data: { orderID: string }) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
          userID: 'current-user-id', // TODO: Get actual user ID
        }),
      });

      const captureData = await response.json();
      
      if (!response.ok) {
        throw new Error(captureData.error || 'Failed to capture payment');
      }

      if (captureData.status === 'COMPLETED' && selectedPack) {
        const totalCredits = selectedPack.credits + selectedPack.bonus;
        setMessage({ 
          type: 'success', 
          text: `Payment successful! ${totalCredits} credits have been added to your account.` 
        });
        
        onPurchaseSuccess?.(totalCredits, data.orderID);
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
      setMessage({ 
        type: 'error', 
        text: 'Payment processing failed. Please contact support if you were charged.' 
      });
      onPurchaseError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsProcessing(false);
      setSelectedPack(null);
    }
  };

  const onError = (error: { message?: string }) => {
    console.error('PayPal payment error:', error);
    setMessage({ 
      type: 'error', 
      text: 'Payment failed. Please try again or use a different payment method.' 
    });
    setIsProcessing(false);
    onPurchaseError?.(error.message || 'Payment failed');
  };

  const onCancel = () => {
    setMessage({ 
      type: 'error', 
      text: 'Payment was cancelled.' 
    });
    setIsProcessing(false);
    setSelectedPack(null);
  };

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

      {/* Credit Packs Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CREDIT_PACKS.map((pack) => (
          <Card
            key={pack.id}
            className={`p-4 cursor-pointer transition-all duration-200 ${
              selectedPack?.id === pack.id
                ? 'ring-2 ring-orange-500 bg-orange-500/10 border-orange-500'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            } ${pack.popular ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handlePackSelect(pack)}
          >
            {pack.popular && (
              <Badge className="mb-2 bg-blue-500 text-white">
                Best Value
              </Badge>
            )}

            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
              
              <div>
                <h3 className="text-white font-bold">{pack.name}</h3>
                <div className="text-2xl font-bold text-orange-500">${pack.price}</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Base:</span>
                  <span className="text-white">{pack.credits.toLocaleString()}</span>
                </div>
                
                {pack.bonus > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400 flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      Bonus:
                    </span>
                    <span className="text-green-400">+{pack.bonus.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t border-white/10 pt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total:</span>
                    <span className="text-orange-500">
                      {(pack.credits + pack.bonus).toLocaleString()}
                    </span>
                  </div>
                </div>

                {pack.savings && (
                  <Badge className="w-full bg-green-500/20 text-green-400 border-green-500/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {pack.savings}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* PayPal Payment */}
      {selectedPack && (
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                Purchase {selectedPack.name}
              </h3>
              <p className="text-white/70">
                You will receive {(selectedPack.credits + selectedPack.bonus).toLocaleString()} credits
              </p>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500 mr-2" />
                <span className="text-white">Processing payment...</span>
              </div>
            )}

            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtons
                style={{
                  layout: 'vertical',
                  color: 'blue',
                  shape: 'rect',
                  label: 'pay',
                }}
                disabled={isProcessing}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
              />
            </PayPalScriptProvider>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setSelectedPack(null)}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
