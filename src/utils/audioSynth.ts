// Web Audio API Synthesizer for Focus Sounds and Timer Notifications

let audioCtx: AudioContext | null = null;
let currentNoiseSource: AudioNode | null = null;
let currentGainNode: GainNode | null = null;
let binauralLeft: OscillatorNode | null = null;
let binauralRight: OscillatorNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a pleasant bell / chime notification sound for the timer
 */
export function playChime(type: 'success' | 'alert' | 'tick' = 'success') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      return;
    }

    // Two-tone soothing harmonic chime
    const freq1 = type === 'success' ? 523.25 : 440; // C5 or A4
    const freq2 = type === 'success' ? 659.25 : 554.37; // E5 or C#5
    const freq3 = type === 'success' ? 783.99 : 659.25; // G5 or E5

    [freq1, freq2, freq3].forEach((f, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + index * 0.12);

      gain.gain.setValueAtTime(0.001, now + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, now + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 1.6);
    });
  } catch (err) {
    console.warn('Audio play chime error:', err);
  }
}

/**
 * Generic frequency tone beep for math trainers, timers & pianos
 */
export function playAudioBeep(freq: number, type: OscillatorType = 'sine', duration = 0.2) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    console.warn('Audio beep error:', err);
  }
}


/**
 * Start synthesised focus atmosphere
 */
export function startFocusSound(type: 'white' | 'pink' | 'brown' | 'rain' | 'binaural', volume = 0.5) {
  stopFocusSound();
  try {
    const ctx = getAudioContext();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    currentGainNode = gain;

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      whiteNoise.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();
      currentNoiseSource = whiteNoise;
    } else if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }
      const pinkNoise = ctx.createBufferSource();
      pinkNoise.buffer = noiseBuffer;
      pinkNoise.loop = true;
      pinkNoise.connect(gain);
      gain.connect(ctx.destination);
      pinkNoise.start();
      currentNoiseSource = pinkNoise;
    } else if (type === 'brown' || type === 'rain') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      const brownNoise = ctx.createBufferSource();
      brownNoise.buffer = noiseBuffer;
      brownNoise.loop = true;

      if (type === 'rain') {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(900, ctx.currentTime);
        brownNoise.connect(filter);
        filter.connect(gain);
      } else {
        brownNoise.connect(gain);
      }
      gain.connect(ctx.destination);
      brownNoise.start();
      currentNoiseSource = brownNoise;
    } else if (type === 'binaural') {
      // 210Hz left and 220Hz right (10Hz Alpha Waves difference for relaxed alertness)
      const merger = ctx.createChannelMerger(2);
      
      const oscL = ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(210, ctx.currentTime);

      const oscR = ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(220, ctx.currentTime);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);

      merger.connect(gain);
      gain.connect(ctx.destination);

      oscL.start();
      oscR.start();

      binauralLeft = oscL;
      binauralRight = oscR;
    }
  } catch (err) {
    console.warn('Focus sound error:', err);
  }
}

export function setFocusVolume(volume: number) {
  if (currentGainNode && audioCtx) {
    currentGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.4)), audioCtx.currentTime);
  }
}

export function stopFocusSound() {
  try {
    if (currentNoiseSource) {
      (currentNoiseSource as AudioBufferSourceNode).stop();
      currentNoiseSource.disconnect();
      currentNoiseSource = null;
    }
    if (binauralLeft) {
      binauralLeft.stop();
      binauralLeft.disconnect();
      binauralLeft = null;
    }
    if (binauralRight) {
      binauralRight.stop();
      binauralRight.disconnect();
      binauralRight = null;
    }
    if (currentGainNode) {
      currentGainNode.disconnect();
      currentGainNode = null;
    }
  } catch (e) {
    console.warn('Error stopping focus sound:', e);
  }
}
