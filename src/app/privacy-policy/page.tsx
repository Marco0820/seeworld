import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database, Globe, Mail, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Pollo AI',
  description: 'Learn how Pollo AI collects, uses, and protects your personal information. Our comprehensive privacy policy ensures transparency and data protection.',
};

export default function PrivacyPolicyPage() {
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
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
                { href: '#introduction', title: '1. Introduction' },
                { href: '#information-collection', title: '2. Information We Collect' },
                { href: '#information-use', title: '3. How We Use Information' },
                { href: '#information-sharing', title: '4. Information Sharing' },
                { href: '#data-security', title: '5. Data Security' },
                { href: '#user-rights', title: '6. Your Rights' },
                { href: '#cookies', title: '7. Cookies and Tracking' },
                { href: '#international-transfers', title: '8. International Transfers' },
                { href: '#children-privacy', title: '9. Children\'s Privacy' },
                { href: '#policy-updates', title: '10. Policy Updates' },
                { href: '#contact', title: '11. Contact Information' },
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
            
            {/* Introduction */}
            <section id="introduction">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Welcome to Pollo AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
                  the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you use our AI-powered video and image generation platform.
                </p>
                <p>
                  By using our services, you consent to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </div>
            </section>

            {/* Information Collection */}
            <section id="information-collection">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Database className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• <strong>Account Information:</strong> Name, email address, username, and password</li>
                    <li>• <strong>Profile Information:</strong> Profile picture, preferences, and settings</li>
                    <li>• <strong>Payment Information:</strong> Billing address and payment method details (processed securely by our payment providers)</li>
                    <li>• <strong>Communication Data:</strong> Messages, feedback, and support requests</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Usage Information</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• <strong>Platform Activity:</strong> Videos and images you create, prompts you use, and features you access</li>
                    <li>• <strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
                    <li>• <strong>Analytics Data:</strong> Usage patterns, feature preferences, and performance metrics</li>
                    <li>• <strong>Log Data:</strong> Server logs, error reports, and system diagnostics</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Use */}
            <section id="information-use">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Service Provision",
                    items: [
                      "Process your AI generation requests",
                      "Manage your account and subscriptions",
                      "Provide customer support",
                      "Deliver platform features and functionality"
                    ]
                  },
                  {
                    title: "Platform Improvement",
                    items: [
                      "Analyze usage patterns and preferences",
                      "Improve AI model performance",
                      "Develop new features and services",
                      "Optimize user experience"
                    ]
                  },
                  {
                    title: "Communication",
                    items: [
                      "Send service-related notifications",
                      "Share product updates and news",
                      "Respond to inquiries and support requests",
                      "Deliver marketing communications (with consent)"
                    ]
                  },
                  {
                    title: "Legal and Security",
                    items: [
                      "Comply with legal obligations",
                      "Protect against fraud and abuse",
                      "Enforce our terms of service",
                      "Maintain platform security"
                    ]
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{category.title}</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      {category.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Information Sharing */}
            <section id="information-sharing">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information Sharing</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information 
                  in the following limited circumstances:
                </p>
                <ul>
                  <li><strong>Service Providers:</strong> Trusted third-party vendors who help us operate our platform (cloud hosting, payment processing, analytics)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of our users or others</li>
                  <li><strong>With Consent:</strong> When you explicitly consent to sharing your information</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section id="data-security">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Security Measures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• <strong>Encryption:</strong> Data encrypted in transit and at rest</li>
                    <li>• <strong>Access Controls:</strong> Strict employee access limitations</li>
                    <li>• <strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                  </ul>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• <strong>Secure Infrastructure:</strong> Industry-standard cloud security</li>
                    <li>• <strong>Monitoring:</strong> 24/7 security monitoring and alerts</li>
                    <li>• <strong>Incident Response:</strong> Rapid response to security incidents</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section id="user-rights">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">6</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Access", description: "Request copies of your personal data" },
                  { title: "Rectification", description: "Correct inaccurate or incomplete information" },
                  { title: "Erasure", description: "Request deletion of your personal data" },
                  { title: "Portability", description: "Receive your data in a structured format" },
                  { title: "Restriction", description: "Limit how we process your information" },
                  { title: "Objection", description: "Object to certain types of processing" }
                ].map((right, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{right.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{right.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-300">
                  <strong>Exercise Your Rights:</strong> Contact us at{' '}
                  <a href="mailto:privacy@pollo.ai" className="underline">privacy@pollo.ai</a>{' '}
                  to exercise any of these rights. We will respond within 30 days.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">7</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies and Tracking Technologies</h2>
              </div>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We use cookies and similar technologies to enhance your experience on our platform. 
                  You can manage your cookie preferences through our cookie banner or browser settings.
                </p>
                <p>
                  For detailed information about our use of cookies, please refer to our{' '}
                  <Link href="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Cookie Policy
                  </Link>.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section id="contact">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> privacy@pollo.ai</p>
                  <p><strong>Address:</strong> Pollo AI Privacy Team, 123 AI Street, Tech City, TC 12345</p>
                  <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
