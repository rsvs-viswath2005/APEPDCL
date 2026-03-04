import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TariffChartProps {
  data: any[];
}

export function TariffChart({ data }: TariffChartProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 mb-4">Hourly Consumption Pattern</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.35}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="hour" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip />
          
          {/* Morning Peak Zone */}
          <ReferenceLine x={6} stroke="#ef4444" strokeDasharray="3 3" />
          <ReferenceLine x={9} stroke="#ef4444" strokeDasharray="3 3" />
          
          {/* Evening Peak Zone */}
          <ReferenceLine x={18} stroke="#ef4444" strokeDasharray="3 3" />
          <ReferenceLine x={21} stroke="#ef4444" strokeDasharray="3 3" />
          
          <Area
            type="monotone"
            dataKey="baseline"
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#colorBaseline)"
            name="Baseline Consumption"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#14b8a6"
            fillOpacity={1}
            fill="url(#colorActual)"
            name="Actual Consumption"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="flex gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
          <span className="text-slate-600">Peak Hours (Morning: 6-9, Evening: 18-21)</span>
        </div>
      </div>
    </div>
  );
}
