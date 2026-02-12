import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="bg-primary-600 text-white p-2 rounded-xl">
          <MapPin size={24} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Where Next?</h1>
          <p className="text-sm text-gray-500 hidden sm:block">Find your next home together</p>
        </div>
      </div>
    </header>
  );
}
