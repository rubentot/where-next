import type { School } from '../types';
import { countries } from '../data/countries';

export const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

/** Get a location key for grouping: US state abbreviation or countryId. */
export function getLocation(school: School): string {
  if (school.countryId === 'usa') {
    const parts = school.city.split(', ');
    return parts.length > 1 ? parts[parts.length - 1].trim() : school.city;
  }
  return school.countryId;
}

/** Get a human-readable location label. */
export function getLocationLabel(school: School): string {
  if (school.countryId === 'usa') {
    const parts = school.city.split(', ');
    if (parts.length > 1) {
      const stateAbbr = parts[parts.length - 1].trim();
      return US_STATE_NAMES[stateAbbr] ?? stateAbbr;
    }
    return school.city;
  }
  const c = countries.find(c => c.id === school.countryId);
  return c?.name ?? school.countryId;
}
