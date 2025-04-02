import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import BasicInfoStep from './BasicInfoStep';
import DataCollectionStep from './DataCollectionStep';
import ThirdPartyStep from './ThirdPartyStep';
import UserRightsStep from './UserRightsStep';
import FinalizeStep from './FinalizeStep';
import FormSidebar from '@/components/layout/FormSidebar';
import { FORM_STEPS } from '@/lib/constants';
import { PolicyFormData } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

const initialFormData: PolicyFormData = {
  websiteName: '',
  websiteUrl: '',
  websiteType: 'e-commerce',
  companyName: '',
  companyEmail: '',
  companyCountry: '',
  dataCollected: [],
  dataRetentionPeriod: '1_year',
  useCookies: false,
  cookieTypes: [],
  thirdPartyServices: {
    analytics: [],
    advertising: [],
    payment: [],
    social: [],
    hosting: [],
    email_marketing: [],
    other: []
  },
  otherThirdPartyServices: '',
  gdprCompliance: true,
  ccpaCompliance: true,
  childrenPolicy: false,
  effectiveDate: new Date(),
  currentStep: FORM_STEPS.BASIC_INFO
};

const PolicyForm: React.FC = () => {
  const [formData, setFormData] = useState<PolicyFormData>(initialFormData);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateFormData = (data: Partial<PolicyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const currentStepIndex = Object.values(FORM_STEPS).indexOf(formData.currentStep);
    const nextStepKey = Object.keys(FORM_STEPS)[currentStepIndex + 1];
    
    if (nextStepKey) {
      const nextStepValue = FORM_STEPS[nextStepKey as keyof typeof FORM_STEPS];
      updateFormData({ currentStep: nextStepValue });
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    const currentStepIndex = Object.values(FORM_STEPS).indexOf(formData.currentStep);
    const prevStepKey = Object.keys(FORM_STEPS)[currentStepIndex - 1];
    
    if (prevStepKey) {
      const prevStepValue = FORM_STEPS[prevStepKey as keyof typeof FORM_STEPS];
      updateFormData({ currentStep: prevStepValue });
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (formData.currentStep) {
      case FORM_STEPS.BASIC_INFO:
        return (
          <BasicInfoStep 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case FORM_STEPS.DATA_COLLECTION:
        return (
          <DataCollectionStep 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case FORM_STEPS.THIRD_PARTY:
        return (
          <ThirdPartyStep 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case FORM_STEPS.USER_RIGHTS:
        return (
          <UserRightsStep 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case FORM_STEPS.FINALIZE:
        return (
          <FinalizeStep 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <FormSidebar currentStep={formData.currentStep} />
      </div>
      <div className="lg:col-span-8 space-y-6 mt-6 lg:mt-0">
        {renderStep()}
      </div>
    </div>
  );
};

export default PolicyForm;
