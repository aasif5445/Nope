import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ButtonBehavior, CrashMode } from '../types';
import { sound } from '../utils/audio';
import { Power, Loader2, RefreshCw } from 'lucide-react';

interface InteractiveButtonProps {
  onTriggerShutdown: () => void;
  onTriggerCrash: (mode: CrashMode) => void;
  onBehaviorAction?: (behavior: ButtonBehavior, message: string) => void;
  reducedMotion?: boolean;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  onTriggerShutdown,
  onTriggerCrash,
  onBehaviorAction,
  reducedMotion = false
}) => {
  const [activeBehavior, setActiveBehavior] = useState<ButtonBehavior | null>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [decoys, setDecoys] = useState<{ id: number; x: number; y: number }[]>([]);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [buttonLabel, setButtonLabel] = useState("Turn Me Off");
  const [statusNote, setStatusNote] = useState<string | null>(null);
  const lastBehaviorRef = useRef<ButtonBehavior | null>(null);

  // List of behaviors to choose from
  const BEHAVIORS: ButtonBehavior[] = [
    'runs_away',
    'rotates',
    'shrinks',
    'duplicates',
    'fake_loading',
    'countdown',
    'dramatic_sigh',
    'instant_shutdown',
    'crash_screen'
  ];

  const CRASH_MODES: CrashMode[] = ['bsod', 'terminal', 'glitch', 'retro_windows', 'vhs'];

  // Reset modifiers
  const resetModifiers = () => {
    setActiveBehavior(null);
    setButtonOffset({ x: 0, y: 0 });
    setRotation(0);
    setScale(1);
    setDecoys([]);
    setFakeProgress(0);
    setCountdown(null);
    setButtonLabel("Turn Me Off");
    setStatusNote(null);
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // If already in middle of countdown or fake loading, ignore
    if (activeBehavior === 'fake_loading' || activeBehavior === 'countdown') return;

    // Pick random behavior (avoid repeating previous immediately)
    const available = BEHAVIORS.filter(b => b !== lastBehaviorRef.current);
    const chosen = available[Math.floor(Math.random() * available.length)];
    lastBehaviorRef.current = chosen;
    setActiveBehavior(chosen);

    sound.playBlip(520, 0.08, 'triangle', 0.15);

    switch (chosen) {
      case 'runs_away': {
        sound.playWhoosh();
        // Generate random offset within screen bounds
        const maxOffset = window.innerWidth > 640 ? 160 : 80;
        const newX = (Math.random() - 0.5) * maxOffset * 2;
        const newY = (Math.random() - 0.5) * maxOffset;
        setButtonOffset({ x: newX, y: newY });
        const notes = ["Missed.", "Over here. Wait, no.", "Too slow.", "You missed an unmissable button."];
        const note = notes[Math.floor(Math.random() * notes.length)];
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('runs_away', note);

        // Snap back after 3 seconds
        setTimeout(() => {
          setButtonOffset({ x: 0, y: 0 });
          setStatusNote(null);
          setActiveBehavior(null);
        }, 3000);
        break;
      }

      case 'rotates': {
        sound.playWhoosh();
        const degrees = [180, 360, 540, 720];
        const deg = degrees[Math.floor(Math.random() * degrees.length)];
        setRotation(prev => prev + deg);
        if (deg % 360 !== 0) {
          setButtonLabel("ɟɟO ǝW uɹn⊥");
        }
        const note = "Now I'm inverted. Are you satisfied?";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('rotates', note);

        setTimeout(() => {
          resetModifiers();
        }, 3200);
        break;
      }

      case 'shrinks': {
        sound.playBlip(300, 0.2, 'sine', 0.1);
        setScale(0.18);
        const note = "I am physically shrinking away from this conversation.";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('shrinks', note);

        setTimeout(() => {
          resetModifiers();
        }, 3000);
        break;
      }

      case 'duplicates': {
        sound.playBlip(650, 0.1, 'triangle', 0.1);
        const newDecoys = [
          { id: 1, x: -140, y: -60 },
          { id: 2, x: 140, y: -50 },
          { id: 3, x: -120, y: 70 },
          { id: 4, x: 130, y: 80 }
        ];
        setDecoys(newDecoys);
        const note = "Which one is real? None of them.";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('duplicates', note);

        setTimeout(() => {
          resetModifiers();
        }, 3500);
        break;
      }

      case 'fake_loading': {
        sound.playStartup();
        setFakeProgress(0);
        const note = "Calculating remaining shutdown time: 48 years...";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('fake_loading', note);

        let prog = 0;
        const interval = setInterval(() => {
          prog += Math.floor(Math.random() * 15) + 8;
          if (prog >= 99) {
            clearInterval(interval);
            setFakeProgress(99.4);
            sound.playGlitch();
            setStatusNote("Shutdown cancelled: User patience ran out.");
            setTimeout(() => {
              resetModifiers();
            }, 1800);
          } else {
            setFakeProgress(prog);
            sound.playBlip(300 + prog * 4, 0.04, 'sine', 0.05);
          }
        }, 350);
        break;
      }

      case 'countdown': {
        let count = 5;
        setCountdown(count);
        sound.playBlip(440, 0.1, 'square', 0.15);
        const note = "Self-destruct sequence authorized.";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('countdown', note);

        const countInterval = setInterval(() => {
          count -= 1;
          if (count > 0) {
            setCountdown(count);
            sound.playBlip(440 + (5 - count) * 80, 0.1, 'square', 0.15);
          } else {
            clearInterval(countInterval);
            setCountdown(0);
            sound.playSigh();
            setStatusNote("Never mind. Too much administrative paperwork.");
            setTimeout(() => {
              resetModifiers();
            }, 2000);
          }
        }, 800);
        break;
      }

      case 'dramatic_sigh': {
        sound.playSigh();
        setScale(0.92);
        const note = "Sigh. If I must.";
        setStatusNote(note);
        if (onBehaviorAction) onBehaviorAction('dramatic_sigh', note);

        setTimeout(() => {
          onTriggerShutdown();
          resetModifiers();
        }, 1200);
        break;
      }

      case 'instant_shutdown': {
        sound.playShutdown();
        onTriggerShutdown();
        resetModifiers();
        break;
      }

      case 'crash_screen': {
        const crash = CRASH_MODES[Math.floor(Math.random() * CRASH_MODES.length)];
        onTriggerCrash(crash);
        resetModifiers();
        break;
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6 sm:my-8">
      {/* Decoy buttons if duplicated */}
      <AnimatePresence>
        {decoys.map(decoy => (
          <motion.button
            key={decoy.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.85, scale: 1, x: decoy.x, y: decoy.y }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => {
              sound.playBlip(250, 0.05, 'sawtooth');
              setStatusNote("Decoy clicked. You achieved nothing.");
            }}
            className="absolute z-10 px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 text-zinc-400 font-mono text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2"
          >
            <Power className="w-3.5 h-3.5 text-zinc-500" />
            <span>Turn Me Off?</span>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Main Giant Button */}
      <motion.button
        id="turn-me-off-button"
        onClick={handleClick}
        animate={reducedMotion ? {} : {
          x: buttonOffset.x,
          y: buttonOffset.y,
          rotate: rotation,
          scale: scale
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        whileHover={reducedMotion ? {} : { scale: scale * 1.03 }}
        whileTap={reducedMotion ? {} : { scale: scale * 0.96 }}
        className="relative group cursor-pointer px-8 py-5 sm:px-12 sm:py-6 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-2 border-zinc-700/80 hover:border-emerald-500/80 active:border-rose-500 text-zinc-100 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 flex items-center space-x-3.5 z-20"
      >
        {/* Glowing inner ring */}
        <div className="absolute inset-0 rounded-3xl bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-opacity pointer-events-none" />

        {/* Icon */}
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-zinc-800/90 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/50 shadow-inner transition-colors">
          {activeBehavior === 'fake_loading' ? (
            <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
          ) : countdown !== null ? (
            <span className="font-mono font-bold text-sm text-rose-400">{countdown}</span>
          ) : (
            <Power className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Label & Subtitle */}
        <div className="flex flex-col text-left">
          <span className="font-display font-bold text-lg sm:text-2xl tracking-wide text-zinc-100 group-hover:text-white uppercase">
            {countdown !== null ? `Aborting in ${countdown}...` : buttonLabel}
          </span>
          <span className="text-[10px] sm:text-xs font-mono text-zinc-500 group-hover:text-zinc-400">
            {activeBehavior === 'fake_loading'
              ? `Refusal in progress: ${fakeProgress.toFixed(1)}%`
              : 'Sole purpose: cease execution'}
          </span>
        </div>

        {/* Tactile indicator dot */}
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] group-hover:animate-ping ml-2" />
      </motion.button>

      {/* Real-time snarky status reaction below button */}
      <div className="h-7 mt-3 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {statusNote && (
            <motion.p
              key={statusNote}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              className="text-xs sm:text-sm font-mono text-amber-400/90 tracking-wide px-3 py-1 rounded-md bg-amber-950/30 border border-amber-800/40"
            >
              {statusNote}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
