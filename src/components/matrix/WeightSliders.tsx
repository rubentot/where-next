import { useApp } from '../../context/AppContext';
import { categories } from '../../data/categories';
import { SliderInput } from '../shared/SliderInput';
import type { Weights, ViewMode } from '../../types';

export function WeightSliders() {
  const { viewMode, setViewMode, weightsHis, setWeightsHis, weightsHers, setWeightsHers } = useApp();

  const views: { id: ViewMode; label: string; emoji: string }[] = [
    { id: 'his', label: 'His', emoji: '👨' },
    { id: 'hers', label: 'Hers', emoji: '👩' },
    { id: 'combined', label: 'Combined', emoji: '💑' },
  ];

  const updateWeight = (key: keyof Weights, value: number) => {
    if (viewMode === 'his' || viewMode === 'combined') {
      setWeightsHis({ ...weightsHis, [key]: value });
    }
    if (viewMode === 'hers' || viewMode === 'combined') {
      setWeightsHers({ ...weightsHers, [key]: value });
    }
  };

  const displayWeights = viewMode === 'his' ? weightsHis : viewMode === 'hers' ? weightsHers : weightsHis;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Priorities</h3>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          {views.map(v => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                viewMode === v.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {v.emoji} {v.label}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'combined' && (
        <p className="text-xs text-gray-400">In combined mode, sliders adjust His weights. Switch to Her to adjust hers.</p>
      )}

      <div className="space-y-3">
        {categories.map(cat => (
          <SliderInput
            key={cat.id}
            label={cat.label}
            value={displayWeights[cat.id]}
            onChange={v => updateWeight(cat.id, v)}
            min={1}
            max={10}
          />
        ))}
      </div>
    </div>
  );
}
