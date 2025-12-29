import React, { useState } from 'react';
import { Upload, X, User } from 'lucide-react';
import Button from '../common/Button';
import { validateFile } from '../../utils/validation';
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '../../utils/constants';

const AvatarUpload = ({ currentAvatar, onUpload, onDelete, loading }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError('');
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      setPreview(null);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setError('');
  };

  const displayAvatar = preview || currentAvatar;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
            <User size={48} className="text-gray-400" />
          </div>
        )}
        
        {currentAvatar && !preview && (
          <button
            onClick={onDelete}
            className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
            title="Remove avatar"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!preview ? (
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Upload size={18} />
            <span>Upload Avatar</span>
          </div>
        </label>
      ) : (
        <div className="flex gap-2">
          <Button onClick={handleUpload} loading={loading} size="sm">
            Save Avatar
          </Button>
          <Button onClick={handleCancel} variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Recommended: Square image, at least 400x400px
        <br />
        Max size: 5MB
      </p>
    </div>
  );
};

export default AvatarUpload;