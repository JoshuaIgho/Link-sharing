import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, MousePointerClick, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell
} from 'recharts';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { analyticsService } from '../services/analytics.service';
import { useToast } from '../hooks/useToast';
import { formatNumber } from '../utils/formatters';

const Analytics = () => {
  const toast = useToast();
  const [overview, setOverview] = useState(null);
  const [linkAnalytics, setLinkAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [overviewData, linksData] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getLinkAnalytics(),
      ]);
      setOverview(overviewData);
      setLinkAnalytics(linksData);

      if (overviewData.trends) {
        setChartData(overviewData.trends);
      } else {
        // Fallback for safety
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        setChartData(days.map(day => ({
          name: day,
          views: 0,
          clicks: 0,
        })));
      }
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" />
              12%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatNumber(overview?.totalViews || 0)}
          </p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-[70%]" />
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <MousePointerClick size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" />
              8.4%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatNumber(overview?.totalClicks || 0)}
          </p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[45%]" />
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <span className="flex items-center text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              <Calendar size={14} className="mr-1" />
              Last 30 Days
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">CTR (Click-Through Rate)</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {overview?.totalViews > 0
              ? ((overview.totalClicks / overview.totalViews) * 100).toFixed(1)
              : 0}%
          </p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[60%]" />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Engagement Overview</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-xs text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600">Clicks</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Links</h3>
          <div className="space-y-6">
            {linkAnalytics.slice(0, 5).map((link, i) => (
              <div key={link.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-sm font-bold text-gray-500">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{link.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500"
                        style={{ width: `${(link.clicks / (linkAnalytics[0]?.clicks || 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{link.clicks}</span>
                  </div>
                </div>
              </div>
            ))}
            {linkAnalytics.length === 0 && (
              <p className="text-center text-gray-500 py-4 text-sm italic">No data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Link Performance */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Link Performance</h2>
        
        {linkAnalytics.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No analytics data"
            description="Once you share your profile and get some clicks, your performance data will appear here."
            className="border-none shadow-none"
          />
        ) : (
          <div className="space-y-4">
            {linkAnalytics.map((link, index) => (
              <div
                key={link.id}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm">
                  #{index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{link.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{link.url}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{link.clicks}</p>
                    <p className="text-xs text-gray-500">clicks</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    link.isActive
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {link.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;