import { InsertPolicySettings } from "@shared/schema";
import { format } from "date-fns";

// Helper function to format data collection types
const formatDataType = (type: string): string => {
  return type.replace('_', ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Helper function to format data retention period
const formatRetentionPeriod = (period: string): string => {
  switch (period) {
    case "30_days":
      return "30 days";
    case "90_days":
      return "90 days";
    case "180_days":
      return "6 months";
    case "1_year":
      return "1 year";
    case "2_years":
      return "2 years";
    case "5_years":
      return "5 years";
    case "indefinite":
      return "indefinitely or until you request deletion";
    default:
      return period.replace(/_/g, ' ');
  }
};

// Generate the introduction section of the policy
const generateIntroduction = (data: InsertPolicySettings): string => {
  return `# Privacy Policy for ${data.websiteName}

## 1. Introduction

At ${data.companyName}, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website${data.websiteUrl ? ` at ${data.websiteUrl}` : ""}.

This privacy policy applies to all information collected through our website${data.websiteUrl ? ` (${data.websiteUrl})` : ""}, and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Services").

Please read this privacy policy carefully as it will help you make informed decisions about sharing your personal information with us.
`;
};

// Generate the data collection section
const generateDataCollection = (data: InsertPolicySettings): string => {
  let dataCollectionSection = `
## 2. Data We Collect

We collect personal information that you voluntarily provide to us when you ${
    data.websiteType === 'e-commerce' ? 'make a purchase, ' : 
    data.websiteType === 'saas' ? 'use our services, ' : 
    data.websiteType === 'blog' ? 'comment on our content, ' :
    data.websiteType === 'social_media' ? 'create an account, ' :
    ''
  }register on our website, subscribe to our newsletter, or otherwise contact us.

### Personal information you disclose to us
The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect can include the following:
`;

  if (data.dataCollected && data.dataCollected.length > 0) {
    dataCollectionSection += '\n';
    data.dataCollected.forEach(type => {
      dataCollectionSection += `- **${formatDataType(type)}**: `;
      
      switch (type) {
        case 'name':
          dataCollectionSection += 'Your first and last name\n';
          break;
        case 'email':
          dataCollectionSection += 'Your email address\n';
          break;
        case 'phone':
          dataCollectionSection += 'Your phone number\n';
          break;
        case 'address':
          dataCollectionSection += 'Your mailing or billing address\n';
          break;
        case 'payment_info':
          dataCollectionSection += 'Your payment information (including credit card numbers, billing address, and other payment details)\n';
          break;
        case 'ip_address':
          dataCollectionSection += 'Your IP address\n';
          break;
        case 'cookies':
          dataCollectionSection += 'Information stored in cookies on your device\n';
          break;
        case 'location':
          dataCollectionSection += 'Your geographic location\n';
          break;
        case 'device_info':
          dataCollectionSection += 'Information about your device, browser type, and operating system\n';
          break;
        case 'browsing_behavior':
          dataCollectionSection += 'Information about how you browse our website, including pages visited and time spent\n';
          break;
        case 'purchase_history':
          dataCollectionSection += 'Information about your past purchases\n';
          break;
        case 'social_media_profiles':
          dataCollectionSection += 'Information from your social media profiles when you connect them to our services\n';
          break;
        case 'other':
          dataCollectionSection += 'Additional information you choose to share with us\n';
          break;
        default:
          dataCollectionSection += 'Information you provide to us\n';
      }
    });
  }

  dataCollectionSection += `
### Information automatically collected

When you visit our website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages that you view, what websites or search terms referred you to our site, and information about how you interact with the site.
`;

  return dataCollectionSection;
};

// Generate the cookies section
const generateCookiesSection = (data: InsertPolicySettings): string => {
  if (!data.useCookies || !data.cookieTypes || data.cookieTypes.length === 0) {
    return '';
  }

  let cookiesSection = `
## 3. Cookies and Tracking Technologies

We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.

### Types of cookies we use:
`;

  data.cookieTypes.forEach(type => {
    cookiesSection += `- **${formatDataType(type)} cookies**: `;
    
    switch (type) {
      case 'essential':
        cookiesSection += 'These cookies are necessary for the website to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as logging in or filling in forms.\n';
        break;
      case 'functionality':
        cookiesSection += 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.\n';
        break;
      case 'analytics':
        cookiesSection += 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.\n';
        break;
      case 'advertising':
        cookiesSection += 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.\n';
        break;
      case 'third_party':
        cookiesSection += 'These cookies are set by third-party services that appear on our pages. They may be used for a variety of purposes including advertising, analytics, and social media integration.\n';
        break;
      case 'other':
        cookiesSection += 'Additional cookie types used for specific functionality on our website.\n';
        break;
      default:
        cookiesSection += 'Cookies used on our website for various purposes.\n';
    }
  });

  cookiesSection += `
### How to manage cookies

Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
`;

  return cookiesSection;
};

// Generate third-party services section
const generateThirdPartySection = (data: InsertPolicySettings): string => {
  // Check if there are any third-party services selected
  const hasThirdPartyServices = data.thirdPartyServices && 
    Object.values(data.thirdPartyServices).some(services => services && services.length > 0);
  
  if (!hasThirdPartyServices && !data.otherThirdPartyServices) {
    return '';
  }

  let sectionNumber = data.useCookies ? '4' : '3';
  let thirdPartySection = `
## ${sectionNumber}. Third-Party Services

We use third-party services on our website that may collect information about you. These services include:
`;

  if (data.thirdPartyServices) {
    Object.entries(data.thirdPartyServices).forEach(([category, services]) => {
      if (services && services.length > 0) {
        thirdPartySection += `
### ${formatDataType(category)} Services
`;
        if (category === 'analytics') {
          thirdPartySection += `We use analytics services to understand how visitors interact with our website. These services may collect information such as how often users visit the site, what pages they visit, and what other sites they used prior to coming to our site. `;
        } else if (category === 'advertising') {
          thirdPartySection += `We work with advertising partners to deliver relevant advertisements to you. These services may collect information about your visits to our website and other websites to provide you with advertising based on your browsing activities and interests. `;
        } else if (category === 'payment') {
          thirdPartySection += `We use payment processors to handle transactions securely on our website. These services collect payment information such as credit card details to process purchases. `;
        } else if (category === 'social') {
          thirdPartySection += `We integrate social media features that allow you to share content or log in using your social media credentials. These services may track your activities on our website. `;
        } else if (category === 'hosting') {
          thirdPartySection += `Our website is hosted on servers provided by third-party services that maintain the infrastructure needed to keep our site available. `;
        } else if (category === 'email_marketing') {
          thirdPartySection += `We use email marketing services to send newsletters and other communications to users who have signed up for them. `;
        }

        thirdPartySection += `The services we use include: ${services.join(', ')}\n`;
      }
    });
  }

  if (data.otherThirdPartyServices) {
    thirdPartySection += `
### Other Services
${data.otherThirdPartyServices}
`;
  }

  thirdPartySection += `
These third-party service providers have their own privacy policies addressing how they use your information. We encourage you to read their privacy policies to understand how they collect, use, and share your personal information.
`;

  return thirdPartySection;
};

// Generate user rights section
const generateUserRightsSection = (data: InsertPolicySettings): string => {
  let sectionNumber = 3;
  if (data.useCookies) sectionNumber++;
  if ((data.thirdPartyServices && Object.values(data.thirdPartyServices).some(s => s && s.length > 0)) || data.otherThirdPartyServices) sectionNumber++;

  let userRightsSection = `
## ${sectionNumber}. Your Rights
`;

  if (data.gdprCompliance) {
    userRightsSection += `
### GDPR Data Protection Rights

If you are located in the European Union, you have the following rights under the GDPR:

• Right to access - You have the right to request copies of your personal data.
• Right to rectification - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
• Right to erasure - You have the right to request that we erase your personal data, under certain conditions.
• Right to restrict processing - You have the right to request that we restrict the processing of your personal data, under certain conditions.
• Right to object to processing - You have the right to object to our processing of your personal data, under certain conditions.
• Right to data portability - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

To exercise any of these rights, please contact us.
`;
  }

  if (data.ccpaCompliance) {
    userRightsSection += `
### CCPA Privacy Rights (California Residents)

If you are a California resident, you have the following rights under the CCPA:

• Right to know - You have the right to request that we disclose information to you about our collection and use of your personal information over the past 12 months.
• Right to delete - You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions.
• Right to opt-out of sales - If we sell your personal information, you have the right to opt out of the sale of your information.
• Right to non-discrimination - We will not discriminate against you for exercising any of your CCPA rights.

To exercise any of these rights, please contact us.
`;
  }

  return userRightsSection;
};

// Generate data retention section
const generateDataRetentionSection = (data: InsertPolicySettings): string => {
  let sectionNumber = 4;
  if (data.useCookies) sectionNumber++;
  if ((data.thirdPartyServices && Object.values(data.thirdPartyServices).some(s => s && s.length > 0)) || data.otherThirdPartyServices) sectionNumber++;
  if (data.gdprCompliance || data.ccpaCompliance) sectionNumber++;

  return `
## ${sectionNumber}. Data Retention

We will retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. We determine the appropriate retention period based on the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure, and applicable legal requirements.

For users in the European Economic Area, we will keep your information for a period of ${formatRetentionPeriod(data.dataRetentionPeriod)} after your last interaction with us, unless a longer retention period is required by law.
`;
};

// Generate children's policy section
const generateChildrenSection = (data: InsertPolicySettings): string => {
  if (!data.childrenPolicy) {
    return '';
  }

  let sectionNumber = 5;
  if (data.useCookies) sectionNumber++;
  if ((data.thirdPartyServices && Object.values(data.thirdPartyServices).some(s => s && s.length > 0)) || data.otherThirdPartyServices) sectionNumber++;
  if (data.gdprCompliance || data.ccpaCompliance) sectionNumber++;

  return `
## ${sectionNumber}. Children's Privacy

Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we discover that a child under 13 has provided us with personal information, we will immediately delete this information from our servers.

In compliance with the Children's Online Privacy Protection Act (COPPA), we take additional steps to protect the privacy of children under 13. If we learn that we have collected the personal information of a child under 13 without verifiable parental consent, we will take steps to delete that information as quickly as possible.
`;
};

// Generate contact information section
const generateContactSection = (data: InsertPolicySettings): string => {
  let sectionNumber = 6;
  if (data.useCookies) sectionNumber++;
  if ((data.thirdPartyServices && Object.values(data.thirdPartyServices).some(s => s && s.length > 0)) || data.otherThirdPartyServices) sectionNumber++;
  if (data.gdprCompliance || data.ccpaCompliance) sectionNumber++;
  if (data.childrenPolicy) sectionNumber++;

  return `
## ${sectionNumber}. Contact Us

If you have any questions about this Privacy Policy, please contact us:

- By email: ${data.companyEmail}
- By visiting this page on our website: ${data.websiteUrl ? data.websiteUrl + '/contact' : '[Your Contact Page URL]'}
- By mail: ${data.companyName}, ${data.companyCountry}
`;
};

// Generate effective date section
const generateEffectiveDate = (data: InsertPolicySettings): string => {
  const effectiveDate = data.effectiveDate 
    ? format(new Date(data.effectiveDate), 'MMMM d, yyyy')
    : format(new Date(), 'MMMM d, yyyy');

  return `
## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

**Effective Date: ${effectiveDate}**
`;
};

// Main function to generate the complete policy text
export const generatePolicyText = (data: InsertPolicySettings): string => {
  let policyText = generateIntroduction(data);
  policyText += generateDataCollection(data);
  
  if (data.useCookies && data.cookieTypes && data.cookieTypes.length > 0) {
    policyText += generateCookiesSection(data);
  }
  
  if ((data.thirdPartyServices && Object.values(data.thirdPartyServices).some(s => s && s.length > 0)) || data.otherThirdPartyServices) {
    policyText += generateThirdPartySection(data);
  }
  
  if (data.gdprCompliance || data.ccpaCompliance) {
    policyText += generateUserRightsSection(data);
  }
  
  policyText += generateDataRetentionSection(data);
  
  if (data.childrenPolicy) {
    policyText += generateChildrenSection(data);
  }
  
  policyText += generateContactSection(data);
  policyText += generateEffectiveDate(data);
  
  return policyText;
};

// Function to generate HTML version of the policy
export const generatePolicyHTML = (data: InsertPolicySettings): string => {
  const policyText = generatePolicyText(data);
  
  // Convert Markdown to simple HTML
  const html = policyText
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n- (.*)/g, '<li>$1</li>')
    .replace(/<\/li>\n/g, '</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\n<ul>/g, '')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy for ${data.websiteName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 28px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      margin-top: 30px;
    }
    h2 {
      font-size: 22px;
      margin-top: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
    }
    h3 {
      font-size: 18px;
      margin-top: 20px;
    }
    p {
      margin: 15px 0;
    }
    ul {
      margin: 15px 0;
      padding-left: 30px;
    }
    li {
      margin: 5px 0;
    }
    strong {
      font-weight: 600;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <p>${html}</p>
  
  <div class="footer">
    <p>This privacy policy was generated using PolicyGen.</p>
  </div>
</body>
</html>
`;
};
