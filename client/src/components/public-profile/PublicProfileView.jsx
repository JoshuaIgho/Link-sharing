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

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        background: `linear-gradient(135deg, ${profile.themeColor}15 0%, ${profile.themeColor}05 100%)`,
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Avatar
            src={profile.avatarUrl}
            name={profile.displayName || profile.username}
            size="2xl"
            className="mx-auto mb-4 ring-4 ring-white shadow-lg"
          />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profile.displayName || `@${profile.username}`}
          </h1>
          
          {profile.displayName && (
            <p className="text-gray-600 mb-2">@{profile.username}</p>
          )}
          
          {profile.bio && (
            <p className="text-gray-700 max-w-lg mx-auto mb-4">{profile.bio}</p>
          )}

        
        </div>

        {/* Links */}
        <div className="space-y-4 animate-slide-up">
          {profile.links && profile.links.length > 0 ? (
            profile.links.map((link, index) => (
              <PublicLinkCard
                key={link.id}
                link={link}
                themeColor={profile.themeColor}
                onClick={() => handleLinkClick(link.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
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