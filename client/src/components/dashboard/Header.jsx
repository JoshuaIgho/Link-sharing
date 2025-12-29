import React from 'react';
import { Menu, ExternalLink } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PUBLIC_URL } from '../../utils/constants';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const username = user?.profile?.username;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-4">
          {username && (
            <a
              href={`${PUBLIC_URL}/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              View Public Profile
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;