import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { FileQuestion, ExternalLink } from 'lucide-react';

const FAQ: React.FC = () => {
  const generalFaqs = [
    {
      question: "Do I really need a privacy policy?",
      answer: "Yes, if you collect any personal information from your users (even just an email address), you need a privacy policy. It's required by laws like GDPR in Europe, CCPA in California, and similar regulations worldwide. Beyond legal requirements, having a clear privacy policy builds trust with your users by showing them you take their privacy seriously."
    },
    {
      question: "What should be included in a privacy policy?",
      answer: "A comprehensive privacy policy should include: what personal information you collect, how you collect it, why you collect it, how you use it, who you share it with, how users can access or delete their data, your cookie policy, and contact information for privacy inquiries. The exact requirements may vary based on applicable laws and your specific business practices."
    },
    {
      question: "How often should I update my privacy policy?",
      answer: "You should update your privacy policy whenever you make significant changes to how you collect, use, or share data. This includes adding new third-party services, changing data retention periods, or collecting new types of information. It's also good practice to review your policy at least once a year, even if you think nothing has changed."
    },
    {
      question: "Where should I display my privacy policy?",
      answer: "Your privacy policy should be easily accessible throughout your website. Common places include: in the footer of every page, during account registration, on checkout pages, in app settings, and anywhere you collect personal information. Many regulations require that users don't have to look for your privacy policy—it should be prominent and easy to find."
    }
  ];

  const complianceFaqs = [
    {
      question: "What is GDPR and does it apply to me?",
      answer: "The General Data Protection Regulation (GDPR) is a European Union regulation on data protection and privacy. It applies to you if: you offer goods or services to EU residents (even if free), you monitor the behavior of EU residents, or you have users or customers in the EU—regardless of where your business is located. GDPR has strict requirements about consent, data processing, and users' rights to access and delete their data."
    },
    {
      question: "What is CCPA and does it apply to me?",
      answer: "The California Consumer Privacy Act (CCPA) applies to for-profit businesses that do business in California and meet at least one of these criteria: annual gross revenue over $25 million, buy/sell/receive personal information of 50,000+ California consumers, households, or devices per year, or derive 50% or more of annual revenue from selling California consumers' personal information. It gives California residents rights regarding their personal information."
    },
    {
      question: "Do I need separate policies for different countries?",
      answer: "While you can have a single privacy policy that addresses all applicable laws, it must comply with the strictest regulations that apply to your users. Many businesses create a comprehensive policy that meets GDPR standards (generally the strictest) and then include specific sections for other regulations like CCPA. Our generator helps you create a policy that addresses multiple regulations."
    },
    {
      question: "What are the penalties for not having a privacy policy?",
      answer: "Penalties vary by jurisdiction but can be severe. Under GDPR, violations can result in fines up to €20 million or 4% of global annual revenue, whichever is higher. CCPA violations can cost up to $7,500 per intentional violation. Beyond financial penalties, you may face legal action from users, damage to your reputation, or even be blocked from certain markets."
    }
  ];

  const technicalFaqs = [
    {
      question: "Do I need to disclose all third-party services my website uses?",
      answer: "Yes, you should disclose all third-party services that might access or process user data. This includes analytics tools (like Google Analytics), advertising networks, payment processors, CRM systems, email marketing services, social media integrations, and any embedded content from other sites. Users have a right to know who might have access to their data."
    },
    {
      question: "What should I include about cookies in my privacy policy?",
      answer: "Your cookie policy section should explain: what cookies are, what types you use (essential, functional, analytical, advertising), their purpose, how long they persist, how users can manage or delete cookies, and any third-party cookies used on your site. In the EU, you'll also need a separate cookie consent banner due to the ePrivacy Directive (commonly called the 'Cookie Law')."
    },
    {
      question: "How do I handle user rights requests (data access, deletion, etc.)?",
      answer: "Your privacy policy should clearly explain how users can exercise their rights, including: who to contact with requests, what information they need to provide to verify their identity, how long you'll take to respond, and any limits on these rights. You should also have internal processes ready to handle these requests efficiently and in compliance with relevant time limits (30 days under GDPR)."
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-gray-600">Find answers to common questions about privacy policies and compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileQuestion className="h-5 w-5 mr-2 text-primary-600" />
                General Questions
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {generalFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`gen-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileQuestion className="h-5 w-5 mr-2 text-primary-600" />
                Compliance Questions
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {complianceFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`comp-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileQuestion className="h-5 w-5 mr-2 text-primary-600" />
                Technical Questions
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {technicalFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`tech-item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6 sticky top-6">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Still Have Questions?</h3>
                <p className="text-gray-600 mb-4">
                  Our comprehensive documentation covers additional topics about privacy policies and compliance.
                </p>
                <div className="space-y-2">
                  <a 
                    href="https://gdpr.eu/what-is-gdpr/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    GDPR Explained <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <a 
                    href="https://oag.ca.gov/privacy/ccpa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    CCPA Guidelines <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-600 hover:text-primary-700"
                  >
                    Cookie Compliance Guide <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Create Your Policy?</h3>
                <p className="text-gray-600 mb-4">
                  Generate a custom privacy policy tailored to your website's specific needs in minutes.
                </p>
                <Link href="/generator">
                  <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                    Create Privacy Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQ;
