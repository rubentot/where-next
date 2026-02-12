import { Heart, Shield, Briefcase } from 'lucide-react';
import { useStudyTogether } from '../../hooks/useStudyTogether';
import { SchoolCard } from './SchoolCard';
import { Flag } from '../shared/Flag';

export function StudyTogetherView() {
  const pairs = useStudyTogether();

  if (pairs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No locations found where both programs are available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
          <Heart size={18} className="fill-green-500 text-green-500" />
          Study Together — {pairs.length} locations found
        </div>
        <p className="text-sm text-green-600">
          These locations have both cybersecurity and MBA programs, so you can study in the same area.
        </p>
      </div>

      {pairs.map(pair => (
        <div key={pair.locationKey} className="space-y-3">
          <div className="flex items-center gap-2">
            <Flag countryId={pair.countryId} size="md" />
            <h3 className="font-bold text-gray-800 text-lg">{pair.locationLabel}</h3>
            <span className="text-xs text-gray-400">
              Combined tuition from €{pair.combinedMinTuitionPerYear.toLocaleString()}/yr
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-primary-600 mb-2 flex items-center gap-1">
                <Shield size={14} /> Ruben — Cybersecurity
              </h4>
              <div className="space-y-3">
                {pair.cybersecSchools.map(s => (
                  <SchoolCard key={s.id} school={s} />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-accent-600 mb-2 flex items-center gap-1">
                <Briefcase size={14} /> Charlotte — MBA
              </h4>
              <div className="space-y-3">
                {pair.mbaSchools.map(s => (
                  <SchoolCard key={s.id} school={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
