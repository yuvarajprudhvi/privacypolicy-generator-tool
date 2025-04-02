export const APP_NAME = "PolicyGen";

// Form step IDs
export const FORM_STEPS = {
  BASIC_INFO: "basic",
  DATA_COLLECTION: "dataCollection",
  THIRD_PARTY: "thirdParty",
  USER_RIGHTS: "userRights",
  FINALIZE: "finalize"
};

export const STEP_TITLES = {
  [FORM_STEPS.BASIC_INFO]: "Basic Information",
  [FORM_STEPS.DATA_COLLECTION]: "Data Collection",
  [FORM_STEPS.THIRD_PARTY]: "Third-Party Services",
  [FORM_STEPS.USER_RIGHTS]: "User Rights",
  [FORM_STEPS.FINALIZE]: "Finalize & Export"
};

export const DATA_COLLECTION_EXPLANATIONS = {
  name: "Full name of your users",
  email: "Email addresses for communication",
  phone: "Phone numbers for contact",
  address: "Physical or mailing addresses",
  payment_info: "Credit card or payment details",
  ip_address: "Internet Protocol addresses",
  cookies: "Information stored in browser cookies",
  location: "Geographic location data",
  device_info: "Device model, OS, or browser info",
  browsing_behavior: "Pages visited, time spent, clicks",
  purchase_history: "Order history and past purchases",
  social_media_profiles: "Connected social media accounts",
  other: "Any other personal information"
};

export const COOKIE_TYPE_EXPLANATIONS = {
  essential: "Required for basic website functioning",
  functionality: "Remember user preferences and choices",
  analytics: "Track website usage and performance",
  advertising: "Used for targeted advertising",
  third_party: "Set by third-party services",
  other: "Any other types of cookies"
};

export const THIRD_PARTY_EXPLANATIONS = {
  analytics: "Services that track website usage",
  advertising: "Services for display and targeted ads",
  payment: "Payment processing providers",
  social: "Social media integrations",
  hosting: "Website hosting providers",
  email_marketing: "Email newsletter and marketing tools",
  other: "Any other third-party services"
};

export const DATA_RETENTION_EXPLANATIONS = {
  "30_days": "Data is deleted after 30 days",
  "90_days": "Data is kept for 3 months",
  "180_days": "Data is kept for 6 months",
  "1_year": "Data is kept for 1 year",
  "2_years": "Data is kept for 2 years",
  "5_years": "Data is kept for 5 years",
  "indefinite": "Data is kept indefinitely or until user requests deletion"
};

export const WEBSITE_TYPE_EXPLANATIONS = {
  "e-commerce": "Selling products or services online",
  "blog": "Publishing articles and content",
  "portfolio": "Showcasing work or services",
  "saas": "Software as a Service application",
  "social_media": "Platform for user interaction",
  "news": "News and media website",
  "forum": "Discussion or community platform",
  "educational": "Learning or educational content",
  "other": "Any other type of website"
};

export const USER_RIGHTS_EXPLANATIONS = {
  access: "Users can request access to their personal data",
  rectification: "Users can request correction of inaccurate data",
  erasure: "Users can request deletion of their data ('right to be forgotten')",
  restriction: "Users can request limiting how their data is processed",
  portability: "Users can request their data in a portable format",
  objection: "Users can object to certain types of processing",
  automated: "Users can opt out of automated decision-making",
  consent: "Users can withdraw consent at any time"
};

export const GDPR_REQUIREMENTS = [
  "Legal basis for processing",
  "Data protection rights",
  "Data retention periods",
  "Use of cookies",
  "Third-party data sharing",
  "International data transfers",
  "Contact information for data inquiries"
];

export const CCPA_REQUIREMENTS = [
  "Categories of personal information collected",
  "Sources of personal information",
  "Purpose of data collection",
  "Third parties with whom data is shared",
  "California consumer rights",
  "Do Not Sell My Personal Information opt-out",
  "Contact information for privacy inquiries"
];
