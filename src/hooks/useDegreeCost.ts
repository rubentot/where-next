import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { countries } from '../data/countries';
import { lanekassen } from '../data/financials';
import { parseDurationMonths } from '../utils/duration';
import type { School } from '../types';

export interface DegreeCostBreakdown {
  durationMonths: number;
  durationYears: number;
  totalTuitionNOK: number;
  totalLivingNOK: number;
  totalCostNOK: number;
  lanekassenTotalPerYear: number;
  lanekassenTotalProgram: number;
  lanekassenExtendedPerYear: number;
  netCostNOK: number;
}

export function useDegreeCost(school: School): DegreeCostBreakdown {
  const { exchangeRate } = useApp();

  return useMemo(() => {
    const durationMonths = parseDurationMonths(school.duration);
    const durationYears = durationMonths / 12;
    const country = countries.find(c => c.id === school.countryId);
    const col = country?.costOfLiving;
    const isNorway = school.countryId === 'norway';

    // Tuition
    const totalTuitionNOK = school.tuitionPerYear * durationYears * exchangeRate;

    // Living costs
    const monthlyLivingEUR = col
      ? col.rentOneBedroom + col.groceries + col.transport + col.gym + col.eatingOut + col.utilities + col.internet
      : 0;
    const totalLivingNOK = monthlyLivingEUR * durationMonths * exchangeRate;

    const totalCostNOK = totalTuitionNOK + totalLivingNOK;

    // Lanekassen
    const tuitionSupportPerYear = isNorway ? 0 : Math.min(
      school.tuitionPerYear * exchangeRate,
      lanekassen.tuitionSupportMaxPerYear,
    );
    const extendedPerYear = school.extendedGrant ? lanekassen.extendedGrantPerYear : 0;
    const lanekassenTotalPerYear = lanekassen.baseSupportPerYear + tuitionSupportPerYear + extendedPerYear;
    const lanekassenTotalProgram = lanekassenTotalPerYear * durationYears;

    const netCostNOK = totalCostNOK - lanekassenTotalProgram;

    return {
      durationMonths,
      durationYears,
      totalTuitionNOK,
      totalLivingNOK,
      totalCostNOK,
      lanekassenTotalPerYear,
      lanekassenTotalProgram,
      lanekassenExtendedPerYear: extendedPerYear,
      netCostNOK,
    };
  }, [school, exchangeRate]);
}
