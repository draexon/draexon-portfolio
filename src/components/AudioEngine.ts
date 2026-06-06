/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private secondaryOsc: OscillatorNode | null = null;
  private delayNode: DelayNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private pulseInterval: number | null = null;
  private activeTrackId: string | null = null;
  private isPlayingState = false;

  public onVolumeChange: ((val: number) => void) | null = null;

  constructor() {
    // Lazy initialize when user interacts
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.analyserNode = this.ctx.createAnalyser();
    this.analyserNode.fftSize = 256;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.15, this.ctx.currentTime);

    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(800, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2, this.ctx.currentTime);

    this.delayNode = this.ctx.createDelay(1.0);
    const delayGain = this.ctx.createGain();
    delayGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.delayNode.delayTime.setValueAtTime(0.35, this.ctx.currentTime);

    // Patch nodes: Oscs -> Filter -> SynthGain -> Analyser -> Output
    // Also Filter -> Delay -> DelayGain -> Filter (for feedback) -> Output
    this.filterNode.connect(this.delayNode);
    this.delayNode.connect(delayGain);
    delayGain.connect(this.filterNode); // loop feedback

    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.analyserNode);
    this.analyserNode.connect(this.ctx.destination);
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  public start(trackId: string, variant: number) {
    this.init();
    if (!this.ctx || !this.gainNode || !this.filterNode) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    this.stop();

    this.activeTrackId = trackId;
    this.isPlayingState = true;

    const now = this.ctx.currentTime;

    // 1. Organic Drone Synthesizer
    const osc1 = this.ctx.createOscillator();
    const octaves = [55, 110, 165, 220]; // low A notes
    const freq = octaves[variant % octaves.length];
    osc1.type = variant % 2 === 0 ? "sawtooth" : "triangle";
    osc1.frequency.setValueAtTime(freq, now);
    
    // Low sweeping filter mod
    this.filterNode.frequency.cancelScheduledValues(now);
    this.filterNode.frequency.setValueAtTime(300, now);
    this.filterNode.frequency.exponentialRampToValueAtTime(1200, now + 8);
    this.filterNode.frequency.linearRampToValueAtTime(450, now + 16);

    // High cut sweep overlay
    const filterLfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    filterLfo.frequency.setValueAtTime(0.08, now); // very slow sweep
    lfoGain.gain.setValueAtTime(150, now);
    filterLfo.connect(lfoGain);
    if (this.filterNode.frequency) {
      lfoGain.connect(this.filterNode.frequency);
    }
    filterLfo.start(now);
    
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.01, now);
    oscGain.gain.linearRampToValueAtTime(0.12, now + 2); // soft fade in

    osc1.connect(oscGain);
    oscGain.connect(this.filterNode);
    osc1.start(now);

    this.primaryOsc = osc1;

    // 2. Pulse Synthesizer / Ambient Beeps synchronized to a rhythm (approx 120BPM)
    const bpm = 120 - (variant * 4);
    const intervalMs = (60 / bpm) * 1000 * 0.5; // eighth notes

    let pulseStep = 0;
    const notes = [
      freq * 1.5, // Fifth
      freq * 2.0, // Octave
      freq * 2.25, // Fourth
      freq * 3.0, // Fifth high
      freq * (variant % 2 === 0 ? 1.6 : 1.68) // Thirteenth / Minor third variation
    ];

    this.pulseInterval = window.setInterval(() => {
      if (!this.ctx || !this.filterNode) return;
      const t = this.ctx.currentTime;

      // Skip occasionally for dynamic pattern variation
      if (pulseStep % 8 === 3 || pulseStep % 8 === 7) {
        pulseStep++;
        return;
      }

      const pOsc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      
      pOsc.type = "sine";
      const chosenNote = notes[pulseStep % notes.length];
      pOsc.frequency.setValueAtTime(chosenNote, t);

      pGain.gain.setValueAtTime(0.001, t);
      pGain.gain.exponentialRampToValueAtTime(0.06, t + 0.02);
      pGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      pOsc.connect(pGain);
      pGain.connect(this.filterNode);
      pOsc.start(t);
      pOsc.stop(t + 0.3);

      pulseStep++;
    }, intervalMs);
  }

  public stop() {
    this.isPlayingState = false;
    this.activeTrackId = null;

    if (this.primaryOsc) {
      try {
        this.primaryOsc.stop();
      } catch (e) {}
      this.primaryOsc = null;
    }
    if (this.secondaryOsc) {
      try {
        this.secondaryOsc.stop();
      } catch (e) {}
      this.secondaryOsc = null;
    }
    if (this.pulseInterval) {
      window.clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
  }

  public getActiveTrack(): string | null {
    return this.activeTrackId;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }
}

// Export single instance for global usage across components
export const globalAudio = new AudioEngine();
