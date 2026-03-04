import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { TariffChart } from '../components/TariffChart';
import { ShiftHistoryTable } from '../components/ShiftHistoryTable';
import { Clock } from 'lucide-react';

export function Tariff() {
  // Consumption Chart Data
  const consumptionData = [
    { hour: 0, baseline: 35, actual: 30 },
    { hour: 1, baseline: 12, actual: 10 },
    { hour: 2, baseline: 18, actual: 15 },
    { hour: 3, baseline: 28, actual: 22 },
    { hour: 4, baseline: 30, actual: 24 },
    { hour: 5, baseline: 15, actual: 12 },
    { hour: 6, baseline: 22, actual: 20 },
    { hour: 7, baseline: 25, actual: 35 },
    { hour: 8, baseline: 28, actual: 40 },
    { hour: 9, baseline: 26, actual: 32 },
    { hour: 10, baseline: 24, actual: 28 },
    { hour: 11, baseline: 23, actual: 25 },
    { hour: 12, baseline: 22, actual: 22 },
    { hour: 13, baseline: 20, actual: 21 },
    { hour: 14, baseline: 18, actual: 23 },
    { hour: 15, baseline: 19, actual: 26 },
    { hour: 16, baseline: 21, actual: 28 },
    { hour: 17, baseline: 25, actual: 30 },
    { hour: 18, baseline: 28, actual: 38 },
    { hour: 19, baseline: 30, actual: 42 },
    { hour: 20, baseline: 26, actual: 35 },
    { hour: 21, baseline: 20, actual: 22 },
    { hour: 22, baseline: 15, actual: 12 },
    { hour: 23, baseline: 10, actual: 5 },
  ];

  // Shift History Data
  const shiftHistory = [
    { date: '2025-06-04', time: '08:30 PM', shiftedPercent: '19%', value: 128, points: 250 },
    { date: '2025-06-03', time: '06:00 PM', shiftedPercent: '20%', value: 145, points: 310 },
    { date: '2025-06-05', time: '08:45 AM', shiftedPercent: '22%', value: 148, points: 370 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Normal Tariff Active</h2>
          </div>
          <p className="text-lg">(15:00–18:00 & 22:00–24:00)</p>
          <p className="text-3xl font-bold mt-2">₹6.3 per unit</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Cost Saved" value="₹35,123" />
          <StatCard title="Total Units Saved" value="540 kWh" />
          <StatCard title="Morning Peak Hour" value="₹3,123" subtitle="160 kWh" />
          <StatCard title="Evening Peak Hour" value="₹1,312" subtitle="60 kWh" />
        </div>

        {/* Consumption Chart */}
        <div className="mb-8">
          <TariffChart data={consumptionData} />
        </div>

        {/* Shift History Table */}
        <ShiftHistoryTable data={shiftHistory} />
      </div>
    </div>
  );
}
