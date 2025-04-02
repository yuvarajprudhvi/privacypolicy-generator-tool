import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, FileText, Lock, Globe } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 py-16 sm:py-24 md:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight sm:text-6xl">
                Create a Privacy Policy for Your Website
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-prose mx-auto">
                Generate a customized privacy policy compliant with GDPR and CCPA in just a few minutes. No legal expertise required.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link href="/generator">
                    <Button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-10">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/templates">
                    <Button variant="outline" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-opacity-60 hover:bg-opacity-70 sm:px-10">
                      View Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-30">
          <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
                <rect width="100%" height="100%" fill="none" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Why You Need a Privacy Policy
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-5">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Legal Compliance</h3>
            <p className="mt-2 text-base text-gray-500">
              Meet GDPR, CCPA, and other privacy regulations to avoid hefty fines and penalties.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-5">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Build Trust</h3>
            <p className="mt-2 text-base text-gray-500">
              Show users you respect their privacy and take data protection seriously.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-5">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Transparency</h3>
            <p className="mt-2 text-base text-gray-500">
              Clearly communicate how you collect, use, and protect user information.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-5">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Global Reach</h3>
            <p className="mt-2 text-base text-gray-500">
              Operate internationally with a policy that addresses various regional requirements.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Create your custom privacy policy in three simple steps
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-8 md:grid-cols-3 lg:max-w-none">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  1
                </div>
                <h3 className="text-lg font-medium text-gray-900">Answer Questions</h3>
                <p className="mt-3 text-base text-gray-500">
                  Tell us about your website, what data you collect, and which services you use.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  2
                </div>
                <h3 className="text-lg font-medium text-gray-900">Generate Policy</h3>
                <p className="mt-3 text-base text-gray-500">
                  Our system creates a comprehensive policy tailored to your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  3
                </div>
                <h3 className="text-lg font-medium text-gray-900">Implement</h3>
                <p className="mt-3 text-base text-gray-500">
                  Download your policy and add it to your website. Update anytime as needed.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Link href="/generator">
              <Button className="px-8 py-3">
                Create Your Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Find answers to common questions about privacy policies
            </p>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Do I really need a privacy policy?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Yes, if you collect any personal information from your users (even just an email address), you need a privacy policy. It's not only a legal requirement in many jurisdictions but also builds trust with your users.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Is this tool GDPR and CCPA compliant?</h3>
                <p className="mt-2 text-base text-gray-500">
                  Yes, our generator creates policies that address requirements for both GDPR (European) and CCPA (California) privacy regulations. You can specify which regulations apply to your business.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">How often should I update my privacy policy?</h3>
                <p className="mt-2 text-base text-gray-500">
                  You should update your privacy policy whenever you make changes to how you collect, use, or share data. It's also good practice to review it annually even if nothing has changed.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/faq">
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-sm border border-gray-100 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Ready to Create Your Policy?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-10">
            Generate a custom privacy policy tailored to your website's specific needs in minutes.
          </p>
          <div className="text-center">
            <Link href="/generator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg">
                Create Custom Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Secondary CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to protect your users' data?</span>
            <span className="block text-blue-200">Generate your privacy policy today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/generator">
                <Button className="bg-white text-blue-700 hover:bg-blue-50 border-white px-8 py-3">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
