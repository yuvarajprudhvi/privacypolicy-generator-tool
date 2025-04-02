import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { PolicyFormData } from '@/types';
import PolicyPreview from '@/components/policy-generator/PolicyPreview';
import { ExternalLink } from 'lucide-react';
import { 
  DataCollectionType, 
  CookieType, 
  ThirdPartyCategory 
} from '@shared/schema';

// Template data for different policy types
const templateData: Record<string, PolicyFormData> = {
  ecommerce: {
    websiteName: 'MyStore',
    websiteUrl: 'https://www.mystore.com',
    companyName: 'MyStore Inc.',
    companyEmail: 'privacy@mystore.com',
    companyCountry: 'United States',
    websiteType: 'e-commerce',
    dataCollected: ['name', 'email', 'phone', 'address', 'payment_info', 'purchase_history'],
    useCookies: true,
    cookieTypes: ['essential', 'functionality', 'analytics', 'advertising'],
    thirdPartyServices: {
      'analytics': ['Google Analytics', 'Hotjar'],
      'payment': ['Stripe', 'PayPal'],
      'advertising': ['Facebook Pixel', 'Google Ads'],
      'hosting': ['AWS'],
      'social': [],
      'email_marketing': [],
      'other': []
    },
    otherThirdPartyServices: '',
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: '5_years',
    childrenPolicy: true,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  },
  blog: {
    websiteName: 'MyBlog',
    websiteUrl: 'https://www.myblog.com',
    companyName: 'MyBlog Media',
    companyEmail: 'privacy@myblog.com',
    companyCountry: 'United States',
    websiteType: 'blog',
    dataCollected: ['name', 'email', 'ip_address', 'cookies', 'browsing_behavior'],
    useCookies: true,
    cookieTypes: ['essential', 'functionality', 'analytics'],
    thirdPartyServices: {
      'analytics': ['Google Analytics'],
      'payment': [],
      'advertising': [],
      'email_marketing': ['Mailchimp', 'ConvertKit'],
      'hosting': ['Netlify'],
      'social': [],
      'other': []
    },
    otherThirdPartyServices: 'Disqus for comments',
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: '2_years',
    childrenPolicy: false,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  },
  saas: {
    websiteName: 'MySaaS',
    websiteUrl: 'https://www.mysaas.com',
    companyName: 'MySaaS Solutions',
    companyEmail: 'privacy@mysaas.com',
    companyCountry: 'United States',
    websiteType: 'saas',
    dataCollected: ['name', 'email', 'phone', 'payment_info', 'device_info', 'ip_address'],
    useCookies: true,
    cookieTypes: ['essential', 'functionality', 'analytics', 'advertising'],
    thirdPartyServices: {
      'analytics': ['Google Analytics', 'Mixpanel'],
      'payment': ['Stripe', 'PayPal'],
      'advertising': ['Intercom', 'HubSpot'],
      'hosting': ['AWS', 'Google Cloud'],
      'social': [],
      'email_marketing': [],
      'other': []
    },
    otherThirdPartyServices: 'Zendesk for customer support',
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: '1_year',
    childrenPolicy: true,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  },
  portfolio: {
    websiteName: 'MyPortfolio',
    websiteUrl: 'https://www.myportfolio.com',
    companyName: 'Jane Smith Design',
    companyEmail: 'privacy@myportfolio.com',
    companyCountry: 'United States',
    websiteType: 'portfolio',
    dataCollected: ['name', 'email', 'ip_address'],
    useCookies: true,
    cookieTypes: ['essential', 'analytics'],
    thirdPartyServices: {
      'analytics': ['Google Analytics'],
      'payment': [],
      'advertising': [],
      'hosting': ['Netlify'],
      'social': [],
      'email_marketing': [],
      'other': []
    },
    otherThirdPartyServices: '',
    gdprCompliance: true,
    ccpaCompliance: false,
    dataRetentionPeriod: '1_year',
    childrenPolicy: false,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  },
  mobile: {
    websiteName: 'MyApp',
    websiteUrl: 'https://www.myapp.com',
    companyName: 'MyApp Mobile LLC',
    companyEmail: 'privacy@myapp.com',
    companyCountry: 'United States',
    websiteType: 'other',
    dataCollected: ['name', 'email', 'location', 'device_info', 'ip_address'],
    useCookies: true,
    cookieTypes: ['essential', 'functionality', 'analytics', 'advertising'],
    thirdPartyServices: {
      'analytics': ['Google Analytics'],
      'payment': ['Apple Pay', 'Google Pay'],
      'advertising': ['Facebook Pixel'],
      'hosting': ['AWS', 'Google Cloud'],
      'social': ['Facebook Login'],
      'email_marketing': [],
      'other': []
    },
    otherThirdPartyServices: 'Push notification services',
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: '2_years',
    childrenPolicy: true,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  },
  nonprofit: {
    websiteName: 'MyNonprofit',
    websiteUrl: 'https://www.mynonprofit.org',
    companyName: 'MyNonprofit Organization',
    companyEmail: 'privacy@mynonprofit.org',
    companyCountry: 'United States',
    websiteType: 'other',
    dataCollected: ['name', 'email', 'phone', 'address', 'payment_info'],
    useCookies: true,
    cookieTypes: ['essential', 'functionality', 'analytics'],
    thirdPartyServices: {
      'analytics': ['Google Analytics'],
      'payment': ['Stripe', 'PayPal'],
      'email_marketing': ['Mailchimp', 'Constant Contact'],
      'hosting': ['AWS'],
      'social': [],
      'advertising': [],
      'other': []
    },
    otherThirdPartyServices: 'Volunteer management system',
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetentionPeriod: '5_years',
    childrenPolicy: false,
    effectiveDate: new Date().toISOString(),
    currentStep: 'finalize'
  }
};

interface PolicyTemplatePreviewProps {
  templateId: string;
  children: React.ReactNode;
}

export const PolicyTemplatePreview: React.FC<PolicyTemplatePreviewProps> = ({ 
  templateId, 
  children 
}) => {
  const templateFormData = templateData[templateId];
  
  if (!templateFormData) {
    return <>{children}</>;
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Policy Template Preview</DialogTitle>
          <DialogDescription>
            This is a sample privacy policy for a {templateFormData.websiteType} website.
          </DialogDescription>
        </DialogHeader>
        <PolicyPreview data={templateFormData} fullView={true} />
      </DialogContent>
    </Dialog>
  );
};

export default PolicyTemplatePreview;