import React, { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  color: string;
  isFilled: boolean;
  alpha: number;
}

interface ConfettiCanvasProps {
  trigger: number;
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#000000', '#262626', '#525252', '#737373', '#a3a3a3'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 90; i++) {
      pieces.push({
        x: Math.random() * width,
        y: -20 - Math.random() * (height * 0.5),
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 3,
        vy: 2.5 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        isFilled: Math.random() > 0.3,
        alpha: 1,
      });
    }

    let animId: number;
    let frames = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frames++;

      let activeCount = 0;
      for (const p of pieces) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > height - 100) {
          p.alpha -= 0.02;
        }

        if (p.alpha > 0 && p.y < height) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, p.alpha);

          if (p.isFilled) {
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          } else {
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 1.5;
            ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }

          ctx.restore();
        }
      }

      if (activeCount > 0 && frames < 350) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
