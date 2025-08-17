"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    icon: Zap,
    features: [
      "100 free credits per month",
      "Standard task queue",
      "Basic video quality",
      "Community support"
    ],
    buttonText: "Current Plan",
    disabled: true,
    popular: false
  },
  {
    name: "Plus",
    price: 16,
    yearlyPrice: 13.33, // -17% discount
    icon: Star,
    features: [
      "2000 free credits per month",
      "Priority task queue",
      "Enhanced stability with dedicated resources",
      "HD video quality",
      "Email support"
    ],
    buttonText: "Upgrade",
    disabled: false,
    popular: true,
    gradient: "card-gradient-plus"
  },
  {
    name: "Pro",
    price: 166,
    yearlyPrice: 138, // -17% discount
    icon: Crown,
    features: [
      "25000 free credits per month",
      "Priority task queue",
      "Enhanced stability with dedicated resources",
      "4K video quality",
      "Priority support",
      "Advanced AI models",
      "Commercial license"
    ],
    buttonText: "Upgrade",
    disabled: false,
    popular: false,
    gradient: "card-gradient-pro"
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePayPalSuccess = async (details: Record<string, unknown>, planName: string) => {
    console.log("Payment successful for plan:", planName, details);
    // Handle successful payment here
    alert(`Payment successful for ${planName} plan!`);
  };

  const handlePayPalError = (err: Record<string, unknown>) => {
    console.error("PayPal error:", err);
    alert("Payment failed. Please try again.");
  };

  return (
    <section id="pricing" className="px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Pricing
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly
                  ? "bg-blue-500 text-white"
                  : "text-white hover:text-white/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                isYearly
                  ? "bg-blue-500 text-white"
                  : "text-white hover:text-white/80"
              }`}
            >
              <span>Yearly</span>
              <Badge className="bg-green-500 text-white text-xs">-17%</Badge>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const currentPrice = isYearly ? plan.yearlyPrice : plan.price;

            return (
              <Card
                key={plan.name}
                className={`relative p-8 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  plan.gradient || "bg-white/5"
                } ${plan.popular ? "ring-2 ring-cyan-400" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-cyan-400 text-black font-semibold px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  </div>

                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">
                      ${currentPrice}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-white/60 text-lg">
                        / month
                      </span>
                    )}
                  </div>

                  {isYearly && plan.price > 0 && (
                    <p className="text-green-400 text-sm">
                      Save ${((plan.price - plan.yearlyPrice) * 12).toFixed(0)} per year
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button / PayPal */}
                <div className="mt-auto">
                  {plan.disabled ? (
                    <Button disabled className="w-full bg-white/20 text-white/60">
                      {plan.buttonText}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        onClick={() => setSelectedPlan(selectedPlan === plan.name ? null : plan.name)}
                        className={`w-full font-semibold transition-all duration-300 ${
                          plan.popular
                            ? "bg-cyan-400 hover:bg-cyan-500 text-black"
                            : "bg-white hover:bg-white/90 text-black"
                        }`}
                      >
                        {selectedPlan === plan.name ? "Hide Payment" : plan.buttonText}
                      </Button>

                      {selectedPlan === plan.name && (
                        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                          <PayPalScriptProvider
                            options={{
                              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                              currency: "USD",
                              intent: "subscription"
                            }}
                          >
                            <PayPalButtons
                              style={{
                                layout: "vertical",
                                color: "blue",
                                shape: "rect",
                                label: "subscribe"
                              }}
                              createSubscription={(data, actions) => {
                                return actions.subscription.create({
                                  plan_id: `seeworld-${plan.name.toLowerCase()}-${isYearly ? 'yearly' : 'monthly'}`,
                                });
                              }}
                              onApprove={async (data, actions) => {
                                await handlePayPalSuccess(data, plan.name);
                              }}
                              onError={handlePayPalError}
                            />
                          </PayPalScriptProvider>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-white/5 border-white/20 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Team</h3>
              <p className="text-white/70 mb-6">
                Scale your team's productivity with SeeWorld
              </p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
                Contact Us
              </Button>
            </div>
          </Card>

          <Card className="p-8 bg-white/5 border-white/20 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Buy Credits</h3>
              <p className="text-white/70 mb-6">
                Only SeeWorld members can buy add-on credits.
              </p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
                Buy Credits
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-white/60">
            Having a problem?{" "}
            <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
              Contact us for help.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
