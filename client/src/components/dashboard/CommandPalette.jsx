import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  Search,
  LayoutDashboard,
  Link as LinkIcon,
  User,
  BarChart3,
  LogOut,
  Settings,
  Plus
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../contexts/ProfileContext';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { links } = useProfile();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[20vh] bg-black/50 backdrop-blur-sm"
    >
      <div className="w-full max-w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
        <div className="flex items-center border-b border-gray-100 px-4 py-3">
          <Search className="text-gray-400 mr-3" size={20} />
          <Command.Input
            placeholder="Search links, pages, or actions..."
            className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="py-6 text-center text-gray-500 text-sm">
            No results found.
          </Command.Empty>

          <Command.Group heading="Navigation" className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">
            <Item icon={LayoutDashboard} onSelect={() => runCommand(() => navigate('/dashboard'))}>Dashboard</Item>
            <Item icon={LinkIcon} onSelect={() => runCommand(() => navigate('/links'))}>Links Manager</Item>
            <Item icon={User} onSelect={() => runCommand(() => navigate('/profile'))}>Profile Settings</Item>
            <Item icon={BarChart3} onSelect={() => runCommand(() => navigate('/analytics'))}>Analytics</Item>
          </Command.Group>

          {links.length > 0 && (
            <Command.Group heading="Your Links" className="text-xs font-semibold text-gray-400 px-3 py-2 mt-2 uppercase tracking-wider">
              {links.map(link => (
                <Item
                  key={link.id}
                  icon={LinkIcon}
                  onSelect={() => runCommand(() => window.open(link.url, '_blank'))}
                >
                  {link.title}
                </Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Actions" className="text-xs font-semibold text-gray-400 px-3 py-2 mt-2 uppercase tracking-wider">
            <Item icon={Plus} onSelect={() => runCommand(() => navigate('/links'))}>Add New Link</Item>
            <Item icon={LogOut} onSelect={() => runCommand(() => logout())} className="text-red-600">Logout</Item>
          </Command.Group>
        </Command.List>

        <div className="border-t border-gray-100 p-3 bg-gray-50 flex items-center justify-end gap-3">
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-[10px] font-bold bg-white border border-gray-200 rounded text-gray-500">ESC</kbd>
            <span className="text-[10px] text-gray-400">to close</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-[10px] font-bold bg-white border border-gray-200 rounded text-gray-500">↵</kbd>
            <span className="text-[10px] text-gray-400">to select</span>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
};

const Item = ({ children, icon: Icon, onSelect, className = '' }) => (
  <Command.Item
    onSelect={onSelect}
    className={`
      flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default select-none
      data-[selected='true']:bg-primary-50 data-[selected='true']:text-primary-700
      transition-colors duration-200 ${className}
    `}
  >
    <Icon size={18} />
    <span className="text-sm font-medium">{children}</span>
  </Command.Item>
);

export default CommandPalette;
