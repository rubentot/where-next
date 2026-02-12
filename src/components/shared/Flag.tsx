import ES from 'country-flag-icons/react/3x2/ES';
import PT from 'country-flag-icons/react/3x2/PT';
import NL from 'country-flag-icons/react/3x2/NL';
import IT from 'country-flag-icons/react/3x2/IT';
import EE from 'country-flag-icons/react/3x2/EE';
import SG from 'country-flag-icons/react/3x2/SG';
import NO from 'country-flag-icons/react/3x2/NO';
import DE from 'country-flag-icons/react/3x2/DE';
import GB from 'country-flag-icons/react/3x2/GB';
import US from 'country-flag-icons/react/3x2/US';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flagMap: Record<string, React.ComponentType<any>> = {
  spain: ES,
  portugal: PT,
  netherlands: NL,
  italy: IT,
  estonia: EE,
  singapore: SG,
  norway: NO,
  germany: DE,
  uk: GB,
  usa: US,
};

interface FlagProps {
  countryId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-5 h-3.5',
  md: 'w-7 h-5',
  lg: 'w-9 h-6',
};

export function Flag({ countryId, size = 'md', className = '' }: FlagProps) {
  const FlagIcon = flagMap[countryId];
  if (!FlagIcon) return null;
  return (
    <FlagIcon
      className={`inline-block rounded-sm ${sizes[size]} ${className}`}
      aria-label={`${countryId} flag`}
    />
  );
}
