import React, { useState } from 'react';
import { Music, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { playAudioBeep } from '../../utils/audioSynth';

const PIANO_KEYS = [
  { note: 'C4', freq: 261.63, isBlack: false },
  { note: 'C#4', freq: 277.18, isBlack: true },
  { note: 'D4', freq: 293.66, isBlack: false },
  { note: 'D#4', freq: 311.13, isBlack: true },
  { note: 'E4', freq: 329.63, isBlack: false },
  { note: 'F4', freq: 349.23, isBlack: false },
  { note: 'F#4', freq: 369.99, isBlack: true },
  { note: 'G4', freq: 392.00, isBlack: false },
  { note: 'G#4', freq: 415.30, isBlack: true },
  { note: 'A4', freq: 440.00, isBlack: false },
  { note: 'A#4', freq: 466.16, isBlack: true },
  { note: 'B4', freq: 493.88, isBlack: false },
  { note: 'C5', freq: 523.25, isBlack: false },
];

const SCALES = [
  { name: 'C-Dur', notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], desc: 'Keine Vorzeichen' },
  { name: 'G-Dur', notes: ['G4', 'A4', 'B4', 'C5', 'D4', 'E4', 'F#4', 'G4'], desc: '1 Kreuz (#): Fis' },
  { name: 'F-Dur', notes: ['F4', 'G4', 'A4', 'A#4', 'C4', 'D4', 'E4', 'F4'], desc: '1 B (♭): B' },
  { name: 'A-Moll (Natürlich)', notes: ['A4', 'B4', 'C5', 'D4', 'E4', 'F4', 'G4', 'A4'], desc: 'Parallele Molltonart zu C-Dur' },
];

const INTERVALS = [
  { name: 'Prime', semitones: 0, example: 'C - C' },
  { name: 'Kleine Sekunde', semitones: 1, example: 'C - C#' },
  { name: 'Große Sekunde', semitones: 2, example: 'C - D' },
  { name: 'Kleine Terz', semitones: 3, example: 'C - D# (Moll)' },
  { name: 'Große Terz', semitones: 4, example: 'C - E (Dur)' },
  { name: 'Reine Quarte', semitones: 5, example: 'C - F' },
  { name: 'Tritonus', semitones: 6, example: 'C - F#' },
  { name: 'Reine Quinte', semitones: 7, example: 'C - G (Quintenzirkel)' },
  { name: 'Reine Oktave', semitones: 12, example: 'C4 - C5' },
];

export function MusicTheory() {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const playNote = (freq: number, noteName: string) => {
    setActiveNote(noteName);
    playAudioBeep(freq, 'sine', 0.4);
    setTimeout(() => setActiveNote(null), 300);
  };

  const playScale = (notes: string[]) => {
    notes.forEach((noteName, idx) => {
      const key = PIANO_KEYS.find((k) => k.note === noteName);
      if (key) {
        setTimeout(() => {
          playNote(key.freq, key.note);
        }, idx * 350);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Interactive Piano Keyboard */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-center">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
            <Music className="w-5 h-5 text-indigo-600" />
            Interaktives Klavier & Tonhöhen-Synthesizer
          </h3>
          <p className="text-xs text-neutral-500">Klicke auf die Tasten, um Töne und Frequenzen in Echtzeit zu hören</p>
        </div>

        {/* Keyboard container */}
        <div className="relative inline-flex justify-center select-none py-4 px-2 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-inner overflow-x-auto max-w-full">
          {PIANO_KEYS.map((key) => {
            const isActive = activeNote === key.note;

            if (key.isBlack) {
              return (
                <button
                  key={key.note}
                  onClick={() => playNote(key.freq, key.note)}
                  className={`w-7 h-28 -mx-3.5 z-10 rounded-b-lg transition-all active:scale-95 flex flex-col justify-end pb-2 ${
                    isActive ? 'bg-indigo-600 shadow-md scale-95' : 'bg-neutral-900 hover:bg-neutral-800'
                  }`}
                >
                  <span className="text-[9px] text-neutral-400 font-mono block truncate">{key.note}</span>
                </button>
              );
            }

            return (
              <button
                key={key.note}
                onClick={() => playNote(key.freq, key.note)}
                className={`w-11 h-44 bg-white border border-neutral-300 rounded-b-xl transition-all active:scale-98 flex flex-col justify-end pb-3 shadow-xs ${
                  isActive ? 'bg-indigo-100 border-indigo-500' : 'hover:bg-neutral-50'
                }`}
              >
                <span className="text-xs font-bold text-neutral-800 font-mono">{key.note}</span>
                <span className="text-[8px] text-neutral-400 font-mono">{Math.round(key.freq)} Hz</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tonleitern & Intervalle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tonleitern */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Wichtige Tonleitern vorspielen</h4>
          <div className="space-y-3">
            {SCALES.map((scale) => (
              <div
                key={scale.name}
                className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border flex items-center justify-between gap-2"
              >
                <div>
                  <div className="font-bold text-sm text-neutral-900 dark:text-white">{scale.name}</div>
                  <div className="text-xs text-neutral-500">{scale.desc}</div>
                </div>
                <button
                  onClick={() => playScale(scale.notes)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Abspielen
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Intervalle Tabelle */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Musikalische Intervalle & Halbtöne</h4>
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {INTERVALS.map((inv) => (
              <div
                key={inv.name}
                className="p-2.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border flex items-center justify-between text-xs"
              >
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{inv.name}</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  {inv.semitones} Halbtöne ({inv.example})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
