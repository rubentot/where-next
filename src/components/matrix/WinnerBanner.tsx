import { Trophy } from 'lucide-react';
import { useDecisionMatrix } from '../../hooks/useDecisionMatrix';
import { Flag } from '../shared/Flag';

export function WinnerBanner() {
  const { winner, maxPossible, viewMode } = useDecisionMatrix();
  if (!winner) return null;

  const pct = ((winner.totalScore / maxPossible) * 100).toFixed(0);
  const viewLabel = viewMode === 'his' ? 'Ruben\'s pick' : viewMode === 'hers' ? 'Charlotte\'s pick' : 'Your pick together';

  return (
    <div className="animate-pulse-winner bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl">
          <Trophy size={32} />
        </div>
        <div>
          <p className="text-sm text-white/80">{viewLabel}</p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flag countryId={winner.id} size="lg" />
            {winner.name}
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Score: {winner.totalScore.toFixed(0)} / {maxPossible.toFixed(0)} ({pct}% match)
          </p>
        </div>
      </div>
    </div>
  );
}
