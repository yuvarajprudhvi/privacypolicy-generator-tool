import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      description: 'Essential privacy policy for small websites',
      price: 'Free',
      features: [
        'Standard privacy policy template',
        'GDPR & CCPA compliant',
        'Basic customization options',
        'HTML download',
        'Email support'
      ],
      cta: 'Get Started',
      mostPopular: false
    },
    {
      name: 'Professional',
      description: 'Complete solution for growing businesses',
      price: '$19',
      period: '/month',
      features: [
        'All Basic features',
        'Advanced customization',
        'Multiple website support',
        'Policy update notifications',
        'Cookie consent banner',
        'Terms of Service generator',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      mostPopular: true
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      price: 'Contact Us',
      features: [
        'All Professional features',
        'Legal review option',
        'Multi-language support',
        'Custom clauses and addendums',
        'API access',
        'Compliance monitoring',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      mostPopular: false
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that's right for your business. All plans include compliance with major privacy regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col ${plan.mostPopular ? 'border-primary-200 ring-2 ring-primary-600 shadow-lg' : ''}`}
          >
            <CardHeader className="pb-0">
              {plan.mostPopular && (
                <Badge className="self-start mb-2 bg-primary-100 text-primary-800 hover:bg-primary-200 border-none">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-gray-500">{plan.description}</p>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex items-baseline text-gray-900">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && <span className="ml-1 text-xl font-semibold">{plan.period}</span>}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-2 mt-auto">
              <Link href="/generator" className="w-full">
                <Button 
                  className={`w-full ${plan.mostPopular ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'}`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Can I switch plans later?</h3>
              <p className="mt-2 text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected on your next billing cycle.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Do you offer refunds?</h3>
              <p className="mt-2 text-gray-600">We offer a 14-day money-back guarantee on all paid plans if you're not satisfied with our service.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-600">We accept all major credit cards, PayPal, and for Enterprise customers, we can arrange alternative payment methods.</p>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Will I be charged after the free trial?</h3>
              <p className="mt-2 text-gray-600">No, we don't require credit card information for free trials. You'll only be charged if you choose to upgrade to a paid plan.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
