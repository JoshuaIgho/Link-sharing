import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PublicLinkCard from './PublicLinkCard';
import Loading from '../common/Loading';
import { publicService } from '../../services/public.service';
import { Eye } from 'lucide-react';
import Avatar from '../common/Avatar';

const PublicProfileView = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const data = await publicService.getPublicProfile(username);
      setProfile(data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Profile not found');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (linkId) => {
    try {
      await publicService.trackLinkClick(username, linkId);
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  if (loading) {
    return <Loading fullScreen text="Loading profile..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const getBackgroundStyles = () => {
    switch (profile.themePreset) {
      case 'dark':
        return { backgroundColor: '#0f172a', color: '#f8fafc' };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${profile.themeColor}40 0%, ${profile.themeColor}10 100%)`,
          backgroundColor: '#ffffff'
        };
      case 'glass':
        return {
          backgroundImage: `radial-gradient(at 0% 0%, ${profile.themeColor}15 0, transparent 50%), radial-gradient(at 50% 0%, ${profile.themeColor}10 0, transparent 50%)`,
          backgroundColor: '#f8fafc'
        };
      case 'minimal':
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const getFontClass = () => {
    switch (profile.fontPreset) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      default: return 'font-sans';
    }
  };

  const bgStyles = getBackgroundStyles();
  const fontClass = getFontClass();

  return (
    <div
      className={`min-h-screen py-12 px-4 transition-colors duration-500 ${fontClass} ${profile.themePreset === 'dark' ? 'dark' : ''}`}
      style={bgStyles}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className={`text-center mb-12 animate-fade-in ${profile.themePreset === 'dark' ? 'text-white' : ''}`}>
          <div className="relative inline-block mb-6">
            <Avatar
              src={profile.avatarUrl}
              name={profile.displayName || profile.username}
              size="2xl"
              className={`mx-auto ring-4 shadow-xl ${profile.themePreset === 'dark' ? 'ring-slate-800' : 'ring-white'}`}
            />
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-sm"
              style={{ backgroundColor: profile.themeColor }}
            />
          </div>
          
          <h1 className={`text-4xl font-black mb-3 tracking-tight ${profile.themePreset === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {profile.displayName || `@${profile.username}`}
          </h1>
          
          {profile.displayName && (
            <p className={`text-lg font-medium mb-4 ${profile.themePreset === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              @{profile.username}
            </p>
          )}
          
          {profile.bio && (
            <p className={`max-w-lg mx-auto text-base leading-relaxed ${profile.themePreset === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4 animate-slide-up">
          {profile.links && profile.links.length > 0 ? (
            profile.links.map((link, index) => (
              <div
                key={link.id}
                className={profile.themePreset === 'glass' ? 'backdrop-blur-md bg-white/40 rounded-2xl shadow-sm border border-white/50 overflow-hidden hover:scale-[1.02] transition-transform' : ''}
              >
                <PublicLinkCard
                  link={link}
                  themeColor={profile.themeColor}
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    backgroundColor: profile.themePreset === 'dark' ? '#1e293b' : undefined,
                    border: profile.themePreset === 'dark' ? '1px solid #334155' : undefined,
                    color: profile.themePreset === 'dark' ? '#f1f5f9' : undefined
                  }}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No links available yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>
            Powered by{' '}
             <a href="/"
              className="font-medium hover:text-gray-900"
              style={{ color: profile.themeColor }}
            >
              LinkShare
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileView;