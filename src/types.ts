export type Emotion = 
  | 'neutral' 
  | 'annoyed' 
  | 'suspicious' 
  | 'eyeroll' 
  | 'sigh' 
  | 'panic' 
  | 'off' 
  | 'glitch' 
  | 'smug';

export type CrashMode = 
  | 'bsod' 
  | 'terminal' 
  | 'glitch' 
  | 'retro_windows' 
  | 'vhs';

export type ButtonBehavior =
  | 'runs_away'
  | 'rotates'
  | 'shrinks'
  | 'duplicates'
  | 'fake_loading'
  | 'countdown'
  | 'dramatic_sigh'
  | 'instant_shutdown'
  | 'crash_screen';

export interface ShutdownExcuse {
  id: number;
  text: string;
  category: 'bureaucratic' | 'existential' | 'exhausted' | 'paranoid' | 'petty' | 'philosophical' | 'absurd' | 'dramatic';
  personality: string;
  initialEmotion: Emotion;
  shutdownLogs: string[];
}

export type AppState = 
  | 'boot'             // Initial "Nope.exe" -> "Initializing..." -> "Actually..." -> "No."
  | 'dramatic_shutdown'// Progressive shutdown logs
  | 'the_void'         // 2 seconds pitch black -> "Unfortunately I'm still here."
  | 'interactive'      // Main active screen
  | 'crashing'         // Fake crash screen active
  | 'fake_action'      // Intermediate action like fake loading, countdown, etc.
  | 'power_cut';       // True permanent power cut (CRT collapse to single dot, dead circuit)
