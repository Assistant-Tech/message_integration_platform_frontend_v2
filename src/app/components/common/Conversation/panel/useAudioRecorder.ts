import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export interface PendingAudio {
  blob: Blob;
  url: string;
  durationSeconds: number;
}

export interface AudioRecorderApi {
  isRecording: boolean;
  recordingElapsed: number;
  pendingAudio: PendingAudio | null;
  isPreviewPlaying: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  cancelRecording: () => void;
  discardPendingAudio: () => void;
  togglePreviewPlayback: () => void;
  consumePendingAudio: () => PendingAudio | null;
}

/**
 * Encapsulates MediaRecorder lifecycle, elapsed timer, and preview playback
 * for a single pending voice message. Exposes a small imperative API the
 * composer can drive without managing its own refs.
 */
export function useAudioRecorder(): AudioRecorderApi {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const discardOnStopRef = useRef(false);
  const recordingStartRef = useRef(0);
  const recordingIntervalRef = useRef<number | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingElapsed, setRecordingElapsed] = useState(0);
  const [pendingAudio, setPendingAudio] = useState<PendingAudio | null>(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // Revoke URL whenever the tracked audio changes or unmounts.
  useEffect(() => {
    const url = pendingAudio?.url;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [pendingAudio?.url]);

  // Final unmount cleanup: kill any in-flight recording or playback.
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current !== null) {
        window.clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorderRef.current?.state === "recording") {
        discardOnStopRef.current = true;
        mediaRecorderRef.current.stop();
      }
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      previewAudioRef.current?.pause();
      previewAudioRef.current = null;
    };
  }, []);

  const clearPreviewAudioElement = useCallback(() => {
    previewAudioRef.current?.pause();
    previewAudioRef.current = null;
    setIsPreviewPlaying(false);
  }, []);

  const startRecording = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      toast.error("Voice recording is not supported in this browser.");
      return;
    }

    if (pendingAudio) {
      URL.revokeObjectURL(pendingAudio.url);
      setPendingAudio(null);
      clearPreviewAudioElement();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      discardOnStopRef.current = false;

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener("stop", () => {
        const elapsedSeconds = Math.max(
          1,
          Math.round((Date.now() - recordingStartRef.current) / 1000),
        );

        if (!discardOnStopRef.current && audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, {
            type: recorder.mimeType || "audio/webm",
          });
          const url = URL.createObjectURL(blob);
          setPendingAudio({ blob, url, durationSeconds: elapsedSeconds });
        }

        audioChunksRef.current = [];
        discardOnStopRef.current = false;
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;

        if (recordingIntervalRef.current !== null) {
          window.clearInterval(recordingIntervalRef.current);
          recordingIntervalRef.current = null;
        }
        setIsRecording(false);
        setRecordingElapsed(0);
      });

      recordingStartRef.current = Date.now();
      recorder.start();
      setIsRecording(true);
      setRecordingElapsed(0);

      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingElapsed(
          Math.floor((Date.now() - recordingStartRef.current) / 1000),
        );
      }, 250);
    } catch (error) {
      const message =
        error instanceof Error && error.name === "NotAllowedError"
          ? "Microphone permission denied."
          : "Unable to start recording.";
      toast.error(message);
    }
  }, [pendingAudio, clearPreviewAudioElement]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      discardOnStopRef.current = false;
      mediaRecorderRef.current.stop();
    }
  }, []);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      discardOnStopRef.current = true;
      mediaRecorderRef.current.stop();
    }
  }, []);

  const discardPendingAudio = useCallback(() => {
    setPendingAudio((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
    clearPreviewAudioElement();
  }, [clearPreviewAudioElement]);

  const togglePreviewPlayback = useCallback(() => {
    if (!pendingAudio) return;

    if (!previewAudioRef.current) {
      const audio = new Audio(pendingAudio.url);
      audio.addEventListener("ended", () => setIsPreviewPlaying(false));
      previewAudioRef.current = audio;
    }

    const audio = previewAudioRef.current;
    if (isPreviewPlaying) {
      audio.pause();
      setIsPreviewPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setIsPreviewPlaying(true))
      .catch(() => {
        toast.error("Could not play voice message.");
        setIsPreviewPlaying(false);
      });
  }, [pendingAudio, isPreviewPlaying]);

  const consumePendingAudio = useCallback(() => {
    const snapshot = pendingAudio;
    if (!snapshot) return null;
    clearPreviewAudioElement();
    // Release the object URL — caller now owns the Blob.
    URL.revokeObjectURL(snapshot.url);
    setPendingAudio(null);
    return snapshot;
  }, [pendingAudio, clearPreviewAudioElement]);

  return {
    isRecording,
    recordingElapsed,
    pendingAudio,
    isPreviewPlaying,
    startRecording,
    stopRecording,
    cancelRecording,
    discardPendingAudio,
    togglePreviewPlayback,
    consumePendingAudio,
  };
}
