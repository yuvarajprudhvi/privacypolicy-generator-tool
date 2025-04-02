import React from 'react';
import { PolicyFormData } from '@/types';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PolicyPreviewProps {
  data: PolicyFormData;
  fullView?: boolean;
}

const PolicyPreview: React.FC<PolicyPreviewProps> = ({ data, fullView = false }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopyClick = () => {
    const policyElement = document.getElementById('policy-preview-content');
    if (policyElement) {
      navigator.clipboard.writeText(policyElement.innerText).then(() => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Policy preview copied to clipboard",
        });
        
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Determine what sections to show based on form progress
  const showIntroduction = data.websiteName && data.companyName;
  const showDataCollection = data.dataCollected && data.dataCollected.length > 0;
  const showCookies = data.useCookies && data.cookieTypes && data.cookieTypes.length > 0;
  const showThirdParty = Object.values(data.thirdPartyServices).some(services => services.length > 0);
  const showUserRights = data.gdprCompliance || data.ccpaCompliance;

  // Helper function to format data collection types for display
  const formatDataType = (type: string) => {
    return type.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden">
      <CardHeader className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Policy Preview
        </h3>
        <div className="flex space-x-3">
          <Button 
            type="button" 
            size="sm"
            variant="outline"
            className={cn(
              "inline-flex items-center border-gray-300 text-gray-700",
              copied && "bg-green-50 border-green-300 text-green-700"
            )}
            onClick={handleCopyClick}
          >
            <Copy className="mr-1.5 h-4 w-4" /> {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-5 sm:p-6 prose prose-sm max-w-none text-gray-700">
        <div id="policy-preview-content">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Privacy Policy for {data.websiteName || "Your Website"}
          </h2>
          
          {showIntroduction && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">1. Introduction</h3>
              <p>
                At {data.companyName}, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
                {data.websiteUrl ? ` at ${data.websiteUrl}` : ""}.
              </p>
            </>
          )}
          
          {showDataCollection && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">2. Data We Collect</h3>
              <p>
                We collect personal information that you voluntarily provide to us when you 
                {data.websiteType === 'e-commerce' ? ' make a purchase, ' : ''}
                {data.websiteType === 'saas' ? ' use our services, ' : ''}
                register on our website, or otherwise contact us. This includes:
              </p>
              <ul className="list-disc ml-6 mb-4">
                {data.dataCollected.map((type, index) => (
                  <li key={index}>{formatDataType(type)}</li>
                ))}
              </ul>
            </>
          )}

          {showCookies && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">3. Cookies and Tracking</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
              </p>
              <p>The types of cookies we use include:</p>
              <ul className="list-disc ml-6 mb-4">
                {data.cookieTypes.map((type, index) => (
                  <li key={index}>{formatDataType(type)} cookies</li>
                ))}
              </ul>
            </>
          )}

          {showThirdParty && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">4. Third-Party Services</h3>
              <p>
                We use third-party services on our website that may collect information about you. These services include:
              </p>
              {Object.entries(data.thirdPartyServices).map(([category, services]) => (
                services.length > 0 ? (
                  <div key={category} className="mb-2">
                    <strong>{formatDataType(category)}:</strong> {services.join(', ')}
                  </div>
                ) : null
              ))}
              {data.otherThirdPartyServices && (
                <div className="mb-2">
                  <strong>Other services:</strong> {data.otherThirdPartyServices}
                </div>
              )}
              <p className="mt-2">
                These third-party service providers have their own privacy policies addressing how they use your information. We encourage you to read their privacy policies.
              </p>
            </>
          )}

          {showUserRights && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">5. Your Rights</h3>
              {data.gdprCompliance && (
                <div className="mb-3">
                  <p><strong>If you are located in the European Union, you have the following rights under the GDPR:</strong></p>
                  <ul className="list-disc ml-6 mb-2">
                    <li><strong>Right to access</strong> - You have the right to request copies of your personal data.</li>
                    <li><strong>Right to rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                    <li><strong>Right to erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li><strong>Right to restrict processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                    <li><strong>Right to object to processing</strong> - You have the right to object to our processing of your personal data, under certain conditions.</li>
                    <li><strong>Right to data portability</strong> - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                  </ul>
                  <p>To exercise any of these rights, please contact us.</p>
                </div>
              )}
              
              {data.ccpaCompliance && (
                <div>
                  <p><strong>If you are a California resident, you have the following rights under the CCPA:</strong></p>
                  <ul className="list-disc ml-6 mb-2">
                    <li><strong>Right to know</strong> - You have the right to request that we disclose information to you about our collection and use of your personal information over the past 12 months.</li>
                    <li><strong>Right to delete</strong> - You have the right to request that we delete any of your personal information that we collected from you and retained, subject to certain exceptions.</li>
                    <li><strong>Right to opt-out of sales</strong> - If we sell your personal information, you have the right to opt out of the sale of your information.</li>
                    <li><strong>Right to non-discrimination</strong> - We will not discriminate against you for exercising any of your CCPA rights.</li>
                  </ul>
                  <p>To exercise any of these rights, please contact us.</p>
                </div>
              )}
            </>
          )}

          {data.dataRetentionPeriod && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">6. Data Retention</h3>
              <p>
                We will retain your personal data for a period of {data.dataRetentionPeriod.replace(/_/g, ' ')}, 
                or for as long as necessary to fulfill the purposes for which it was collected.
              </p>
            </>
          )}

          {data.childrenPolicy && (
            <>
              <h3 className="text-lg font-semibold mt-6 mb-2">7. Children's Privacy</h3>
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
              </p>
            </>
          )}

          {data.effectiveDate && (
            <p className="text-sm text-gray-500 italic mt-6">
              This privacy policy is effective as of {format(new Date(data.effectiveDate), 'MMMM d, yyyy')} and will remain in effect except with respect to any changes in its provisions in the future.
            </p>
          )}
        </div>
        
        {!fullView && (
          <p className="text-gray-500 italic text-sm mt-6 border-t pt-4">
            This is a preview of your policy based on the information provided. Please continue through all steps to generate a complete privacy policy.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PolicyPreview;
