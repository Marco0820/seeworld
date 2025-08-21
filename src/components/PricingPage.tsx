import React, { useState } from 'react';
import { 
  ChevronDown, 
  Check, 
  ArrowRight,
  Globe,
  Zap,
  Palette,
  Sparkles,
  Wrench,
  User
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqItems = [
    "What payment methods do you accept?",
    "How are my credits deducted for image or video generation?", 
    "Do unused credits roll over to the next billing cycle?",
    "What if I need more credits?",
    "How to check my credit status?",
    "Are there any hidden fees?",
    "What is your refund policy?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/pollo-demo" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                <span className="text-black text-sm font-bold">=</span>
              </div>
              <span className="text-xl font-semibold text-white">Pollo.ai</span>
            </a>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                  Video AI
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                  Image AI
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                  Effects
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors">
                  AI Tools
                  <ChevronDown size={16} />
                </button>
              </div>
              
              <a href="#" className="text-white hover:text-gray-300 transition-colors">API</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Pricing</a>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">3</span>
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Plans & Pricing</h1>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-white text-sm">USD $</span>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-gray-900' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Monthly
              </button>
              
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-gray-900' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Yearly
              </button>
              
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Save 50%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-gray-400 ml-1">USD /mo</span>
            </div>
            
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors mb-8">
              Try Now
            </button>

            <ul className="text-left space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">20 credits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 2 videos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 20 images</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">1 Parallel task</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">All-in-one multi-model support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Text to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Image to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Video to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Consistent character video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI animation generator</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">40+ templates & effects</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI video enhancers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Interactive community</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Watermarked outputs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Normal support</span>
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-8 text-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-4 py-1 rounded-full font-medium">
                Most Popular
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$14.5</span>
              <span className="text-gray-400 ml-1">USD /mo</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg font-medium transition-all mb-8">
              Buy Now
            </button>

            <ul className="text-left space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">800 credits/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 80 videos/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 800 images/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">3 Parallel tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">All-in-one multi-model support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Text to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Image to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Video to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Consistent character video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI animation generator</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Language generator</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">40+ templates & effects</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI video enhancers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Interactive community</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Faster generation speed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">No-watermark outputs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">More camera movement options</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Private video visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Copy protection</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority support</span>
              </li>
            </ul>
          </div>

          {/* Lite Plan */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Lite</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$10</span>
              <span className="text-gray-400 ml-1">USD /mo</span>
            </div>
            
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors mb-8">
              Buy Now
            </button>

            <ul className="text-left space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">300 credits/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 30 videos/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Up to 300 images/month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">2 Parallel tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">All-in-one multi-model support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Text to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Image to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Video to video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Consistent character video</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI animation generator</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">40+ templates & effects</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">AI video enhancers</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Interactive community</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Faster generation speed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">No-watermark outputs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">More camera movement options</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Private video visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Copy protection</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Priority support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-sm mb-12">
          Pollo AI offers an all-in-one AI solution. Check out its pricing <a href="#" className="text-blue-400 hover:text-blue-300">here</a>.
        </p>

        {/* Payment Methods */}
        <div className="text-center mb-16">
          <p className="text-white mb-4">Pay safely and securely with</p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <div className="bg-white rounded px-3 py-2">
              <span className="text-orange-500 font-bold">mastercard</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-blue-800 font-bold">VISA</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-blue-600 font-bold">AMERICAN EXPRESS</span>
            </div>
            <div className="bg-black rounded px-3 py-2">
              <span className="text-white font-bold">Apple Pay</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-blue-600 font-bold">PayPal</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-black font-bold">Google Pay</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-blue-800 font-bold">JCB</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-orange-600 font-bold">discover</span>
            </div>
            <div className="bg-white rounded px-3 py-2">
              <span className="text-black font-bold">Click to Pay</span>
            </div>
            <span className="text-gray-400">More ></span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black/30 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Join 10M+ Users Using Pollo AI to<br />Create and Inspire
          </h2>
          <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105">
            Choose a Plan
          </button>
        </div>
      </div>

      {/* Brand Logos */}
      <div className="bg-black/20 backdrop-blur-sm py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-white font-bold text-lg">LANCOME</div>
            <div className="text-white font-bold text-lg">zoom</div>
            <div className="text-white font-bold text-lg">SONY</div>
            <div className="text-white font-bold text-lg">Mercedes-Benz</div>
            <div className="text-white font-bold text-lg">Coca-Cola</div>
            <div className="text-white font-bold text-lg">Microsoft</div>
            <div className="text-white font-bold text-lg">NIKE</div>
            <div className="text-white font-bold text-lg">P&G</div>
          </div>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60 mt-8">
            <div className="text-white font-bold text-lg">LANCOME</div>
            <div className="text-white font-bold text-lg">zoom</div>
            <div className="text-white font-bold text-lg">SONY</div>
            <div className="text-white font-bold text-lg">Mercedes-Benz</div>
            <div className="text-white font-bold text-lg">Coca-Cola</div>
            <div className="text-white font-bold text-lg">Microsoft</div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-black/40 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">FAQs</h2>
          
          <div className="space-y-4">
            {faqItems.map((question, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:bg-gray-700/30 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300">
                      This is where the answer to "{question}" would appear. 
                      The FAQ content can be customized based on your specific requirements.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
