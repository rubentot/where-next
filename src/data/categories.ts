import type { Category, Weights } from '../types';

export const categories: Category[] = [
  { id: 'climate', label: 'Climate', icon: 'Sun', description: 'Weather, temperature, sunshine' },
  { id: 'costOfLiving', label: 'Cost of Living', icon: 'Wallet', description: 'Rent, food, daily expenses' },
  { id: 'careerHis', label: 'Career (Ruben)', icon: 'Shield', description: 'Cybersecurity job market & salary' },
  { id: 'careerHers', label: 'Career (Charlotte)', icon: 'Briefcase', description: 'MBA career prospects & salary' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'Heart', description: 'Nightlife, outdoors, culture, food' },
  { id: 'language', label: 'Language', icon: 'Languages', description: 'English friendliness, barrier' },
  { id: 'distance', label: 'Distance', icon: 'Plane', description: 'Travel time to Norway' },
  { id: 'safety', label: 'Safety', icon: 'ShieldCheck', description: 'Personal safety & stability' },
];

export const defaultWeightsHis: Weights = {
  climate: 8,
  costOfLiving: 7,
  careerHis: 9,
  careerHers: 7,
  lifestyle: 8,
  language: 6,
  distance: 5,
  safety: 6,
};

export const defaultWeightsHers: Weights = {
  climate: 9,
  costOfLiving: 8,
  careerHis: 6,
  careerHers: 8,
  lifestyle: 9,
  language: 7,
  distance: 7,
  safety: 8,
};
