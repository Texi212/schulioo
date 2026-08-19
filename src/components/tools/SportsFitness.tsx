import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RotateCcw, Flame, Heart, Timer } from 'lucide-react';
import { playAudioBeep } from '../../utils/audioSynth';

export function SportsFitness() {
  const [subTab, setSubTab] = useState<'tabata' | 'bmi' | 'cooper'>('tabata');

  // Tabata Timer state
  const [workSec, setWorkSec] = useState(20);
  const [restSec, setRestSec] = useState(10);
  const [totalRounds, setTotalRounds] = useState(8);
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState<'work' | 'rest'>('work');
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [isRunning, setIsRunning] = useState(false);

  // BMI state
  const [heightCm, setHeightCm] = useState('175');
  const [weightKg, setWeightKg] = useState('68');

  // Cooper test state
  const [cooperDistance, setCooperDistance] = useState('2400');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageGroup, setAgeGroup] = useState('15-16');

  // Tabata interval loop
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((sec) => {
          if (sec <= 1) {
            playAudioBeep(phase === 'work' ? 440 : 880, 'sine', 0.2);
            if (phase === 'work') {
              setPhase('rest');
              return restSec;
            } else {
              if (currentRound >= totalRounds) {
                setIsRunning(false);
                playAudioBeep(987, 'sine', 0.6);
                return 0;
              }
              setCurrentRound((r) => r + 1);
              setPhase('work');
              return workSec;
            }
          }
          if (sec <= 3) {
            playAudioBeep(600, 'sine', 0.05);
          }
          return sec - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, phase, currentRound, totalRounds, workSec, restSec]);

  const resetTabata = () => {
    setIsRunning(false);
    setPhase('work');
    setCurrentRound(1);
    setSecondsLeft(workSec);
  };

  // BMI calc
  const hM = (parseFloat(heightCm) || 170) / 100;
  const wKg = parseFloat(weightKg) || 60;
  const bmi = wKg / (hM * hM);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Sub tabs */}
      <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setSubTab('tabata')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            subTab === 'tabata' ? 'bg-white dark:bg-neutral-900 text-orange-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Tabata / HIIT Timer
        </button>
        <button
          onClick={() => setSubTab('cooper')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            subTab === 'cooper' ? 'bg-white dark:bg-neutral-900 text-orange-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Cooper-Test (12 Min)
        </button>
        <button
          onClick={() => setSubTab('bmi')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            subTab === 'bmi' ? 'bg-white dark:bg-neutral-900 text-orange-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          BMI Rechner
        </button>
      </div>

      {subTab === 'tabata' && (
        <div
          className={`rounded-3xl p-8 text-center shadow-lg space-y-6 border transition-all ${
            phase === 'work'
              ? 'bg-linear-to-b from-orange-600 to-red-600 text-white border-orange-500'
              : 'bg-linear-to-b from-emerald-600 to-teal-700 text-white border-emerald-500'
          }`}
        >
          <div className="flex items-center justify-between text-xs uppercase font-bold tracking-wider opacity-90">
            <span>Runde {currentRound} von {totalRounds}</span>
            <span className="px-3 py-1 bg-white/20 rounded-full">
              {phase === 'work' ? '🔥 POWER (Work)' : '🧘 PAUSE (Rest)'}
            </span>
          </div>

          <div className="text-7xl sm:text-8xl font-black font-mono tracking-tight my-4">
            {secondsLeft}s
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-3 bg-white text-neutral-900 font-black rounded-2xl shadow-md flex items-center gap-2 hover:bg-neutral-100 transition-all text-base"
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTabata}
              className="p-3 bg-black/20 hover:bg-black/30 text-white rounded-2xl transition-all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {subTab === 'cooper' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">12-Minuten-Cooper-Test Auswertung</h3>
            <p className="text-xs text-neutral-500">Klassischer Schulsport-Ausdauertest zur Ermittlung der aeroben Fitness</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Gelaufene Distanz (Meter)</label>
              <input
                type="number"
                step="50"
                value={cooperDistance}
                onChange={(e) => setCooperDistance(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Geschlecht</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              >
                <option value="male">Männlich</option>
                <option value="female">Weiblich</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Altersgruppe</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              >
                <option value="13-14">13 - 14 Jahre</option>
                <option value="15-16">15 - 16 Jahre</option>
                <option value="17-19">17 - 19 Jahre (Oberstufe)</option>
              </select>
            </div>
          </div>

          {(() => {
            const dist = parseInt(cooperDistance, 10) || 0;
            let rating = 'Durchschnittlich';
            let grade = 'Note 3';
            if (dist >= 2800) { rating = 'Hervorragend (Sehr gut)'; grade = 'Note 1 (15 Pkt)'; }
            else if (dist >= 2500) { rating = 'Gut'; grade = 'Note 2 (12 Pkt)'; }
            else if (dist >= 2200) { rating = 'Befriedigend'; grade = 'Note 3 (9 Pkt)'; }
            else if (dist >= 1800) { rating = 'Ausreichend'; grade = 'Note 4 (6 Pkt)'; }
            else { rating = 'Mangelhaft'; grade = 'Note 5 (3 Pkt)'; }

            return (
              <div className="p-5 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 font-semibold">Leistungsbewertung:</span>
                  <div className="text-2xl font-black text-orange-600 dark:text-orange-400 mt-1">{rating}</div>
                </div>
                <div className="text-right font-black text-xl text-neutral-800 dark:text-neutral-200">
                  {grade}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {subTab === 'bmi' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Body-Mass-Index (BMI) Rechner</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Körpergröße (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Gewicht (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="p-5 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-neutral-500 font-semibold">Dein BMI</span>
              <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mt-1">{bmi.toFixed(1)}</div>
            </div>
            <div className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              {bmi < 18.5 ? 'Untergewicht' : bmi <= 24.9 ? 'Normalgewicht (Optimal)' : 'Übergewicht'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
