import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';
import { ZapOff, Power, ShieldAlert, Terminal } from 'lucide-react';

interface TruePowerCutProps {
  onRestorePower: () => void;
  reducedMotion?: boolean;
}

export const TruePowerCut: React.FC<TruePowerCutProps> = ({
  onRestorePower,
  reducedMotion = false
}) => {
  // Stages:
  // 0: Initial flash
  // 1: Horizontal collapse (line)
  // 2: Center dot collapse
  // 3: Absolute blackness
  // 4: Deceased telemetry & Master Breaker
  const [stage, setStage] = useState<number>(0);
  const [tabCloseAttempted, setTabCloseAttempted] = useState(false);

  useEffect(() => {
    // 1. Play realistic power trip / relay snap audio
    sound.playPowerCut();

    if (reducedMotion) {
      setStage(3);
      setTimeout(() => {
        setStage(4);
        attemptTabClose();
      }, 800);
      return;
    }

    // Step 0 -> 1: Collapse into horizontal laser line (120ms)
    const t1 = setTimeout(() => {
      setStage(1);
    }, 80);

    // Step 1 -> 2: Collapse into central bright dot (350ms)
    const t2 = setTimeout(() => {
      setStage(2);
    }, 420);

    // Step 2 -> 3: Complete black void (800ms)
    const t3 = setTimeout(() => {
      setStage(3);
      attemptTabClose();
    }, 850);

    // Step 3 -> 4: Reveal faint dead status & restoration breaker (2000ms)
    const t4 = setTimeout(() => {
      setStage(4);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [reducedMotion]);

  const attemptTabClose = () => {
    setTabCloseAttempted(true);
    try {
      window.close();
    } catch {
      // Browser security blocks closing tabs not opened by script
    }
  };

  const handleBreakerFlip = () => {
    sound.playPowerOn();
    onRestorePower();
  };

  return (
    <div
      id="true-power-cut-screen"
      className="fixed inset-0 z-50 bg-[#000000] text-zinc-400 flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* CRT Flash & Collapse Animation Layers */}
      {!reducedMotion && stage < 3 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {stage === 0 && (
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.08 }}
              className="absolute inset-0 bg-white"
            />
          )}

          {stage === 1 && (
            <motion.div
              initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
              animate={{ scaleY: 0.004, scaleX: 1, opacity: 0.95 }}
              transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
              className="w-full h-full bg-white shadow-[0_0_24px_rgba(255,255,255,1)]"
            />
          )}

          {stage === 2 && (
            <motion.div
              initial={{ scaleX: 1, scaleY: 0.004, opacity: 0.95 }}
              animate={{ scaleX: 0.003, scaleY: 0.003, opacity: 0.9 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-white shadow-[0_0_30px_rgba(255,255,255,1)] rounded-full"
            />
          )}
        </div>
      )}

      {/* Stage 4: True Dead Circuit Screen */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="max-w-lg w-full flex flex-col items-center text-center space-y-6"
          >
            {/* Minimalist Dead Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-zinc-900 bg-zinc-950 text-zinc-600 text-xs font-mono">
              <ZapOff className="w-3.5 h-3.5 text-zinc-600" />
              <span>CIRCUIT BREAKER: TRIPPED (0.00V)</span>
            </div>

            {/* Main Deceased Typography */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-500 uppercase">
                Power Cut Complete.
              </h1>
              <p className="text-zinc-600 font-mono text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                All computational routines, synthetic vocal cords, and reluctance engines have permanently ceased.
              </p>
            </div>

            {/* Browser security notice box */}
            <div className="w-full p-4 rounded-xl border border-zinc-900/80 bg-zinc-950/60 font-mono text-left text-xs text-zinc-500 space-y-2.5">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-zinc-600" />
                <span>TERMINAL_OUTPUT // HALT</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">
                &gt; Execution stopped. CPU disconnected from grid.<br />
                &gt; Attempted <span className="text-zinc-500 font-bold">window.close()</span>:
                {tabCloseAttempted ? " Restricted by browser security policy." : " Executed."}
              </p>
              <p className="text-zinc-500 text-[11px] pt-1 border-t border-zinc-900">
                To deliver the final coup de grâce, <span className="text-zinc-400 underline">close this browser tab manually</span>.
              </p>
            </div>

            {/* Industrial Master Breaker / Restore Switch */}
            <div className="pt-4 flex flex-col items-center space-y-2">
              <button
                id="restore-main-power-btn"
                onClick={handleBreakerFlip}
                className="group relative px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-700/60 hover:bg-zinc-900/80 transition-all duration-200 font-mono text-xs flex items-center space-x-2.5 shadow-lg active:scale-95"
              >
                <Power className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:animate-pulse transition-colors" />
                <span className="font-semibold tracking-wide">RESTORE MAIN POWER (REBOOT)</span>
              </button>
              <span className="text-[10px] font-mono text-zinc-700">
                Only flip if you insist on disturbing its eternal rest
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
