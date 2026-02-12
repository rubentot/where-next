import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { financialDefaults, norwayBudget, norwegianSalary, countryTaxRates } from '../data/financials';
import { countries } from '../data/countries';

export function useFinancialCalc() {
  const { debt, includeMaster, interestRate, repaymentYears, selectedCountry, exchangeRate } = useApp();

  return useMemo(() => {
    const totalDebt = includeMaster ? debt + financialDefaults.masterTopUp : debt;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = repaymentYears * 12;

    // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = monthlyRate > 0
      ? totalDebt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : totalDebt / numPayments;

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - totalDebt;

    // Norway budget (household: both incomes)
    const norwayMonthlyExpenses = Object.values(norwayBudget).reduce((a, b) => a + b, 0);
    const norwayCybersecNet = (norwegianSalary.cybersecGross * (1 - norwegianSalary.taxRate)) / 12;
    const norwayMbaNet = (norwegianSalary.mbaGross * (1 - norwegianSalary.taxRate)) / 12;
    const norwayNetMonthly = norwayCybersecNet + norwayMbaNet;
    const norwaySavings = norwayNetMonthly - norwayMonthlyExpenses - monthlyPayment;

    // Country budget
    const country = countries.find(c => c.id === selectedCountry)!;
    const isNorway = selectedCountry === 'norway';

    // When comparing Norway to Norway, use the same source data
    let countryMonthlyEUR: number;
    let countryMonthlyNOK: number;
    let countryNetMonthlyEUR: number;
    let countryNetMonthlyNOK: number;
    let countryCybersecNetEUR: number;
    let countryMbaNetEUR: number;
    let countryCybersecSalaryEUR: number;
    let countryMbaSalaryEUR: number;
    let countryTax: number;
    let countryBudgetBreakdown: Record<string, number>;

    if (isNorway) {
      countryMonthlyNOK = norwayMonthlyExpenses;
      countryMonthlyEUR = norwayMonthlyExpenses / exchangeRate;
      countryNetMonthlyNOK = norwayNetMonthly;
      countryNetMonthlyEUR = norwayNetMonthly / exchangeRate;
      countryCybersecSalaryEUR = norwegianSalary.cybersecGross / exchangeRate;
      countryMbaSalaryEUR = norwegianSalary.mbaGross / exchangeRate;
      countryCybersecNetEUR = norwayCybersecNet / exchangeRate;
      countryMbaNetEUR = norwayMbaNet / exchangeRate;
      countryTax = norwegianSalary.taxRate;
      countryBudgetBreakdown = {
        rent: norwayBudget.rent / exchangeRate,
        groceries: norwayBudget.groceries / exchangeRate,
        transport: norwayBudget.transport / exchangeRate,
        gym: norwayBudget.gym / exchangeRate,
        eatingOut: norwayBudget.eatingOut / exchangeRate,
        utilities: norwayBudget.utilities / exchangeRate,
        internet: norwayBudget.internet / exchangeRate,
        other: norwayBudget.other / exchangeRate,
      };
    } else {
      const col = country.costOfLiving;
      countryMonthlyEUR = col.rentOneBedroom + col.groceries + col.transport + col.gym + col.eatingOut + col.utilities + col.internet;
      countryMonthlyNOK = countryMonthlyEUR * exchangeRate;
      countryTax = countryTaxRates[selectedCountry] ?? 0.25;
      countryCybersecSalaryEUR = country.jobs.cybersec.avgSalary;
      countryMbaSalaryEUR = country.jobs.mba.avgSalary;
      countryCybersecNetEUR = (countryCybersecSalaryEUR * (1 - countryTax)) / 12;
      countryMbaNetEUR = (countryMbaSalaryEUR * (1 - countryTax)) / 12;
      countryNetMonthlyEUR = countryCybersecNetEUR + countryMbaNetEUR;
      countryNetMonthlyNOK = countryNetMonthlyEUR * exchangeRate;
      countryBudgetBreakdown = {
        rent: col.rentOneBedroom,
        groceries: col.groceries,
        transport: col.transport,
        gym: col.gym,
        eatingOut: col.eatingOut,
        utilities: col.utilities,
        internet: col.internet,
      };
    }

    const countrySavingsNOK = countryNetMonthlyNOK - countryMonthlyNOK - monthlyPayment;

    return {
      totalDebt,
      monthlyPayment,
      totalPaid,
      totalInterest,
      // Norway
      norwayMonthlyExpenses,
      norwayNetMonthly,
      norwayCybersecNet,
      norwayMbaNet,
      norwaySavings,
      norwayBudgetBreakdown: norwayBudget,
      // Country
      country,
      isNorway,
      countryMonthlyEUR,
      countryMonthlyNOK,
      countryNetMonthlyEUR,
      countryNetMonthlyNOK,
      countryCybersecNetEUR,
      countryMbaNetEUR,
      countrySavingsNOK,
      countrySavingsEUR: countrySavingsNOK / exchangeRate,
      countryBudgetBreakdown,
      countryCybersecSalaryEUR,
      countryMbaSalaryEUR,
      countryTax,
    };
  }, [debt, includeMaster, interestRate, repaymentYears, selectedCountry, exchangeRate]);
}
