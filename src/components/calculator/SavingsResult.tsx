import { TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { useFinancialCalc } from '../../hooks/useFinancialCalc';
import { useFormatCurrency } from '../shared/FormatNumber';

export function SavingsResult() {
  const calc = useFinancialCalc();
  const fmt = useFormatCurrency();
  const diff = calc.countrySavingsNOK - calc.norwaySavings;
  const better = diff > 0;

  if (calc.isNorway) {
    return (
      <div className="rounded-2xl p-5 border-2 bg-blue-50 border-primary-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary-500 text-white">
            <Equal size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Same country — no difference</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select a different country to compare against Norway
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 border-2 ${
      better ? 'bg-green-50 border-success-400' : 'bg-red-50 border-danger-400'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${better ? 'bg-success-500' : 'bg-danger-500'} text-white`}>
          {better ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">
            {better
              ? `You'd save ${fmt(Math.abs(diff))}/mo more in ${calc.country.name}!`
              : `Norway saves you ${fmt(Math.abs(diff))}/mo more`
            }
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {better
              ? `That's ${fmt(Math.abs(diff) * 12)} more per year in ${calc.country.name}`
              : `That's ${fmt(Math.abs(diff) * 12)} more per year staying in Norway`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
