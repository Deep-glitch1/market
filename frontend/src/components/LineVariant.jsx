import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '14px 18px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontSize: '0.9375rem'
    }}>
      <p style={{ margin: '0 0 8px 0', fontWeight: '700', color: '#374151' }}>
        {payload[0].payload.date}
      </p>
      {payload.map((entry, index) => (
        <p key={index} style={{ margin: '4px 0', color: entry.color, fontWeight: '600' }}>
          {entry.name}: {entry.name.includes('Revenue') ? '₹' : ''}{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
};

export const LineVariant = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" vertical={false} />
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
        <Legend 
          wrapperStyle={{ paddingTop: '20px', fontSize: '0.9375rem' }}
          verticalAlign="bottom"
          height={36}
        />
        <Line 
          type="linear" 
          dataKey="total" 
          stroke="#3b82f6" 
          strokeWidth={2.5}
          name="Revenue (₹)" 
          dot={false}
          activeDot={false}
          isAnimationActive={true}
        />
        <Line 
          type="linear" 
          dataKey="count" 
          stroke="#ec4899" 
          strokeWidth={2.5}
          name="Sales Count" 
          dot={false}
          activeDot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
