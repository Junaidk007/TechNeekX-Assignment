import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './RecommendationsChart.css';

// Monochrome colors for the donut slices
const MONO_COLORS = ['#000000', '#262626', '#4a4a4a', '#737373', '#a3a3a3', '#d4d4d4'];

const RecommendationsChart = ({ data }) => {
  const hasCategoryData = data?.categories && data.categories.length > 0;
  const hasMonthData = data?.months && data.months.length > 0;

  // Render message if no data is available
  if (!hasCategoryData && !hasMonthData) {
    return (
      <div className="panel-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 350 }}>
        <p style={{ color: 'var(--text-secondary)' }}>No visualization data available.</p>
      </div>
    );
  }

  // Custom tooltips matching B&W aesthetic
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isPie = !label;
      const title = isPie ? payload[0].payload.category : label;
      const value = payload[0].value;
      const name = isPie ? 'Registrations' : 'Avg Registrations';

      return (
        <div style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '0.6rem 0.8rem',
          borderRadius: '4px',
          border: '1px solid #000000',
          fontSize: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          fontFamily: 'var(--font-sans)'
        }}>
          <p style={{ margin: 0, fontWeight: 600, textTransform: 'capitalize' }}>{title}</p>
          <p style={{ margin: '0.2rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
            {name}: <strong>{value.toLocaleString()}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-container">
      {/* 1. Category Distribution Donut Chart */}
      <div className="chart-card">
        <div className="chart-card-header">
          <span className="chart-card-title">
            <FontAwesomeIcon icon={faChartPie} style={{ marginRight: '0.5rem' }} />
            Category Distribution
          </span>
        </div>
        <div style={{ width: '100%', height: 260, position: 'relative' }}>
          {hasCategoryData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="registrations"
                  nameKey="category"
                >
                  {data.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MONO_COLORS[index % MONO_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '10px', bottom: 0 }}
                  formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              No category metrics
            </div>
          )}
        </div>
      </div>

      {/* 2. Monthly Trend Line / Area Chart */}
      <div className="chart-card">
        <div className="chart-card-header">
          <span className="chart-card-title">
            <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
            Monthly Registrations Trend
          </span>
        </div>
        <div style={{ width: '100%', height: 260 }}>
          {hasMonthData ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.months}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorAvgReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#000000" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: 'var(--border-color)' }}
                />
                <YAxis
                  tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="averageRegistrations"
                  stroke="#000000"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAvgReg)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              No trend data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsChart;
