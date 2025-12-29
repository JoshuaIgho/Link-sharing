import React from 'react';
import { User } from 'lucide-react';
import { getInitials } from '../../utils/formatters';

const Avatar = ({ src, alt, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  if (name) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold ${className}`}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gray-200 text-gray-500 flex items-center justify-center ${className}`}
    >
      <User size={20} />
    </div>
  );
};

export default Avatar;