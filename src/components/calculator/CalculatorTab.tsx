import { LoanInputs } from './LoanInputs';
import { LoanSummary } from './LoanSummary';
import { BudgetComparison } from './BudgetComparison';
import { SavingsResult } from './SavingsResult';
import { CountrySelector } from './CountrySelector';
import { CurrencyToggle } from '../shared/CurrencyToggle';

export function CalculatorTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Financial Calculator</h2>
          <p className="text-sm text-gray-500">Compare Norway vs. abroad financially</p>
        </div>
        <CurrencyToggle />
      </div>

      {/* Country selector */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Compare Norway with:</label>
        <CountrySelector />
      </div>

      {/* Loan section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LoanInputs />
        <LoanSummary />
      </div>

      {/* Savings result */}
      <SavingsResult />

      {/* Budget comparison */}
      <BudgetComparison />
    </div>
  );
}
