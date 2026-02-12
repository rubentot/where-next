export interface Country {
  id: string;
  name: string;
  flag: string;
  cities: string[];
  climate: ClimateData;
  costOfLiving: CostOfLiving;
  tuition: TuitionInfo;
  jobs: JobMarket;
  lifestyle: LifestyleInfo;
  language: LanguageInfo;
  distance: DistanceInfo;
  visa: VisaInfo;
  safety: number; // 1-10
  adventure: number; // 1-10
  scores: CategoryScores;
}

export interface ClimateData {
  avgTempSummer: number;
  avgTempWinter: number;
  sunnyDays: number;
  description: string;
}

export interface CostOfLiving {
  rentOneBedroom: number; // EUR/month
  groceries: number;
  transport: number;
  gym: number;
  eatingOut: number;
  utilities: number;
  internet: number;
  index: number; // relative to Norway = 100
}

export interface TuitionInfo {
  masterPerYear: number; // EUR
  notes: string;
}

export interface JobMarket {
  cybersec: { demand: number; avgSalary: number; description: string };
  mba: { demand: number; avgSalary: number; description: string };
}

export interface LifestyleInfo {
  nightlife: number;
  outdoors: number;
  culture: number;
  food: number;
  expat: number;
  description: string;
}

export interface LanguageInfo {
  official: string;
  englishLevel: number; // 1-10
  barrier: number; // 1-10, higher = harder
  notes: string;
}

export interface DistanceInfo {
  fromOslo: number; // km
  flightHours: number;
  directFlights: boolean;
}

export interface VisaInfo {
  visaRequired: boolean;
  visaType: string;
  workWhileStudying: string;
  postStudyWork: string;
  pathToPR: string;
  notes: string;
}

export interface CategoryScores {
  climate: number;
  costOfLiving: number;
  careerHis: number;
  careerHers: number;
  lifestyle: number;
  language: number;
  distance: number;
  safety: number;
  adventure: number;
}

export interface Category {
  id: keyof CategoryScores;
  label: string;
  icon: string;
  description: string;
}

export interface Weights {
  climate: number;
  costOfLiving: number;
  careerHis: number;
  careerHers: number;
  lifestyle: number;
  language: number;
  distance: number;
  safety: number;
  adventure: number;
}

export interface FinancialDefaults {
  currentDebt: number; // NOK
  masterTopUp: number; // NOK
  interestRate: number; // %
  repaymentYears: number;
  exchangeRate: number; // NOK per EUR
}

export interface BudgetItem {
  label: string;
  norway: number; // NOK/month
  getCountryValue: (country: Country) => number; // EUR/month
}

export type TabId = 'comparison' | 'calculator' | 'matrix' | 'schools';

export interface School {
  id: string;
  name: string;
  countryId: string;
  city: string;
  program: string;
  field: 'cybersec' | 'mba';
  tuitionPerYear: number; // EUR
  duration: string;
  language: string;
  ranking?: string;
  highlights: string[];
  applicationDeadline?: string;
  extendedGrant?: boolean;
  url: string;
}
export type CurrencyCode = 'NOK' | 'EUR';
export type ViewMode = 'his' | 'hers' | 'combined';
