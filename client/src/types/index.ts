import { 
  InsertPolicySettings, 
  WebsiteType, 
  DataCollectionType,
  DataRetentionPeriod,
  CookieType,
  ThirdPartyCategory
} from "@shared/schema";

// The interface extends the database schema type but explicitly types the arrays
// and adds the currentStep field for form management
export interface PolicyFormData extends Omit<InsertPolicySettings, 'dataCollected' | 'cookieTypes' | 'thirdPartyServices'> {
  dataCollected: DataCollectionType[];
  cookieTypes: CookieType[];
  thirdPartyServices: Record<ThirdPartyCategory, string[]>;
  currentStep: string;
}

export interface FormStepProps {
  data: PolicyFormData;
  updateData: (data: Partial<PolicyFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export interface FormStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

export interface GeneratedPolicy {
  introduction: string;
  dataCollection: string;
  cookies: string;
  thirdPartyServices: string;
  userRights: string;
  contactInfo: string;
  dataRetention: string;
  effectiveDate: string;
}
