/**
 * Audio manager for UI notification sounds.
 *
 * Uses the Web Audio API to synthesise sounds without bundling audio files.
 * All methods are no-ops when the API is unavailable (e.g. SSR, old browsers).
 */

let _ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined" || !window.AudioContext) return null;
  if (!_ctx) _ctx = new AudioContext();
  return _ctx;
}

/**
 * Play the double-tone notification sound:
 *   - 660 Hz at t = 0 s
 *   - 880 Hz at t = 0.12 s
 * Each tone fades out over 150 ms.
 */
export function playNotificationSound(): void {
  const ctx = getContext();
  if (!ctx) return;

  // Resume context if it was suspended by the browser's autoplay policy
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => undefined);
  }

  [0, 0.12].forEach((t, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain).connect(ctx.destination);
    osc.frequency.setValueAtTime(i === 0 ? 660 : 880, ctx.currentTime + t);
    gain.gain.setValueAtTime(0.15, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.15);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.15);
  });
}
