import type { School } from '../types';
import { countries } from '../data/countries';

/** Get a location key for grouping — simply the countryId. */
export function getLocation(school: School): string {
  return school.countryId;
}

/** Get a human-readable location label. */
export function getLocationLabel(school: School): string {
  const c = countries.find(c => c.id === school.countryId);
  return c?.name ?? school.countryId;
}
