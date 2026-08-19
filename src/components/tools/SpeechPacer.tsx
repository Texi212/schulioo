import React, { useState, useEffect } from 'react';
import { Mic, Play, Pause, RotateCcw, Volume2, Sparkles, Clock } from 'lucide-react';

export function SpeechPacer() {
  const [speechText, setSpeechText] = useState(
    'Sehr geehrte Lehrkraft, liebe Mitschülerinnen und Mitschüler, ich begrüße euch ganz herzlich zu meinem heutigen Referat über die Entwicklung der künstlichen Intelligenz in der modernen Gesellschaft. In den nächsten fünf Minuten möchte ich auf die drei wichtigsten Meilensteine eingehen...'
  );
  const [targetSpeedWpm, setTargetSpeedWpm] = useState(130); // 130 WPM is ideal presentation pacing in German

  // Teleprompter / Live timer state
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const words = speechText.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  // Estimated speech duration in minutes & seconds
  const totalEstimatedSeconds = Math.round((totalWords / targetSpeedWpm) * 60);
  const estMin = Math.floor(totalEstimatedSeconds / 60);
  const estSec = totalEstimatedSeconds % 60;

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  const timerMin = Math.floor(elapsedSeconds / 60);
  const timerSec = elapsedSeconds % 60;

  // Current pace feedback
  const actualWpm = elapsedSeconds > 5 ? Math.round((totalWords / elapsedSeconds) * 60) : null;

  return (
    <div className="space-y-6">
      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-linear-to-br from-amber-500 to-orange-600 rounded-3xl text-white shadow-md">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-200">Geschätzte Sprechzeit</div>
          <div className="text-3xl font-black mt-1">
            {estMin}:{estSec.toString().padStart(2, '0')} <span className="text-sm font-normal">Min</span>
          </div>
          <div className="text-xs text-amber-100 mt-1">bei {targetSpeedWpm} Wörtern/Minute</div>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Wortanzahl & Zeichen</div>
            <div className="text-3xl font-black text-neutral-900 dark:text-white mt-1">{totalWords}</div>
            <div className="text-xs text-neutral-400 mt-1">{speechText.length} Zeichen</div>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-2xl">
            <Mic className="w-8 h-8" />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col justify-between shadow-xs">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sprechtempo</div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min="90"
              max="180"
              step="5"
              value={targetSpeedWpm}
              onChange={(e) => setTargetSpeedWpm(parseInt(e.target.value, 10))}
              className="flex-1 accent-amber-500"
            />
            <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200 font-mono w-14 text-right">
              {targetSpeedWpm} WPM
            </span>
          </div>
          <span className="text-[10px] text-neutral-400">120-140 WPM empfohlen für ruhigen Vortrag</span>
        </div>
      </div>

      {/* Editor + Teleprompter Live Pacer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Text Input (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Mic className="w-4 h-4 text-amber-600" />
            Vortragstext / Manuskript
          </h3>

          <textarea
            rows={10}
            value={speechText}
            onChange={(e) => setSpeechText(e.target.value)}
            placeholder="Füge hier deinen Vortragstext oder Stichpunkte ein..."
            className="w-full p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm leading-relaxed"
          />
        </div>

        {/* Live Presentation Practice & Timer (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Live-Probe & Übungsstoppuhr
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Ziel: {estMin}:{estSec.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="text-5xl font-black font-mono text-center my-8 text-white tracking-wider">
              {timerMin.toString().padStart(2, '0')}:{timerSec.toString().padStart(2, '0')}
            </div>

            {/* Time progress bar */}
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  elapsedSeconds > totalEstimatedSeconds ? 'bg-red-500' : 'bg-amber-400'
                }`}
                style={{
                  width: `${Math.min(100, (elapsedSeconds / Math.max(1, totalEstimatedSeconds)) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                isRunning ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'bg-amber-400 hover:bg-amber-500 text-black'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Starten'}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-neutral-300 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
