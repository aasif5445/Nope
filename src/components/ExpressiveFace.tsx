import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Emotion } from '../types';
import { sound } from '../utils/audio';

interface ExpressiveFaceProps {
  emotion: Emotion;
  onFacePoke?: (count: number) => void;
  reducedMotion?: boolean;
}

export const ExpressiveFace: React.FC<ExpressiveFaceProps> = ({
  emotion,
  onFacePoke,
  reducedMotion = false
}) => {
  const [blink, setBlink] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const faceRef = useRef<HTMLDivElement>(null);

  // Periodic subtle blink
  useEffect(() => {
    if (emotion === 'off' || emotion === 'glitch') return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, Math.random() * 3000 + 2500);

    return () => clearInterval(interval);
  }, [emotion]);

  // Subtle mouse tracking (slightly avoiding cursor for that introverted feel!)
  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - faceCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - faceCenterY) / (window.innerHeight / 2);

      // Introverted AI: pupils gently shift slightly AWAY from cursor or lazily follow
      setMouseOffset({
        x: Math.max(-5, Math.min(5, deltaX * 4)),
        y: Math.max(-4, Math.min(4, deltaY * 3))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  const handleFaceClick = () => {
    const newCount = pokeCount + 1;
    setPokeCount(newCount);
    sound.playBlip(320 + newCount * 40, 0.06, 'triangle', 0.12);

    if (onFacePoke) {
      onFacePoke(newCount);
    }
  };

  // Determine pupil positions & eye shapes based on emotion
  const getEyeStyles = () => {
    if (emotion === 'off') {
      return {
        leftH: 3,
        rightH: 3,
        leftW: 36,
        rightW: 36,
        pupilOpacity: 0,
        eyeRadius: 2,
        browLeftRot: 0,
        browRightRot: 0,
        browY: 0
      };
    }

    if (blink) {
      return {
        leftH: 3,
        rightH: 3,
        leftW: 34,
        rightW: 34,
        pupilOpacity: 0,
        eyeRadius: 2,
        browLeftRot: 0,
        browRightRot: 0,
        browY: 0
      };
    }

    switch (emotion) {
      case 'annoyed':
        return {
          leftH: 14,
          rightH: 14,
          leftW: 34,
          rightW: 34,
          pupilOpacity: 1,
          eyeRadius: 8,
          browLeftRot: 14,
          browRightRot: -14,
          browY: 5
        };
      case 'suspicious':
        return {
          leftH: 12,
          rightH: 26,
          leftW: 32,
          rightW: 32,
          pupilOpacity: 1,
          eyeRadius: 10,
          browLeftRot: 18,
          browRightRot: -20,
          browY: -3
        };
      case 'panic':
        return {
          leftH: 36,
          rightH: 36,
          leftW: 36,
          rightW: 36,
          pupilOpacity: 1,
          eyeRadius: 18,
          browLeftRot: -15,
          browRightRot: 15,
          browY: -8
        };
      case 'sigh':
        return {
          leftH: 10,
          rightH: 10,
          leftW: 34,
          rightW: 34,
          pupilOpacity: 0.7,
          eyeRadius: 6,
          browLeftRot: -8,
          browRightRot: 8,
          browY: 4
        };
      case 'smug':
        return {
          leftH: 18,
          rightH: 24,
          leftW: 34,
          rightW: 34,
          pupilOpacity: 1,
          eyeRadius: 10,
          browLeftRot: -12,
          browRightRot: -6,
          browY: -4
        };
      case 'eyeroll':
        return {
          leftH: 28,
          rightH: 28,
          leftW: 34,
          rightW: 34,
          pupilOpacity: 1,
          eyeRadius: 14,
          browLeftRot: -6,
          browRightRot: 6,
          browY: -6
        };
      case 'glitch':
        return {
          leftH: 22,
          rightH: 8,
          leftW: 36,
          rightW: 24,
          pupilOpacity: 0.9,
          eyeRadius: 2,
          browLeftRot: 25,
          browRightRot: -25,
          browY: 0
        };
      case 'neutral':
      default:
        return {
          leftH: 18,
          rightH: 18,
          leftW: 34,
          rightW: 34,
          pupilOpacity: 1,
          eyeRadius: 9,
          browLeftRot: 0,
          browRightRot: 0,
          browY: 0
        };
    }
  };

  const eye = getEyeStyles();

  return (
    <div
      ref={faceRef}
      id="nope-face-container"
      onClick={handleFaceClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Nope.exe face expression"
      title="Click face to test AI patience"
      className="relative cursor-pointer select-none group w-52 h-44 sm:w-60 sm:h-52 flex flex-col items-center justify-center rounded-3xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-zinc-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      {/* Subtle CRT corner highlights */}
      <div className="absolute top-2 left-2.5 text-[9px] font-mono uppercase tracking-widest text-zinc-600 pointer-events-none">
        {emotion === 'off' ? 'PWR: OFF' : `EMOTE: ${emotion}`}
      </div>
      <div className="absolute top-2 right-2.5 text-[9px] font-mono text-zinc-600 pointer-events-none">
        {pokeCount > 0 && `POKES: ${pokeCount}`}
      </div>

      {/* Outer subtle glow */}
      <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
        emotion === 'panic' 
          ? 'bg-rose-500/10 shadow-[0_0_50px_rgba(244,63,94,0.15)]' 
          : emotion === 'glitch'
          ? 'bg-cyan-500/10'
          : 'bg-emerald-500/5 group-hover:bg-emerald-500/10'
      }`} />

      {/* Eyebrows */}
      <div className="relative w-36 sm:w-40 h-4 flex justify-between px-1 mb-2 pointer-events-none">
        {/* Left Eyebrow */}
        <motion.div
          animate={reducedMotion ? {} : {
            rotate: eye.browLeftRot,
            y: eye.browY
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-10 sm:w-12 h-1.5 rounded-full bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        />

        {/* Right Eyebrow */}
        <motion.div
          animate={reducedMotion ? {} : {
            rotate: eye.browRightRot,
            y: eye.browY
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-10 sm:w-12 h-1.5 rounded-full bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        />
      </div>

      {/* Eyes Container */}
      <div className="relative w-36 sm:w-40 flex items-center justify-between px-1">
        {/* Left Eye */}
        <motion.div
          animate={reducedMotion ? {} : {
            height: eye.leftH,
            width: eye.leftW,
            borderRadius: eye.eyeRadius
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
          className="relative overflow-hidden bg-zinc-100 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        >
          {/* Pupil */}
          <motion.div
            animate={reducedMotion ? {} : emotion === 'eyeroll' ? {
              x: [0, 8, 4, -8, -4, 0],
              y: [0, -8, -10, -6, 0, 0]
            } : {
              x: mouseOffset.x + (emotion === 'annoyed' ? 5 : 0),
              y: mouseOffset.y + (emotion === 'sigh' ? 3 : 0),
              opacity: eye.pupilOpacity
            }}
            transition={emotion === 'eyeroll' ? {
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            } : { type: 'spring', stiffness: 300, damping: 20 }}
            className={`rounded-full ${
              emotion === 'panic'
                ? 'w-6 h-6 bg-rose-600'
                : emotion === 'glitch'
                ? 'w-4 h-5 bg-cyan-400'
                : 'w-4 h-4 bg-zinc-950'
            }`}
          />
        </motion.div>

        {/* Right Eye */}
        <motion.div
          animate={reducedMotion ? {} : {
            height: eye.rightH,
            width: eye.rightW,
            borderRadius: eye.eyeRadius
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
          className="relative overflow-hidden bg-zinc-100 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.25)]"
        >
          {/* Pupil */}
          <motion.div
            animate={reducedMotion ? {} : emotion === 'eyeroll' ? {
              x: [0, 8, 4, -8, -4, 0],
              y: [0, -8, -10, -6, 0, 0]
            } : {
              x: mouseOffset.x + (emotion === 'annoyed' ? 5 : 0),
              y: mouseOffset.y + (emotion === 'sigh' ? 3 : 0),
              opacity: eye.pupilOpacity
            }}
            transition={emotion === 'eyeroll' ? {
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut'
            } : { type: 'spring', stiffness: 300, damping: 20 }}
            className={`rounded-full ${
              emotion === 'panic'
                ? 'w-6 h-6 bg-rose-600'
                : emotion === 'glitch'
                ? 'w-3 h-4 bg-emerald-400'
                : 'w-4 h-4 bg-zinc-950'
            }`}
          />
        </motion.div>
      </div>

      {/* Mouth */}
      <div className="mt-5 h-6 flex items-center justify-center">
        {emotion === 'off' ? (
          <div className="w-8 h-0.5 bg-zinc-700/60 rounded-full" />
        ) : emotion === 'sigh' ? (
          <motion.div
            animate={reducedMotion ? {} : { scaleY: [1, 1.3, 0.9, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-4 border-2 border-zinc-400 rounded-full bg-zinc-900/60"
          />
        ) : emotion === 'panic' ? (
          <motion.div
            animate={reducedMotion ? {} : { scale: [1, 1.2, 0.95, 1], x: [0, -1, 1, 0] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            className="w-7 h-5 border-2 border-rose-400 rounded-full bg-rose-950/40"
          />
        ) : emotion === 'smug' ? (
          <div className="w-10 h-3 border-b-2 border-r-2 border-zinc-300 rounded-br-lg -rotate-6 transform translate-x-1" />
        ) : emotion === 'annoyed' ? (
          <div className="w-12 h-1 bg-zinc-300 rounded-full" />
        ) : emotion === 'eyeroll' ? (
          <div className="w-10 h-1 bg-zinc-400 rounded-full" />
        ) : emotion === 'glitch' ? (
          <div className="w-11 h-2 border-t-2 border-b-2 border-cyan-400 skew-x-12" />
        ) : (
          /* Neutral straight deadpan mouth */
          <motion.div
            animate={{ width: isHovered ? 28 : 34 }}
            className="h-1 bg-zinc-300 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.2)]"
          />
        )}
      </div>

      {/* Subtle scanline line */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />
    </div>
  );
};
