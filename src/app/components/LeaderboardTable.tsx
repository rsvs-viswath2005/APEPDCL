interface LeaderboardEntry {
  position: number;
  serviceNo: string;
  consumerName: string;
  totalShifted: string;
  score: string;
}

interface LeaderboardTableProps {
  title: string;
  data: LeaderboardEntry[];
  onViewMore?: () => void;
  onConsumerClick?: (entry: LeaderboardEntry) => void;
}

export function LeaderboardTable({ title, data, onViewMore, onConsumerClick }: LeaderboardTableProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full glass-table">
          <thead>
            <tr className="border-b border-slate-200/70">
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Position</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Service No</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Consumer Name</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Total Shifted</th>
              <th className="text-left py-3 px-4 text-xs sm:text-sm font-bold text-slate-700">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr
                key={entry.position}
                className={`border-b border-slate-200/45 transition-colors ${
                  onConsumerClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onConsumerClick?.(entry)}
                onKeyDown={(event) => {
                  if (!onConsumerClick) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onConsumerClick(entry);
                  }
                }}
                role={onConsumerClick ? 'button' : undefined}
                tabIndex={onConsumerClick ? 0 : undefined}
              >
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    entry.position === 1 ? 'bg-amber-100 text-amber-700' :
                    entry.position === 2 ? 'bg-slate-100 text-slate-700' :
                    entry.position === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    {entry.position}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-slate-700">{entry.serviceNo}</td>
                <td className="py-3 px-4 text-sm text-slate-900">{entry.consumerName}</td>
                <td className="py-3 px-4 text-sm text-slate-700">{entry.totalShifted}</td>
                <td className="py-3 px-4 text-sm font-semibold text-sky-700">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {onViewMore && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewMore}
            className="glass-pill glass-pill-active px-6 py-2"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}
