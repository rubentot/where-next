interface ScoreBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ScoreBar({ value, max = 10, label, color = 'bg-primary-500' }: ScoreBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-xs text-gray-500 w-20 shrink-0">{label}</span>}
      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-6 text-right">{value}</span>
    </div>
  );
}
