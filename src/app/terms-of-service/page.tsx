import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Users, Shield, CreditCard, AlertTriangle, Scale, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Pollo AI',
  description: 'Read our comprehensive terms of service governing the use of Pollo AI platform and services.',
};

export default function TermsOfServicePage() {
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Table of Contents */}
          <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                { href: '#acceptance', title: '1. Acceptance of Terms' },
                { href: '#description', title: '2. Service Description' },
                { href: '#user-accounts', title: '3. User Accounts' },
                { href: '#acceptable-use', title: '4. Acceptable Use Policy' },
                { href: '#content-rights', title: '5. Content and Intellectual Property' },
                { href: '#payment-terms', title: '6. Payment Terms' },
                { href: '#privacy', title: '7. Privacy and Data Protection' },
                { href: '#disclaimers', title: '8. Disclaimers and Limitations' },
                { href: '#termination', title: '9. Termination' },
                { href: '#governing-law', title: '10. Governing Law' },
                { href: '#changes', title: '11. Changes to Terms' },
                { href: '#contact', title: '12. Contact Information' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="px-8 py-8 space-y-12">
            
            {/* Acceptance */}
            <section id="acceptance">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Welcome to Pollo AI. These Terms of Service ("Terms") govern your use of our AI-powered video and 
                  image generation platform and services (the "Service"). By accessing or using our Service, you 
                  agree to be bound by these Terms.
                </p>
                <p>
                  If you disagree with any part of these terms, then you may not access the Service. 
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section id="description">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Description</h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What We Provide</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• AI-powered video generation from text prompts and images</li>
                  <li>• AI-powered image generation and editing tools</li>
                  <li>• Cloud-based content creation and storage</li>
                  <li>• Integration with multiple AI models and providers</li>
                  <li>• User account management and subscription services</li>
                  <li>• API access for developers (where applicable)</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section id="user-accounts">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Accounts</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Account Registration</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• You must be at least 13 years old to create an account</li>
                    <li>• Provide accurate and complete registration information</li>
                    <li>• Maintain the security of your account credentials</li>
                    <li>• Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Account Responsibilities</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• You are responsible for all activities under your account</li>
                    <li>• Keep your contact information up to date</li>
                    <li>• Use strong passwords and enable two-factor authentication when available</li>
                    <li>• Do not share your account with others</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Acceptable Use */}
            <section id="acceptable-use">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptable Use Policy</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3">Prohibited Activities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-red-700 dark:text-red-400 text-sm">
                      <li>• Creating harmful, illegal, or offensive content</li>
                      <li>• Generating content that violates intellectual property rights</li>
                      <li>• Creating deepfakes or misleading content without consent</li>
                      <li>• Harassment, bullying, or hate speech</li>
                      <li>• Adult content or sexually explicit material</li>
                    </ul>
                    <ul className="space-y-2 text-red-700 dark:text-red-400 text-sm">
                      <li>• Violence, self-harm, or dangerous activities</li>
                      <li>• Spam, phishing, or fraudulent activities</li>
                      <li>• Reverse engineering or unauthorized access attempts</li>
                      <li>• Circumventing usage limits or security measures</li>
                      <li>• Reselling or redistributing our services</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">Encouraged Uses</h3>
                  <ul className="space-y-2 text-green-700 dark:text-green-400 text-sm">
                    <li>• Creative content for personal or commercial projects</li>
                    <li>• Educational and research purposes</li>
                    <li>• Marketing and advertising materials (with proper disclosures)</li>
                    <li>• Entertainment and artistic expression</li>
                    <li>• Prototyping and concept development</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Rights */}
            <section id="content-rights">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content and Intellectual Property</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Content Rights</h3>
                  <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                    <li>• You retain ownership of content you create using our Service</li>
                    <li>• You grant us a license to process and store your content to provide our services</li>
                    <li>• You are responsible for ensuring you have rights to any input content</li>
                    <li>• Generated content may not be unique and similar content may be created by others</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Our Intellectual Property</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    <li>• Our platform, AI models, and technology are protected by intellectual property rights</li>
                    <li>• You may not copy, modify, or reverse engineer our services</li>
                    <li>• Our trademarks and branding are protected and may not be used without permission</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section id="payment-terms">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Terms</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subscription Plans</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    <li>• Free tier with limited usage</li>
                    <li>• Paid plans with additional features and credits</li>
                    <li>• Monthly and annual billing options</li>
                    <li>• Automatic renewal unless cancelled</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Payment Processing</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                    <li>• Secure payment processing via PayPal</li>
                    <li>• Prices may change with 30 days notice</li>
                    <li>• Refunds subject to our refund policy</li>
                    <li>• Failed payments may result in service suspension</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section id="disclaimers">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-semibold text-sm">8</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Disclaimers and Limitations</h2>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    IMPORTANT: Please read this section carefully as it limits our liability.
                  </p>
                  <ul className="text-orange-700 dark:text-orange-400 text-sm">
                    <li>The Service is provided "as is" without warranties of any kind</li>
                    <li>We do not guarantee the accuracy, quality, or suitability of generated content</li>
                    <li>AI-generated content may contain errors or biases</li>
                    <li>We are not liable for any damages arising from use of the Service</li>
                    <li>Our liability is limited to the amount paid for the Service</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section id="governing-law">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                  <Scale className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Governing Law and Disputes</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  These Terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from these Terms 
                  or your use of the Service will be resolved through binding arbitration, except for claims that 
                  may be brought in small claims court.
                </p>
                <p>
                  You agree to resolve disputes individually and waive any right to participate in class action lawsuits 
                  or class-wide arbitration.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">12</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Questions about these Terms of Service? Contact us:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> legal@pollo.ai</p>
                  <p><strong>Address:</strong> Pollo AI Legal Department, 123 AI Street, Tech City, TC 12345</p>
                  <p><strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM (UTC)</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
