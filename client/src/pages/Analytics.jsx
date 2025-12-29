import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, MousePointerClick } from 'lucide-react';
import Loading from '../components/common/Loading';
import { analyticsService } from '../services/analytics.service';
import { useToast } from '../hooks/useToast';
import { formatNumber } from '../utils/formatters';

const Analytics = () => {
  const toast = useToast();
  const [overview, setOverview] = useState(null);
  const [linkAnalytics, setLinkAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Total Views</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatNumber(overview?.totalViews || 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">All time profile views</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <MousePointerClick size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Total Clicks</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatNumber(overview?.totalClicks || 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">All time link clicks</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-gray-900">Last 30 Days</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatNumber(overview?.last30Days?.linkClicks || 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Recent link clicks</p>
        </div>
      </div>

      {/* Link Performance */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Link Performance</h2>
        
        {linkAnalytics.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No link data available yet. Create some links to see analytics!
          </p>
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