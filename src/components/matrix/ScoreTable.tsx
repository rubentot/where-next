import { useDecisionMatrix } from '../../hooks/useDecisionMatrix';
import { categories } from '../../data/categories';
import { Flag } from '../shared/Flag';

export function ScoreTable() {
  const { results, maxPossible } = useDecisionMatrix();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 pb-3">
        <h3 className="font-semibold text-gray-800">Weighted Scores</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-2 font-medium text-gray-500">Category</th>
              {results.map(r => (
                <th key={r.id} className="text-center px-3 py-2 font-medium text-gray-500">
                  <span className="inline-flex items-center gap-1"><Flag countryId={r.id} size="sm" /> {r.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-gray-100">
                <td className="px-4 py-2 text-gray-700">{cat.label}</td>
                {results.map(r => (
                  <td key={r.id} className="text-center px-3 py-2">
                    <span className="text-gray-400 text-xs">{r.scores[cat.id]}×</span>{' '}
                    <span className="font-medium">{r.weightedScores[cat.id].toFixed(0)}</span>
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50 font-bold">
              <td className="px-4 py-2">Total</td>
              {results.map(r => (
                <td key={r.id} className="text-center px-3 py-2 text-primary-600">
                  {r.totalScore.toFixed(0)}
                  <span className="text-gray-400 font-normal text-xs"> / {maxPossible.toFixed(0)}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
