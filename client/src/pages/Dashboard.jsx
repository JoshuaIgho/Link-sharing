import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp } from 'lucide-react';
import Stats from '../components/dashboard/Stats';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { StatsSkeleton } from '../components/common/Skeleton';
import OnboardingChecklist from '../components/dashboard/OnboardingChecklist';
import { analyticsService } from '../services/analytics.service';
import { linksService } from '../services/links.service';
import { useToast } from '../hooks/useToast';
import { formatRelativeTime } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, linksData] = await Promise.all([
        analyticsService.getOverview(),
        linksService.getLinks()
      ]);
      setStats(statsData);
      setLinks(linksData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-2">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-48 w-full bg-gray-100 rounded-xl mb-8 animate-pulse" />
        <StatsSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.profile?.displayName || user?.profile?.username}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your links today
        </p>
      </div>

      {/* Onboarding Checklist */}
      <OnboardingChecklist user={user} links={links} />

      {/* Stats */}
      <Stats stats={stats} />

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/links">
              <Button fullWidth className="justify-start">
                <Plus size={20} />
                Create New Link
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="secondary" fullWidth className="justify-start">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats?.last30Days ? (
              <>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Profile Views (30 days)</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <TrendingUp size={16} className="text-green-600" />
                    {stats.last30Days.profileViews}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Link Clicks (30 days)</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <TrendingUp size={16} className="text-green-600" />
                    {stats.last30Days.linkClicks}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">💡 Pro Tip</h3>
        <p className="text-gray-700">
          Add custom icons to your custom links to make them stand out and increase click-through rates!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;