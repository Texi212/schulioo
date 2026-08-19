import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Play, Pause, RotateCcw, Zap } from 'lucide-react';

export function SpeedReader() {
  const [inputText, setInputText] = useState(
    'Das menschliche Gehirn kann visuelle Informationen viel schneller verarbeiten als beim herkömmlichen Lesen mit den Augenbewegungen. Beim RSVP-Verfahren (Rapid Serial Visual Presentation) wird jedes Wort einzeln an einer festen Stelle zentriert dargestellt. Dadurch entfällt das zeitraubende Hin- und Herspringen der Augen, und du kannst deine Lesegeschwindigkeit von üblichen 200 WPM mühelos auf 400 bis 600 Wörter pro Minute verdoppeln!'
  );
  const [wpm, setWpm] = useState(350);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = inputText.trim().split(/\s+/).filter(Boolean);
  const totalWords = words.length;

  useEffect(() => {
    let timeout: any = null;
    if (isPlaying && currentWordIndex < totalWords) {
      const intervalMs = (60 / wpm) * 1000;
      timeout = setTimeout(() => {
        setCurrentWordIndex((idx) => {
          if (idx + 1 >= totalWords) {
            setIsPlaying(false);
            return 0;
          }
          return idx + 1;
        });
      }, intervalMs);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentWordIndex, wpm, totalWords]);

  const currentWord = words[currentWordIndex] || 'Fertig!';

  // Pivot letter highlight (Optimal Recognition Point)
  const getWordParts = (w: string) => {
    if (!w) return { pre: '', mid: '', post: '' };
    const midIdx = Math.floor((w.length - 1) / 3);
    return {
      pre: w.slice(0, midIdx),
      mid: w[midIdx] || '',
      post: w.slice(midIdx + 1),
    };
  };

  const { pre, mid, post } = getWordParts(currentWord);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* RSVP Reader Stage */}
      <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-8 flex flex-col justify-between min-h-[300px] border border-neutral-800">
        <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Wort {currentWordIndex + 1} von {totalWords}</span>
          <span className="font-bold text-amber-400">{wpm} WPM</span>
        </div>

        {/* Word Display with red focal point */}
        <div className="py-6 flex items-center justify-center font-mono text-4xl sm:text-5xl font-black tracking-tight select-none">
          <span className="text-right w-1/2 text-neutral-200">{pre}</span>
          <span className="text-red-500 underline underline-offset-8 decoration-2">{mid}</span>
          <span className="text-left w-1/2 text-neutral-200">{post}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-400 h-full transition-all duration-75"
            style={{ width: `${((currentWordIndex + 1) / Math.max(1, totalWords)) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentWordIndex(0);
              setIsPlaying(false);
            }}
            className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-neutral-300 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-black font-bold text-base rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? 'Pause' : 'Starten'}
          </button>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex items-center gap-4">
        <span className="text-xs font-bold text-neutral-500 uppercase whitespace-nowrap">Tempo:</span>
        <input
          type="range"
          min="150"
          max="800"
          step="25"
          value={wpm}
          onChange={(e) => setWpm(parseInt(e.target.value, 10))}
          className="flex-1 accent-amber-500"
        />
        <span className="font-bold text-sm text-neutral-900 dark:text-white font-mono w-20 text-right">
          {wpm} WPM
        </span>
      </div>

      {/* Input Text Box */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-2">
        <h4 className="text-xs font-bold text-neutral-500 uppercase">Eigener Text zum Schnelllesen</h4>
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setCurrentWordIndex(0);
          }}
          placeholder="Füge hier deinen Text, Zusammenfassungen oder Schulbuchkapitel ein..."
          className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs"
        />
      </div>
    </div>
  );
}
