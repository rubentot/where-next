import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { countries } from '../data/countries';
import type { Weights, CategoryScores, ViewMode } from '../types';

interface CountryResult {
  id: string;
  name: string;
  flag: string;
  totalScore: number;
  scores: CategoryScores;
  weightedScores: Record<keyof CategoryScores, number>;
}

function computeWeightedScores(scores: CategoryScores, weights: Weights): Record<keyof CategoryScores, number> {
  const keys = Object.keys(scores) as (keyof CategoryScores)[];
  const result = {} as Record<keyof CategoryScores, number>;
  for (const key of keys) {
    result[key] = scores[key] * weights[key];
  }
  return result;
}

function computeTotal(weightedScores: Record<keyof CategoryScores, number>): number {
  return Object.values(weightedScores).reduce((a, b) => a + b, 0);
}

function combineWeights(a: Weights, b: Weights): Weights {
  const keys = Object.keys(a) as (keyof Weights)[];
  const result = {} as Weights;
  for (const key of keys) {
    result[key] = (a[key] + b[key]) / 2;
  }
  return result;
}

export function useDecisionMatrix() {
  const { weightsHis, weightsHers, viewMode, enabledCountries } = useApp();

  return useMemo(() => {
    const weights: Weights = viewMode === 'his'
      ? weightsHis
      : viewMode === 'hers'
        ? weightsHers
        : combineWeights(weightsHis, weightsHers);

    const maxPossible = Object.values(weights).reduce((a, b) => a + b * 10, 0);

    const results: CountryResult[] = countries
      .filter(c => enabledCountries.has(c.id))
      .map(c => {
        const weightedScores = computeWeightedScores(c.scores, weights);
        return {
          id: c.id,
          name: c.name,
          flag: c.flag,
          totalScore: computeTotal(weightedScores),
          scores: c.scores,
          weightedScores,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    const winner = results[0] ?? null;

    return { results, winner, weights, maxPossible, viewMode: viewMode as ViewMode };
  }, [weightsHis, weightsHers, viewMode, enabledCountries]);
}
