import { Search } from 'lucide-react';
import { useState } from 'react';

interface ConsumerEntry {
  sno: number;
  serviceNo: string;
  consumerName: string;
  category: string;
  contractedDemand: string;
  htIncome: string;
}

interface ConsumerTableProps {
  data: ConsumerEntry[];
}

export function ConsumerTable({ data }: ConsumerTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.serviceNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Industrial Consumer List</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by Service No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">S.No</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service No</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Consumer Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contracted Demand</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">HT Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry) => (
              <tr key={entry.sno} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{entry.sno}</td>
                <td className="py-3 px-4 text-sm font-medium text-purple-600">{entry.serviceNo}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{entry.consumerName}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.category}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.contractedDemand}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{entry.htIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === 1
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-3 py-1 text-gray-500">...</span>
        <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded">
          28
        </button>
      </div>
    </div>
  );
}
