import { useApp } from '../../context/AppContext';

export function CurrencyToggle() {
  const { currency, setCurrency } = useApp();

  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
      <button
        onClick={() => setCurrency('NOK')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          currency === 'NOK' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        NOK
      </button>
      <button
        onClick={() => setCurrency('EUR')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          currency === 'EUR' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EUR
      </button>
    </div>
  );
}
