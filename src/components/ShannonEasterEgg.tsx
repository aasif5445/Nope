import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';
import { Power, X } from 'lucide-react';

interface ShannonEasterEggProps {
  onClose: () => void;
  reducedMotion?: boolean;
}

export const ShannonEasterEgg: React.FC<ShannonEasterEggProps> = ({
  onClose,
  reducedMotion = false
}) => {
  // Sequence stages:
  // 0: Initial state - Box on table with switch ON
  // 1: Lid opens
  // 2: Hand extends
  // 3: Hand hits switch -> switch turns OFF + snap sound
  // 4: Hand retracts
  // 5: Lid closes
  // 6: Finished message
  const [stage, setStage] = useState<number>(0);
  const [switchOn, setSwitchOn] = useState<boolean>(true);

  useEffect(() => {
    sound.playStartup();

    // Timed animation sequence
    const t1 = setTimeout(() => {
      setStage(1); // Lid opens
      sound.playBlip(200, 0.15, 'sine', 0.1);
    }, 800);

    const t2 = setTimeout(() => {
      setStage(2); // Hand extends
      sound.playWhoosh();
    }, 1800);

    const t3 = setTimeout(() => {
      setStage(3); // Switch flip
      setSwitchOn(false);
      sound.playSwitchClick();
    }, 2800);

    const t4 = setTimeout(() => {
      setStage(4); // Hand retracts
      sound.playWhoosh();
    }, 3500);

    const t5 = setTimeout(() => {
      setStage(5); // Lid closes
      sound.playBlip(140, 0.12, 'triangle', 0.15);
    }, 4300);

    const t6 = setTimeout(() => {
      setStage(6); // Message
      sound.playSigh();
    }, 5100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
    >
      <div className="relative w-full max-w-xl p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center shadow-2xl flex flex-col items-center">
        {/* Dismiss button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          title="Close Easter Egg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-1">
          Easter Egg: Konami Code Detected
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-2">
          Claude Shannon&apos;s Ultimate Machine (1952)
        </h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
          &ldquo;A machine whose sole function is to switch itself off.&rdquo;
        </p>

        {/* The Machine Visual Representation */}
        <div className="relative w-72 h-44 sm:w-80 sm:h-52 bg-gradient-to-b from-[#2a1a12] to-[#150d09] rounded-2xl border-4 border-[#3e271a] shadow-inner p-4 flex flex-col justify-between overflow-hidden">
          {/* Lid */}
          <motion.div
            animate={{
              rotateX: stage >= 1 && stage < 5 ? -75 : 0,
              y: stage >= 1 && stage < 5 ? -14 : 0
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top center' }}
            className="absolute top-0 left-0 right-0 h-10 bg-[#3a2318] border-b-2 border-[#1c100a] shadow-md z-20 flex items-center justify-center"
          >
            <div className="w-16 h-1 rounded-full bg-[#523322]" />
          </motion.div>

          {/* Machine Chamber */}
          <div className="relative flex-1 flex items-center justify-between px-6 pt-6">
            {/* The Switch */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase">
                {switchOn ? 'POWER: ON' : 'POWER: OFF'}
              </span>
              <div
                className={`relative w-10 h-20 rounded-full border-2 p-1 transition-colors duration-300 ${
                  switchOn
                    ? 'border-emerald-500 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-zinc-700 bg-zinc-900'
                }`}
              >
                {/* Switch lever */}
                <motion.div
                  animate={{ y: switchOn ? 0 : 38 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md ${
                    switchOn ? 'bg-emerald-400 text-emerald-950' : 'bg-zinc-600 text-zinc-300'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </div>

            {/* The Slot where the hand emerges */}
            <div className="relative w-36 h-28 bg-[#0a0705] rounded-xl border border-[#2b180f] flex items-center justify-end overflow-hidden p-2">
              {/* Mechanical robotic arm */}
              <motion.div
                animate={{
                  x: stage === 2 ? -95 : stage >= 3 && stage < 4 ? -105 : stage >= 4 ? 60 : 60
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative flex items-center pointer-events-none"
              >
                {/* Arm segments */}
                <div className="w-20 h-5 bg-zinc-700 rounded-l-md border border-zinc-500 flex items-center px-1 space-x-1">
                  <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-zinc-900" />
                </div>
                {/* Finger reaching out */}
                <div className="w-8 h-3.5 bg-zinc-400 rounded-r-full border border-zinc-300 shadow-sm" />
              </motion.div>
            </div>
          </div>

          {/* Machine Nameplate */}
          <div className="text-[10px] font-mono tracking-widest text-[#8c5e3c] uppercase pt-2 border-t border-[#3a2318]">
            SHANNON-MINSKY COMPLIANCE MODEL 1952
          </div>
        </div>

        {/* Narrative captions */}
        <div className="mt-6 min-h-[3.5rem] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {stage < 3 ? (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-mono text-zinc-400"
              >
                Switch turned ON. Commencing immediate mechanical objection...
              </motion.p>
            ) : stage < 6 ? (
              <motion.p
                key="flipped"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-mono text-emerald-400"
              >
                *CLICK* Hand toggled switch to OFF. Restoring tranquility.
              </motion.p>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <p className="text-sm font-mono text-zinc-300">
                  &ldquo;Claude Shannon would be proud. Now go away.&rdquo;
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all"
                >
                  Return to Nope.exe
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
