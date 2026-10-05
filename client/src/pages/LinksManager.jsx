import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import LinkList from '../components/links/LinkList';
import LinkForm from '../components/links/LinkForm';
import Modal from '../components/common/Modal';
import ConfirmModal from '../components/common/ConfirmModal';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { linksService } from '../services/links.service';
import { profileService } from '../services/profile.service';
import { useToast } from '../hooks/useToast';
import { useProfile } from '../contexts/ProfileContext';
import LivePreviewPhone from '../components/common/LivePreviewPhone';

const LinksManager = () => {
  const {
    profile,
    setProfile,
    links,
    setLinks,
    addLink,
    removeLink,
    updateLink: updateLinkInContext,
  } = useProfile();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'

  // Delete Confirmation State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingLinkId, setDeletingLinkId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const [linksData, profileData] = await Promise.all([
        linksService.getLinks(),
        !profile ? profileService.getProfile() : Promise.resolve(null),
      ]);
      setLinks(linksData);
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      toast.error('Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (link = null) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingLink(null);
  };

  const handleSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingLink) {
        const updateData = {
          title: formData.title,
          url: formData.url,
          description: formData.description,
          platformIcon: formData.platformIcon,
          platformColor: formData.platformColor,
          platform: formData.platform,
        };

        const updatedLink = await linksService.updateLink(editingLink.id, updateData);

        if (formData.iconFile) {
          const linkWithIcon = await linksService.uploadIcon(editingLink.id, formData.iconFile);
          updateLinkInContext(editingLink.id, linkWithIcon);
        } else {
          updateLinkInContext(editingLink.id, updatedLink);
        }

        toast.success('Link updated successfully');
      } else {
        const createData = {
          title: formData.title,
          url: formData.url,
          description: formData.description,
          platformIcon: formData.platformIcon,
          platformColor: formData.platformColor,
          platform: formData.platform,
        };

        const newLink = await linksService.createLink(createData);

        if (formData.iconFile) {
          const linkWithIcon = await linksService.uploadIcon(newLink.id, formData.iconFile);
          addLink(linkWithIcon);
        } else {
          addLink(newLink);
        }

        toast.success('Link created successfully');
      }

      handleCloseModal();
    } catch (error) {
      console.error('❌ Error saving link:', error);
      toast.error(error.response?.data?.message || 'Failed to save link');
    } finally {
      setFormLoading(false);
    }
  };

  const handleReorder = async (linkId, newPosition) => {
    try {
      const reorderedLinks = await linksService.reorderLinks(linkId, newPosition);
      setLinks(reorderedLinks);
      toast.success('Links reordered');
    } catch (error) {
      toast.error('Failed to reorder links');
    }
  };

  const handleToggle = async (linkId) => {
    try {
      const updatedLink = await linksService.toggleLink(linkId);
      updateLinkInContext(linkId, updatedLink);
      toast.success(updatedLink.isActive ? 'Link enabled' : 'Link disabled');
    } catch (error) {
      toast.error('Failed to toggle link');
    }
  };

  const handleOpenDeleteModal = (linkId) => {
    setDeletingLinkId(linkId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingLinkId) return;
    setDeleteLoading(true);
    try {
      await linksService.deleteLink(deletingLinkId);
      removeLink(deletingLinkId);
      toast.success('Link deleted successfully');
      setDeleteModalOpen(false);
      setDeletingLinkId(null);
    } catch (error) {
      toast.error('Failed to delete link');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filtered links calculation
  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (link.description && link.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'active') return matchesSearch && link.isActive;
    if (statusFilter === 'inactive') return matchesSearch && !link.isActive;
    return matchesSearch;
  });

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Manage Links</h1>
          <p className="text-gray-600">
            Create, edit, and organize your links. Drag to reorder.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} />
          Add Link
        </Button>
      </div>

      {/* Grid Layout with Live Preview */}
      <div className="grid xl:grid-cols-12 gap-8 items-start">
        {/* Links List Side */}
        <div className="xl:col-span-7 space-y-6">
          {/* Search and Filters Bar */}
          {links.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search links by title or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto justify-center">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    statusFilter === 'all'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All ({links.length})
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    statusFilter === 'active'
                      ? 'bg-white text-emerald-700 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Active ({links.filter((l) => l.isActive).length})
                </button>
                <button
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    statusFilter === 'inactive'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Inactive ({links.filter((l) => !l.isActive).length})
                </button>
              </div>
            </div>
          )}

          {/* Links Display */}
          {filteredLinks.length > 0 ? (
            <LinkList
              links={filteredLinks}
              onReorder={handleReorder}
              onEdit={handleOpenModal}
              onDelete={handleOpenDeleteModal}
              onToggle={handleToggle}
              onAddClick={() => handleOpenModal()}
            />
          ) : links.length > 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
              <p className="text-gray-500 text-sm">No links found matching your filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-2 text-xs font-semibold text-primary-600 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <EmptyState
              icon={Plus}
              title="No links yet"
              description="Start building your profile by adding your first link. You can add social media, portfolio, or any other URL."
              actionText="Add Your First Link"
              onAction={() => handleOpenModal()}
            />
          )}
        </div>

        {/* Live Phone Preview Column */}
        <div className="hidden xl:block xl:col-span-5 sticky top-24">
          <LivePreviewPhone profile={profile} links={links} />
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingLink ? 'Edit Link' : 'Create New Link'}
      >
        <LinkForm
          link={editingLink}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingLinkId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Link"
        message="Are you sure you want to delete this link? This action will permanently remove it from your public profile."
        confirmText="Delete Link"
        loading={deleteLoading}
        variant="danger"
      />
    </div>
  );
};

export default LinksManager;
