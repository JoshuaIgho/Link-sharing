import React from 'react';
import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center bg-white rounded-xl border-2 border-dashed border-gray-200 ${className}`}>
      {Icon && (
        <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-sm mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="px-8">
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
