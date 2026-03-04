import { Navbar } from '../components/Navbar';
import { ConsumerTable } from '../components/ConsumerTable';

export function Industrial() {
  const consumerData = [
    { sno: 1, serviceNo: 'AKP001', consumerName: 'Smt. Kandregula Durgabai', category: 'COMMERCIAL-HT', contractedDemand: '100 kVA', htIncome: '11' },
    { sno: 2, serviceNo: 'AKP002', consumerName: 'Sri Pedireddy Venkata Suryanarayana', category: 'COMMERCIAL-HT', contractedDemand: '120 kVA', htIncome: '11' },
    { sno: 3, serviceNo: 'AKP004', consumerName: 'M/s INOX Air Products Pvt Ltd', category: 'COMMERCIAL-HT', contractedDemand: '150 kVA', htIncome: '11' },
    { sno: 4, serviceNo: 'AKP009', consumerName: 'M/s Oxygeneca Labs Pvt Ltd', category: 'COMMERCIAL-HT', contractedDemand: '120 kVA', htIncome: '11' },
    { sno: 5, serviceNo: 'AKP010', consumerName: 'M/s Greenfy India', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '260 kVA', htIncome: '11' },
    { sno: 6, serviceNo: 'AKP011', consumerName: 'M/s Anjani Ready Mix Concrete', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '150 kVA', htIncome: '11' },
    { sno: 7, serviceNo: 'AKP016', consumerName: 'IRCTC', category: 'COMMERCIAL-HT', contractedDemand: '320 kVA', htIncome: '11' },
    { sno: 8, serviceNo: 'AKP018', consumerName: 'Lakshmi Narasimha', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '160 kVA', htIncome: '11' },
    { sno: 9, serviceNo: 'AKP020', consumerName: 'Avanee Refsol Private Ltd', category: 'COMMERCIAL-HT', contractedDemand: '500 kVA', htIncome: '11' },
    { sno: 10, serviceNo: 'AKP022', consumerName: 'M/s Sai Suguna Aqua Products', category: 'INDUSTRY (GENERAL)-HT', contractedDemand: '250 kVA', htIncome: '11' },
    { sno: 11, serviceNo: 'AKP023', consumerName: 'M/s KEC International Limited', category: 'COMMERCIAL-HT', contractedDemand: '250 kVA', htIncome: '11' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <ConsumerTable data={consumerData} />
      </div>
    </div>
  );
}
