import { WeightSliders } from './WeightSliders';
import { RadarChartView } from './RadarChartView';
import { ScoreTable } from './ScoreTable';
import { WinnerBanner } from './WinnerBanner';
import { CountryFilter } from '../comparison/CountryFilter';

export function MatrixTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Decision Matrix</h2>
        <p className="text-sm text-gray-500 mb-4">Set your priorities and find the best match</p>
        <CountryFilter />
      </div>

      {/* Winner */}
      <WinnerBanner />

      {/* Weights + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeightSliders />
        <RadarChartView />
      </div>

      {/* Score table */}
      <ScoreTable />
    </div>
  );
}
