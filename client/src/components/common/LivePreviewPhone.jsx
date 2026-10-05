import React from 'react';
import Avatar from './Avatar';
import { ExternalLink, Smartphone } from 'lucide-react';

const LivePreviewPhone = ({ profile, links = [], className = '' }) => {
  const activeLinks = (links || []).filter((l) => l.isActive);

  const themePreset = profile?.themePreset || 'minimal';
  const themeColor = profile?.themeColor || '#6366f1';
  const fontPreset = profile?.fontPreset || 'sans';

  const getBackgroundStyles = () => {
    switch (themePreset) {
      case 'dark':
        return { backgroundColor: '#0f172a', color: '#f8fafc' };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${themeColor}35 0%, ${themeColor}10 100%)`,
          backgroundColor: '#ffffff',
        };
      case 'glass':
        return {
          backgroundImage: `radial-gradient(at 0% 0%, ${themeColor}20 0, transparent 50%), radial-gradient(at 50% 0%, ${themeColor}15 0, transparent 50%)`,
          backgroundColor: '#f8fafc',
        };
      case 'minimal':
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const getFontClass = () => {
    switch (fontPreset) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      default:
        return 'font-sans';
    }
  };

  const bgStyles = getBackgroundStyles();
  const fontClass = getFontClass();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Header Label */}
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <Smartphone size={14} className="text-primary-600" />
        Live Phone Preview
      </div>

      {/* Phone Shell */}
      <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-black/10 select-none">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
          <div className="w-10 h-1 bg-slate-800 rounded-full" />
        </div>

        {/* Screen Area */}
        <div
          className={`w-full h-full rounded-[38px] overflow-y-auto overflow-x-hidden pt-8 px-4 pb-6 scrollbar-hide transition-colors duration-300 ${fontClass}`}
          style={bgStyles}
        >
          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-3">
              <Avatar
                src={profile?.avatarUrl}
                name={profile?.displayName || profile?.username || 'User'}
                size="xl"
                className="mx-auto ring-2 ring-white/80 shadow-md"
              />
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-xs"
                style={{ backgroundColor: themeColor }}
              />
            </div>

            <h2
              className={`text-lg font-bold truncate ${
                themePreset === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {profile?.displayName || `@${profile?.username || 'username'}`}
            </h2>

            {profile?.displayName && (
              <p
                className={`text-xs ${
                  themePreset === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}
              >
                @{profile?.username}
              </p>
            )}

            {profile?.bio && (
              <p
                className={`text-xs mt-2 line-clamp-3 ${
                  themePreset === 'dark' ? 'text-slate-300' : 'text-gray-600'
                }`}
              >
                {profile?.bio}
              </p>
            )}
          </div>

          {/* Active Links */}
          <div className="space-y-2.5">
            {activeLinks.length > 0 ? (
              activeLinks.map((link) => (
                <div
                  key={link.id}
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all shadow-xs ${
                    themePreset === 'glass'
                      ? 'bg-white/60 backdrop-blur-sm border-white/80'
                      : themePreset === 'dark'
                      ? 'bg-slate-800/90 border-slate-700 text-white'
                      : 'bg-white border-gray-100 text-gray-900'
                  }`}
                  style={{
                    borderColor:
                      themePreset !== 'dark' && themePreset !== 'glass'
                        ? `${link.platformColor || themeColor}30`
                        : undefined,
                  }}
                >
                  {/* Icon */}
                  {link.iconUrl ? (
                    <img
                      src={link.iconUrl}
                      alt={link.title}
                      className="w-7 h-7 rounded-md object-cover flex-shrink-0"
                    />
                  ) : link.platformIcon ? (
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${link.platformColor}20` }}
                    >
                      <i
                        className={`${link.platformIcon} text-sm`}
                        style={{ color: link.platformColor }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                    >
                      <ExternalLink size={14} />
                    </div>
                  )}

                  {/* Title & Desc */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{link.title}</p>
                    {link.description && (
                      <p className="text-[10px] opacity-70 truncate">{link.description}</p>
                    )}
                  </div>

                  <ExternalLink size={12} className="opacity-40 flex-shrink-0" />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs opacity-50">
                No active links to display
              </div>
            )}
          </div>

          {/* Phone Footer branding */}
          <div className="text-center mt-8 text-[10px] opacity-50">
            Powered by LinkShare
          </div>
        </div>

        {/* Home Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
};

export default LivePreviewPhone;
