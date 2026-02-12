import { useApp } from '../../context/AppContext';

interface FormatNumberProps {
  nok: number;
  showCurrency?: boolean;
  decimals?: number;
}

export function FormatNumber({ nok, showCurrency = true, decimals = 0 }: FormatNumberProps) {
  const { currency, exchangeRate } = useApp();
  const value = currency === 'NOK' ? nok : nok / exchangeRate;
  const formatted = Math.round(value).toLocaleString('nb-NO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return <>{formatted}{showCurrency ? ` ${currency}` : ''}</>;
}

export function formatNOK(value: number): string {
  return Math.round(value).toLocaleString('nb-NO') + ' NOK';
}

export function formatEUR(value: number): string {
  return Math.round(value).toLocaleString('nb-NO') + ' EUR';
}

export function useFormatCurrency() {
  const { currency, exchangeRate } = useApp();
  return (nok: number) => {
    const value = currency === 'NOK' ? nok : nok / exchangeRate;
    return Math.round(value).toLocaleString('nb-NO') + ` ${currency}`;
  };
}
