import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontSize: '0.875rem'
    }}>
      <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#374151' }}>
        {payload[0].payload.date}
      </p>
      {payload.map((entry, index) => (
        <p key={index} style={{ margin: '4px 0', color: entry.color, fontWeight: '500' }}>
          {entry.name}: {entry.name.includes('Revenue') ? '₹' : ''}{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
};

export const AreaVariant = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          tick={{ fill: '#6b7280', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          stroke="#9ca3af"
          tick={{ fill: '#6b7280', fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="total" 
          stroke="#3b82f6" 
          fill="url(#colorIncome)" 
          strokeWidth={2.5}
          name="Revenue (₹)"
        />
        <Area 
          type="monotone" 
          dataKey="count" 
          stroke="#ec4899" 
          fill="url(#colorExpenses)" 
          strokeWidth={2.5}
          name="Sales Count"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
