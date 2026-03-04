import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const BarVariant = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280" 
          style={{ fontSize: '0.875rem' }}
        />
        <YAxis 
          stroke="#6b7280" 
          style={{ fontSize: '0.875rem' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)' 
          }}
        />
        <Legend wrapperStyle={{ fontSize: '0.875rem' }} />
        <Bar 
          dataKey="total" 
          fill="#3b82f6" 
          name="Revenue (₹)" 
          radius={[8, 8, 0, 0]}
        />
        <Bar 
          dataKey="count" 
          fill="#6366f1" 
          name="Sales Count" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
