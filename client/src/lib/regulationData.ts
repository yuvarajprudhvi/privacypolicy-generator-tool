// Global privacy regulation data by country/region

export interface RegulationInfo {
  id: string;
  name: string;
  region: string;
  countryCode: string;
  year: number;
  description: string;
  keyRequirements: string[];
  link: string; // Official documentation link
  penalties: string;
  applicability: string;
}

export const privacyRegulations: RegulationInfo[] = [
  {
    id: 'dpdpa',
    name: 'Digital Personal Data Protection Act (DPDPA)',
    region: 'India',
    countryCode: 'in',
    year: 2023,
    description: 'India\'s comprehensive digital personal data protection framework, enacted in August 2023, that aims to protect the digital personal data of individuals while allowing for lawful processing of such data.',
    keyRequirements: [
      'Lawful consent-based processing of personal data',
      'Verifiable parental consent for processing children\'s data',
      'Establishment of Data Protection Board of India',
      'Data Principal rights (access, correction, erasure)',
      'Personal data breach notification',
      'Data Fiduciary obligations and accountability',
      'Restrictions on transfer of personal data outside India',
      'Appointment of Data Protection Officers for Significant Data Fiduciaries'
    ],
    link: 'https://digitalindia.gov.in/digital-personal-data-protection-act-2023',
    penalties: 'Up to ₹250 crore (approximately $30 million) for significant violations including data breaches and non-compliance with child data protection',
    applicability: 'Applies to processing of digital personal data within India and processing outside India if related to offering goods or services to Data Principals in India'
  },
  {
    id: 'gdpr',
    name: 'General Data Protection Regulation (GDPR)',
    region: 'European Union',
    countryCode: 'eu',
    year: 2018,
    description: 'The GDPR is a comprehensive data protection law that applies to all businesses processing personal data of EU citizens, regardless of the company location.',
    keyRequirements: [
      'Lawful basis for processing',
      'Data subject rights (access, erasure, portability)',
      'Privacy by design and default',
      'Data breach notification',
      'Data Protection Impact Assessments',
      'Record keeping requirements',
      'Data Processing Agreements'
    ],
    link: 'https://gdpr.eu/',
    penalties: 'Up to €20 million or 4% of global annual revenue, whichever is higher',
    applicability: 'Applies to any business processing personal data of EU residents, regardless of business location'
  },
  {
    id: 'ccpa',
    name: 'California Consumer Privacy Act (CCPA)',
    region: 'United States (California)',
    countryCode: 'us',
    year: 2020,
    description: 'The CCPA provides California residents with rights regarding their personal information and imposes requirements on businesses collecting or selling personal information.',
    keyRequirements: [
      'Right to know what personal information is collected',
      'Right to delete personal information',
      'Right to opt-out of the sale of personal information',
      'Right to non-discrimination for exercising rights',
      'Privacy policy requirements',
      'Mandatory disclosure of data selling practices'
    ],
    link: 'https://oag.ca.gov/privacy/ccpa',
    penalties: 'Civil penalties up to $2,500 per violation or $7,500 per intentional violation',
    applicability: 'Applies to for-profit businesses that collect personal information of California residents and meet certain thresholds'
  },
  {
    id: 'cpra',
    name: 'California Privacy Rights Act (CPRA)',
    region: 'United States (California)',
    countryCode: 'us',
    year: 2023,
    description: 'The CPRA amends and expands the CCPA, adding new privacy protections for California residents and creating a dedicated privacy enforcement agency.',
    keyRequirements: [
      'New category of "sensitive personal information"',
      'Right to correct inaccurate personal information',
      'Right to limit use of sensitive personal information',
      'Extended retention limitations',
      'Expanded opt-out rights',
      'Creation of California Privacy Protection Agency'
    ],
    link: 'https://cppa.ca.gov/',
    penalties: 'Civil penalties up to $2,500 per violation or $7,500 per intentional violation; $7,500 for violations involving minors',
    applicability: 'Expands on CCPA, applies to businesses meeting certain thresholds that collect personal information of California residents'
  },
  {
    id: 'lgpd',
    name: 'Lei Geral de Proteção de Dados (LGPD)',
    region: 'Brazil',
    countryCode: 'br',
    year: 2020,
    description: 'Brazil General Data Protection Law establishes rules for collecting, processing, storing, and sharing personal data in Brazil.',
    keyRequirements: [
      'Legal basis for processing',
      'Data subject rights (confirmation, access, correction)',
      'Data Protection Officer requirement',
      'Data breach reporting',
      'Privacy by design',
      'Data Protection Impact Assessments'
    ],
    link: 'https://www.gov.br/anpd/pt-br',
    penalties: 'Up to 2% of revenue in Brazil (capped at R$50 million per violation)',
    applicability: 'Applies to any business processing personal data in Brazil, regardless of location'
  },
  {
    id: 'pipl',
    name: 'Personal Information Protection Law (PIPL)',
    region: 'China',
    countryCode: 'cn',
    year: 2021,
    description: 'China first comprehensive data protection law regulating the collection and processing of personal information of individuals in China.',
    keyRequirements: [
      'Legal basis for processing (including consent)',
      'Data localization requirements',
      'Individual rights (access, correction, deletion)',
      'Data breach notification',
      'Restrictions on cross-border data transfers',
      'Security assessment for critical information infrastructure operators'
    ],
    link: 'http://www.npc.gov.cn/npc/c30834/202108/a8c4e3672c74491a80b53a172bb753fe.shtml',
    penalties: 'Up to RMB 50 million or 5% of annual revenue, suspension of business activities',
    applicability: 'Applies to processing of personal information within China and processing activities outside China that analyze or assess activities of individuals in China'
  },
  {
    id: 'pipeda',
    name: 'Personal Information Protection and Electronic Documents Act (PIPEDA)',
    region: 'Canada',
    countryCode: 'ca',
    year: 2000,
    description: 'Canada federal privacy law for private-sector organizations, setting out ground rules for how businesses must handle personal information.',
    keyRequirements: [
      'Accountability for personal information',
      'Identifying purposes for collection',
      'Consent requirements',
      'Limiting collection, use, and disclosure',
      'Individual access rights',
      'Data breach reporting',
      'Openness about policies and practices'
    ],
    link: 'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/',
    penalties: 'Fines up to CAD 100,000 for certain offenses',
    applicability: 'Applies to private-sector organizations that collect, use or disclose personal information in the course of commercial activities'
  },
  {
    id: 'pdpa-sg',
    name: 'Personal Data Protection Act (PDPA)',
    region: 'Singapore',
    countryCode: 'sg',
    year: 2012,
    description: 'Singapore data protection framework governs the collection, use, and disclosure of personal data by organizations.',
    keyRequirements: [
      'Consent obligation',
      'Purpose limitation obligation',
      'Notification obligation',
      'Access and correction rights',
      'Data breach notification',
      'Accuracy obligation',
      'Protection and retention limitation'
    ],
    link: 'https://www.pdpc.gov.sg/Overview-of-PDPA/The-Legislation/Personal-Data-Protection-Act',
    penalties: 'Up to SGD 1 million',
    applicability: 'Applies to all organizations collecting, using or disclosing personal data in Singapore'
  },
  {
    id: 'pdpa-th',
    name: 'Personal Data Protection Act (PDPA)',
    region: 'Thailand',
    countryCode: 'th',
    year: 2019,
    description: 'Thailand comprehensive data protection law regulating the collection, use, and disclosure of personal data.',
    keyRequirements: [
      'Lawful basis for processing (including consent)',
      'Data subject rights (access, erasure, objection)',
      'Data controller and processor obligations',
      'Cross-border transfer restrictions',
      'Data breach notification',
      'Privacy notices'
    ],
    link: 'https://www.pdpc.or.th/en',
    penalties: 'Administrative fines up to THB 5 million and criminal penalties including imprisonment',
    applicability: 'Applies to data controllers and processors who collect, use, or disclose personal data in Thailand, regardless of location'
  },
  {
    id: 'popia',
    name: 'Protection of Personal Information Act (POPIA)',
    region: 'South Africa',
    countryCode: 'za',
    year: 2013,
    description: 'South Africa comprehensive data protection law that sets conditions for lawful processing of personal information.',
    keyRequirements: [
      'Accountability',
      'Processing limitation and purpose specification',
      'Information quality and openness',
      'Security safeguards',
      'Data subject participation',
      'Restrictions on cross-border transfers',
      'Special provisions for childrens data'
    ],
    link: 'https://www.justice.gov.za/inforeg/',
    penalties: 'Fines up to ZAR 10 million and potential imprisonment',
    applicability: 'Applies to the processing of personal information entered in a record by or for a responsible party domiciled in South Africa'
  },
  {
    id: 'app',
    name: 'Australian Privacy Principles (APP)',
    region: 'Australia',
    countryCode: 'au',
    year: 2014,
    description: 'The cornerstone of Australia Privacy Act framework, regulating the handling of personal information by government agencies and businesses.',
    keyRequirements: [
      'Open and transparent management of personal information',
      'Anonymity and pseudonymity options',
      'Collection, notification, and use/disclosure limitations',
      'Direct marketing restrictions',
      'Cross-border disclosure requirements',
      'Access and correction rights',
      'Data quality and security requirements'
    ],
    link: 'https://www.oaic.gov.au/privacy/australian-privacy-principles',
    penalties: 'Up to AUD 2.1 million for serious or repeated interferences with privacy',
    applicability: 'Applies to most Australian Government agencies and private sector organizations with annual turnover over AUD 3 million'
  }
];

// Group regulations by continent for the map
export const regulationsByContinent = {
  europe: privacyRegulations.filter(reg => 
    reg.region.includes('European Union') || reg.region.includes('Europe')),
  northAmerica: privacyRegulations.filter(reg => 
    reg.region.includes('United States') || reg.region.includes('Canada')),
  southAmerica: privacyRegulations.filter(reg => 
    reg.region.includes('Brazil') || reg.region.includes('South America')),
  asia: privacyRegulations.filter(reg => 
    reg.region.includes('China') || reg.region.includes('Singapore') || 
    reg.region.includes('Thailand') || reg.region.includes('India') || 
    reg.region.includes('Japan')),
  africa: privacyRegulations.filter(reg => 
    reg.region.includes('South Africa')),
  oceania: privacyRegulations.filter(reg => 
    reg.region.includes('Australia'))
};

// Country-specific color data for the map
export const getCountryColor = (countryCode: string): string => {
  const regulation = privacyRegulations.find(reg => reg.countryCode === countryCode);
  if (regulation) {
    // Regulation exists
    return 'hsl(215, 70%, 50%)'; // Blue for countries with regulations
  }
  // No specific regulation
  return 'hsl(0, 0%, 85%)'; // Light gray for countries without regulations
};

export const getCountryRegulation = (countryCode: string): RegulationInfo | undefined => {
  return privacyRegulations.find(reg => reg.countryCode === countryCode);
};