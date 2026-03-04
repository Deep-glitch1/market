import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = [
  '#3b82f6', '#06b6d4', '#ec4899', '#8b5cf6', 
  '#f59e0b', '#10b981', '#6366f1', '#a855f7', 
  '#14b8a6', '#f43f5e', '#84cc16', '#eab308',
  '#22d3ee', '#fb923c', '#c084fc'
];

const CustomLegend = ({ payload }) => {
  // Calculate total value for percentage calculation
  const total = payload.reduce((sum, entry) => sum + (entry.payload?.value || 0), 0);
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px', 
      maxHeight: '500px',
      overflowY: 'auto',
      paddingRight: '8px'
    }}>
      {payload.map((entry, index) => {
        const value = entry.payload?.value || 0;
        const percent = total > 0 ? (value / total) * 100 : 0;
        return (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '140px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              flexShrink: 0
            }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280', whiteSpace: 'nowrap', fontWeight: '500' }}>
              {entry.value} <span style={{ fontWeight: '700', color: '#111827' }}>{percent.toFixed(0)}%</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const PieVariant = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
        <Pie
          data={data}
          cx="45%"
          cy="50%"
          innerRadius={80}
          outerRadius={115}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={1}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Legend 
          content={<CustomLegend />}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ paddingLeft: '10px', maxWidth: '45%' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
