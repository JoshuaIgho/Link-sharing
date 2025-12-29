import React from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';

const PublicLinkCard = ({ link, themeColor, onClick, style }) => {
  const handleClick = () => {
    onClick();
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  // Use platform icon if available, otherwise use uploaded icon or default
const renderIcon = () => {
  if (link.iconUrl) {
    return (
      <img
        src={link.iconUrl}
        alt={link.title}
        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
      />
    );
  }
  
  if (link.platformIcon) {
    return (
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${link.platformColor}15`,
        }}
      >
        <i 
          className={`${link.platformIcon} text-2xl`} 
          style={{ color: link.platformColor }}
        />
      </div>
    );
  }

  return (
    <div
      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: `${themeColor}15`,
        color: themeColor,
      }}
    >
      <ExternalLink size={24} />
    </div>
  );
};
  return (
    <button
      onClick={handleClick}
      className="w-full group animate-slide-up"
      style={style}
    >
      <div
        className="flex items-center gap-4 p-5 rounded-xl bg-white shadow-sm border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
        style={{
          borderColor: `${link.platformColor || themeColor}20`,
        }}
      >
        {/* Icon */}
        {renderIcon()}

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 truncate group-hover:text-opacity-80 transition-colors">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-gray-600 truncate">{link.description}</p>
          )}
          {link.clickCount > 0 && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <TrendingUp size={12} />
              <span>{link.clickCount} clicks</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink
          size={20}
          className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0"
          style={{
            color: `${link.platformColor || themeColor}80`,
          }}
        />
      </div>
    </button>
  );
};

export default PublicLinkCard;