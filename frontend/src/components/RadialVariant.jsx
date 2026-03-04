import { ResponsiveContainer, RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#3b82f6', '#06b6d4', '#ec4899', '#8b5cf6', 
  '#f59e0b', '#10b981', '#6366f1', '#a855f7', 
  '#14b8a6', '#f43f5e', '#84cc16', '#eab308',
  '#22d3ee', '#fb923c', '#c084fc'
];

const CustomLegend = ({ payload }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      maxHeight: '520px',
      overflowY: 'auto',
      paddingRight: '8px'
    }}>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: entry.color,
            flexShrink: 0
          }} />
          <span style={{ fontSize: '0.8125rem', color: '#6b7280', whiteSpace: 'nowrap', fontWeight: '500' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

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
      <p style={{ margin: '0', color: payload[0].fill, fontWeight: '600' }}>
        Amount: {payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

export const RadialVariant = ({ data }) => {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart 
        cx="35%" 
        cy="50%" 
        innerRadius="20%" 
        outerRadius="100%" 
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <RadialBar 
          minAngle={15} 
          background={{ fill: '#f3f4f6' }}
          clockWise 
          dataKey="value"
          cornerRadius={3}
        />
        <Legend 
          content={<CustomLegend />}
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          wrapperStyle={{ paddingLeft: '10px', maxWidth: '45%' }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
