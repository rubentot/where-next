import { useState } from 'react';
import { Shield, Briefcase, Heart } from 'lucide-react';
import { schools } from '../../data/schools';
import { countries } from '../../data/countries';
import { SchoolCard } from './SchoolCard';
import { StudyTogetherView } from './StudyTogetherView';
import { Flag } from '../shared/Flag';

type FieldFilter = 'all' | 'cybersec' | 'mba';
type ViewMode = 'all' | 'together';

function SchoolGrid({ list }: { list: typeof schools }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {list.map(s => <SchoolCard key={s.id} school={s} />)}
    </div>
  );
}

export function SchoolsTab() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [fieldFilter, setFieldFilter] = useState<FieldFilter>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  const filtered = schools.filter(s => {
    if (fieldFilter !== 'all' && s.field !== fieldFilter) return false;
    if (countryFilter !== 'all' && s.countryId !== countryFilter) return false;
    return true;
  });

  const countriesWithSchools = [...new Set(schools.map(s => s.countryId))];

  const cybersecSchools = filtered.filter(s => s.field === 'cybersec');
  const mbaSchools = filtered.filter(s => s.field === 'mba');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Schools to Apply For</h2>
        <p className="text-sm text-gray-500">Alle skolene er godkjent av Lånekassen</p>
      </div>

      {/* View mode toggle */}
      <div className="flex flex-wrap gap-2">
        <FilterButton active={viewMode === 'all'} onClick={() => setViewMode('all')}>
          All Programs
        </FilterButton>
        <FilterButton active={viewMode === 'together'} onClick={() => setViewMode('together')}>
          <Heart size={14} className="fill-current" /> Study Together
        </FilterButton>
      </div>

      {viewMode === 'together' ? (
        <StudyTogetherView />
      ) : (
        <>
          {/* Filters */}
          <div className="space-y-3">
            {/* Field filter */}
            <div className="flex flex-wrap gap-2">
              <FilterButton active={fieldFilter === 'all'} onClick={() => setFieldFilter('all')}>
                All Fields
              </FilterButton>
              <FilterButton active={fieldFilter === 'cybersec'} onClick={() => setFieldFilter('cybersec')}>
                <Shield size={14} /> Ruben — Cybersecurity
              </FilterButton>
              <FilterButton active={fieldFilter === 'mba'} onClick={() => setFieldFilter('mba')}>
                <Briefcase size={14} /> Charlotte — MBA
              </FilterButton>
            </div>

            {/* Country filter */}
            <div className="flex flex-wrap gap-2">
              <FilterButton active={countryFilter === 'all'} onClick={() => setCountryFilter('all')}>
                All Countries
              </FilterButton>
              {countriesWithSchools.map(id => {
                const c = countries.find(c => c.id === id);
                return (
                  <FilterButton key={id} active={countryFilter === id} onClick={() => setCountryFilter(id)}>
                    <Flag countryId={id} size="sm" /> {c?.name ?? id}
                  </FilterButton>
                );
              })}
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-4 text-sm text-gray-500">
            <span>{filtered.length} programs</span>
            <span>{cybersecSchools.length} cybersec</span>
            <span>{mbaSchools.length} MBA</span>
            <span>{new Set(filtered.map(s => s.countryId)).size} countries</span>
          </div>

          {/* Display by field when showing all */}
          {fieldFilter === 'all' ? (
            <>
              {cybersecSchools.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Shield size={18} className="text-primary-600" /> Ruben — Cybersecurity Programs
                  </h3>
                  <SchoolGrid list={cybersecSchools} />
                </div>
              )}
              {mbaSchools.length > 0 && (
                <div>
                  <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Briefcase size={18} className="text-accent-600" /> Charlotte — MBA Programs
                  </h3>
                  <SchoolGrid list={mbaSchools} />
                </div>
              )}
            </>
          ) : (
            <SchoolGrid list={filtered} />
          )}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No programs match your filters</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
        active
          ? 'bg-primary-600 text-white shadow-sm'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
