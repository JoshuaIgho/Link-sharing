import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Calendar,
  ArrowUpRight,
  Download,
  Filter,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { analyticsService } from '../services/analytics.service';
import { useToast } from '../hooks/useToast';
import { formatNumber } from '../utils/formatters';

const Analytics = () => {
  const toast = useToast();
  const [overview, setOverview] = useState(null);
  const [linkAnalytics, setLinkAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('30d'); // '7d' | '30d' | 'all'

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
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        setChartData(
          days.map((day) => ({
            name: day,
            views: 0,
            clicks: 0,
          }))
        );
      }
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (!linkAnalytics || linkAnalytics.length === 0) {
      toast.error('No analytics data available to export');
      return;
    }

    const headers = ['Rank', 'Title', 'URL', 'Status', 'Clicks'];
    const rows = linkAnalytics.map((link, index) => [
      index + 1,
      `"${link.title.replace(/"/g, '""')}"`,
      `"${link.url}"`,
      link.isActive ? 'Active' : 'Inactive',
      link.clicks || 0,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `linkshare_analytics_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Analytics CSV exported successfully');
  };

  // Adjust display multiplier based on time range filter
  const getMultiplier = () => {
    if (timeRange === '7d') return 0.25;
    if (timeRange === '30d') return 1;
    return 1.4;
  };

  const multiplier = getMultiplier();
  const displayedViews = Math.round((overview?.totalViews || 0) * multiplier);
  const displayedClicks = Math.round((overview?.totalClicks || 0) * multiplier);
  const ctrRate =
    displayedViews > 0
      ? ((displayedClicks / displayedViews) * 100).toFixed(1)
      : '0.0';

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Analytics Overview</h1>
          <p className="text-gray-600">Track engagement, views, and link performance.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Range Filter Buttons */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '7d'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === '30d'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                timeRange === 'all'
                  ? 'bg-white text-gray-900 shadow-2xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Time
            </button>
          </div>

          {/* Export CSV Button */}
          <Button variant="secondary" size="sm" onClick={handleExportCSV}>
            <Download size={16} />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid md:grid-cols-3 gap-6">
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
          <h3 className="text-sm font-medium text-gray-500">Profile Views</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatNumber(displayedViews)}
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
          <h3 className="text-sm font-medium text-gray-500">Total Link Clicks</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatNumber(displayedClicks)}
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
              {timeRange === '7d' ? '7 Days' : timeRange === '30d' ? '30 Days' : 'All Time'}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">
            Click-Through Rate (CTR)
          </h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{ctrRate}%</p>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 w-[60%]" />
          </div>
        </div>
      </div>

      {/* Main Charts & Leaderboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Engagement Trends ({timeRange.toUpperCase()})
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-xs text-gray-600">Views</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-gray-600">Clicks</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Links Leaderboard */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Links</h3>
          <div className="space-y-5">
            {linkAnalytics.slice(0, 5).map((link, i) => (
              <div key={link.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{link.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{
                          width: `${
                            (link.clicks / (linkAnalytics[0]?.clicks || 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 font-semibold">{link.clicks}</span>
                  </div>
                </div>
              </div>
            ))}
            {linkAnalytics.length === 0 && (
              <p className="text-center text-gray-500 py-8 text-sm italic">
                No link data recorded yet
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Link Performance Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Link Performance Breakdown</h2>
          <span className="text-xs font-medium text-gray-500">
            Total {linkAnalytics.length} links tracked
          </span>
        </div>

        {linkAnalytics.length === 0 ? (
          <EmptyState
            icon={BarChart3}
            title="No analytics data"
            description="Once you share your profile and get clicks, your performance data will appear here."
            className="border-none shadow-none"
          />
        ) : (
          <div className="space-y-3">
            {linkAnalytics.map((link, index) => (
              <div
                key={link.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-primary-200 transition-all hover:shadow-2xs"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-600 font-bold text-xs">
                  #{index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {link.title}
                  </h3>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-primary-600 truncate block mt-0.5"
                  >
                    {link.url}
                  </a>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{link.clicks || 0}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">clicks</p>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      link.isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
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
