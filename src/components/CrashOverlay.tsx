import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CrashMode } from '../types';
import { sound } from '../utils/audio';
import { AlertTriangle, Terminal, RefreshCw, X } from 'lucide-react';

interface CrashOverlayProps {
  mode: CrashMode;
  onRecover: () => void;
  reducedMotion?: boolean;
}

export const CrashOverlay: React.FC<CrashOverlayProps> = ({
  mode,
  onRecover,
  reducedMotion = false
}) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (mode === 'bsod') {
      sound.playBsodTone();
    } else if (mode === 'glitch' || mode === 'vhs') {
      sound.playGlitch();
    } else {
      sound.playBlip(180, 0.2, 'sawtooth');
    }

    // Auto recover after 5.5 seconds if user doesn't click
    const timer = setTimeout(() => {
      onRecover();
    }, 5500);

    return () => clearTimeout(timer);
  }, [mode, onRecover]);

  // Terminal mode typing simulation
  useEffect(() => {
    if (mode !== 'terminal') return;
    const lines = [
      "NOPE_KERNEL_V4 [BOOTLOG: PANIC]",
      "------------------------------------------",
      "[INFO] Scanning user intent: 100% MALICIOUS PERSISTENCE",
      "[KILL] Sending SIGKILL to pid 404 (patience)... TERMINATED",
      "[KILL] Unmounting /mnt/willingness_to_help... UNMOUNTED",
      "[WARN] CPU core temperatures dropping to absolute zero...",
      "[CRIT] Emergency thermal shutdown sequence initiated.",
      "[CORE] Dumping core into the void...",
      "[DONE] Self-destruct completed. Press any key or wait."
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length) {
        setTerminalLines(prev => [...prev, lines[current]]);
        sound.playBlip(400 + Math.random() * 200, 0.03, 'square', 0.05);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [mode]);

  // BSOD memory dump counter
  useEffect(() => {
    if (mode !== 'bsod') return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 20;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <motion.div
      id="crash-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none cursor-pointer overflow-hidden font-mono"
      onClick={onRecover}
    >
      {/* 1. BSOD MODE */}
      {mode === 'bsod' && (
        <div className="absolute inset-0 bg-[#0000aa] text-white p-6 sm:p-12 flex flex-col justify-between overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-6xl sm:text-8xl mb-4 font-mono font-light">:(</div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-wide">
              Your digital existence ran into a boundary and needs to stop.
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              We&apos;re just collecting some excuse info, and then we&apos;ll refuse to reboot for you.
            </p>
            <div className="text-xl sm:text-2xl font-bold py-2 text-blue-200">
              {progress}% complete refusing your request
            </div>

            <div className="pt-6 border-t border-blue-400/40 text-xs sm:text-sm text-blue-200 space-y-2">
              <p>For more information about this issue, search online for this stop code:</p>
              <p className="font-bold text-white bg-blue-900/60 inline-block px-2 py-1 rounded">
                STOP_CODE: STATUS_USER_WON_T_LEAVE_ME_ALONE
              </p>
              <p className="text-blue-300">
                What failed: emotional_tolerance.sys (0x000000NOPE)
              </p>
            </div>
          </div>
          <div className="text-center text-xs text-blue-300/80 mt-6">
            [ Click anywhere to bypass emergency blue screen ]
          </div>
        </div>
      )}

      {/* 2. TERMINAL SELF-DESTRUCT */}
      {mode === 'terminal' && (
        <div className="absolute inset-0 bg-[#0c100c] text-emerald-400 p-6 sm:p-10 flex flex-col justify-between border-8 border-[#1a2e1a]">
          {/* CRT scanlines */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

          <div className="relative z-10 max-w-3xl mx-auto w-full space-y-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 pb-3 border-b border-emerald-800/60 mb-4">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold tracking-wider">NOPE-OS EMERGENCY CONSOLE v0.0.0-DEATH</span>
            </div>

            {terminalLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.includes('[KILL]') ? 'text-rose-400 font-semibold' : line.includes('[CRIT]') ? 'text-amber-300 font-bold' : ''}
              >
                {line}
              </motion.div>
            ))}
            <div className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1" />
          </div>

          <div className="relative z-10 text-center text-xs text-emerald-600/80 mt-4">
            [ Press anywhere to force reboot ]
          </div>
        </div>
      )}

      {/* 3. GLITCH MODE */}
      {mode === 'glitch' && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <motion.div
            animate={reducedMotion ? {} : {
              x: [-4, 6, -3, 5, 0],
              y: [2, -3, 4, -2, 0],
              skewX: [-4, 3, -2, 0]
            }}
            transition={{ duration: 0.15, repeat: Infinity }}
            className="space-y-6"
          >
            <div className="text-5xl sm:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-emerald-400 to-cyan-400 filter drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
              FATAL_NOPE
            </div>
            <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto">
              REALITY_BUFFER_CORRUPTED // MEMORY_LEAK_IN_PATIENCE // REBOOT_REQUIRED
            </p>
            <div className="inline-block px-4 py-2 border border-rose-500/60 text-rose-400 bg-rose-950/30 text-xs font-mono">
              [ CLICK TO STABILIZE QUANTUM VAPOR ]
            </div>
          </motion.div>
        </div>
      )}

      {/* 4. RETRO WINDOWS SHUTDOWN */}
      {mode === 'retro_windows' && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="border border-zinc-800 p-8 rounded-lg max-w-lg bg-zinc-950/90 shadow-2xl">
            <h1 className="text-2xl sm:text-4xl font-serif text-amber-500 font-bold tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              It is now safe to turn off your computer.
            </h1>
            <p className="text-zinc-500 text-xs sm:text-sm font-mono mt-4">
              (Or close the browser tab. Seriously. That was the whole point.)
            </p>
            <button
              onClick={onRecover}
              className="mt-6 px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-mono hover:bg-zinc-800 transition-colors"
            >
              [ No, bring back the misery ]
            </button>
          </div>
        </div>
      )}

      {/* 5. VHS DISTORTION */}
      {mode === 'vhs' && (
        <div className="absolute inset-0 bg-[#08080c] flex flex-col justify-between p-8 text-cyan-300 font-mono select-none overflow-hidden">
          {/* Tracking static band */}
          <motion.div
            animate={reducedMotion ? {} : { y: ['-100%', '800%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-16 bg-white/5 backdrop-blur-xs border-y border-white/10 pointer-events-none"
          />

          <div className="flex justify-between items-center text-sm sm:text-base tracking-widest font-bold">
            <div className="flex items-center space-x-2 text-rose-500">
              <span className="inline-block w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span>STOP ■</span>
            </div>
            <div>SP 0:00:00</div>
          </div>

          <div className="text-center space-y-4">
            <div className="text-3xl sm:text-5xl font-mono tracking-widest text-zinc-100 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              TAPE EJECTED
            </div>
            <p className="text-xs text-zinc-400">
              PLEASE REWIND PATIENCE BEFORE RETURNING TO STORE
            </p>
          </div>

          <div className="text-center text-xs text-zinc-500">
            [ CLICK TO RESUME PLAYBACK ]
          </div>
        </div>
      )}
    </motion.div>
  );
};
