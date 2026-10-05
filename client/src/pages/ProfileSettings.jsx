import React, { useEffect, useState } from 'react';
import ProfileEditor from '../components/profile/ProfileEditor';
import AvatarUpload from '../components/profile/AvatarUpload';
import Loading from '../components/common/Loading';
import ConfirmModal from '../components/common/ConfirmModal';
import { profileService } from '../services/profile.service';
import { linksService } from '../services/links.service';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../contexts/ProfileContext';
import LivePreviewPhone from '../components/common/LivePreviewPhone';

const ProfileSettings = () => {
  const { updateUser } = useAuth();
  const { profile, setProfile, links, setLinks } = useProfile();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [deleteAvatarModalOpen, setDeleteAvatarModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const [profileData, linksData] = await Promise.all([
        profileService.getProfile(),
        linksService.getLinks(),
      ]);
      setProfile(profileData);
      setLinks(linksData);
    } catch (error) {
      toast.error('Failed to load profile settings');
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

  const handleConfirmAvatarDelete = async () => {
    setAvatarLoading(true);
    try {
      const updatedProfile = await profileService.deleteAvatar();
      setProfile(updatedProfile);
      updateUser({ profile: updatedProfile });
      toast.success('Avatar removed successfully');
      setDeleteAvatarModalOpen(false);
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
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <div className="grid xl:grid-cols-12 gap-8 items-start">
        {/* Main Settings Form */}
        <div className="xl:col-span-7 grid lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Picture</h2>
              <AvatarUpload
                currentAvatar={profile?.avatarUrl}
                onUpload={handleAvatarUpload}
                onDelete={() => setDeleteAvatarModalOpen(true)}
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

        {/* Live Phone Preview Column */}
        <div className="hidden xl:block xl:col-span-5 sticky top-24">
          <LivePreviewPhone profile={profile} links={links} />
        </div>
      </div>

      {/* Confirm Avatar Delete Modal */}
      <ConfirmModal
        isOpen={deleteAvatarModalOpen}
        onClose={() => setDeleteAvatarModalOpen(false)}
        onConfirm={handleConfirmAvatarDelete}
        title="Remove Profile Picture"
        message="Are you sure you want to remove your profile picture?"
        confirmText="Remove Avatar"
        loading={avatarLoading}
        variant="danger"
      />
    </div>
  );
};

export default ProfileSettings;
