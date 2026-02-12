import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import type { Country } from '../../types';

interface Props {
  countries: Country[];
}

const SUMMER_COLORS = ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4'];
const WINTER_COLORS = ['#93c5fd', '#60a5fa', '#3b82f6', '#6366f1', '#818cf8', '#38bdf8'];

export function TemperatureChart({ countries }: Props) {
  const data = countries.map((c, i) => ({
    name: c.name,
    Summer: c.climate.avgTempSummer,
    Winter: c.climate.avgTempWinter,
    colorIdx: i,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Average Temperature (°C)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barGap={2}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[-10, 35]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Summer" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={SUMMER_COLORS[i % SUMMER_COLORS.length]} />
            ))}
          </Bar>
          <Bar dataKey="Winter" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={WINTER_COLORS[i % WINTER_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
