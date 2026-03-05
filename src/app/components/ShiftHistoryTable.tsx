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
  compact?: boolean;
  maxBodyHeightClassName?: string;
}

export function ShiftHistoryTable({
  data,
  selectedDateKey,
  onSelectDate,
  compact = false,
  maxBodyHeightClassName,
}: ShiftHistoryTableProps) {
  return (
    <div className={`glass-card rounded-2xl ${compact ? 'p-3 sm:p-4' : 'p-4 sm:p-6'}`}>
      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-extrabold tracking-tight text-slate-900 mb-1`}>Shift History</h3>
      <p className={`text-xs text-slate-500 ${compact ? 'mb-2' : 'mb-4'}`}>Click a row to load that day&apos;s usage stats.</p>
      <div className={`overflow-x-auto overflow-y-auto ${maxBodyHeightClassName ?? ''}`}>
        <table className="w-full glass-table">
          <thead>
            <tr className="border-b border-slate-200/70">
              <th className={`text-left whitespace-nowrap ${compact ? 'py-2 px-2.5 text-[12.5px] sm:text-[13.5px]' : 'py-3 px-4 text-xs sm:text-sm'} font-bold text-slate-700`}>Date</th>
              <th className={`text-left whitespace-nowrap ${compact ? 'py-2 px-2.5 text-[12.5px] sm:text-[13.5px]' : 'py-3 px-4 text-xs sm:text-sm'} font-bold text-slate-700`}>Time</th>
              <th className={`text-left whitespace-nowrap ${compact ? 'py-2 px-2.5 text-[12.5px] sm:text-[13.5px]' : 'py-3 px-4 text-xs sm:text-sm'} font-bold text-slate-700`}>Shifted %</th>
              <th className={`text-left whitespace-nowrap ${compact ? 'py-2 px-2.5 text-[12.5px] sm:text-[13.5px]' : 'py-3 px-4 text-xs sm:text-sm'} font-bold text-slate-700`}>Value</th>
              <th className={`text-left whitespace-nowrap ${compact ? 'py-2 px-2.5 text-[12.5px] sm:text-[13.5px]' : 'py-3 px-4 text-xs sm:text-sm'} font-bold text-slate-700`}>Points</th>
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
                <td className={`${compact ? 'py-1.5 px-2.5 text-[13.5px]' : 'py-3 px-4 text-sm'} whitespace-nowrap text-slate-700`}>{entry.date}</td>
                <td className={`${compact ? 'py-1.5 px-2.5 text-[13.5px]' : 'py-3 px-4 text-sm'} whitespace-nowrap text-slate-700`}>{entry.time}</td>
                <td className={compact ? 'py-1.5 px-2.5' : 'py-3 px-4'}>
                  <span className={`inline-flex items-center ${compact ? 'px-1.5 py-0.5 text-[11.5px]' : 'px-2 py-1 text-xs'} rounded-full font-medium bg-emerald-100 text-emerald-700`}>
                    {entry.shiftedPercent}
                  </span>
                </td>
                <td className={`${compact ? 'py-1.5 px-2.5 text-[13.5px]' : 'py-3 px-4 text-sm'} whitespace-nowrap text-slate-900`}>{entry.value}</td>
                <td className={`${compact ? 'py-1.5 px-2.5 text-[13.5px]' : 'py-3 px-4 text-sm'} whitespace-nowrap font-semibold text-sky-700`}>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
