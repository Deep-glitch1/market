import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

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
      <p style={{ margin: '0 0 6px 0', fontWeight: '700', color: '#374151' }}>
        {payload[0].payload.name}
      </p>
      <p style={{ margin: '0', color: '#3b82f6', fontWeight: '600' }}>
        Amount: {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export const RadarVariant = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} margin={{ top: 30, right: 100, bottom: 30, left: 52 }}>
        <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
        <PolarAngleAxis 
          dataKey="name" 
          tick={{ fill: '#374151', fontSize: '0.8125rem', fontWeight: '600' }}
        />
        <PolarRadiusAxis 
          tick={{ fill: '#6b7280', fontSize: '0.8125rem', fontWeight: '500' }}
          angle={90}
        />
        <Radar 
          name="Amount" 
          dataKey="value" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.5}
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};
