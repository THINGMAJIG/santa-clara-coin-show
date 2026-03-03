"use client";
import { useEffect, useState } from "react";
import { SHOW_CONFIG } from "@/data/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const target = new Date(SHOW_CONFIG.startDate).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface CountdownTimerProps {
  /** "full" = large boxes (default), "compact" = single inline line */
  variant?: "full" | "compact";
}

export default function CountdownTimer({ variant = "full" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // ── Show is live ──────────────────────────────────────────────────
  if (!timeLeft) {
    if (variant === "compact") {
      return (
        <span className="font-bold" style={{ color: "var(--navy)" }}>
          🎉 The show is happening NOW!
        </span>
      );
    }
    return (
      <div className="text-2xl font-bold font-display tracking-wide" style={{ color: "var(--gold)" }}>
        🎉 THE SHOW IS HAPPENING NOW!
      </div>
    );
  }

  // ── Compact single-line variant ───────────────────────────────────
  if (variant === "compact") {
    return (
      <span className="font-mono font-bold tabular-nums" style={{ color: "var(--navy)" }}>
        {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m{" "}
        <span className="opacity-70">{pad(timeLeft.seconds)}s</span>
      </span>
    );
  }

  // ── Full large-box variant (original) ─────────────────────────────
  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Minutes", value: pad(timeLeft.minutes) },
    { label: "Seconds", value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="flex items-center gap-3 justify-center flex-wrap">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="countdown-box">
            <div className="text-3xl font-bold font-display" style={{ color: "var(--gold)" }}>
              {value}
            </div>
            <div className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--cream)", opacity: 0.7 }}>
              {label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-2xl font-bold" style={{ color: "var(--gold)", opacity: 0.5 }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
