import type { FinancialDefaults } from '../types';

export const financialDefaults: FinancialDefaults = {
  currentDebt: 1100000,   // NOK
  masterTopUp: 250000,    // NOK (additional if taking master's)
  interestRate: 4.1,      // % (Lånekassen fixed rate 2024/2025 range)
  repaymentYears: 20,
  exchangeRate: 11.5,     // NOK per EUR
};

export const norwayBudget = {
  rent: 14000,       // NOK/month for 1-bedroom in Oslo
  groceries: 4500,
  transport: 850,
  gym: 500,
  eatingOut: 2500,
  utilities: 1500,
  internet: 500,
  other: 2000,
};

export const norwegianSalary = {
  cybersecGross: 650000,  // NOK/year
  mbaGross: 550000,        // NOK/year (post-MBA management role)
  taxRate: 0.34,          // effective tax rate
};

// Lånekassen funding rates (2024/2025, NOK per year)
export const lanekassen = {
  baseStipendPerYear: 50400,
  baseLoanPerYear: 80000,
  baseSupportPerYear: 130400,
  tuitionSupportMaxPerYear: 73000,
  extendedGrantPerYear: 100000,
};

// Country tax rates (approximate effective rates)
export const countryTaxRates: Record<string, number> = {
  spain: 0.25,
  portugal: 0.22,
  netherlands: 0.32,
  italy: 0.27,
  estonia: 0.20,
  singapore: 0.15,
  germany: 0.40,
  uk: 0.30,
  usa: 0.28,
  norway: 0.34,
};
