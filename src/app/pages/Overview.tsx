import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { PieChartCard } from '../components/PieChartCard';
import { LineChartCard } from '../components/LineChartCard';
import { BarChartCard } from '../components/BarChartCard';
import { LeaderboardTable } from '../components/LeaderboardTable';
import { DateRangePicker } from '../components/DateRangePicker';

type TabType = 'all' | 'industrial' | 'commercial';

export function Overview() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [startDate, setStartDate] = useState(new Date('2025-12-27'));
  const [endDate, setEndDate] = useState(new Date('2026-01-25'));
  const navigate = useNavigate();

  const handleDateChange = (newStartDate: Date, newEndDate: Date) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Generate random data based on tab and date
  const getRandomData = (base: number, variance: number, seed: string) => {
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return base + ((hash % variance) - variance / 2);
  };

  const dateSeed = `${startDate.getTime()}-${endDate.getTime()}-${activeTab}`;

  // Stats data that changes based on tab and date
  const statsData = {
    all: {
      activeParticipants: getRandomData(5943, 900, dateSeed + 'ap'),
      totalPeakUnits: getRandomData(94822.20, 8500, dateSeed + 'tpu').toFixed(2),
      shiftedPeakUnits: getRandomData(7402.0, 900, dateSeed + 'spu').toFixed(1),
      participationRate: getRandomData(69, 14, dateSeed + 'pr'),
    },
    industrial: {
      activeParticipants: getRandomData(2798, 500, dateSeed + 'ap'),
      totalPeakUnits: getRandomData(43587.70, 5000, dateSeed + 'tpu').toFixed(2),
      shiftedPeakUnits: getRandomData(3278.2, 500, dateSeed + 'spu').toFixed(1),
      participationRate: getRandomData(67, 20, dateSeed + 'pr'),
    },
    commercial: {
      activeParticipants: getRandomData(3145, 600, dateSeed + 'ap'),
      totalPeakUnits: getRandomData(51234.50, 6000, dateSeed + 'tpu').toFixed(2),
      shiftedPeakUnits: getRandomData(4123.8, 600, dateSeed + 'spu').toFixed(1),
      participationRate: getRandomData(72, 20, dateSeed + 'pr'),
    },
  };

  const currentStats = statsData[activeTab];

  // Pie Chart Data - varies by tab
  const consumerTypesData = activeTab === 'all'
    ? [
        { name: 'Industrial', value: getRandomData(46, 10, dateSeed + 'all-i') },
        { name: 'Commercial', value: getRandomData(40, 10, dateSeed + 'all-c') },
        { name: 'Public', value: getRandomData(8, 5, dateSeed + 'all-p') },
        { name: 'Others', value: getRandomData(6, 4, dateSeed + 'all-o') },
      ]
    : activeTab === 'industrial' 
    ? [
        { name: 'Manufacturing', value: getRandomData(36, 10, dateSeed + 'm') },
        { name: 'Agro', value: getRandomData(34, 10, dateSeed + 'a') },
        { name: 'Food', value: getRandomData(20, 10, dateSeed + 'f') },
        { name: 'Others', value: getRandomData(10, 5, dateSeed + 'o') },
      ]
    : [
        { name: 'Retail', value: getRandomData(42, 10, dateSeed + 'r') },
        { name: 'Offices', value: getRandomData(28, 10, dateSeed + 'of') },
        { name: 'Hospitality', value: getRandomData(18, 8, dateSeed + 'h') },
        { name: 'Others', value: getRandomData(12, 6, dateSeed + 'ot') },
      ];

  const pieColors = ['#1fc7b6', '#6f47c7', '#1fc7b6', '#6f47c7'];

  // Peak Analytics Line Chart Data - all 24 hours with realistic pattern
  const basePattern = [200, 180, 170, 180, 220, 280, 380, 460, 520, 480, 420, 400, 380, 370, 380, 390, 410, 430, 450, 440, 410, 360, 300, 240];
  const peakAnalyticsData = basePattern.map((base, i) => ({
    hour: String(i).padStart(2, '0'),
    withResponse: getRandomData(base - 30, 40, dateSeed + 'wr' + i),
    withoutResponse: getRandomData(base, 40, dateSeed + 'wor' + i),
  }));

  const lineChartLines = [
    { key: 'withResponse', color: '#1fc7b6', name: 'With Response' },
    { key: 'withoutResponse', color: '#6f47c7', name: 'Without Response' },
  ];

  // Daily Performance Bar Chart Data - varies by date
  const dailyPerformanceData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
    day,
    dailyConsumption: getRandomData(30 + i * 15, 40, dateSeed + 'dc' + i),
    peakShifted: getRandomData(20 + i * 12, 30, dateSeed + 'ps' + i),
  }));

  const barChartBars = [
    { key: 'dailyConsumption', color: '#1fc7b6', name: 'Daily Consumption' },
    { key: 'peakShifted', color: '#6f47c7', name: 'Peak Shifted' },
  ];

  // Industrial Leaderboard Data - varies by date
  const industrialLeaderboard = [
    { position: 1, serviceNo: 'AKP010', consumerName: 'M/s Greenfy India', totalShifted: `${getRandomData(49.4, 10, dateSeed + 'il1').toFixed(1)} MWh`, score: `${getRandomData(621.1, 50, dateSeed + 'il1s').toFixed(1)}` },
    { position: 2, serviceNo: 'EGD053', consumerName: 'SRI SURYA CONS PVT LTD', totalShifted: `${getRandomData(32.4, 8, dateSeed + 'il2').toFixed(1)} MWh`, score: `${getRandomData(602.2, 45, dateSeed + 'il2s').toFixed(1)}` },
    { position: 3, serviceNo: 'ERI105', consumerName: 'M/s Sri Durga Aqua', totalShifted: `${getRandomData(30.7, 7, dateSeed + 'il3').toFixed(1)} MWh`, score: `${getRandomData(590.7, 40, dateSeed + 'il3s').toFixed(1)}` },
    { position: 4, serviceNo: 'ERI183', consumerName: 'V V R Agro Industry', totalShifted: `${getRandomData(27.6, 6, dateSeed + 'il4').toFixed(1)} MWh`, score: `${getRandomData(585.3, 40, dateSeed + 'il4s').toFixed(1)}` },
    { position: 5, serviceNo: 'ERI257', consumerName: 'M/s Anande Fisheries', totalShifted: `${getRandomData(24.9, 5, dateSeed + 'il5').toFixed(1)} MWh`, score: `${getRandomData(573.1, 35, dateSeed + 'il5s').toFixed(1)}` },
  ];

  // Commercial Leaderboard Data - varies by date
  const commercialLeaderboard = [
    { position: 1, serviceNo: 'AKP020', consumerName: 'Avanee Refol Private Ltd', totalShifted: `${getRandomData(67.2, 12, dateSeed + 'cl1').toFixed(1)} MWh`, score: `${getRandomData(721.1, 60, dateSeed + 'cl1s').toFixed(1)}` },
    { position: 2, serviceNo: 'AKP046', consumerName: 'M/s Arif Exports', totalShifted: `${getRandomData(56.4, 10, dateSeed + 'cl2').toFixed(1)} MWh`, score: `${getRandomData(682.2, 55, dateSeed + 'cl2s').toFixed(1)}` },
    { position: 3, serviceNo: 'EGD018', consumerName: 'M/s Commissioner', totalShifted: `${getRandomData(49.7, 9, dateSeed + 'cl3').toFixed(1)} MWh`, score: `${getRandomData(670.7, 50, dateSeed + 'cl3s').toFixed(1)}` },
    { position: 4, serviceNo: 'EGD029', consumerName: 'SRI MAGANTI KIRAN', totalShifted: `${getRandomData(47.6, 8, dateSeed + 'cl4').toFixed(1)} MWh`, score: `${getRandomData(665.3, 48, dateSeed + 'cl4s').toFixed(1)}` },
    { position: 5, serviceNo: 'ERI044', consumerName: 'Imperial Hospital', totalShifted: `${getRandomData(46.9, 8, dateSeed + 'cl5').toFixed(1)} MWh`, score: `${getRandomData(653.1, 45, dateSeed + 'cl5s').toFixed(1)}` },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 sm:py-3 relative z-10">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 mb-2">
          <StatCard compact title="Active Participants" value={currentStats.activeParticipants} />
          <StatCard compact title="Total Peak Units" value={`${currentStats.totalPeakUnits} kWh`} />
          <StatCard compact title="Shifted Peak Units" value={`${currentStats.shiftedPeakUnits} h`} />
          <StatCard compact title="Participation Rate" value={`${currentStats.participationRate}%`} />
        </div>

        {/* Tabs and Date Picker */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-3">
          <div className="glass-card flex gap-2 rounded-full p-1.5 w-fit">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                activeTab === 'all'
                  ? 'glass-pill-active'
                  : 'glass-pill'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('industrial')}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                activeTab === 'industrial'
                  ? 'glass-pill-active'
                  : 'glass-pill'
              }`}
            >
              Industrial
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                activeTab === 'commercial'
                  ? 'glass-pill-active'
                  : 'glass-pill'
              }`}
            >
              Commercial
            </button>
          </div>

          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
        </div>

        {/* Energy Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-3">
          <PieChartCard
            title="Types of Consumers"
            data={consumerTypesData}
            colors={pieColors}
            centerText={`Total active users: ${currentStats.activeParticipants}`}
          />
          <LineChartCard
            title="Peak Analytics: Total vs Shift"
            data={peakAnalyticsData}
            lines={lineChartLines}
          />
          <BarChartCard
            title="Daily Performance"
            data={dailyPerformanceData}
            bars={barChartBars}
          />
          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center justify-center">
            <p className="text-slate-500 text-lg font-semibold">Reserved for Future Analytics</p>
          </div>
        </div>

        {/* Energy Leaderboards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <LeaderboardTable
            title="Industrial Consumer Leaderboard"
            data={industrialLeaderboard}
            onViewMore={() => navigate('/monitor?tab=industrial')}
            onConsumerClick={(entry) => {
              const query = new URLSearchParams({
                consumerName: entry.consumerName,
                category: 'INDUSTRY (GENERAL)-HT',
              });
              navigate(`/stats/${entry.serviceNo}?${query.toString()}`);
            }}
          />
          <LeaderboardTable
            title="Commercial Consumer Leaderboard"
            data={commercialLeaderboard}
            onViewMore={() => navigate('/monitor?tab=commercial')}
            onConsumerClick={(entry) => {
              const query = new URLSearchParams({
                consumerName: entry.consumerName,
                category: 'COMMERCIAL-HT',
              });
              navigate(`/stats/${entry.serviceNo}?${query.toString()}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
