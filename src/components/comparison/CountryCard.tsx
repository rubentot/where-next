import { Thermometer, Wallet, Briefcase, Globe, Plane, Shield, FileCheck } from 'lucide-react';
import type { Country } from '../../types';
import { ScoreBar } from '../shared/ScoreBar';
import { Badge } from '../shared/Badge';
import { Flag } from '../shared/Flag';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const { climate, costOfLiving, jobs, lifestyle, language, distance } = country;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Flag countryId={country.id} size="lg" />
              {country.name}
            </h3>
            <p className="text-sm text-white/80">{country.cities.join(' / ')}</p>
          </div>
          <Badge variant="info">COL Index: {costOfLiving.index}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Climate */}
        <Section icon={<Thermometer size={16} />} title="Climate">
          <p className="text-sm text-gray-600">{climate.description}</p>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <Stat label="Summer" value={`${climate.avgTempSummer}°C`} />
            <Stat label="Winter" value={`${climate.avgTempWinter}°C`} />
            <Stat label="Sun" value={`${climate.sunnyDays}d`} />
          </div>
        </Section>

        {/* Cost of Living */}
        <Section icon={<Wallet size={16} />} title="Monthly Costs (EUR)">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <CostRow label="Rent (1BR)" value={costOfLiving.rentOneBedroom} />
            <CostRow label="Groceries" value={costOfLiving.groceries} />
            <CostRow label="Transport" value={costOfLiving.transport} />
            <CostRow label="Eating out" value={costOfLiving.eatingOut} />
            <CostRow label="Utilities" value={costOfLiving.utilities} />
            <CostRow label="Gym" value={costOfLiving.gym} />
          </div>
        </Section>

        {/* Careers */}
        <Section icon={<Briefcase size={16} />} title="Job Market">
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Cybersecurity</span>
                <span className="text-gray-500">{jobs.cybersec.avgSalary.toLocaleString()} EUR/yr</span>
              </div>
              <ScoreBar value={jobs.cybersec.demand} label="Demand" color="bg-primary-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">MBA Career</span>
                <span className="text-gray-500">{jobs.mba.avgSalary.toLocaleString()} EUR/yr</span>
              </div>
              <ScoreBar value={jobs.mba.demand} label="Demand" color="bg-accent-500" />
            </div>
          </div>
        </Section>

        {/* Lifestyle */}
        <Section icon={<Globe size={16} />} title="Lifestyle">
          <p className="text-sm text-gray-600 mb-2">{lifestyle.description}</p>
          <div className="space-y-1">
            <ScoreBar value={lifestyle.nightlife} label="Nightlife" />
            <ScoreBar value={lifestyle.outdoors} label="Outdoors" />
            <ScoreBar value={lifestyle.culture} label="Culture" />
            <ScoreBar value={lifestyle.food} label="Food" />
            <ScoreBar value={lifestyle.expat} label="Expat" color="bg-accent-500" />
          </div>
        </Section>

        {/* Language */}
        <Section icon={<Globe size={16} />} title="Language">
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Official:</span> {language.official}</p>
            <p className="mt-1">{language.notes}</p>
          </div>
          <div className="mt-2 space-y-1">
            <ScoreBar value={language.englishLevel} label="English" color="bg-success-500" />
            <ScoreBar value={10 - language.barrier} label="Ease" color="bg-success-500" />
          </div>
        </Section>

        {/* Distance */}
        <Section icon={<Plane size={16} />} title="Distance from Oslo">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label="Distance" value={`${distance.fromOslo.toLocaleString()} km`} />
            <Stat label="Flight" value={`${distance.flightHours}h`} />
            <Stat label="Direct" value={distance.directFlights ? 'Yes' : 'No'} />
          </div>
        </Section>

        {/* Visa & Work Rights */}
        <Section icon={<FileCheck size={16} />} title="Visa & Work Rights">
          <div className="mb-2">
            {country.visa.visaRequired ? (
              <Badge variant="warning">Visa Required</Badge>
            ) : (
              <Badge variant="success">No Visa Needed</Badge>
            )}
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Student visa:</span> {country.visa.visaType}</p>
            <p><span className="font-medium">Work while studying:</span> {country.visa.workWhileStudying}</p>
            <p><span className="font-medium">Post-study work:</span> {country.visa.postStudyWork}</p>
            <p><span className="font-medium">Path to PR:</span> {country.visa.pathToPR}</p>
            {country.visa.notes && (
              <p className="text-xs text-gray-400 mt-1 italic">{country.visa.notes}</p>
            )}
          </div>
        </Section>

        {/* Safety & Adventure */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
              <Shield size={14} /> Safety
            </div>
            <ScoreBar value={country.safety} color="bg-success-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
              <Globe size={14} /> Adventure
            </div>
            <ScoreBar value={country.adventure} color="bg-warning-500" />
          </div>
        </div>

        {/* Tuition */}
        <div className="bg-gray-50 rounded-lg p-3 text-sm">
          <span className="font-medium">Master's tuition:</span> ~{country.tuition.masterPerYear.toLocaleString()} EUR/year
          <p className="text-gray-500 text-xs mt-0.5">{country.tuition.notes}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 mb-2">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value.toLocaleString()}</span>
    </div>
  );
}
