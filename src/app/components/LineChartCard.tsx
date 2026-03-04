import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea, Label } from 'recharts';

interface LineChartCardProps {
  title: string;
  data: any[];
  lines: { key: string; color: string; name: string }[];
}

export function LineChartCard({ title, data, lines }: LineChartCardProps) {
  // Calculate peak values
  const amPeakData = data.slice(6, 10); // Hours 6-9
  const pmPeakData = data.slice(18, 22); // Hours 18-21
  
  const amPeakMax = Math.max(...amPeakData.map(d => Math.max(d.withResponse || 0, d.withoutResponse || 0)));
  const pmPeakMax = Math.max(...pmPeakData.map(d => Math.max(d.withResponse || 0, d.withoutResponse || 0)));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="bg-gray-100 rounded-lg px-4 py-2 mb-6 inline-block">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 40, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorWithResponse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d8b4fe" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#d8b4fe" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorWithoutResponse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="hour" 
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'kWh', angle: 0, position: 'top', offset: 20, fill: '#9ca3af' }}
          />
          <Tooltip />
          
          {/* AM Peak Shaded Area */}
          <ReferenceArea x1="06" x2="09" fill="#d8b4fe" fillOpacity={0.3} />
          
          {/* PM Peak Shaded Area */}
          <ReferenceArea x1="18" x2="21" fill="#d8b4fe" fillOpacity={0.3} />
          
          {/* AM Peak Label */}
          <text x="25%" y="15%" textAnchor="middle" className="text-xs fill-gray-600">
            AM Peak
          </text>
          <text x="25%" y="20%" textAnchor="middle" className="text-lg font-bold fill-red-500">
            {amPeakMax.toFixed(1)} MW
          </text>
          <text x="25%" y="25%" textAnchor="middle" className="text-xs fill-gray-500">
            Potential morning peak
          </text>
          <text x="25%" y="28%" textAnchor="middle" className="text-xs fill-gray-500">
            Power Consumption
          </text>
          <text x="25%" y="31%" textAnchor="middle" className="text-xs fill-gray-500">
            reduced with
          </text>
          <text x="25%" y="34%" textAnchor="middle" className="text-xs fill-gray-500">
            demand response
          </text>
          
          {/* PM Peak Label */}
          <text x="70%" y="15%" textAnchor="middle" className="text-xs fill-gray-600">
            PM Peak
          </text>
          <text x="70%" y="20%" textAnchor="middle" className="text-lg font-bold fill-red-500">
            {pmPeakMax.toFixed(1)} MW
          </text>
          <text x="70%" y="25%" textAnchor="middle" className="text-xs fill-gray-500">
            Potential evening peak
          </text>
          <text x="70%" y="28%" textAnchor="middle" className="text-xs fill-gray-500">
            Power Consumption
          </text>
          <text x="70%" y="31%" textAnchor="middle" className="text-xs fill-gray-500">
            reduced with
          </text>
          <text x="70%" y="34%" textAnchor="middle" className="text-xs fill-gray-500">
            demand response
          </text>
          
          <Line
            type="monotone"
            dataKey="withResponse"
            stroke="#d8b4fe"
            strokeWidth={3}
            dot={false}
            name="With Response"
          />
          <Line
            type="monotone"
            dataKey="withoutResponse"
            stroke="#9333ea"
            strokeWidth={3}
            dot={false}
            name="Without Response"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-3 bg-[#d8b4fe] rounded"></div>
          <span className="text-sm text-gray-600">With Response</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-3 bg-[#9333ea] rounded"></div>
          <span className="text-sm text-gray-600">Without Response</span>
        </div>
      </div>
    </div>
  );
}
