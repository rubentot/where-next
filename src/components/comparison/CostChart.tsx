import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Country } from '../../types';

interface Props {
  countries: Country[];
}

export function CostChart({ countries }: Props) {
  const data = countries.map(c => ({
    name: c.name,
    Rent: c.costOfLiving.rentOneBedroom,
    Groceries: c.costOfLiving.groceries,
    Transport: c.costOfLiving.transport,
    'Eating Out': c.costOfLiving.eatingOut,
    Utilities: c.costOfLiving.utilities,
    Other: c.costOfLiving.gym + c.costOfLiving.internet,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3">Monthly Cost Breakdown (EUR)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Rent" stackId="a" fill="#3b82f6" />
          <Bar dataKey="Groceries" stackId="a" fill="#22c55e" />
          <Bar dataKey="Transport" stackId="a" fill="#f59e0b" />
          <Bar dataKey="Eating Out" stackId="a" fill="#ef4444" />
          <Bar dataKey="Utilities" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="Other" stackId="a" fill="#6b7280" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
