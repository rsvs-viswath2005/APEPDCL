import { Search } from 'lucide-react';
import { useState } from 'react';

export interface ConsumerEntry {
  sno: number;
  serviceNo: string;
  consumerName: string;
  category: string;
  contractedDemand: string;
  htIncome: string;
}

interface ConsumerTableProps {
  data: ConsumerEntry[];
  activeTab: 'industrial' | 'commercial';
  onConsumerClick?: (entry: ConsumerEntry) => void;
}

const districts = ['VZM', 'AKP', 'VSP', 'ELR', 'EDG'] as const;

export function ConsumerTable({ data, activeTab, onConsumerClick }: ConsumerTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState<string>('ALL');
  const [activePage, setActivePage] = useState(1);

  const filteredData = data.filter((item) => {
    const matchesSearch = item.serviceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const districtCode = item.serviceNo.slice(0, 3).toUpperCase();
    const matchesDistrict = district === 'ALL' || districtCode === district;

    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4">
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 mb-2">
          {activeTab === 'industrial' ? 'Industrial' : 'Commercial'} Consumer List
        </h2>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Service No"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full pl-9 pr-3 py-1.5 text-sm"
            />
          </div>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="glass-select min-w-[150px] px-2.5 py-1.5 text-sm"
          >
            <option value="ALL">All Districts</option>
            {districts.map((districtCode) => (
              <option key={districtCode} value={districtCode}>
                {districtCode}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full glass-table">
          <thead>
            <tr className="border-b border-slate-200/70">
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">S.No</th>
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">Service No</th>
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">Consumer Name</th>
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">Category</th>
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">Contracted Demand</th>
              <th className="text-left py-2 px-3 text-[11px] sm:text-xs font-bold text-slate-700">HT Income</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr
                key={entry.sno}
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
                <td className="py-1.5 px-3 text-xs sm:text-sm text-slate-700">{index + 1}</td>
                <td className="py-1.5 px-3 text-xs sm:text-sm font-semibold text-sky-700">{entry.serviceNo}</td>
                <td className="py-1.5 px-3 text-xs sm:text-sm text-slate-900">{entry.consumerName}</td>
                <td className="py-1.5 px-3 text-xs sm:text-sm text-slate-700">{entry.category}</td>
                <td className="py-1.5 px-3 text-xs sm:text-sm text-slate-700">{entry.contractedDemand}</td>
                <td className="py-1.5 px-3 text-xs sm:text-sm text-slate-700">{entry.htIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => setActivePage(page)}
            className={`glass-pill px-2.5 py-0.5 text-xs sm:text-sm ${
              page === activePage
                ? 'glass-pill-active'
                : ''
            }`}
          >
            {page}
          </button>
        ))}
        <span className="px-2 py-0.5 text-slate-500 text-xs sm:text-sm">...</span>
        <button
          type="button"
          onClick={() => setActivePage(28)}
          className={`glass-pill px-2.5 py-0.5 text-xs sm:text-sm ${activePage === 28 ? 'glass-pill-active' : ''}`}
        >
          28
        </button>
      </div>
    </div>
  );
}
