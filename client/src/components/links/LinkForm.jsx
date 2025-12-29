import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Check, ChevronDown } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateUrl, validateFile } from '../../utils/validation';
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '../../utils/constants';
import { SOCIAL_PLATFORMS } from '../../utils/platforms';

const LinkForm = ({ link, onSubmit, onClose, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title || '',
        url: link.url || '',
        description: link.description || '',
      });
      if (link.iconUrl) {
        setIconPreview(link.iconUrl);
      }
      // If link has platform data, restore it
      if (link.platformIcon) {
        const platform = SOCIAL_PLATFORMS.find(p => p.icon === link.platformIcon);
        if (platform) {
          setSelectedPlatform(platform);
        }
      }
    }
  }, [link]);

  const filteredPlatforms = SOCIAL_PLATFORMS.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    
    // Auto-fill title if empty or was previously a platform name
    const isPreviousPlatformTitle = SOCIAL_PLATFORMS.some(p => p.name === formData.title);
    if (!formData.title || isPreviousPlatformTitle) {
      setFormData((prev) => ({ ...prev, title: platform.name }));
    }
    
    // Clear custom icon when selecting platform
    setIconPreview(null);
    setIconFile(null);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateFile(file, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES);
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, icon: validation.error }));
      return;
    }

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
    setSelectedPlatform(null); // Clear platform selection when uploading custom icon
    setErrors((prev) => ({ ...prev, icon: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be under 100 characters';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!validateUrl(formData.url)) {
      newErrors.url = 'Invalid URL format (must start with http:// or https://)';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be under 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Include platform data in submission
    onSubmit({ 
      ...formData, 
      iconFile,
      platformIcon: selectedPlatform?.icon,
      platformColor: selectedPlatform?.color,
      platform: selectedPlatform?.id 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Platform Selector */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Platform (Optional)
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {selectedPlatform ? (
                <>
                  <i 
                    className={`${selectedPlatform.icon} text-xl`} 
                    style={{ color: selectedPlatform.color }}
                  />
                  <span>{selectedPlatform.name}</span>
                </>
              ) : (
                <span className="text-gray-500">Choose a platform or add custom...</span>
              )}
            </div>
            <ChevronDown 
              size={20} 
              className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              {/* Search */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search platforms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>

              {/* Platform List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredPlatforms.length > 0 ? (
                  filteredPlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => handlePlatformSelect(platform)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary-50 transition-colors text-left"
                    >
                      <i 
                        className={`${platform.icon} text-xl`} 
                        style={{ color: platform.color }}
                      />
                      <span className="font-medium">{platform.name}</span>
                      {selectedPlatform?.id === platform.id && (
                        <Check className="ml-auto text-primary-600" size={20} />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No platforms found
                  </div>
                )}
              </div>

              {/* Clear Selection */}
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdown(false);
                    setSelectedPlatform(null);
                  }}
                  className="w-full px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  ✕ Clear Selection (Use Custom)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Icon Display/Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link Icon {!selectedPlatform && '(Optional - Upload Custom)'}
        </label>
        <div className="flex items-center gap-4">
          {/* Icon Preview */}
          <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            {selectedPlatform && !iconPreview ? (
              <i 
                className={`${selectedPlatform.icon} text-3xl`} 
                style={{ color: selectedPlatform.color }}
              />
            ) : iconPreview ? (
              <img
                src={iconPreview}
                alt="Icon preview"
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <span className="text-gray-400 text-xs text-center px-2">
                No icon
              </span>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex-1">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="hidden"
              />
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload size={18} />
                <span className="text-sm">
                  {iconFile ? 'Change Custom Icon' : 'Upload Custom Icon'}
                </span>
              </div>
            </label>
            {selectedPlatform && (
              <p className="mt-1 text-xs text-gray-500">
                Custom icon will override platform icon
              </p>
            )}
          </div>
        </div>
        {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon}</p>}
      </div>

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="My Awesome Link"
        required
      />

      <Input
        label="URL"
        name="url"
        type="url"
        value={formData.url}
        onChange={handleChange}
        error={errors.url}
        placeholder="https://example.com"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`input resize-none ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Brief description of your link"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} fullWidth>
          {link ? 'Update Link' : 'Create Link'}
        </Button>
        <Button type="button" variant="secondary" onClick={onClose} fullWidth>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LinkForm;