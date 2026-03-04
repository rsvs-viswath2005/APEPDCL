import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface BarChartCardProps {
  title: string;
  data: any[];
  bars: { key: string; color: string; name: string }[];
}

const CustomLabel = (props: any) => {
  const { x, y, width, value, index, data } = props;
  const total = data[index].dailyConsumption + data[index].peakShifted;
  
  return (
    <text 
      x={x + width / 2} 
      y={y - 8} 
      fill="#6b7280" 
      textAnchor="middle"
      fontSize="13"
      fontWeight="600"
    >
      {total} kW
    </text>
  );
};

const PercentageLabel = (props: any) => {
  const { x, y, width, height, value, index, dataKey, data } = props;
  const total = data[index].dailyConsumption + data[index].peakShifted;
  const percentage = Math.round((value / total) * 100);
  
  // Only show if segment is large enough
  if (height < 20) return null;
  
  return (
    <text 
      x={x + width / 2} 
      y={y + height / 2 + 5} 
      fill="white" 
      textAnchor="middle"
      fontSize="13"
      fontWeight="600"
    >
      {percentage} %
    </text>
  );
};

export function BarChartCard({ title, data, bars }: BarChartCardProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <div className="glass-pill rounded-lg px-4 py-2 mb-6 inline-block">
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <BarChart 
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#9ca3af"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip />
          
          <Bar 
            dataKey="dailyConsumption" 
            stackId="a" 
            fill="#67e8f9"
            radius={[0, 0, 0, 0]}
          >
            <LabelList 
              content={(props) => <PercentageLabel {...props} data={data} dataKey="dailyConsumption" />} 
            />
          </Bar>
          
          <Bar 
            dataKey="peakShifted" 
            stackId="a" 
            fill="#0ea5e9"
            radius={[8, 8, 0, 0]}
          >
            <LabelList 
              content={(props) => <CustomLabel {...props} data={data} />} 
            />
            <LabelList 
              content={(props) => <PercentageLabel {...props} data={data} dataKey="peakShifted" />} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-3 bg-[#67e8f9] rounded"></div>
          <span className="text-sm text-slate-600">Daily consumption %</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-12 h-3 bg-[#0ea5e9] rounded"></div>
          <span className="text-sm text-slate-600">Peak Shifted %</span>
        </div>
      </div>
    </div>
  );
}
