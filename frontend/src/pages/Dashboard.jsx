import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboard, reports } from '../services/api';
import { Package, DollarSign, TrendingUp, AlertTriangle, Calendar, RefreshCw } from 'lucide-react';
import { StatsCardSkeleton, ChartSkeleton } from '../components/LoadingSkeleton';
import CountUp from '../components/CountUp';
import { DataCharts } from '../components/DataCharts';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, salesRes, categoryRes] = await Promise.all([
        dashboard.getStats(dateRange),
        reports.getSalesByDate(dateRange),
        reports.getCategorySales(dateRange),
      ]);
      
      setStats(statsRes.data);
      setSalesTrend(salesRes.data.sales_by_date);
      setCategorySales(categoryRes.data.category_sales);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e'];

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p className="dashboard-subtitle">Loading your business summary...</p>
          </div>
        </div>
        <StatsCardSkeleton />
        <div className="charts-grid">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your business summary</p>
        </div>
        <div className="dashboard-actions">
          <motion.button 
            className="refresh-btn"
            onClick={loadDashboardData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} />
            Refresh
          </motion.button>
          <div className="date-range-selector">
            <Calendar size={18} />
            <label>Sales Period:</label>
            <select value={dateRange} onChange={(e) => setDateRange(Number(e.target.value))}>
              <option value={7}>Last 7 Days</option>
              <option value={14}>Last 14 Days</option>
              <option value={30}>Last 30 Days</option>
              <option value={90}>Last 90 Days</option>
              <option value={0}>All Time</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        <motion.div 
          className="stat-card gradient-blue"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              <Package className="stat-icon" size={28} />
            </div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p className="stat-value">
                <CountUp end={stats?.total_products || 0} />
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card gradient-green"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              <TrendingUp className="stat-icon" size={28} />
            </div>
            <div className="stat-info">
              <h3>Total Sales</h3>
              <p className="stat-value">
                <CountUp end={stats?.total_sales || 0} />
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card gradient-purple"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              <DollarSign className="stat-icon" size={28} />
            </div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-value">
                ₹<CountUp end={parseFloat(stats?.total_revenue) || 0} duration={2000} />
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card gradient-orange"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              <AlertTriangle className="stat-icon" size={28} />
            </div>
            <div className="stat-info">
              <h3>Low Stock Items</h3>
              <p className="stat-value">
                <CountUp end={stats?.low_stock_count || 0} />
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card gradient-pink"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              <Calendar className="stat-icon" size={28} />
            </div>
            <div className="stat-info">
              <h3>Today's Sales</h3>
              <p className="stat-value">
                ₹<CountUp end={parseFloat(stats?.today_sales) || 0} duration={2000} />
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <DataCharts 
        salesData={salesTrend}
        categoryData={categorySales.map(item => ({
          name: item.category,
          value: item.value
        }))}
        loading={loading}
      />

    </motion.div>
  );
}

export default Dashboard;
