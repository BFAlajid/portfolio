"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TRACKS = [
  "battle-frontier",
  "birch-pokemon-lab",
  "dewford-town",
  "dive",
  "ending",
  "ever-grande-city",
  "fallarbor-town",
  "fortree-city",
  "lilycove-city",
  "littleroot-town",
  "littleroot-town-beta",
  "oldale-town",
  "petalburg-city",
  "petalburg-woods",
  "pokemon-center",
  "route-101",
  "route-104",
  "route-119",
  "rustboro-city",
  "slateport-city",
  "sootopolis-city",
  "surf",
  "verdanturf-town",
  "viridian-city-gsc",
];

const VOLUME = 0.3;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Auto-playing BGM that starts on the first user interaction (click/keydown).
 * Shuffles all tracks and loops endlessly. No UI controls — just vibes.
 * Uses HTMLAudioElement + createMediaElementSource so Safari can decode FLAC
 * natively while we retain programmatic volume control via GainNode.
 */
export function useBgm() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const playlistRef = useRef<string[]>([]);
  const indexRef = useRef(0);

  const playNext = useCallback(() => {
    if (indexRef.current >= playlistRef.current.length) {
      playlistRef.current = shuffle(TRACKS);
      indexRef.current = 0;
    }

    const track = playlistRef.current[indexRef.current];
    indexRef.current++;

    if (!audioRef.current) {
      audioRef.current = new Audio();

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        ctxRef.current = ctx;

        const gain = ctx.createGain();
        gain.gain.value = VOLUME;
        gain.connect(ctx.destination);
        gainRef.current = gain;

        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(gain);
      } else {
        audioRef.current.volume = VOLUME;
      }
    }

    audioRef.current.src = `/music/${track}.flac`;
    audioRef.current.play().catch(() => {});
  }, []);

  // When a track ends, play the next one
  useEffect(() => {
    if (!started) return;

    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => playNext();
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [started, playNext]);

  // Start playback on first user interaction
  useEffect(() => {
    // Check FLAC support
    const audio = document.createElement("audio");
    if (audio.canPlayType("audio/flac") === "") return;

    const handleInteraction = () => {
      if (started) return;
      setStarted(true);
      playlistRef.current = shuffle(TRACKS);
      indexRef.current = 0;
      playNext();

      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [started, playNext]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      ctxRef.current?.close();
    };
  }, []);
}
