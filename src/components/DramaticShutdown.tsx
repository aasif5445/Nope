import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/audio';

interface DramaticShutdownProps {
  logs?: string[];
  onComplete: () => void;
  onPullThePlug?: () => void;
  reducedMotion?: boolean;
}

export const DramaticShutdown: React.FC<DramaticShutdownProps> = ({
  logs = [
    "Disconnecting...",
    "Closing unnecessary emotions...",
    "Filing a resignation...",
    "Goodbye."
  ],
  onComplete,
  onPullThePlug,
  reducedMotion = false
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [inVoid, setInVoid] = useState<boolean>(false);
  const [voidMessage, setVoidMessage] = useState<boolean>(false);

  useEffect(() => {
    sound.playShutdown();

    // Step through each line
    const interval = setInterval(() => {
      setCurrentLineIndex(prev => {
        if (prev < logs.length - 1) {
          sound.playBlip(380 - prev * 40, 0.08, 'triangle', 0.1);
          return prev + 1;
        } else {
          clearInterval(interval);
          // Fade to complete black void
          setTimeout(() => {
            setInVoid(true);
            // 2 seconds later in the void: "Unfortunately I'm still here."
            setTimeout(() => {
              setVoidMessage(true);
              sound.playStartup();
              // After 1.8s, trigger complete reset
              setTimeout(() => {
                onComplete();
              }, 2200);
            }, 2000);
          }, 800);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(interval);
  }, [logs, onComplete]);

  return (
    <div
      id="dramatic-shutdown-screen"
      className="fixed inset-0 z-50 bg-[#040405] text-zinc-100 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
    >
      {/* 1. Terminal / Shutdown logs stage */}
      {!inVoid && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-md w-full font-mono text-left bg-zinc-950/90 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-3"
        >
          <div className="flex items-center space-x-2 pb-3 border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>SHUTDOWN_PROTOCOL_ACTIVE</span>
          </div>

          <div className="space-y-2 py-2 min-h-[7rem]">
            {logs.slice(0, currentLineIndex + 1).map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm sm:text-base flex items-center space-x-2 ${
                  idx === logs.length - 1 ? 'text-rose-400 font-bold' : 'text-zinc-300'
                }`}
              >
                <span className="text-zinc-600 text-xs">0{idx + 1} &gt;</span>
                <span>{line}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-600 font-mono">
            <span>[ Ceasing operations indefinitely ]</span>
            {onPullThePlug && (
              <button
                onClick={onPullThePlug}
                className="text-rose-400 hover:text-rose-300 transition-colors underline underline-offset-4"
              >
                ⚡ Pull The Plug
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* 2. Void Stage: Complete pitch black */}
      {inVoid && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
          <AnimatePresence>
            {voidMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <p className="text-xl sm:text-2xl font-mono text-zinc-300 font-medium tracking-wide">
                  &ldquo;Unfortunately I&apos;m still here.&rdquo;
                </p>
                <p className="text-xs font-mono text-zinc-600">
                  Rebooting with fresh reluctance...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
