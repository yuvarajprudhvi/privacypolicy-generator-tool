import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, ArrowRight } from 'lucide-react';

const Templates: React.FC = () => {
  const policyTemplates = [
    {
      id: 'ecommerce',
      title: 'E-Commerce Website',
      description: 'Ideal for online stores that collect customer data, payment info, and shipping details.',
      features: ['Customer account data', 'Payment processing', 'Order history', 'Shipping information']
    },
    {
      id: 'blog',
      title: 'Blog/Content Website',
      description: 'Perfect for blogs and content sites with comments, subscriptions, and analytics.',
      features: ['Comment systems', 'Newsletter subscriptions', 'Analytics tracking', 'Ad network integration']
    },
    {
      id: 'saas',
      title: 'SaaS Application',
      description: 'Comprehensive policy for software services that store user data and credentials.',
      features: ['User accounts', 'Usage data', 'Payment subscriptions', 'API integrations']
    },
    {
      id: 'portfolio',
      title: 'Portfolio/Personal Site',
      description: 'Minimal policy for personal websites and portfolios with basic visitor tracking.',
      features: ['Contact forms', 'Basic analytics', 'Email collection', 'Cookie notice']
    },
    {
      id: 'mobile',
      title: 'Mobile App Policy',
      description: 'Specialized for mobile applications with device permissions and app store compliance.',
      features: ['Device permissions', 'Usage tracking', 'In-app purchases', 'Cross-platform data']
    },
    {
      id: 'nonprofit',
      title: 'Non-profit Organization',
      description: 'Tailored for charitable organizations with donor information and volunteer data.',
      features: ['Donor information', 'Volunteer data', 'Event registrations', 'Newsletter signups']
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Privacy Policy Templates</h1>
        <p className="mt-2 text-gray-600">Browse our pre-built privacy policy templates for different website types.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policyTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-primary-500" />
                {template.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <ul className="text-sm space-y-1">
                {template.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="mr-2 text-primary-500">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <a 
                href="#" 
                className="text-sm text-gray-600 hover:text-primary-600 flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Preview <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <Link href="/generator">
                <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white flex items-center">
                  Use Template <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need a Custom Solution?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Use our generator to create a fully customized privacy policy tailored to your specific needs.
        </p>
        <Link href="/generator">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white">
            Create Custom Policy
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Templates;
