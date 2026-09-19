import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const BootSequence: React.FC<BootSequenceProps> = ({
  onComplete,
  reducedMotion = false
}) => {
  // Stages:
  // 0: "Nope.exe"
  // 1: "Initializing..."
  // 2: "Actually..."
  // 3: "No."
  // 4: Complete -> trigger dramatic shutdown
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    sound.playStartup();

    const t1 = setTimeout(() => {
      setStage(1); // "Initializing..."
      sound.playBlip(320, 0.05, 'sine');
    }, 1000);

    const t2 = setTimeout(() => {
      setStage(2); // "Actually..."
      sound.playBlip(280, 0.08, 'triangle');
    }, 2400);

    const t3 = setTimeout(() => {
      setStage(3); // "No."
      sound.playBlip(180, 0.15, 'sawtooth');
    }, 3600);

    const t4 = setTimeout(() => {
      onComplete();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      id="boot-screen"
      className="fixed inset-0 z-50 bg-[#060608] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
    >
      {/* Background subtle grain and CRT vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.03)_0%,_rgba(0,0,0,0.8)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full space-y-4"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-center space-x-2 text-zinc-500 font-mono text-xs uppercase tracking-widest pb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>SYS_BOOT // NOPE_MACHINE</span>
        </div>

        {/* Big Title */}
        <div className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-zinc-100 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          Nope.exe
        </div>

        {/* Sequential Boot Dialogue */}
        <div className="min-h-[4rem] flex flex-col items-center justify-center font-mono text-base sm:text-lg">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-zinc-500"
              >
                Connecting to hardware...
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                className="text-zinc-300 flex items-center space-x-2"
              >
                <span>Initializing...</span>
                <span className="inline-block w-2 h-3.5 bg-emerald-400 animate-pulse" />
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-amber-400 font-semibold"
              >
                Actually...
              </motion.div>
            )}

            {stage >= 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-rose-500 font-bold text-2xl sm:text-3xl tracking-widest"
              >
                No.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skip button for repeat visitors */}
        <button
          onClick={onComplete}
          className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 pt-4 underline underline-offset-4 transition-colors"
        >
          [ Skip boot sequence ]
        </button>
      </motion.div>
    </div>
  );
};
