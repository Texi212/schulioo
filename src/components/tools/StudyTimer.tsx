import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, CheckCircle2, Clock, Flame, Award, Volume2, VolumeX } from 'lucide-react';
import { playChime } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';

export function StudyTimer() {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak' | 'stopwatch' | 'custom'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(() => {
    const saved = localStorage.getItem('schulportal_timer_sessions');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Custom timer state
  const [customMinutes, setCustomMinutes] = useState(45);

  const initialTimes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    custom: customMinutes * 60,
    stopwatch: 0,
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (mode === 'stopwatch') return;

    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (soundEnabled) {
        playChime('success');
      }
      if (mode === 'pomodoro' || mode === 'custom') {
        const next = completedSessions + 1;
        setCompletedSessions(next);
        localStorage.setItem('schulportal_timer_sessions', next.toString());
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, mode, soundEnabled, completedSessions]);

  // Stopwatch runner
  useEffect(() => {
    if (mode !== 'stopwatch') return;

    let swInterval: NodeJS.Timeout | null = null;
    if (isRunning) {
      swInterval = setInterval(() => {
        setStopwatchTime((t) => t + 10);
      }, 10);
    }
    return () => {
      if (swInterval) clearInterval(swInterval);
    };
  }, [isRunning, mode]);

  const switchMode = (newMode: typeof mode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'custom') {
      setTimeLeft(customMinutes * 60);
    } else if (newMode !== 'stopwatch') {
      setTimeLeft(initialTimes[newMode]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'stopwatch') {
      setStopwatchTime(0);
      setLaps([]);
    } else if (mode === 'custom') {
      setTimeLeft(customMinutes * 60);
    } else {
      setTimeLeft(initialTimes[mode]);
    }
  };

  const addLap = () => {
    if (mode === 'stopwatch' && isRunning) {
      setLaps([stopwatchTime, ...laps]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  const currentTotal = mode === 'custom' ? customMinutes * 60 : initialTimes[mode as keyof typeof initialTimes] || 1;
  const progressPercent = mode === 'stopwatch' ? 100 : Math.max(0, Math.min(100, ((currentTotal - timeLeft) / currentTotal) * 100));

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl max-w-xl mx-auto">
        <button
          onClick={() => switchMode('pomodoro')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === 'pomodoro'
              ? 'bg-white dark:bg-neutral-900 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
          }`}
        >
          🍅 Pomodoro (25m)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === 'shortBreak'
              ? 'bg-white dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
          }`}
        >
          ☕ Kurze Pause (5m)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === 'longBreak'
              ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
          }`}
        >
          🌴 Lange Pause (15m)
        </button>
        <button
          onClick={() => switchMode('custom')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === 'custom'
              ? 'bg-white dark:bg-neutral-900 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
          }`}
        >
          ⚙️ Eigene Zeit
        </button>
        <button
          onClick={() => switchMode('stopwatch')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            mode === 'stopwatch'
              ? 'bg-white dark:bg-neutral-900 text-orange-600 dark:text-orange-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900'
          }`}
        >
          ⏱️ Stoppuhr
        </button>
      </div>

      {mode === 'custom' && (
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto bg-purple-50 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-200 dark:border-purple-800">
          <label className="text-sm font-medium text-purple-900 dark:text-purple-200">Dauer (Minuten):</label>
          <input
            type="number"
            min="1"
            max="180"
            value={customMinutes}
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value) || 1);
              setCustomMinutes(val);
              if (!isRunning) setTimeLeft(val * 60);
            }}
            className="w-20 px-3 py-1.5 text-center bg-white dark:bg-neutral-900 rounded-lg border border-purple-300 dark:border-purple-700 font-semibold"
          />
        </div>
      )}

      {/* Main Circular / Digital Display */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {mode !== 'stopwatch' && (
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-neutral-200 dark:text-neutral-800"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-amber-500 transition-all duration-1000 ease-linear"
                strokeWidth="7"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
          )}

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white tabular-nums">
              {mode === 'stopwatch' ? formatStopwatch(stopwatchTime) : formatTime(timeLeft)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-2">
              {mode === 'pomodoro' && 'Lernphase'}
              {mode === 'shortBreak' && 'Kurze Pause'}
              {mode === 'longBreak' && 'Erholung'}
              {mode === 'custom' && 'Eigene Lerneinheit'}
              {mode === 'stopwatch' && 'Laufzeit'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold rounded-2xl shadow-md transition-all"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            onClick={handleReset}
            title="Zurücksetzen"
            className="p-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-2xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {mode === 'stopwatch' && (
            <button
              onClick={addLap}
              disabled={!isRunning}
              className="px-4 py-3.5 bg-neutral-100 dark:bg-neutral-800 disabled:opacity-40 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium rounded-2xl transition-all text-sm"
            >
              Runde
            </button>
          )}

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Ton ausschalten' : 'Ton einschalten'}
            className="p-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-2xl transition-all"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-500" /> : <VolumeX className="w-5 h-5 text-neutral-400" />}
          </button>
        </div>
      </div>

      {/* Laps list for stopwatch */}
      {mode === 'stopwatch' && laps.length > 0 && (
        <div className="max-w-md mx-auto bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
          <h4 className="text-xs font-bold uppercase text-neutral-500 mb-2">Rundenzeiten ({laps.length})</h4>
          <div className="max-h-40 overflow-y-auto space-y-1.5">
            {laps.map((lap, i) => (
              <div key={i} className="flex justify-between text-sm py-1 border-b border-neutral-200/50 dark:border-neutral-700/50">
                <span className="text-neutral-500 font-medium">Runde {laps.length - i}</span>
                <span className="font-mono font-semibold">{formatStopwatch(lap)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation & Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
          <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Abgeschlossene Sessions</div>
            <div className="text-lg font-bold text-neutral-900 dark:text-white">{completedSessions} Einheiten</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50">
          <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Reine Lernzeit</div>
            <div className="text-lg font-bold text-neutral-900 dark:text-white">{Math.round(completedSessions * 25)} Min</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Pomodoro-Prinzip</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">25m Fokus, 5m Pause</div>
          </div>
        </div>
      </div>
    </div>
  );
}
