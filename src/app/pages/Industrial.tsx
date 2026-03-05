import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { ConsumerTable, type ConsumerEntry } from '../components/ConsumerTable';

type MonitorTab = 'commercial' | 'industrial';

function getMonitorTab(tabParam: string | null): MonitorTab {
  return tabParam === 'industrial' ? 'industrial' : 'commercial';
}

export function Monitor() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<MonitorTab>(() => getMonitorTab(searchParams.get('tab')));
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(getMonitorTab(searchParams.get('tab')));
  }, [searchParams]);

  const consumerData: ConsumerEntry[] = [
    { sno: 1, serviceNo: 'AKP001', consumerName: 'Smt. Kandregula Durgabai', category: 'COMMERCIAL-HT', contractedDemand: '100 kVA', htIncome: '11' },
    { sno: 2, serviceNo: 'AKP010', consumerName: 'M/s Greenfy India', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '260 kVA', htIncome: '11' },
    { sno: 3, serviceNo: 'VSP003', consumerName: 'M/s INOX Air Products Pvt Ltd', category: 'COMMERCIAL-HT', contractedDemand: '150 kVA', htIncome: '11' },
    { sno: 4, serviceNo: 'VZM004', consumerName: 'M/s Oxygeneca Labs Pvt Ltd', category: 'COMMERCIAL-HT', contractedDemand: '120 kVA', htIncome: '11' },
    { sno: 5, serviceNo: 'ELR005', consumerName: 'M/s Sai Suguna Aqua Products', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '250 kVA', htIncome: '11' },
    { sno: 6, serviceNo: 'EDG006', consumerName: 'M/s Anjani Ready Mix Concrete', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '150 kVA', htIncome: '11' },
    { sno: 7, serviceNo: 'VSP007', consumerName: 'IRCTC', category: 'COMMERCIAL-HT', contractedDemand: '320 kVA', htIncome: '11' },
    { sno: 8, serviceNo: 'VZM008', consumerName: 'Lakshmi Narasimha', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '160 kVA', htIncome: '11' },
    { sno: 9, serviceNo: 'AKP009', consumerName: 'Avanee Refsol Private Ltd', category: 'COMMERCIAL-HT', contractedDemand: '500 kVA', htIncome: '11' },
    { sno: 10, serviceNo: 'ELR011', consumerName: 'M/s KEC International Limited', category: 'COMMERCIAL-HT', contractedDemand: '250 kVA', htIncome: '11' },
    { sno: 11, serviceNo: 'EDG012', consumerName: 'Eastern Metals', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '180 kVA', htIncome: '11' },
  ];

  const tabData = consumerData.filter((item) => {
    if (activeTab === 'industrial') {
      return item.category.toUpperCase().includes('INDUSTRY');
    }

    return item.category.toUpperCase().includes('COMMERCIAL');
  });

  return (
    <div className="dashboard-page">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2 sm:py-3 relative z-10">
        <div className="glass-card rounded-full p-1 inline-flex gap-1.5 mb-2">
          <button
            type="button"
            onClick={() => setActiveTab('commercial')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'commercial'
                ? 'glass-pill-active'
                : 'glass-pill'
            }`}
          >
            Commercial
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('industrial')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'industrial'
                ? 'glass-pill-active'
                : 'glass-pill'
            }`}
          >
            Industrial
          </button>
        </div>

        <ConsumerTable
          data={tabData}
          activeTab={activeTab}
          onConsumerClick={(entry) => {
            const query = new URLSearchParams({
              consumerName: entry.consumerName,
              category: entry.category,
            });

            navigate(`/stats/${entry.serviceNo}?${query.toString()}`);
          }}
        />
      </div>
    </div>
  );
}
