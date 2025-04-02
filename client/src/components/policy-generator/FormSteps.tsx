import React from 'react';
import { Check } from 'lucide-react';
import { FORM_STEPS, STEP_TITLES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FormStepsProps {
  currentStep: string;
}

const FormSteps: React.FC<FormStepsProps> = ({ currentStep }) => {
  const steps = Object.values(FORM_STEPS);
  
  const isCompleted = (step: string) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);
    return stepIndex < currentIndex;
  };

  const isCurrent = (step: string) => {
    return step === currentStep;
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={cn(
              "flex items-center pl-3 py-2 text-sm font-medium rounded-md",
              isCurrent(step) ? "bg-primary-50 text-primary-700" : 
                isCompleted(step) ? "bg-primary-50 text-primary-700" : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <div 
              className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mr-3",
                isCurrent(step) ? "bg-primary-600 text-white" :
                  isCompleted(step) ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-500"
              )}
            >
              {isCompleted(step) ? (
                <Check className="h-3 w-3" />
              ) : (
                index + 1
              )}
            </div>
            <span>{STEP_TITLES[step as keyof typeof STEP_TITLES]}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FormSteps;
