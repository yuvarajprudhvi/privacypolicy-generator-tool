import React from 'react';
import { FormStepProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dataCollectionTypes, DataCollectionType, dataRetentionPeriods, DataRetentionPeriod, cookieTypes, CookieType } from '@shared/schema';
import { DATA_COLLECTION_EXPLANATIONS, DATA_RETENTION_EXPLANATIONS, COOKIE_TYPE_EXPLANATIONS } from '@/lib/constants';
import PolicyPreview from './PolicyPreview';
import { AlertTriangle, InfoIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const DataCollectionStep: React.FC<FormStepProps> = ({ data, updateData, nextStep, prevStep }) => {
  const handleDataCollectionChange = (type: DataCollectionType, checked: boolean) => {
    const updatedCollection = checked
      ? [...data.dataCollected, type]
      : data.dataCollected.filter(item => item !== type);
    
    updateData({ dataCollected: updatedCollection });
  };

  const handleCookieTypeChange = (type: CookieType, checked: boolean) => {
    if (!data.useCookies) return;
    
    const updatedCookieTypes = checked
      ? [...data.cookieTypes, type]
      : data.cookieTypes.filter(item => item !== type);
    
    updateData({ cookieTypes: updatedCookieTypes });
  };

  const handleUseCookiesChange = (checked: boolean) => {
    updateData({ 
      useCookies: checked,
      cookieTypes: checked ? data.cookieTypes : []
    });
  };

  const isFormValid = () => {
    return data.dataCollected.length > 0 && 
           data.dataRetentionPeriod && 
           (!data.useCookies || (data.useCookies && data.cookieTypes.length > 0));
  };

  return (
    <>
      <Card className="bg-white shadow rounded-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Data Collection</h3>
          <p className="text-sm text-gray-500 mb-6">
            Select the types of data your website collects from users.
          </p>

          <div className="space-y-6">
            {/* Data Collection Types */}
            <div>
              <Label className="text-sm font-medium text-gray-700 block mb-3">
                What personal data do you collect?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dataCollectionTypes.map(type => (
                  <div key={type} className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox
                        id={`data-${type}`}
                        checked={data.dataCollected.includes(type)}
                        onCheckedChange={(checked) => handleDataCollectionChange(type, checked as boolean)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label 
                        htmlFor={`data-${type}`} 
                        className="font-medium text-gray-700 cursor-pointer"
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                      </Label>
                      <p className="text-gray-500">{DATA_COLLECTION_EXPLANATIONS[type]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Retention Period */}
            <div className="space-y-2">
              <Label htmlFor="dataRetentionPeriod" className="text-sm font-medium text-gray-700">
                How long do you retain user data?
              </Label>
              <Select
                value={data.dataRetentionPeriod}
                onValueChange={(value) => updateData({ dataRetentionPeriod: value as DataRetentionPeriod })}
              >
                <SelectTrigger id="dataRetentionPeriod">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  {dataRetentionPeriods.map(period => (
                    <SelectItem key={period} value={period}>
                      {period.replace(/_/g, ' ')}
                      <span className="text-xs text-gray-500 ml-2">
                        {DATA_RETENTION_EXPLANATIONS[period]}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cookie Usage */}
            <div className="space-y-4 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Label htmlFor="useCookies" className="text-sm font-medium text-gray-700">
                  Does your website use cookies?
                </Label>
                <Switch 
                  id="useCookies"
                  checked={data.useCookies}
                  onCheckedChange={handleUseCookiesChange}
                />
              </div>

              {data.useCookies && (
                <div className="pl-4 border-l-2 border-primary-100">
                  <Label className="text-sm font-medium text-gray-700 block mb-3">
                    What types of cookies do you use?
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cookieTypes.map(type => (
                      <div key={type} className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <Checkbox
                            id={`cookie-${type}`}
                            checked={data.cookieTypes.includes(type)}
                            onCheckedChange={(checked) => handleCookieTypeChange(type, checked as boolean)}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <Label 
                            htmlFor={`cookie-${type}`} 
                            className="font-medium text-gray-700 cursor-pointer"
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                          </Label>
                          <p className="text-gray-500">{COOKIE_TYPE_EXPLANATIONS[type]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* GDPR Notice */}
            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">GDPR & CCPA Compliance</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Under regulations like GDPR and CCPA, you must clearly disclose what data you collect and how it is used. You must also provide mechanisms for users to access, correct, or delete their data.</p>
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
              disabled={!isFormValid()}
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

export default DataCollectionStep;
