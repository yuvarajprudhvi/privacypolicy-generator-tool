import React from 'react';
import { FormStepProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { USER_RIGHTS_EXPLANATIONS, GDPR_REQUIREMENTS, CCPA_REQUIREMENTS } from '@/lib/constants';
import PolicyPreview from './PolicyPreview';
import { Badge } from '@/components/ui/badge';

const UserRightsStep: React.FC<FormStepProps> = ({ data, updateData, nextStep, prevStep }) => {
  return (
    <>
      <Card className="bg-white shadow rounded-lg">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">User Rights & Compliance</h3>
          <p className="text-sm text-gray-500 mb-6">
            Configure how your policy addresses user rights and regulatory compliance.
          </p>

          <div className="space-y-6">
            {/* Compliance Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="gdprCompliance" className="text-sm font-medium text-gray-700">
                    GDPR Compliance
                  </Label>
                  <p className="text-xs text-gray-500">
                    Applies to websites that serve EU residents
                  </p>
                </div>
                <Switch 
                  id="gdprCompliance"
                  checked={data.gdprCompliance}
                  onCheckedChange={(checked) => updateData({ gdprCompliance: checked })}
                />
              </div>

              {data.gdprCompliance && (
                <div className="pl-4 border-l-2 border-primary-100 py-2">
                  <p className="text-sm text-gray-600 mb-2">Your policy will include these GDPR requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {GDPR_REQUIREMENTS.map((requirement) => (
                      <Badge key={requirement} variant="info" className="font-normal">
                        {requirement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3">
                <div>
                  <Label htmlFor="ccpaCompliance" className="text-sm font-medium text-gray-700">
                    CCPA Compliance
                  </Label>
                  <p className="text-xs text-gray-500">
                    Applies to websites that serve California residents
                  </p>
                </div>
                <Switch 
                  id="ccpaCompliance"
                  checked={data.ccpaCompliance}
                  onCheckedChange={(checked) => updateData({ ccpaCompliance: checked })}
                />
              </div>

              {data.ccpaCompliance && (
                <div className="pl-4 border-l-2 border-primary-100 py-2">
                  <p className="text-sm text-gray-600 mb-2">Your policy will include these CCPA requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {CCPA_REQUIREMENTS.map((requirement) => (
                      <Badge key={requirement} variant="warning" className="font-normal">
                        {requirement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Children's Privacy */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="childrenPolicy" className="text-sm font-medium text-gray-700">
                    Children's Privacy (COPPA)
                  </Label>
                  <p className="text-xs text-gray-500">
                    Include a section about children under 13
                  </p>
                </div>
                <Switch 
                  id="childrenPolicy"
                  checked={data.childrenPolicy}
                  onCheckedChange={(checked) => updateData({ childrenPolicy: checked })}
                />
              </div>
            </div>

            {/* Effective Date */}
            <div className="pt-3 border-t border-gray-200">
              <Label className="text-sm font-medium text-gray-700 block mb-3">
                Policy Effective Date
              </Label>
              <div className="flex">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.effectiveDate ? (
                        format(new Date(data.effectiveDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={data.effectiveDate ? new Date(data.effectiveDate) : undefined}
                      onSelect={(date) => updateData({ effectiveDate: date ? date.toISOString().split('T')[0] : undefined })}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Educational Info */}
            <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-800">User Rights in Privacy Policies</h3>
                <div className="text-sm text-blue-700 space-y-2">
                  {Object.entries(USER_RIGHTS_EXPLANATIONS).map(([right, explanation]) => (
                    <div key={right} className="flex">
                      <span className="font-medium mr-2">• {right.charAt(0).toUpperCase() + right.slice(1)}:</span>
                      <span>{explanation}</span>
                    </div>
                  ))}
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

export default UserRightsStep;
