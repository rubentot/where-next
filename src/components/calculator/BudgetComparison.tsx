import { useFinancialCalc } from '../../hooks/useFinancialCalc';
import { useApp } from '../../context/AppContext';
import { useFormatCurrency } from '../shared/FormatNumber';
import { Flag } from '../shared/Flag';

export function BudgetComparison() {
  const calc = useFinancialCalc();
  const { currency, exchangeRate } = useApp();
  const fmt = useFormatCurrency();
  const isEUR = currency === 'EUR';

  const norwayItems = [
    { label: 'Rent', value: calc.norwayBudgetBreakdown.rent },
    { label: 'Groceries', value: calc.norwayBudgetBreakdown.groceries },
    { label: 'Transport', value: calc.norwayBudgetBreakdown.transport },
    { label: 'Eating out', value: calc.norwayBudgetBreakdown.eatingOut },
    { label: 'Utilities', value: calc.norwayBudgetBreakdown.utilities },
    { label: 'Gym', value: calc.norwayBudgetBreakdown.gym },
    { label: 'Internet', value: calc.norwayBudgetBreakdown.internet },
    { label: 'Other', value: calc.norwayBudgetBreakdown.other },
  ];

  const bd = calc.countryBudgetBreakdown;
  const countryItems = [
    { label: 'Rent', value: bd.rent },
    { label: 'Groceries', value: bd.groceries },
    { label: 'Transport', value: bd.transport },
    { label: 'Eating out', value: bd.eatingOut },
    { label: 'Utilities', value: bd.utilities },
    { label: 'Gym', value: bd.gym },
    { label: 'Internet', value: bd.internet },
    ...(bd.other ? [{ label: 'Other', value: bd.other }] : []),
  ];

  // When Norway is selected, values are already derived from NOK source —
  // format them the same way as the left column to avoid rounding differences.
  const fmtCountry = calc.isNorway
    ? (eur: number) => fmt(eur * exchangeRate)
    : (eur: number) => {
        if (isEUR) return Math.round(eur).toLocaleString('nb-NO') + ' EUR';
        return Math.round(eur * exchangeRate).toLocaleString('nb-NO') + ' NOK';
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Norway */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Flag countryId="norway" size="lg" />
          <h3 className="font-semibold text-gray-800">Norway (Oslo)</h3>
        </div>
        <div className="space-y-2">
          {norwayItems.map(item => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium">{fmt(item.value)}</span>
            </div>
          ))}
          <hr className="border-gray-200" />
          <div className="flex justify-between text-sm font-bold">
            <span>Total expenses</span>
            <span>{fmt(calc.norwayMonthlyExpenses)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Ruben net (cybersec)</span>
            <span className="font-medium">{fmt(calc.norwayCybersecNet)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Charlotte net (MBA)</span>
            <span className="font-medium">{fmt(calc.norwayMbaNet)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-gray-700">Household net</span>
            <span>{fmt(calc.norwayNetMonthly)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Loan payment</span>
            <span className="font-medium text-danger-600">-{fmt(calc.monthlyPayment)}</span>
          </div>
          <hr className="border-gray-200" />
          <div className={`flex justify-between text-sm font-bold ${calc.norwaySavings >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            <span>Monthly savings</span>
            <span>{fmt(calc.norwaySavings)}</span>
          </div>
        </div>
      </div>

      {/* Selected Country */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Flag countryId={calc.country.id} size="lg" />
          <h3 className="font-semibold text-gray-800">{calc.country.name} ({calc.country.cities[0]})</h3>
        </div>
        <div className="space-y-2">
          {countryItems.map(item => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium">{fmtCountry(item.value)}</span>
            </div>
          ))}
          <hr className="border-gray-200" />
          <div className="flex justify-between text-sm font-bold">
            <span>Total expenses</span>
            <span>{fmtCountry(calc.countryMonthlyEUR)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Ruben net (cybersec)</span>
            <span className="font-medium">{fmtCountry(calc.countryCybersecNetEUR)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Charlotte net (MBA)</span>
            <span className="font-medium">{fmtCountry(calc.countryMbaNetEUR)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-gray-700">Household net</span>
            <span>{fmtCountry(calc.countryNetMonthlyEUR)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Loan payment</span>
            <span className="font-medium text-danger-600">-{fmt(calc.monthlyPayment)}</span>
          </div>
          <div className="text-xs text-gray-400">
            Ruben: {calc.countryCybersecSalaryEUR.toLocaleString()} EUR/yr | Charlotte: {calc.countryMbaSalaryEUR.toLocaleString()} EUR/yr | Tax: {(calc.countryTax * 100).toFixed(0)}%
          </div>
          <hr className="border-gray-200" />
          <div className={`flex justify-between text-sm font-bold ${calc.countrySavingsNOK >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            <span>Monthly savings</span>
            <span>{fmt(calc.countrySavingsNOK)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
