import { useState, useEffect, useCallback } from "react";

const LOCKOUT_STORAGE_KEY = "login_lockout_until";

export const useLockoutTimer = () => {
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);

  // Load lockout from localStorage on mount
  useEffect(() => {
    const lockoutUntil = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil, 10);
      const now = Date.now();

      if (now < lockoutTime) {
        setIsLockedOut(true);
        setLockoutTimeLeft(Math.ceil((lockoutTime - now) / 1000));
      } else {
        localStorage.removeItem(LOCKOUT_STORAGE_KEY);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isLockedOut || lockoutTimeLeft <= 0) return;

    const interval = setInterval(() => {
      setLockoutTimeLeft((prev) => {
        if (prev <= 1) {
          setIsLockedOut(false);
          localStorage.removeItem(LOCKOUT_STORAGE_KEY);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLockedOut, lockoutTimeLeft]);

  // Set lockout from backend or default
  const initiateLockout = (seconds = 300) => {
    setIsLockedOut(true);
    const expiry = Date.now() + seconds * 1000;
    localStorage.setItem(LOCKOUT_STORAGE_KEY, expiry.toString());
    setLockoutTimeLeft(seconds);
  };

  // Format mm:ss
  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  return { isLockedOut, lockoutTimeLeft, initiateLockout, formatTime };
};
