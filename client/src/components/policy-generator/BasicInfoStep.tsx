import React from 'react';
import { FormStepProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { websiteTypes, WebsiteType } from '@shared/schema';
import { WEBSITE_TYPE_EXPLANATIONS } from '@/lib/constants';
import PolicyPreview from './PolicyPreview';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BasicInfoStep: React.FC<FormStepProps> = ({ data, updateData, nextStep }) => {
  const isFormValid = () => {
    return (
      data.websiteName.trim() !== '' &&
      data.websiteUrl.trim() !== '' &&
      data.companyName.trim() !== '' &&
      data.companyEmail.trim() !== '' &&
      data.companyCountry.trim() !== ''
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      nextStep();
    }
  };

  return (
    <>
      <Card className="bg-white shadow rounded-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Basic Information</h3>
            <p className="text-sm text-gray-500 mb-6">
              Let's start with some basic information about your website and company.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="websiteName" className="text-sm font-medium text-gray-700">
                    Website Name
                  </Label>
                  <Input
                    id="websiteName"
                    value={data.websiteName}
                    onChange={(e) => updateData({ websiteName: e.target.value })}
                    placeholder="My Awesome Website"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700">
                    Website URL
                  </Label>
                  <Input
                    id="websiteUrl"
                    value={data.websiteUrl}
                    onChange={(e) => updateData({ websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="websiteType" className="text-sm font-medium text-gray-700">
                    Website Type
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">The type of website determines specific policy sections that may be required.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={data.websiteType}
                  onValueChange={(value) => updateData({ websiteType: value as WebsiteType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select website type" />
                  </SelectTrigger>
                  <SelectContent>
                    {websiteTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                        <span className="text-xs text-gray-500 ml-2">
                          {WEBSITE_TYPE_EXPLANATIONS[type]}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  Company/Organization Name
                </Label>
                <Input
                  id="companyName"
                  value={data.companyName}
                  onChange={(e) => updateData({ companyName: e.target.value })}
                  placeholder="Your Company Inc."
                  className="w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyEmail" className="text-sm font-medium text-gray-700">
                    Contact Email
                  </Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={data.companyEmail}
                    onChange={(e) => updateData({ companyEmail: e.target.value })}
                    placeholder="privacy@yourcompany.com"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyCountry" className="text-sm font-medium text-gray-700">
                    Country of Operation
                  </Label>
                  <Input
                    id="companyCountry"
                    value={data.companyCountry}
                    onChange={(e) => updateData({ companyCountry: e.target.value })}
                    placeholder="United States"
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">About Privacy Policies</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>A privacy policy is a legal document that discloses how a website collects, processes, and stores user data.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end mt-6 -mx-6 -mb-6 rounded-b-lg">
              <Button 
                type="submit" 
                disabled={!isFormValid()}
              >
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <PolicyPreview data={data} />
    </>
  );
};

export default BasicInfoStep;
