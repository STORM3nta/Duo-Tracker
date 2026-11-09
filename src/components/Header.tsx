import React from 'react';
import { Share2, Check } from 'lucide-react';

interface HeaderProps {
  onShare: () => void;
  copied: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onShare, copied }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black px-6 py-4 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#chronograph" 
          className="text-base font-bold tracking-tight text-black uppercase whitespace-nowrap shrink-0 hover:opacity-75 transition-opacity"
        >
          Eddie&apos;s iPhone Duo Tracker
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-black">
          <a href="#chronograph" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Counter
          </a>
          <a href="#apple-order" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Order Status
          </a>
          <a href="#relativity" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Time In Perspective
          </a>
          <a href="#milestones" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Milestones
          </a>
          <a href="#guestbook" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Support Eddie
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 active:scale-98 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Share current elapsed wait time"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Status</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
