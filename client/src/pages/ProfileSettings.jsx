import React, { useEffect, useState } from 'react';
import ProfileEditor from '../components/profile/ProfileEditor';
import AvatarUpload from '../components/profile/AvatarUpload';
import Loading from '../components/common/Loading';
import { profileService } from '../services/profile.service';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../contexts/ProfileContext';

const ProfileSettings = () => {
  const { updateUser } = useAuth();
  const { profile, setProfile } = useProfile();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (formData) => {
    setSaveLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile(formData);
      setProfile(updatedProfile);
      updateUser({ profile: updatedProfile });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAvatarUpload = async (file) => {
    setAvatarLoading(true);
    try {
      const updatedProfile = await profileService.uploadAvatar(file);
      setProfile(updatedProfile);
      updateUser({ profile: updatedProfile });
      toast.success('Avatar uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    if (!window.confirm('Are you sure you want to remove your avatar?')) return;

    setAvatarLoading(true);
    try {
      const updatedProfile = await profileService.deleteAvatar();
      setProfile(updatedProfile);
      updateUser({ profile: updatedProfile });
      toast.success('Avatar removed successfully');
    } catch (error) {
      toast.error('Failed to remove avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Picture</h2>
            <AvatarUpload
              currentAvatar={profile?.avatarUrl}
              onUpload={handleAvatarUpload}
              onDelete={handleAvatarDelete}
              loading={avatarLoading}
            />
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            <ProfileEditor
              profile={profile}
              onSave={handleSaveProfile}
              loading={saveLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;