import React from 'react';
import { Eye, MousePointerClick, Link as LinkIcon, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp size={14} />
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={LinkIcon}
        label="Total Links"
        value={stats?.totalLinks || 0}
      />
      <StatCard
        icon={LinkIcon}
        label="Active Links"
        value={stats?.activeLinks || 0}
      />
      <StatCard
        icon={Eye}
        label="Profile Views"
        value={stats?.totalViews || 0}
      />
      <StatCard
        icon={MousePointerClick}
        label="Total Clicks"
        value={stats?.totalClicks || 0}
      />
    </div>
  );
};

export default Stats;