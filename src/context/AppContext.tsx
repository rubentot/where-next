import { createContext, useContext, useState, type ReactNode } from 'react';
import type { TabId, CurrencyCode, ViewMode, Weights } from '../types';
import { defaultWeightsHis, defaultWeightsHers } from '../data/categories';
import { financialDefaults } from '../data/financials';

interface AppState {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  exchangeRate: number;
  weightsHis: Weights;
  setWeightsHis: (w: Weights) => void;
  weightsHers: Weights;
  setWeightsHers: (w: Weights) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  enabledCountries: Set<string>;
  toggleCountry: (id: string) => void;
  selectedCountry: string;
  setSelectedCountry: (id: string) => void;
  // Financial inputs
  debt: number;
  setDebt: (v: number) => void;
  includeMaster: boolean;
  setIncludeMaster: (v: boolean) => void;
  interestRate: number;
  setInterestRate: (v: number) => void;
  repaymentYears: number;
  setRepaymentYears: (v: number) => void;
}

const AppContext = createContext<AppState | null>(null);

const allCountryIds = ['spain', 'portugal', 'netherlands', 'italy', 'estonia', 'singapore', 'germany', 'uk', 'scotland', 'california', 'georgia', 'maryland', 'missouri', 'newyork', 'texas', 'washington', 'wisconsin', 'norway'];

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('comparison');
  const [currency, setCurrency] = useState<CurrencyCode>('NOK');
  const [weightsHis, setWeightsHis] = useState<Weights>(defaultWeightsHis);
  const [weightsHers, setWeightsHers] = useState<Weights>(defaultWeightsHers);
  const [viewMode, setViewMode] = useState<ViewMode>('combined');
  const [enabledCountries, setEnabledCountries] = useState<Set<string>>(new Set(allCountryIds));
  const [selectedCountry, setSelectedCountry] = useState('spain');
  const [debt, setDebt] = useState(financialDefaults.currentDebt);
  const [includeMaster, setIncludeMaster] = useState(false);
  const [interestRate, setInterestRate] = useState(financialDefaults.interestRate);
  const [repaymentYears, setRepaymentYears] = useState(financialDefaults.repaymentYears);

  const toggleCountry = (id: string) => {
    setEnabledCountries(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      currency, setCurrency,
      exchangeRate: financialDefaults.exchangeRate,
      weightsHis, setWeightsHis,
      weightsHers, setWeightsHers,
      viewMode, setViewMode,
      enabledCountries, toggleCountry,
      selectedCountry, setSelectedCountry,
      debt, setDebt,
      includeMaster, setIncludeMaster,
      interestRate, setInterestRate,
      repaymentYears, setRepaymentYears,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
