import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import LinkList from '../components/links/LinkList';
import LinkForm from '../components/links/LinkForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { linksService } from '../services/links.service';
import { useToast } from '../hooks/useToast';
import { useProfile } from '../contexts/ProfileContext';

const LinksManager = () => {
  const { links, setLinks, addLink, removeLink, updateLink: updateLinkInContext } = useProfile();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await linksService.getLinks();
      setLinks(data);
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
        // Update existing link
        const updatedLink = await linksService.updateLink(editingLink.id, {
          title: formData.title,
          url: formData.url,
          description: formData.description,
        });

        // Upload icon if provided
        if (formData.iconFile) {
          const linkWithIcon = await linksService.uploadIcon(editingLink.id, formData.iconFile);
          updateLinkInContext(editingLink.id, linkWithIcon);
        } else {
          updateLinkInContext(editingLink.id, updatedLink);
        }

        toast.success('Link updated successfully');
      } else {
        // Create new link
        const newLink = await linksService.createLink({
          title: formData.title,
          url: formData.url,
          description: formData.description,
        });

        // Upload icon if provided
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

  const handleDelete = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    try {
      await linksService.deleteLink(linkId);
      removeLink(linkId);
      toast.success('Link deleted successfully');
    } catch (error) {
      toast.error('Failed to delete link');
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Links</h1>
          <p className="text-gray-600">
            Create, edit, and organize your links. Drag to reorder.
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} />
          Add Link
        </Button>
      </div>

      {/* Links List */}
      <div className="mb-8">
        <LinkList
          links={links}
          onReorder={handleReorder}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onAddClick={() => handleOpenModal()}
        />
      </div>

      {/* Link Form Modal */}
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
    </div>
  );
};

export default LinksManager;