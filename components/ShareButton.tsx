'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
}

export default function ShareButton({ title, description, url }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: description,
          url,
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-[#8b7355] hover:text-[#a08766] transition-colors"
    >
      <Share2 size={16} />
      <span>Share</span>
    </button>
  );
}
