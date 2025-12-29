import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit2, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

const LinkItem = ({ link, onEdit, onDelete, onToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card flex items-center gap-4 ${!link.isActive ? 'opacity-60' : ''}`}
    >
      {/* Drag Handle */}
      <button
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>

      {/* Link Icon */}
      {link.iconUrl ? (
        <img
          src={link.iconUrl}
          alt={link.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
          <ExternalLink size={20} className="text-gray-400" />
        </div>
      )}

      {/* Link Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{link.title}</h3>
        <p className="text-sm text-gray-500 truncate">{link.url}</p>
        {link.description && (
          <p className="text-xs text-gray-400 truncate mt-1">{link.description}</p>
        )}
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
        <span>{link.clickCount} clicks</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(link.id)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title={link.isActive ? 'Disable link' : 'Enable link'}
        >
          {link.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        
        <button
          onClick={() => onEdit(link)}
          className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50"
          title="Edit link"
        >
          <Edit2 size={18} />
        </button>
        
        <button
          onClick={() => onDelete(link.id)}
          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
          title="Delete link"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default LinkItem;