import { useApp } from '../../context/AppContext';
import { countries } from '../../data/countries';
import { CountryCard } from './CountryCard';
import { CountryFilter } from './CountryFilter';
import { TemperatureChart } from './TemperatureChart';
import { CostChart } from './CostChart';

export function ComparisonTab() {
  const { enabledCountries } = useApp();
  const filtered = countries.filter(c => enabledCountries.has(c.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Country Comparison</h2>
        <p className="text-sm text-gray-500 mb-4">Toggle countries to compare side by side</p>
        <CountryFilter />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TemperatureChart countries={filtered} />
        <CostChart countries={filtered} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(country => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
}
