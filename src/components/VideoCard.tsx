"use client";

import { useState, useRef, useCallback, useEffect, useId } from "react";
import Image from "next/image";

// ─── YouTube IFrame API types ──────────────────────────────────────────────────
declare global {
  interface Window {
    YT: {
      Player: new (id: string, opts: YTOptions) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; CUED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number }) => void;
    onError?: () => void;
  };
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
  getPlayerState(): number;
}

// ─── Singleton YT API loader ───────────────────────────────────────────────────
let ytReady: Promise<void> | null = null;
function loadYT(): Promise<void> {
  if (ytReady) return ytReady;
  ytReady = new Promise<void>((res) => {
    if (window.YT?.Player) { res(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); res(); };
    if (!document.getElementById("yt-api-script")) {
      const s = document.createElement("script");
      s.id = "yt-api-script";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
  return ytReady;
}

interface Props { title: string; subtitle: string; videoId: string; }

export default function VideoCard({ title, subtitle, videoId }: Props) {
  const uid = useId().replace(/:/g, "");
  const ytDivId = `yt-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Use refs for state accessed in event listeners to avoid stale closures
  const playingRef = useRef(false);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let dead = false;

    loadYT().then(() => {
      if (dead) return;
      playerRef.current = new window.YT.Player(ytDivId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Native YouTube controls enabled
          rel: 0,
          showinfo: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: () => {
            if (dead) return;
            setReady(true);
          },
          onStateChange: (e) => {
            if (dead) return;
            const isPlaying = e.data === window.YT.PlayerState.PLAYING;
            playingRef.current = isPlaying;
            setPlaying(isPlaying);
            if (isPlaying) {
              window.dispatchEvent(new CustomEvent("haabel-video-play", { detail: { id: uid } }));
            }
          },
        },
      });
    });

    return () => {
      dead = true;
      if (playTimer.current) clearTimeout(playTimer.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId, ytDivId]);

  // Handle global play events to ensure only one video plays at a time
  useEffect(() => {
    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail.id !== uid) {
        if (playingRef.current && playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
          setHovered(false);
        }
      }
    };
    window.addEventListener("haabel-video-play", handleGlobalPlay);
    return () => window.removeEventListener("haabel-video-play", handleGlobalPlay);
  }, [uid]);

  // Handle entering the container
  const handleMouseEnter = useCallback(() => {
    if (pauseTimer.current) {
      clearTimeout(pauseTimer.current);
      pauseTimer.current = null;
    }
    setHovered(true);
    playTimer.current = setTimeout(() => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
    }, 150);
  }, []);

  // Handle leaving the container.
  // We use window mousemove to reliably detect when the mouse leaves the iframe
  // and moves over the rest of the document.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !playerRef.current) return;
      if (document.fullscreenElement) return; // Don't pause if in fullscreen

      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInside && playingRef.current) {
        // Only pause if we aren't hovering inside the rect anymore
        setHovered(false);
        if (playTimer.current) {
          clearTimeout(playTimer.current);
          playTimer.current = null;
        }

        // Debounce pause slightly
        if (!pauseTimer.current) {
          pauseTimer.current = setTimeout(() => {
            if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
              playerRef.current.pauseVideo();
            }
            pauseTimer.current = null;
          }, 150);
        }
      } else if (isInside && !hovered) {
          setHovered(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hovered]);

  // Thumbnail logic: Show thumbnail if not playing and not hovered.
  // When hovered, it fades out to reveal the native YouTube player UI and controls.
  const showThumbnail = !playing && !hovered;

  return (
    <div
      ref={containerRef}
      className="group relative bg-black overflow-hidden shadow-2xl aspect-video"
      onMouseEnter={handleMouseEnter}
    >
      {/* ── YouTube iframe ──────────────────────────────────────── */}
      {/* Width/height 100% so it fits perfectly and shows native controls without clipping */}
      <div
        id={ytDivId}
        className="absolute inset-0 z-10 w-full h-full"
      />

      {/* ── Custom Thumbnail Overlay ──────────────────────────────────────── */}
      {/* 
        Fades out when hovered or playing so the user can interact with the native YT player.
        pointer-events-none ensures it doesn't block interaction with the iframe.
      */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
          showThumbnail ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Title and subtitle overlay on our custom thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="font-gtextbd text-sm md:text-base tracking-wide uppercase text-white shadow-black drop-shadow-md">
            {title}
          </h3>
          <p className="text-gray-200 font-gtexprg text-[10px] mt-1 tracking-wider drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
