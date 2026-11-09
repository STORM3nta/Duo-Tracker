// Clean Web Audio API mechanical tick synthesizer

class AudioTicker {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private lastTickSecond: number = -1;

  public enable() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isEnabled = true;
  }

  public disable() {
    this.isEnabled = false;
  }

  public toggle(): boolean {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  public getStatus(): boolean {
    return this.isEnabled;
  }

  public tick(currentSecond: number) {
    if (!this.isEnabled || !this.ctx) return;
    if (currentSecond === this.lastTickSecond) return;
    this.lastTickSecond = currentSecond;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Subtle, high-frequency mechanical watch click (800Hz down to 120Hz in 15ms)
      const freq = currentSecond % 2 === 0 ? 980 : 820;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio context error or not allowed yet
    }
  }
}

export const audioTicker = new AudioTicker();
