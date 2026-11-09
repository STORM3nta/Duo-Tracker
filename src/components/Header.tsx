import React from 'react';
import { Share2, Check, Sparkles } from 'lucide-react';

interface HeaderProps {
  onShare: () => void;
  copied: boolean;
  onCelebrate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShare, copied, onCelebrate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#chronograph"
            className="text-base font-bold tracking-tight text-black uppercase whitespace-nowrap hover:opacity-75 transition-opacity"
          >
            Eddie&apos;s iPhone Duo · Delivered!
          </a>
        </div>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-black">
          <a href="#chronograph" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Possession Clock
          </a>
          <a href="#delivery-dossier" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Delivery Receipt
          </a>
          <a href="#relativity" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            The Great Wait
          </a>
          <a href="#milestones" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Chronology
          </a>
          <a href="#guestbook" className="hover:underline underline-offset-4 whitespace-nowrap shrink-0">
            Victory Wall
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCelebrate}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-black text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 cursor-pointer transition-colors whitespace-nowrap"
            title="Pop confetti"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-neutral-800 active:scale-98 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Share arrival status"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Arrival</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
