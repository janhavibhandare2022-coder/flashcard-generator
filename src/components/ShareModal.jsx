import React, { useState } from 'react';
import { FaTimes, FaCopy, FaCheck, FaWhatsapp, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ShareModal = ({ isOpen, onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-lg font-bold text-gray-800 mb-4">Share Flashcard</h3>

        <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50 mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs text-gray-600 outline-none"
          />
          <button
            onClick={handleCopy}
            className="text-gray-600 hover:text-red-500 ml-2"
            title="Copy Link"
          >
            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
          </button>
        </div>

        {copied && <p className="text-green-600 text-xs mb-3">Link copied to clipboard!</p>}

        <div className="flex justify-around text-2xl text-gray-600 pt-2 border-t">
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="hover:text-green-500">
            <FaWhatsapp />
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="hover:text-sky-500">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;