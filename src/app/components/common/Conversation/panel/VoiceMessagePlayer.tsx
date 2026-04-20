import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface Props {
  src: string;
  durationSeconds?: number;
  isAgent: boolean;
}

/** Generates a deterministic set of "waveform" bar heights from a string seed. */
function generateWaveformBars(seed: string, count: number): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const bars: number[] = [];
  for (let i = 0; i < count; i++) {
    hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b);
    hash = Math.imul(hash ^ (hash >>> 13), 0x45d9f3b);
    hash ^= hash >>> 16;
    const normalized = (Math.abs(hash % 100) / 100) * 0.7 + 0.3;
    bars.push(normalized);
  }
  return bars;
}

function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const BAR_COUNT = 28;

const VoiceMessagePlayer = ({ src, durationSeconds = 0, isAgent }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [currentTime, setCurrentTime] = useState(0);
  const animRef = useRef<number>(0);

  const bars = useRef(generateWaveformBars(src, BAR_COUNT)).current;

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "metadata";
    audioRef.current = audio;

    const onLoaded = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(animRef.current);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const dur = audio.duration || duration;
    if (dur > 0) {
      setProgress(audio.currentTime / dur);
      setCurrentTime(audio.currentTime);
    }
    if (!audio.paused) {
      animRef.current = requestAnimationFrame(tick);
    }
  }, [duration]);

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animRef.current);
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        animRef.current = requestAnimationFrame(tick);
      }).catch(() => setIsPlaying(false));
    }
  }, [isPlaying, tick]);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const dur = audio.duration || duration;
    audio.currentTime = x * dur;
    setProgress(x);
    setCurrentTime(x * dur);
  }, [duration]);

  const displayTime = isPlaying || currentTime > 0
    ? formatTime(currentTime)
    : formatTime(duration);

  return (
    <div className="flex items-center gap-2.5 py-0.5" style={{ minWidth: 200 }}>
      {/* Play / Pause */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause" : "Play"}
        className={cn(
          "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors",
          isAgent
            ? "bg-white/25 text-white hover:bg-white/35"
            : "bg-primary/10 text-primary hover:bg-primary/20",
        )}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1px]" />
        )}
      </button>

      {/* Waveform + time */}
      <div className="min-w-0 flex-1">
        {/* Waveform bars */}
        <div
          className="flex h-7 cursor-pointer items-end gap-[2px]"
          onClick={seekTo}
          role="slider"
          aria-label="Seek voice message"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
        >
          {bars.map((height, i) => {
            const filled = i / BAR_COUNT < progress;
            return (
              <div
                key={i}
                className={cn(
                  "w-[3px] flex-shrink-0 rounded-full transition-colors duration-150",
                  filled
                    ? isAgent
                      ? "bg-white"
                      : "bg-primary"
                    : isAgent
                      ? "bg-white/30"
                      : "bg-primary/20",
                )}
                style={{ height: `${height * 100}%` }}
              />
            );
          })}
        </div>

        {/* Duration */}
        <p
          className={cn(
            "mt-0.5 text-[11px] tabular-nums",
            isAgent ? "text-white/70" : "text-grey-medium",
          )}
        >
          {displayTime}
        </p>
      </div>
    </div>
  );
};

export default VoiceMessagePlayer;
