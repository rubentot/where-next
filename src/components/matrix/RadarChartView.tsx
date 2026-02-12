import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { useDecisionMatrix } from '../../hooks/useDecisionMatrix';
import { categories } from '../../data/categories';

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4'];

export function RadarChartView() {
  const { results } = useDecisionMatrix();

  const data = categories.map(cat => {
    const entry: Record<string, string | number> = { category: cat.label };
    results.forEach(r => {
      entry[r.name] = r.scores[cat.id];
    });
    return entry;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">Score Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 10 }} />
          {results.map((r, i) => (
            <Radar
              key={r.id}
              name={r.name}
              dataKey={r.name}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
