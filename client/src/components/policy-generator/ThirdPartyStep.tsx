import React from 'react';
import { FormStepProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { thirdPartyCategories, ThirdPartyCategory, thirdPartyServiceOptions } from '@shared/schema';
import { THIRD_PARTY_EXPLANATIONS } from '@/lib/constants';
import PolicyPreview from './PolicyPreview';
import { AlertTriangle } from 'lucide-react';

const ThirdPartyStep: React.FC<FormStepProps> = ({ data, updateData, nextStep, prevStep }) => {
  const handleServiceChange = (category: ThirdPartyCategory, service: string, checked: boolean) => {
    const currentServices = data.thirdPartyServices[category] || [];
    const updatedServices = checked
      ? [...currentServices, service]
      : currentServices.filter(s => s !== service);
    
    updateData({
      thirdPartyServices: {
        ...data.thirdPartyServices,
        [category]: updatedServices
      }
    });
  };

  // Check if at least one third-party service is selected across all categories
  const hasSelectedServices = () => {
    return Object.values(data.thirdPartyServices).some(services => services.length > 0) || 
           (data.otherThirdPartyServices && data.otherThirdPartyServices.trim() !== '');
  };

  return (
    <>
      <Card className="bg-white shadow rounded-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Third-Party Services</h3>
          <p className="text-sm text-gray-500 mb-6">
            Select the third-party services you use on your website. This helps create accurate disclosures about data sharing.
          </p>

          <div className="space-y-6">
            {thirdPartyCategories.map(category => (
              <div key={category} className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')} Services
                </Label>
                <p className="text-xs text-gray-500 -mt-2 mb-2">{THIRD_PARTY_EXPLANATIONS[category]}</p>
                
                <div className="space-y-2">
                  {thirdPartyServiceOptions[category].map(service => (
                    <div key={service} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <Checkbox
                          id={`service-${category}-${service.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={data.thirdPartyServices[category]?.includes(service) || false}
                          onCheckedChange={(checked) => handleServiceChange(category, service, checked as boolean)}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <Label 
                          htmlFor={`service-${category}-${service.toLowerCase().replace(/\s+/g, '-')}`} 
                          className="font-medium text-gray-700 cursor-pointer"
                        >
                          {service}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Other Third-Party Services */}
            <div>
              <Label htmlFor="otherServices" className="text-sm font-medium text-gray-700 block mb-2">
                Other Third-Party Services
              </Label>
              <Textarea
                id="otherServices"
                value={data.otherThirdPartyServices || ''}
                onChange={(e) => updateData({ otherThirdPartyServices: e.target.value })}
                placeholder="List any other third-party services not mentioned above..."
                className="min-h-[80px]"
              />
            </div>

            {/* Data Sharing Alert */}
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Note on Data Sharing</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>By using third-party services, you may be sharing user data with these companies. Your privacy policy must disclose these data sharing practices to comply with privacy regulations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between mt-6 -mx-6 -mb-6 rounded-b-lg">
            <Button 
              type="button" 
              variant="outline"
              onClick={prevStep}
              className="border border-gray-300 text-gray-700"
            >
              Previous
            </Button>
            <Button 
              type="button" 
              onClick={nextStep}
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>

      <PolicyPreview data={data} />
    </>
  );
};

export default ThirdPartyStep;
