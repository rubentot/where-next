import { useApp } from '../../context/AppContext';
import { SliderInput } from '../shared/SliderInput';
import { financialDefaults } from '../../data/financials';

export function LoanInputs() {
  const {
    debt, setDebt,
    includeMaster, setIncludeMaster,
    interestRate, setInterestRate,
    repaymentYears, setRepaymentYears,
  } = useApp();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
      <h3 className="font-semibold text-gray-800">Lånekassen Debt</h3>

      <SliderInput
        label="Current debt"
        value={debt / 1000}
        onChange={v => setDebt(v * 1000)}
        min={0}
        max={2000}
        step={50}
        unit="k NOK"
      />

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={includeMaster}
          onChange={e => setIncludeMaster(e.target.checked)}
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <span>Add master's loan (+{(financialDefaults.masterTopUp / 1000).toFixed(0)}k NOK)</span>
      </label>

      <SliderInput
        label="Interest rate"
        value={interestRate}
        onChange={setInterestRate}
        min={1}
        max={8}
        step={0.1}
        unit="%"
      />

      <SliderInput
        label="Repayment period"
        value={repaymentYears}
        onChange={setRepaymentYears}
        min={5}
        max={30}
        step={1}
        unit="years"
      />
    </div>
  );
}
