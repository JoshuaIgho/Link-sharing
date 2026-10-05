import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { PUBLIC_URL } from '../../utils/constants';
import { useToast } from '../../hooks/useToast';
import { Copy, Check, Download, QrCode, Share2, Send, Linkedin, Twitter, Mail } from 'lucide-react';

const ShareProfileModal = ({ isOpen, onClose, username, displayName }) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  const profileUrl = username
    ? `${PUBLIC_URL || window.location.origin}/${username}`
    : window.location.origin;

  const qrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
    profileUrl
  )}&size=300&margin=1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast.success('Profile link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${username || 'profile'}-qrcode.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('QR Code downloaded!');
    } catch (error) {
      toast.error('Failed to download QR code');
    }
  };

  const shareTitle = `Check out ${displayName || username || 'my'} profile on LinkShare!`;
  const encodedUrl = encodeURIComponent(profileUrl);
  const encodedText = encodeURIComponent(shareTitle);

  const socialPlatforms = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-slate-900 text-white hover:bg-black',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: 'WhatsApp',
      icon: Send,
      color: 'bg-emerald-600 text-white hover:bg-emerald-700',
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-600 text-white hover:bg-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-700 text-white hover:bg-gray-800',
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your LinkShare Profile">
      <div className="space-y-6 py-2">
        {/* Link Copy Box */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Your Profile Link
          </label>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 pl-3">
            <span className="text-sm font-mono text-gray-700 truncate flex-1">
              {profileUrl}
            </span>
            <Button
              onClick={handleCopy}
              size="sm"
              className={copied ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-gradient-to-br from-primary-50 to-slate-50 border border-primary-100 rounded-2xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-800 mb-3">
            <QrCode size={18} className="text-primary-600" />
            Scan or Download QR Code
          </div>

          <div className="bg-white p-3 rounded-xl inline-block shadow-md border border-gray-100 mb-4">
            <img
              src={qrImageUrl}
              alt="Profile QR Code"
              className="w-44 h-44 object-contain mx-auto"
            />
          </div>

          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadQR}
              className="mx-auto"
            >
              <Download size={16} />
              Download High-Res QR Code
            </Button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Share Directly
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {socialPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${platform.color}`}
              >
                <platform.icon size={16} />
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareProfileModal;
