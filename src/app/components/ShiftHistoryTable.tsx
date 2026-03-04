export interface ShiftEntry {
  dateKey: string;
  date: string;
  time: string;
  shiftedPercent: string;
  value: number;
  points: number;
}

interface ShiftHistoryTableProps {
  data: ShiftEntry[];
  selectedDateKey?: string;
  onSelectDate?: (dateKey: string) => void;
}

export function ShiftHistoryTable({ data, selectedDateKey, onSelectDate }: ShiftHistoryTableProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 mb-1">Shift History</h3>
      <p className="text-xs text-slate-500 mb-4">Click a row to load that day&apos;s usage stats.</p>
      <div className="overflow-x-auto">
        <table className="w-full glass-table">
          <thead>
            <tr className="border-b border-slate-200/70">
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Date</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Time</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Shifted %</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Value</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={entry.dateKey}
                className={`border-b border-gray-100 transition-colors ${
                  selectedDateKey === entry.dateKey
                    ? 'bg-sky-100/50'
                    : 'hover:bg-sky-50/60'
                } ${onSelectDate ? 'cursor-pointer' : ''}`}
                onClick={() => onSelectDate?.(entry.dateKey)}
                onKeyDown={(event) => {
                  if (!onSelectDate) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectDate(entry.dateKey);
                  }
                }}
                role={onSelectDate ? 'button' : undefined}
                tabIndex={onSelectDate ? 0 : undefined}
              >
                <td className="py-3 px-4 text-sm text-slate-700">{entry.date}</td>
                <td className="py-3 px-4 text-sm text-slate-700">{entry.time}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {entry.shiftedPercent}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-900">{entry.value}</td>
                <td className="py-3 px-4 text-sm font-semibold text-sky-700">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
