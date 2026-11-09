import React, { useState } from 'react';
import { Award, Printer, Copy, Check, X } from 'lucide-react';
import { TimeBreakdown } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeData: TimeBreakdown;
  startTimeLabel: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  timeData,
  startTimeLabel,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateText = `
==============================================================
   OFFICIAL CERTIFICATE OF PROTRACTED HARDWARE ANTICIPATION
==============================================================
Awarded to: EDDIE
Product: Apple iPhone Duo (1TB · Deep Titanium)
Order Timestamp: 10/16/2026 08:04 EST (${startTimeLabel})

TOTAL VERIFIED WAIT TIME:
${timeData.days} Days, ${timeData.hours} Hours, ${timeData.minutes} Minutes, ${timeData.seconds} Seconds
(${timeData.totalHours.toFixed(2)} Total Hours / ${timeData.businessDays} Business Days)

STATUS: STILL UNFULFILLED & PREPARING
Issued with condolences by the Global Waiting Committee.
==============================================================
  `.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(certificateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black w-full max-w-2xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 border border-black p-1 text-black hover:bg-neutral-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Design */}
        <div className="border-4 border-double border-black p-6 sm:p-8 text-center bg-white">
          <div className="w-12 h-12 mx-auto border-2 border-black flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-black" />
          </div>

          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-600 mb-2">
            Commonwealth of Unshipped Electronics
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-black mb-1">
            Certificate of Exemplary Patience
          </h2>
          <div className="w-24 h-0.5 bg-black mx-auto mb-6"></div>

          <p className="text-xs font-mono text-neutral-700 max-w-md mx-auto mb-6 leading-relaxed">
            This document solemnly attests that <span className="font-bold underline text-black">EDDIE</span> has faithfully endured unprecedented waiting following the order of the elusive:
          </p>

          <div className="border border-black py-3 px-4 bg-neutral-50 mb-6 inline-block">
            <div className="font-mono text-sm font-bold text-black uppercase">
              Apple iPhone Duo (1TB · Space Black)
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Order Date: October 16, 2026 @ 08:04:00 EST
            </div>
          </div>

          <div className="my-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
              Total Recorded Transit Delay
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-black tabular-nums">
              {timeData.days}d {timeData.hours}h {timeData.minutes}m {timeData.seconds}s
            </div>
            <div className="text-xs font-mono text-neutral-600 mt-1">
              ({timeData.businessDays} business courier days)
            </div>
          </div>

          {/* Stamp */}
          <div className="flex justify-between items-end pt-6 border-t border-black text-left text-[10px] font-mono">
            <div>
              <p className="font-bold text-black uppercase">Witnessed By:</p>
              <p className="text-neutral-600">The Internet &amp; Friends of Eddie</p>
            </div>

            <div className="border-2 border-black p-2 rotate-[-4deg] text-center uppercase font-black tracking-widest text-xs">
              ★ OFFICIAL DELAY ★
            </div>

            <div className="text-right">
              <p className="font-bold text-black uppercase">Current Disposition:</p>
              <p className="text-neutral-600">Still Not Received</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 border border-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-100 cursor-pointer transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Certificate Copied!' : 'Copy As Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
