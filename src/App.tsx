import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Chronometer } from './components/Chronometer';
import { OrderSatireCard } from './components/OrderSatireCard';
import { RelativeEquivalents } from './components/RelativeEquivalents';
import { MilestoneTimeline } from './components/MilestoneTimeline';
import { SympathyWall } from './components/SympathyWall';
import { CertificateModal } from './components/CertificateModal';
import { Footer } from './components/Footer';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import {
  getFinalWaitBreakdown,
  getPossessionBreakdown,
} from './utils/timeCalculations';
import { audioTicker } from './utils/audioTicker';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(1);

  // Final recorded wait duration (24 days, 7 hours, 44 minutes)
  const waitRecord = useMemo(() => getFinalWaitBreakdown(), []);

  // Live Possession Clock (time since Eddie received it)
  const [possessionTime, setPossessionTime] = useState(() => getPossessionBreakdown());

  // Smooth live tick loop
  useEffect(() => {
    let animId: number;
    const update = () => {
      const now = new Date();
      const updated = getPossessionBreakdown(now);
      setPossessionTime(updated);

      if (audioEnabled) {
        audioTicker.tick(updated.seconds);
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [audioEnabled]);

  const handleToggleAudio = () => {
    const next = audioTicker.toggle();
    setAudioEnabled(next);
  };

  const handleCelebrate = () => {
    setConfettiTrigger((prev) => prev + 1);
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
    const summary = `THE WAIT IS OVER! After 24 days, 7 hours, and 44 minutes, Eddie has finally taken possession of his iPhone Duo on November 9, 2026! #EddiesPhoneArrived`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary).then(() => {
        setCopied(true);
        setCopyToast('Copied arrival announcement to clipboard!');
        setTimeout(() => {
          setCopied(false);
          setCopyToast(null);
        }, 3000);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col relative">
      {/* Monochrome Confetti for celebration */}
      <ConfettiCanvas trigger={confettiTrigger} />

      {/* Top Header */}
      <Header
        onShare={handleShare}
        copied={copied}
        onCelebrate={handleCelebrate}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Triumphant Chronometer: Possession Stopwatch & Wait Archive */}
        <Chronometer
          possessionTime={possessionTime}
          waitRecord={waitRecord}
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onTriggerConfetti={handleCelebrate}
        />

        {/* Order Delivery Proof & Satirical Resolution */}
        <OrderSatireCard />

        {/* Historical Relativity: What Happened During The Great Wait */}
        <RelativeEquivalents totalSeconds={waitRecord.totalSeconds} />

        {/* Complete Timeline: From Order to Arrival */}
        <MilestoneTimeline />

        {/* Victory Wall: Congratulate Eddie */}
        <SympathyWall />
      </main>

      {/* Footer */}
      <Footer
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onShare={handleShare}
        onCelebrate={handleCelebrate}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        waitRecord={waitRecord}
      />

      {/* Copy Notification Toast */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 border-2 border-black bg-black text-white px-5 py-3 text-xs font-mono font-bold shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] animate-bounce">
          {copyToast}
        </div>
      )}
    </div>
  );
}
