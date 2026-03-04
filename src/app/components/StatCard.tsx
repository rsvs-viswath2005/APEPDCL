interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 sm:p-6">
      <h3 className="text-slate-500 text-xs sm:text-sm uppercase tracking-[0.08em] mb-2">{title}</h3>
      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">{value}</p>
      {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
    </div>
  );
}
