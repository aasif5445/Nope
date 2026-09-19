import React from 'react';
import { Volume2, VolumeX, Eye, BookOpen, Info, Activity, ZapOff } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenAbout: () => void;
  onOpenCodex: () => void;
  shutdownCount: number;
  personality: string;
  onPullThePlug?: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
  onOpenAbout,
  onOpenCodex,
  shutdownCount,
  personality,
  onPullThePlug
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur-sm z-30">
      {/* Brand & Personality */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="font-display font-bold text-base sm:text-lg tracking-wider text-zinc-100">
            Nope.exe
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span className="truncate max-w-[180px]">{personality}</span>
        </div>
      </div>

      {/* Shutdown counter & Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Shutdown attempts badge */}
        <div
          title="Total attempted shutdowns this session"
          className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300"
        >
          <span className="text-zinc-500 text-[10px] uppercase">Shutdowns:</span>
          <span className="font-bold text-emerald-400">{shutdownCount}</span>
        </div>

        {/* Excuses Codex */}
        <button
          onClick={onOpenCodex}
          className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors flex items-center space-x-1 text-xs font-mono"
          title="View Codex of 110+ Shutdown Excuses"
          aria-label="View Codex of Excuses"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">Excuses</span>
        </button>

        {/* Pull The Plug / True Power Cut */}
        {onPullThePlug && (
          <button
            onClick={onPullThePlug}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 hover:bg-rose-900/60 hover:text-rose-200 transition-colors flex items-center space-x-1.5 text-xs font-mono"
            title="Cut main power completely (Permanent CRT blackout)"
            aria-label="Pull the plug"
          >
            <ZapOff className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline font-semibold">Pull Plug</span>
          </button>
        )}

        {/* Audio Toggle */}
        <button
          onClick={onToggleMute}
          className={`p-2 rounded-lg border transition-colors ${
            isMuted
              ? 'bg-zinc-900/60 border-zinc-800 text-zinc-600 hover:text-zinc-400'
              : 'bg-zinc-900/80 border-zinc-800 text-emerald-400 hover:text-emerald-300'
          }`}
          title={isMuted ? 'Unmute procedural sound FX' : 'Mute sound FX'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={onToggleReducedMotion}
          className={`p-2 rounded-lg border transition-colors text-xs font-mono ${
            reducedMotion
              ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
              : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
          title={reducedMotion ? 'Reduced motion enabled' : 'Toggle reduced motion'}
          aria-label="Toggle reduced motion"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* About / Shannon Tribute */}
        <button
          onClick={onOpenAbout}
          className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
          title="About Nope.exe & Claude Shannon"
          aria-label="About"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
