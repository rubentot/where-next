import { useApp } from '../../context/AppContext';
import { countries } from '../../data/countries';
import { Flag } from '../shared/Flag';

export function CountrySelector() {
  const { selectedCountry, setSelectedCountry } = useApp();

  return (
    <div className="flex flex-wrap gap-2">
      {countries.map(c => (
        <button
          key={c.id}
          onClick={() => setSelectedCountry(c.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedCountry === c.id
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          <Flag countryId={c.id} size="sm" />
          <span>{c.name}</span>
        </button>
      ))}
    </div>
  );
}
