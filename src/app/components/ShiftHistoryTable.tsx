interface ShiftEntry {
  date: string;
  time: string;
  shiftedPercent: string;
  value: number;
  points: number;
}

interface ShiftHistoryTableProps {
  data: ShiftEntry[];
}

export function ShiftHistoryTable({ data }: ShiftHistoryTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shift History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Shifted %</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{entry.date}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.time}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {entry.shiftedPercent}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">{entry.value}</td>
                <td className="py-3 px-4 text-sm font-semibold text-purple-600">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
