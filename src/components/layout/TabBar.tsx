import { Globe, Calculator, Target, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabId } from '../../types';

const tabs: { id: TabId; label: string; icon: typeof Globe }[] = [
  { id: 'comparison', label: 'Compare', icon: Globe },
  { id: 'calculator', label: 'Finances', icon: Calculator },
  { id: 'matrix', label: 'Decision', icon: Target },
  { id: 'schools', label: 'Schools', icon: GraduationCap },
];

export function TabBar() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
