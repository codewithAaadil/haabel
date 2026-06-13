"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

// Dynamically import ReactPlayer to prevent hydration mismatch in Next.js
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoCardProps {
  title: string;
  subtitle: string;
  videoId: string;
}

export default function VideoCard({ title, subtitle, videoId }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="group relative aspect-video bg-[#0a0a0a] overflow-hidden flex flex-col justify-end shadow-lg">
      
      {/* 
        DEDICATED EVENT CATCHER: 
        This transparent layer sits on top of everything (z-50) and reliably catches 
        hover events without child elements causing flickering/premature mouseLeave events.
      */}
      <div 
        className="absolute inset-0 z-50 cursor-pointer"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsMuted(true);
        }}
        onClick={(e) => {
          // If clicked anywhere on the video card, we can toggle play/pause or just toggle mute
          // We'll toggle mute for convenience
          toggleMute(e);
        }}
      />

      {/* Thumbnail overlay */}
      <div 
        className={`absolute inset-0 z-20 transition-opacity duration-700 bg-black ${
          isHovered && isReady ? 'opacity-0' : 'opacity-100'
        } pointer-events-none`}
      >
        <Image 
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      {/* Video Player */}
      <div className="absolute inset-0 z-10 w-[120%] h-[120%] -left-[10%] -top-[10%] pointer-events-none">
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={isHovered}
          muted={isMuted}
          volume={isMuted ? 0 : 1}
          width="100%"
          height="100%"
          onReady={() => setIsReady(true)}
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0, 
                controls: 0,
                rel: 0,
                modestbranding: 1,
                iv_load_policy: 3,
                disablekb: 1,
                mute: 1,
                origin: typeof window !== 'undefined' ? window.location.origin : ''
              }
            }
          }}
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Play Icon (Shows when not hovered) */}
      <div className={`absolute inset-0 flex items-center justify-center z-30 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'} pointer-events-none`}>
        <Play 
          className="text-white opacity-80 group-hover:opacity-100 transition-all duration-500 fill-white" 
          size={48} 
        />
      </div>

      {/* Mute/Unmute Toggle (Shows when hovered) - Needs to be above the event catcher to be clickable */}
      <div className={`absolute top-4 right-4 z-[60] transition-opacity duration-500 ${isHovered && isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={toggleMute}
          className="bg-black/60 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full text-white transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Text at Bottom Left */}
      <div className="relative z-30 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
        <h3 className="font-gtextbd text-sm md:text-base tracking-wide uppercase text-white shadow-black drop-shadow-md">
          {title}
        </h3>
        <p className="text-gray-200 font-gtexprg text-[10px] mt-1 tracking-wider drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
