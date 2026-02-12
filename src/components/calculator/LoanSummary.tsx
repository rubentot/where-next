import { useFinancialCalc } from '../../hooks/useFinancialCalc';
import { formatNOK } from '../shared/FormatNumber';

export function LoanSummary() {
  const { totalDebt, monthlyPayment, totalPaid, totalInterest } = useFinancialCalc();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Loan Summary</h3>
      <div className="grid grid-cols-2 gap-3">
        <SummaryItem label="Total debt" value={formatNOK(totalDebt)} />
        <SummaryItem label="Monthly payment" value={formatNOK(monthlyPayment)} highlight />
        <SummaryItem label="Total repaid" value={formatNOK(totalPaid)} />
        <SummaryItem label="Total interest" value={formatNOK(totalInterest)} danger />
      </div>
    </div>
  );
}

function SummaryItem({ label, value, highlight, danger }: {
  label: string;
  value: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={`text-sm font-bold mt-0.5 ${
        highlight ? 'text-primary-600' : danger ? 'text-danger-600' : 'text-gray-900'
      }`}>
        {value}
      </div>
    </div>
  );
}
