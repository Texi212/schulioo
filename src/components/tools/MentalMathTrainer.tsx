import React, { useState, useEffect } from 'react';
import { Sparkles, Timer, Trophy, RotateCcw, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playAudioBeep } from '../../utils/audioSynth';

export function MentalMathTrainer() {
  const [mode, modeSet] = useState<'sprint' | 'table'>('sprint');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('math_highscore') || '0', 10);
  });

  // Current equation
  const [num1, setNum1] = useState(7);
  const [num2, setNum2] = useState(8);
  const [operator, setOperator] = useState<'*' | '+' | '-' | '/'>('*');
  const [userAnswer, setUserAnswer] = useState('');

  const generateProblem = (diff = difficulty) => {
    let max = diff === 'easy' ? 12 : diff === 'medium' ? 25 : 99;
    const ops: ('*' | '+' | '-' | '/')[] = diff === 'easy' ? ['+', '-', '*'] : ['+', '-', '*', '/'];
    const op = ops[Math.floor(Math.random() * ops.length)];

    let a = Math.floor(Math.random() * max) + 2;
    let b = Math.floor(Math.random() * (diff === 'hard' ? 25 : 12)) + 2;

    if (op === '/') {
      // make clean division
      const product = a * b;
      setNum1(product);
      setNum2(b);
      setOperator('/');
    } else if (op === '-') {
      if (a < b) [a, b] = [b, a];
      setNum1(a);
      setNum2(b);
      setOperator('-');
    } else {
      setNum1(a);
      setNum2(b);
      setOperator(op);
    }
    setUserAnswer('');
  };

  const getCorrectResult = () => {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    if (operator === '/') return num1 / num2;
    return 0;
  };

  const startSprint = () => {
    setIsPlaying(true);
    setTimeLeft(60);
    setScore(0);
    generateProblem();
  };

  useEffect(() => {
    let timer: any = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      playAudioBeep(520, 'sine', 0.5);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('math_highscore', score.toString());
        confetti({ particleCount: 50, spread: 70 });
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPlaying) return;

    const parsed = parseInt(userAnswer, 10);
    if (parsed === getCorrectResult()) {
      setScore((s) => s + 1);
      playAudioBeep(880, 'sine', 0.08);
      generateProblem();
    } else {
      playAudioBeep(220, 'square', 0.15);
      setUserAnswer('');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Sub Tabs */}
      <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-xs mx-auto">
        <button
          onClick={() => modeSet('sprint')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            mode === 'sprint' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          60s Blitz-Sprint
        </button>
        <button
          onClick={() => modeSet('table')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            mode === 'table' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Einmaleins (1-10)
        </button>
      </div>

      {mode === 'sprint' ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-center">
          {/* Header Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-sky-600" />
              <span className="text-2xl font-black font-mono text-neutral-900 dark:text-white">
                {timeLeft}s
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
              <Trophy className="w-4 h-4" /> Rekord: {highScore} Pkt
            </div>

            <div className="text-right">
              <span className="text-xs text-neutral-400 block">Punkte</span>
              <span className="text-2xl font-black text-sky-600">{score}</span>
            </div>
          </div>

          {!isPlaying && (
            <div className="py-8 space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Kopfrechnen-Blitz-Challenge
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Löse so viele Rechenaufgaben wie möglich in 60 Sekunden!
              </p>

              <div className="flex justify-center gap-2 pt-2">
                {(['easy', 'medium', 'hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      difficulty === d ? 'bg-sky-600 text-white shadow-xs' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                    }`}
                  >
                    {d === 'easy' ? 'Leicht' : d === 'medium' ? 'Mittel' : 'Schwer'}
                  </button>
                ))}
              </div>

              <button
                onClick={startSprint}
                className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl shadow-md transition-all text-base"
              >
                Sprint Starten 🚀
              </button>
            </div>
          )}

          {isPlaying && (
            <form onSubmit={handleSubmit} className="py-6 space-y-6">
              <div className="font-mono text-5xl sm:text-6xl font-black text-neutral-900 dark:text-white tracking-wider">
                {num1} {operator === '*' ? '×' : operator === '/' ? '÷' : operator} {num2} = ?
              </div>

              <div className="max-w-xs mx-auto">
                <input
                  autoFocus
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Antwort"
                  className="w-full text-center text-3xl font-black font-mono py-3 px-4 bg-neutral-100 dark:bg-neutral-800 border-2 border-sky-400 rounded-2xl focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-600 text-white font-bold text-sm rounded-xl shadow-xs"
              >
                Weiter (Enter) &rarr;
              </button>
            </form>
          )}
        </div>
      ) : (
        /* Multiplication Table 10x10 Matrix */
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Das kleine 1x1 (Multiplikationstabelle)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center font-mono text-xs">
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                  <tr key={row}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                      const isHeader = row === 1 || col === 1;
                      return (
                        <td
                          key={col}
                          className={`p-2 border border-neutral-100 dark:border-neutral-800 ${
                            isHeader
                              ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-black'
                              : row === col
                              ? 'bg-amber-50 dark:bg-amber-950/40 font-bold'
                              : 'text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {row * col}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
