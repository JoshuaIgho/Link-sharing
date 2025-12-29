import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { THEME_COLORS } from '../../utils/constants';
import { validateUsername } from '../../utils/validation';
import { useDebounce } from '../../hooks/useDebounce';
import { profileService } from '../../services/profile.service';
import { Check, X } from 'lucide-react';

const ProfileEditor = ({ profile, onSave, loading }) => {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    bio: '',
    themeColor: '#6366f1',
    isPublic: true,
  });
  const [errors, setErrors] = useState({});
  const [usernameCheck, setUsernameCheck] = useState({ checking: false, available: null });
  
  const debouncedUsername = useDebounce(formData.username, 500);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        displayName: profile.displayName || '',
        bio: profile.bio || '',
        themeColor: profile.themeColor || '#6366f1',
        isPublic: profile.isPublic ?? true,
      });
    }
  }, [profile]);

  useEffect(() => {
    const checkUsername = async () => {
      if (
        debouncedUsername &&
        debouncedUsername !== profile?.username &&
        validateUsername(debouncedUsername)
      ) {
        setUsernameCheck({ checking: true, available: null });
        try {
          const available = await profileService.checkUsernameAvailability(debouncedUsername);
          setUsernameCheck({ checking: false, available });
        } catch (error) {
          setUsernameCheck({ checking: false, available: null });
        }
      } else {
        setUsernameCheck({ checking: false, available: null });
      }
    };

    checkUsername();
  }, [debouncedUsername, profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be 3-30 characters (letters, numbers, _ or -)';
    } else if (usernameCheck.available === false) {
      newErrors.username = 'Username is already taken';
    }

    if (formData.displayName && formData.displayName.length > 50) {
      newErrors.displayName = 'Display name must be under 50 characters';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be under 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <Input
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="johndoe"
          helperText="This will be your public profile URL"
        />
        {formData.username !== profile?.username && (
          <div className="absolute right-3 top-9">
            {usernameCheck.checking ? (
              <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            ) : usernameCheck.available === true ? (
              <Check className="text-green-600" size={20} />
            ) : usernameCheck.available === false ? (
              <X className="text-red-600" size={20} />
            ) : null}
          </div>
        )}
      </div>

      <Input
        label="Display Name"
        name="displayName"
        value={formData.displayName}
        onChange={handleChange}
        error={errors.displayName}
        placeholder="John Doe"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className={`input resize-none ${errors.bio ? 'border-red-500' : ''}`}
          placeholder="Tell people about yourself..."
        />
        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
        <p className="mt-1 text-sm text-gray-500">{formData.bio.length}/500</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Theme Color
        </label>
        <div className="grid grid-cols-5 gap-3">
          {THEME_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, themeColor: color.value }))}
              className={`w-full aspect-square rounded-lg transition-all ${
                formData.themeColor === color.value
                  ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
        />
        <label htmlFor="isPublic" className="text-sm text-gray-700">
          Make my profile public
        </label>
      </div>

      <Button type="submit" loading={loading} fullWidth>
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileEditor;