interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  compact?: boolean;
}

export function StatCard({ title, value, subtitle, compact = false }: StatCardProps) {
  return (
    <div className={`glass-card rounded-2xl ${compact ? 'p-2.5 sm:p-3' : 'p-5 sm:p-6'}`}>
      <h3 className={`text-slate-500 uppercase tracking-[0.08em] ${compact ? 'text-[10px] sm:text-[11px] mb-0.5' : 'text-xs sm:text-sm mb-2'}`}>
        {title}
      </h3>
      <p className={`font-extrabold text-slate-900 tracking-tight ${compact ? 'text-lg sm:text-xl leading-tight mb-0' : 'text-2xl sm:text-3xl mb-1'}`}>
        {value}
      </p>
      {subtitle && <p className={`text-slate-500 ${compact ? 'text-xs' : 'text-sm'}`}>{subtitle}</p>}
    </div>
  );
}
