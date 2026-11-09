import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Chronometer } from './components/Chronometer';
import { OrderSatireCard } from './components/OrderSatireCard';
import { RelativeEquivalents } from './components/RelativeEquivalents';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { SympathyWall } from './components/SympathyWall';
import { CertificateModal } from './components/CertificateModal';
import { Footer } from './components/Footer';
import {
  START_TIME_EDT,
  START_TIME_EST_STRICT,
  getTimeBreakdown,
} from './utils/timeCalculations';
import { audioTicker } from './utils/audioTicker';

export default function App() {
  const [useStrictEST, setUseStrictEST] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const startTimeISO = useStrictEST ? START_TIME_EST_STRICT : START_TIME_EDT;

  const [timeData, setTimeData] = useState(() => getTimeBreakdown(startTimeISO, new Date()));

  // High precision timer loop (approx 30fps / every 30ms for smooth millisecond updates)
  useEffect(() => {
    let animId: number;
    const update = () => {
      const now = new Date();
      const updated = getTimeBreakdown(startTimeISO, now);
      setTimeData(updated);

      if (audioEnabled) {
        audioTicker.tick(updated.seconds);
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [startTimeISO, audioEnabled]);

  const handleToggleTimezone = () => {
    setUseStrictEST((prev) => !prev);
  };

  const handleToggleAudio = () => {
    const next = audioTicker.toggle();
    setAudioEnabled(next);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        setIsFullscreen((prev) => !prev);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleShare = useCallback(() => {
    const summary = `Eddie has been waiting for his iPhone Duo for ${timeData.days} days, ${timeData.hours} hours, ${timeData.minutes} minutes and ${timeData.seconds} seconds since October 16, 2026 at 08:04 EST! #WhereIsEddiesPhone`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).then(() => {
        setCopied(true);
        setCopyToast('Copied live wait time to clipboard!');
        setTimeout(() => {
          setCopied(false);
          setCopyToast(null);
        }, 3000);
      });
    }
  }, [timeData]);

  const startTimeLabel = useMemo(() => {
    return useStrictEST ? 'Strict EST (UTC-5)' : 'EDT / Eastern Time (UTC-4)';
  }, [useStrictEST]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col">
      {/* Top Header Contract */}
      <Header onShare={handleShare} copied={copied} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Live Chronometer & Exact User Title */}
        <Chronometer
          timeData={timeData}
          useStrictEST={useStrictEST}
          onToggleTimezone={handleToggleTimezone}
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />

        {/* Apple Order Status Satire */}
        <OrderSatireCard timeData={timeData} />

        {/* What could have happened during Eddie's wait */}
        <RelativeEquivalents totalSeconds={timeData.totalSeconds} />

        {/* Chronological Milestones */}
        <MilestoneTimeline timeData={timeData} startTimeISO={startTimeISO} />

        {/* Sympathy & Encouragement Messages */}
        <SympathyWall />
      </main>

      {/* Footer */}
      <Footer
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onShare={handleShare}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        timeData={timeData}
        startTimeLabel={startTimeLabel}
      />

      {/* Floating Copy Notification Toast */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 border-2 border-black bg-black text-white px-5 py-3 text-xs font-mono font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] animate-bounce">
          {copyToast}
        </div>
      )}
    </div>
  );
}
