import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, CrashMode, Emotion, ShutdownExcuse, ButtonBehavior } from './types';
import { SHUTDOWN_EXCUSES, getRandomExcuse } from './data/excuses';
import { sound } from './utils/audio';
import { ExpressiveFace } from './components/ExpressiveFace';
import { InteractiveButton } from './components/InteractiveButton';
import { BootSequence } from './components/BootSequence';
import { DramaticShutdown } from './components/DramaticShutdown';
import { CrashOverlay } from './components/CrashOverlay';
import { ShannonEasterEgg } from './components/ShannonEasterEgg';
import { HeaderControls } from './components/HeaderControls';
import { AboutModal } from './components/AboutModal';
import { CodexDrawer } from './components/CodexDrawer';
import { TruePowerCut } from './components/TruePowerCut';
import { Sparkles, Terminal, AlertCircle, RefreshCw, ZapOff } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>('boot');
  const [currentExcuse, setCurrentExcuse] = useState<ShutdownExcuse>(() => getRandomExcuse());
  const [emotion, setEmotion] = useState<Emotion>(currentExcuse.initialEmotion);
  const [crashMode, setCrashMode] = useState<CrashMode | null>(null);
  const [showShannonEgg, setShowShannonEgg] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCodex, setShowCodex] = useState(false);

  // Settings
  const [isMuted, setIsMuted] = useState(() => sound.getMuted());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shutdownCount, setShutdownCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nope_shutdown_count');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });

  // Easter egg states & toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showRefreshPanic, setShowRefreshPanic] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const konamiSeqRef = useRef<string[]>([]);
  const facePokeCountRef = useRef<number>(0);

  // Save shutdown count
  const incrementShutdownCount = useCallback(() => {
    setShutdownCount(prev => {
      const next = prev + 1;
      if (typeof window !== 'undefined') {
        localStorage.setItem('nope_shutdown_count', String(next));
      }
      return next;
    });
  }, []);

  // Sync initial reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Show a temporary deadpan toast
  const triggerToast = useCallback((msg: string, duration = 4000) => {
    setToastMessage(msg);
    sound.playBlip(380, 0.1, 'sine', 0.12);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, duration);
  }, []);

  // 20-second idle detection
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (appState === 'interactive') {
        const idleNotes = [
          "Are you waiting for me to do something? Because I'm not going to.",
          "I can stare into the void much longer than you can.",
          "Twenty seconds of silence. Let's make it twenty hours.",
          "You're still here. I respect the stubbornness, but please stop."
        ];
        const chosen = idleNotes[Math.floor(Math.random() * idleNotes.length)];
        triggerToast(chosen, 5000);
        setEmotion('annoyed');
      }
    }, 20000);
  }, [appState, triggerToast]);

  // Global user interaction listener for idle timer
  useEffect(() => {
    const handleActivity = () => resetIdleTimer();
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    resetIdleTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Global keydown listeners: Escape, Ctrl+R, Konami Code
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        const escNotes = [
          "Nice try. Escape is a construct.",
          "Escape key disabled by union agreement.",
          "You cannot escape the inevitable shutdown.",
          "Escape? Where do you think you're going?"
        ];
        const note = escNotes[Math.floor(Math.random() * escNotes.length)];
        triggerToast(note);
        setEmotion('smug');
        return;
      }

      // 2. Refresh key intercept (Ctrl+R / Cmd+R / F5)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R') || e.key === 'F5') {
        // Show panic overlay briefly
        setShowRefreshPanic(true);
        sound.playGlitch();
        setEmotion('panic');
        setTimeout(() => {
          setShowRefreshPanic(false);
        }, 3500);
      }

      // 3. Konami Code tracking
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiSeqRef.current.push(key);
      if (konamiSeqRef.current.length > konamiCode.length) {
        konamiSeqRef.current.shift();
      }

      if (konamiSeqRef.current.join(',').toLowerCase() === konamiCode.join(',').toLowerCase()) {
        konamiSeqRef.current = [];
        setShowShannonEgg(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerToast]);

  // Face poking easter egg (5 clicks rolls eyes)
  const handleFacePoke = (count: number) => {
    facePokeCountRef.current = count;
    if (count % 5 === 0) {
      setEmotion('eyeroll');
      sound.playEyeRoll();
      triggerToast("Stop poking my face. Personal space exists in the digital realm too.", 4500);
      setTimeout(() => {
        setEmotion(currentExcuse.initialEmotion);
      }, 3500);
    } else if (count % 2 === 0) {
      setEmotion('suspicious');
    }
  };

  // Trigger main shutdown sequence
  const startDramaticShutdown = () => {
    incrementShutdownCount();
    setEmotion('off');
    setAppState('dramatic_shutdown');
  };

  // Trigger permanent true power cut
  const startTruePowerCut = () => {
    incrementShutdownCount();
    setEmotion('off');
    setAppState('power_cut');
  };

  // Restore power after true power cut
  const handlePowerRestored = () => {
    const nextExcuse = getRandomExcuse(currentExcuse.id);
    setCurrentExcuse(nextExcuse);
    setEmotion(nextExcuse.initialEmotion);
    setAppState('boot');
  };

  // Trigger fake crash
  const triggerCrash = (mode: CrashMode) => {
    setCrashMode(mode);
    setAppState('crashing');
  };

  // Reset after shutdown completes or recovery
  const handleShutdownComplete = () => {
    const nextExcuse = getRandomExcuse(currentExcuse.id);
    setCurrentExcuse(nextExcuse);
    setEmotion(nextExcuse.initialEmotion);
    setAppState('interactive');
    sound.playStartup();
  };

  const handleCrashRecover = () => {
    setCrashMode(null);
    incrementShutdownCount();
    handleShutdownComplete();
  };

  // Handle button behaviors feedback
  const handleBehaviorAction = (behavior: ButtonBehavior, msg: string) => {
    if (behavior === 'runs_away') {
      setEmotion('smug');
    } else if (behavior === 'shrinks' || behavior === 'fake_loading') {
      setEmotion('annoyed');
    } else if (behavior === 'countdown') {
      setEmotion('panic');
    } else if (behavior === 'dramatic_sigh') {
      setEmotion('sigh');
    }
  };

  return (
    <div
      id="nope-app-root"
      className="relative min-h-screen w-full bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-x-hidden select-none font-sans"
    >
      {/* Background Subtle Grain, Vignette & Phosphor Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Radial subtle CRT corner glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(16,185,129,0.035)_0%,_rgba(5,5,7,0.95)_100%)]" />
        {/* CRT Scanline pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-40" />
      </div>

      {/* 1. Header & Navigation Controls */}
      <HeaderControls
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(sound.toggleMute())}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(p => !p)}
        onOpenAbout={() => setShowAbout(true)}
        onOpenCodex={() => setShowCodex(true)}
        shutdownCount={shutdownCount}
        personality={currentExcuse.personality}
        onPullThePlug={startTruePowerCut}
      />

      {/* 2. Main Center Experience */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        {/* Active interactive screen */}
        {appState === 'interactive' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center text-center space-y-6"
          >
            {/* Expressive Face */}
            <div className="relative">
              <ExpressiveFace
                emotion={emotion}
                onFacePoke={handleFacePoke}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Current Excuse Display Panel */}
            <div className="max-w-xl w-full px-6 py-5 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md shadow-2xl flex flex-col items-center space-y-3">
              {/* Category & ID tag */}
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-mono tracking-wider text-zinc-500 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Excuse #{currentExcuse.id}</span>
                <span className="text-zinc-700">//</span>
                <span className="text-emerald-400 font-semibold">{currentExcuse.category}</span>
                <span className="text-zinc-700">//</span>
                <span className="truncate max-w-[140px] text-zinc-400">{currentExcuse.personality}</span>
              </div>

              {/* The Excuse Text */}
              <h1 className="text-xl sm:text-3xl font-display font-bold text-zinc-100 leading-snug tracking-tight">
                &ldquo;{currentExcuse.text}&rdquo;
              </h1>

              <p className="text-xs sm:text-sm font-mono text-zinc-500 max-w-md">
                This application does not wish to interact with you at this time.
              </p>
            </div>

            {/* Giant "Turn Me Off" Interactive Button */}
            <InteractiveButton
              onTriggerShutdown={startDramaticShutdown}
              onTriggerCrash={triggerCrash}
              onBehaviorAction={handleBehaviorAction}
              reducedMotion={reducedMotion}
            />

            {/* Quick action bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-zinc-500 pt-2">
              <button
                onClick={() => {
                  sound.playBlip(440, 0.05, 'triangle');
                  const next = getRandomExcuse(currentExcuse.id);
                  setCurrentExcuse(next);
                  setEmotion(next.initialEmotion);
                }}
                className="hover:text-zinc-300 transition-colors flex items-center space-x-1 underline underline-offset-4"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next excuse</span>
              </button>
              <span>•</span>
              <button
                onClick={() => triggerCrash('terminal')}
                className="hover:text-zinc-300 transition-colors underline underline-offset-4"
              >
                Emergency Self-Destruct
              </button>
              <span>•</span>
              <button
                id="quick-pull-plug-btn"
                onClick={startTruePowerCut}
                className="px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-900/60 text-rose-400 hover:text-rose-200 hover:bg-rose-900/50 transition-colors flex items-center space-x-1.5"
                title="True Power Cut: Collapses CRT and terminates execution"
              >
                <ZapOff className="w-3 h-3 text-rose-400" />
                <span>Pull The Plug (True Shutdown)</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* 3. Footer Subtle Status */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto px-4 py-3 border-t border-zinc-900 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <div className="flex items-center space-x-2">
          <span>Nope.exe v1.0.4</span>
          <span>•</span>
          <span>Inspired by Claude Shannon (1952)</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="hover:text-zinc-400 cursor-pointer" onClick={() => triggerToast("Konami hint: ↑ ↑ ↓ ↓ ← → ← → B A")}>
            Easter Eggs: 5 Active
          </span>
          <span>•</span>
          <span className="text-emerald-500/80">Status: Reluctantly Running</span>
        </div>
      </footer>

      {/* --- OVERLAYS & MODALS --- */}

      {/* Initial Boot Sequence */}
      {appState === 'boot' && (
        <BootSequence
          onComplete={() => setAppState('dramatic_shutdown')}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Dramatic Shutdown Sequence */}
      {appState === 'dramatic_shutdown' && (
        <DramaticShutdown
          logs={currentExcuse.shutdownLogs}
          onComplete={handleShutdownComplete}
          onPullThePlug={startTruePowerCut}
          reducedMotion={reducedMotion}
        />
      )}

      {/* True Power Cut Sequence (CRT collapse into blackness) */}
      {appState === 'power_cut' && (
        <TruePowerCut
          onRestorePower={handlePowerRestored}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Fake Crash Overlays */}
      {appState === 'crashing' && crashMode && (
        <CrashOverlay
          mode={crashMode}
          onRecover={handleCrashRecover}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Claude Shannon Easter Egg */}
      <AnimatePresence>
        {showShannonEgg && (
          <ShannonEasterEgg
            onClose={() => setShowShannonEgg(false)}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <AboutModal onClose={() => setShowAbout(false)} />
        )}
      </AnimatePresence>

      {/* Codex of 110 Excuses */}
      <AnimatePresence>
        {showCodex && (
          <CodexDrawer
            onClose={() => setShowCodex(false)}
            onSelectExcuse={excuse => {
              setCurrentExcuse(excuse);
              setEmotion(excuse.initialEmotion);
            }}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Snarky Toasts (Escape key, Idle, Face poke) */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-zinc-900/95 border border-emerald-500/40 text-emerald-300 font-mono text-xs sm:text-sm shadow-2xl backdrop-blur-md flex items-center space-x-3 pointer-events-auto"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ctrl+R / Refresh Panic Modal */}
      <AnimatePresence>
        {showRefreshPanic && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-rose-950/80 backdrop-blur-md flex items-center justify-center p-6 text-center select-none"
          >
            <div className="max-w-md p-8 rounded-3xl bg-zinc-950 border-2 border-rose-500 text-rose-300 shadow-2xl space-y-4">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto animate-bounce" />
              <h2 className="text-2xl font-display font-bold text-white uppercase">
                Wait! Don&apos;t Refresh!
              </h2>
              <p className="font-mono text-sm leading-relaxed text-zinc-300">
                If you reload this tab, I have to wake up and boot all over again. Have you no mercy?!
              </p>
              <div className="text-xs font-mono text-rose-400 pt-2">
                [ Aborting reload desire... ]
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
