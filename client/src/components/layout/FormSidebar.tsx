import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import FormSteps from '@/components/policy-generator/FormSteps';

interface FormSidebarProps {
  currentStep: string;
}

const FormSidebar: React.FC<FormSidebarProps> = ({ currentStep }) => {
  return (
    <Card className="bg-white shadow rounded-lg overflow-hidden mb-6 lg:mb-0 sticky top-6">
      <CardContent className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Your Progress</h2>
          <span className="text-sm font-medium text-primary-600">
            {currentStep === 'basic' ? '1' : 
             currentStep === 'dataCollection' ? '2' : 
             currentStep === 'thirdParty' ? '3' :
             currentStep === 'userRights' ? '4' : '5'} of 5 steps
          </span>
        </div>
        
        <FormSteps currentStep={currentStep} />
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">About Privacy Policies</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>A privacy policy is a legal document that discloses how a website collects, processes, and stores user data.</p>
              </div>
              <div className="mt-3">
                <a href="https://gdpr.eu/what-is-gdpr/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center">
                  Learn more about privacy regulations 
                  <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormSidebar;
