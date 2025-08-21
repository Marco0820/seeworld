import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, BarChart3, Target, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy - Pollo AI',
  description: 'Learn about how Pollo AI uses cookies and similar technologies to enhance your experience on our platform.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          <div className="px-8 py-8 space-y-12">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Are Cookies?</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our platform, and enabling certain functionality.
                </p>
              </div>
            </section>

            {/* Cookie Categories */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Strictly Necessary Cookies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These cookies are essential for our website to function properly and cannot be disabled.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Authentication and login status</li>
                      <li>• Security and fraud prevention</li>
                      <li>• Shopping cart and session management</li>
                      <li>• Load balancing and performance</li>
                    </ul>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These cookies help us understand how visitors interact with our platform by collecting information anonymously.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What we track:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Page views and user journeys</li>
                      <li>• Feature usage and preferences</li>
                      <li>• Error reports and performance metrics</li>
                      <li>• Device and browser information</li>
                    </ul>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Marketing Cookies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These cookies track your online activity to help deliver more relevant advertising.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Used for:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Personalized advertisements</li>
                      <li>• Retargeting campaigns</li>
                      <li>• Social media integration</li>
                      <li>• Marketing effectiveness measurement</li>
                    </ul>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Functional Cookies</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These cookies enable enhanced functionality and personalization features.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features enabled:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Language and region preferences</li>
                      <li>• Chat widgets and support tools</li>
                      <li>• Video players and embedded content</li>
                      <li>• Social sharing functionality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Third-Party Services</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Providers</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Google Analytics</li>
                      <li>• Mixpanel</li>
                      <li>• Hotjar</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Advertising Partners</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Google Ads</li>
                      <li>• Facebook Pixel</li>
                      <li>• LinkedIn Insight Tag</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookie Consent Manager</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You can manage your cookie preferences at any time using our cookie consent banner or by visiting this page.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browser Settings</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You can also control cookies through your browser settings:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• <strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                        <li>• <strong>Firefox:</strong> Preferences → Privacy & Security</li>
                        <li>• <strong>Safari:</strong> Preferences → Privacy</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li>• <strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
                        <li>• <strong>Opera:</strong> Settings → Privacy & Security</li>
                        <li>• <strong>Mobile:</strong> Check your browser's help section</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cookie Retention</h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Session Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Deleted when you close your browser. Used for temporary functionality like login sessions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Persistent Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Remain on your device for a set period (typically 30 days to 2 years) or until you delete them.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Questions About Cookies?</h2>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> privacy@pollo.ai</p>
                  <p><strong>Subject:</strong> Cookie Policy Inquiry</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
