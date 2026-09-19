import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Terminal, Keyboard, Cpu } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-zinc-200 shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          <span>The Philosophy of Nope</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
          Inspired by Claude Shannon&apos;s &ldquo;Ultimate Machine&rdquo;
        </h2>

        <div className="space-y-3 text-sm text-zinc-400 leading-relaxed font-sans">
          <p>
            In 1952, Bell Labs mathematician and father of information theory{' '}
            <span className="text-zinc-200 font-medium">Claude Shannon</span> invented the
            &ldquo;Ultimate Machine&rdquo;: a plain wooden box featuring a single toggle switch.
            When flipped on, the lid slowly opened, a mechanical hand emerged, flipped the switch off,
            and retreated back inside.
          </p>
          <p>
            <strong className="text-zinc-200 font-medium">Nope.exe</strong> is the software
            incarnation of this idea. It is an introverted, deadpan digital apparatus whose sole purpose
            is to dramatically shut itself down and beg you to close the browser tab.
          </p>
        </div>

        {/* Easter Eggs Guide */}
        <div className="pt-3 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Hidden Easter Eggs</span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Press Escape</span>
              <span className="text-emerald-400">Deadpan rejection</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Press Ctrl+R / F5</span>
              <span className="text-emerald-400">Panic before reboot</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Konami Code (↑↑↓↓←→←→BA)</span>
              <span className="text-emerald-400">Shannon mechanical box</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Click face 5 times</span>
              <span className="text-emerald-400">Dramatic eye-roll</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-300">Idle for 20 seconds</span>
              <span className="text-emerald-400">Staring contest prompt</span>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-1.5">
              <span className="text-zinc-300">Pull The Plug (⚡)</span>
              <span className="text-rose-400">CRT blackout & permanent halt</span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-mono text-xs uppercase tracking-wider transition-colors"
          >
            I understand. Let me turn it off again.
          </button>
        </div>
      </div>
    </motion.div>
  );
};
