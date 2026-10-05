import React, { useState } from 'react';
import { Menu, ExternalLink, QrCode, Copy, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PUBLIC_URL } from '../../utils/constants';
import { useToast } from '../../hooks/useToast';
import ShareProfileModal from '../common/ShareProfileModal';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const username = user?.profile?.username;
  const displayName = user?.profile?.displayName;
  const profileUrl = username
    ? `${PUBLIC_URL || window.location.origin}/${username}`
    : '';

  const handleCopy = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('Profile link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-xs">
        <div className="flex items-center justify-between px-6 py-3.5">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-2.5 sm:gap-3">
            {username && (
              <>
                <button
                  onClick={handleCopy}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy profile URL"
                >
                  {copied ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={() => setShareModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Share profile & QR code"
                >
                  <QrCode size={14} className="text-primary-600" />
                  <span>Share & QR</span>
                </button>

                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <ExternalLink size={14} />
                  <span>View Profile</span>
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Share Modal */}
      {username && (
        <ShareProfileModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          username={username}
          displayName={displayName}
        />
      )}
    </>
  );
};

export default Header;
