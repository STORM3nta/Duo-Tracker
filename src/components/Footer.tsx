import React from 'react';
import { Award, ArrowUp, Share2 } from 'lucide-react';

interface FooterProps {
  onOpenCertificate: () => void;
  onShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertificate, onShare }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t-2 border-black bg-white py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-sm font-bold uppercase tracking-wider text-black">
            How long it has been since Eddie ordered his iPhone Duo and hasn&apos;t received it yet.
          </div>
          <p className="text-xs font-mono text-neutral-600 mt-1">
            Official countdown begins from October 16, 2026 at 08:04:00 EST. High-precision live ticker.
          </p>
          <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
            Crafted in black font on white background for ultimate contrast and dedication to Eddie.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCertificate}
            className="flex items-center gap-1.5 border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Delay Certificate</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-1.5 border border-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
