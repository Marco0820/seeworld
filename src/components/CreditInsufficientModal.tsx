"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { X, CreditCard, Zap, AlertTriangle } from 'lucide-react';
import UpgradePlanModal from './UpgradePlanModal';

interface CreditInsufficientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
  currentCredits: number;
  requiredCredits: number;
}

export default function CreditInsufficientModal({
  isOpen,
  onClose,
  onPurchase,
  currentCredits,
  requiredCredits
}: CreditInsufficientModalProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  if (!isOpen) return null;

  const shortfall = requiredCredits - currentCredits;

  const handleShowUpgrade = () => {
    setShowUpgradeModal(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <Card className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Insufficient Credits</h3>
              <p className="text-sm text-gray-500">Insufficient Credits</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Credit Status */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Credits</span>
              <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                ★ {currentCredits}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Required Credits</span>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                ★ {requiredCredits}
              </Badge>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Credits Needed</span>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  ★ {shortfall}
                </Badge>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center py-2">
            <p className="text-gray-700 text-sm leading-relaxed">
              Generating this video requires <span className="font-semibold text-orange-600">{requiredCredits}</span> credits,
              but you currently have only <span className="font-semibold text-gray-900">{currentCredits}</span> credits.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Please top up more credits to continue using the video generation feature
            </p>
          </div>

          {/* Quick Purchase Options */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Recommended Top-up Plans</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                <div className="text-lg font-bold text-orange-600">500</div>
                <div className="text-xs text-gray-500">credits</div>
                <div className="text-xs text-green-600">¥9.9</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border-2 border-orange-400 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
                </div>
                <div className="text-lg font-bold text-orange-600">1000</div>
                <div className="text-xs text-gray-500">credits</div>
                <div className="text-xs text-green-600">¥19.9</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                <div className="text-lg font-bold text-orange-600">2000</div>
                <div className="text-xs text-gray-500">credits</div>
                <div className="text-xs text-green-600">¥39.9</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Top up Later
          </Button>
          <Button
            onClick={handleShowUpgrade}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            View Plans
          </Button>
        </div>
      </Card>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentCredits={currentCredits}
        requiredCredits={requiredCredits}
      />
    </div>
  );
}
