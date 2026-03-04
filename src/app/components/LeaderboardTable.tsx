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
}

export function LeaderboardTable({ title, data, onViewMore }: LeaderboardTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Position</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service No</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Consumer Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Shifted</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.position} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    entry.position === 1 ? 'bg-yellow-100 text-yellow-700' :
                    entry.position === 2 ? 'bg-gray-100 text-gray-700' :
                    entry.position === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {entry.position}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.serviceNo}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{entry.consumerName}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.totalShifted}</td>
                <td className="py-3 px-4 text-sm font-semibold text-purple-600">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {onViewMore && (
        <div className="mt-4 text-center">
          <button
            onClick={onViewMore}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}