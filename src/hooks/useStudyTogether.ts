import { useMemo } from 'react';
import { schools } from '../data/schools';
import { countries } from '../data/countries';
import { getLocation } from '../utils/location';
import type { School } from '../types';

export interface StudyTogetherPair {
  locationKey: string;
  locationLabel: string;
  countryId: string;
  cybersecSchools: School[];
  mbaSchools: School[];
  combinedMinTuitionPerYear: number;
}

export function useStudyTogether() {
  return useMemo(() => {
    const locationMap = new Map<string, { countryId: string; cybersec: School[]; mba: School[] }>();

    for (const school of schools) {
      const loc = getLocation(school);
      if (!locationMap.has(loc)) {
        locationMap.set(loc, { countryId: school.countryId, cybersec: [], mba: [] });
      }
      const entry = locationMap.get(loc)!;
      if (school.field === 'cybersec') entry.cybersec.push(school);
      else entry.mba.push(school);
    }

    const pairs: StudyTogetherPair[] = [];
    for (const [locKey, entry] of locationMap) {
      if (entry.cybersec.length > 0 && entry.mba.length > 0) {
        const country = countries.find(c => c.id === entry.countryId);
        const locationLabel = country?.name ?? locKey;

        const cheapestCybersec = Math.min(...entry.cybersec.map(s => s.tuitionPerYear));
        const cheapestMba = Math.min(...entry.mba.map(s => s.tuitionPerYear));

        pairs.push({
          locationKey: locKey,
          locationLabel,
          countryId: entry.countryId,
          cybersecSchools: entry.cybersec,
          mbaSchools: entry.mba,
          combinedMinTuitionPerYear: cheapestCybersec + cheapestMba,
        });
      }
    }

    pairs.sort((a, b) => a.combinedMinTuitionPerYear - b.combinedMinTuitionPerYear);
    return pairs;
  }, []);
}
