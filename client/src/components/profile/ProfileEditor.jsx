import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { THEME_COLORS, THEME_PRESETS, FONT_PRESETS } from '../../utils/constants';
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
    themePreset: 'minimal',
    fontPreset: 'sans',
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
        themePreset: profile.themePreset || 'minimal',
        fontPreset: profile.fontPreset || 'sans',
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

      {/* Visual Identity */}
      <div className="space-y-6 pt-4 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Visual Identity</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Theme Preset
          </label>
          <div className="grid grid-cols-2 gap-3">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, themePreset: preset.id }))}
                className={`p-3 text-left border rounded-xl transition-all ${
                  formData.themePreset === preset.id
                    ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-sm font-bold text-gray-900">{preset.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Accent Color
          </label>
          <div className="flex flex-wrap gap-2.5">
            {THEME_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, themeColor: color.value }))}
                className={`w-8 h-8 rounded-full transition-all ring-offset-2 ${
                  formData.themeColor === color.value
                    ? 'ring-2 ring-gray-900 scale-110 shadow-sm'
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Typography
          </label>
          <div className="flex gap-2">
            {FONT_PRESETS.map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, fontPreset: font.id }))}
                className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                  formData.fontPreset === font.id
                    ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                } ${font.class}`}
              >
                {font.name}
              </button>
            ))}
          </div>
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