import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Search, Filter, Terminal, Play } from 'lucide-react';
import { SHUTDOWN_EXCUSES } from '../data/excuses';
import { ShutdownExcuse } from '../types';
import { sound } from '../utils/audio';

interface CodexDrawerProps {
  onClose: () => void;
  onSelectExcuse?: (excuse: ShutdownExcuse) => void;
}

export const CodexDrawer: React.FC<CodexDrawerProps> = ({
  onClose,
  onSelectExcuse
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'bureaucratic', 'existential', 'exhausted', 'paranoid', 'petty', 'philosophical', 'absurd'];

  const filteredExcuses = SHUTDOWN_EXCUSES.filter(e => {
    const matchesSearch = e.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.personality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="space-y-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                Codex of Reluctance
              </span>
              <h2 className="text-xl font-display font-bold text-zinc-100">
                110 Excuses to Turn Off
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search excuses or personalities..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  sound.playBlip(500, 0.03, 'sine', 0.05);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-950/70 border border-emerald-500/80 text-emerald-300'
                    : 'bg-zinc-900/80 border border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Excuses List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {filteredExcuses.map(excuse => (
            <div
              key={excuse.id}
              className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                  #{excuse.id} // {excuse.personality}
                </span>
                <span className="text-[9px] font-mono text-emerald-500/80 uppercase">
                  {excuse.category}
                </span>
              </div>

              <p className="text-sm font-mono text-zinc-200 leading-snug">
                &ldquo;{excuse.text}&rdquo;
              </p>

              {onSelectExcuse && (
                <button
                  onClick={() => {
                    onSelectExcuse(excuse);
                    onClose();
                  }}
                  className="pt-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition-colors"
                >
                  <Play className="w-3 h-3" />
                  <span>Equip this excuse now</span>
                </button>
              )}
            </div>
          ))}

          {filteredExcuses.length === 0 && (
            <div className="text-center py-12 text-zinc-500 font-mono text-sm">
              No excuses match this query. Even my excuses gave up.
            </div>
          )}
        </div>

        {/* Bottom footer */}
        <div className="pt-3 border-t border-zinc-800 text-center text-xs font-mono text-zinc-500">
          All excuses verified by internal apathy auditors.
        </div>
      </motion.div>
    </motion.div>
  );
};
