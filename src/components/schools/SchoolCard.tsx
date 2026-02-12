import { ExternalLink, Calendar, Clock, BookOpen, DollarSign, Heart, HeartOff } from 'lucide-react';
import type { School } from '../../types';
import { Flag } from '../shared/Flag';
import { Badge } from '../shared/Badge';
import { countries } from '../../data/countries';
import { schools } from '../../data/schools';
import { getLocation, getLocationLabel } from '../../utils/location';
import { useDegreeCost } from '../../hooks/useDegreeCost';
import { useApp } from '../../context/AppContext';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const country = countries.find(c => c.id === school.countryId);
  const otherField = school.field === 'cybersec' ? 'mba' : 'cybersec';
  const location = getLocation(school);
  const partnerSchools = schools.filter(
    s => s.field === otherField && getLocation(s) === location
  );
  const hasPartner = partnerSchools.length > 0;
  const partnerLabel = school.field === 'cybersec' ? 'Charlotte\'s MBA' : 'Ruben\'s cybersec';
  const locationLabel = getLocationLabel(school);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in hover:shadow-md transition-shadow">
      <div className={`p-4 ${school.field === 'cybersec' ? 'bg-gradient-to-r from-primary-600 to-primary-800' : 'bg-gradient-to-r from-accent-500 to-accent-600'} text-white`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Flag countryId={school.countryId} size="sm" />
              <Badge variant={school.field === 'cybersec' ? 'info' : 'default'}>
                {school.field === 'cybersec' ? 'Cybersecurity' : 'MBA'}
              </Badge>
            </div>
            <h3 className="font-bold text-lg leading-tight">{school.name}</h3>
            <p className="text-sm text-white/80 mt-0.5">{school.city}{country ? `, ${country.name}` : ''}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{school.program}</p>
          {school.ranking && (
            <p className="text-xs text-primary-600 font-medium mt-0.5">{school.ranking}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <InfoItem icon={<DollarSign size={14} />} label="Tuition/yr" value={school.tuitionPerYear === 0 ? 'Free' : `€${school.tuitionPerYear.toLocaleString()}`} />
          <InfoItem icon={<Clock size={14} />} label="Duration" value={school.duration} />
          <InfoItem icon={<BookOpen size={14} />} label="Language" value={school.language} />
          {school.applicationDeadline && (
            <InfoItem icon={<Calendar size={14} />} label="Deadline" value={school.applicationDeadline} />
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Highlights</p>
          <ul className="space-y-1">
            {school.highlights.map((h, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-primary-500 mt-0.5 shrink-0">+</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Degree cost */}
        <DegreeCostSection school={school} />

        {/* Partner match */}
        {hasPartner ? (
          <div className="rounded-lg bg-green-50 border border-green-200 px-3 py-2">
            <div className="flex items-center gap-1.5 text-green-700 text-xs font-semibold mb-1">
              <Heart size={12} className="fill-green-500 text-green-500" /> Can study together in {locationLabel}!
            </div>
            {partnerSchools.map(p => (
              <p key={p.id} className="text-xs text-green-600">
                {partnerLabel}: {p.name} — {p.program}
              </p>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
            <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold">
              <HeartOff size={12} /> No {partnerLabel.toLowerCase()} program in {locationLabel}
            </div>
          </div>
        )}

        <a
          href={school.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Visit program page <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function DegreeCostSection({ school }: { school: School }) {
  const cost = useDegreeCost(school);
  const { currency, exchangeRate } = useApp();

  const fmt = (nok: number) => {
    const v = currency === 'EUR' ? nok / exchangeRate : nok;
    return Math.round(v).toLocaleString('nb-NO') + ` ${currency}`;
  };

  return (
    <div className="bg-blue-50 rounded-lg p-3 space-y-1.5">
      <p className="text-xs font-semibold text-blue-800">
        Total Degree Cost ({cost.durationMonths} months)
      </p>
      <div className="text-sm space-y-0.5">
        <div className="flex justify-between">
          <span className="text-gray-500">Tuition</span>
          <span className="font-medium">{fmt(cost.totalTuitionNOK)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Living costs</span>
          <span className="font-medium">{fmt(cost.totalLivingNOK)}</span>
        </div>
        <hr className="border-blue-200" />
        <div className="flex justify-between font-semibold">
          <span>Total cost</span>
          <span>{fmt(cost.totalCostNOK)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Lånekassen support</span>
          <span className="font-medium text-green-600">-{fmt(cost.lanekassenTotalProgram)}</span>
        </div>
        {cost.lanekassenExtendedPerYear > 0 && (
          <div className="flex justify-between text-xs text-green-500">
            <span>incl. extended grant</span>
            <span>-{fmt(cost.lanekassenExtendedPerYear * cost.durationYears)}/total</span>
          </div>
        )}
        <hr className="border-blue-200" />
        <div className={`flex justify-between font-bold ${cost.netCostNOK <= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span>Net out-of-pocket</span>
          <span>{fmt(cost.netCostNOK)}</span>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-2.5 py-1.5">
      <div className="flex items-center gap-1 text-xs text-gray-400">{icon} {label}</div>
      <div className="text-sm font-medium text-gray-800 mt-0.5">{value}</div>
    </div>
  );
}
