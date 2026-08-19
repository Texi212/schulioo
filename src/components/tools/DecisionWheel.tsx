import React, { useState } from 'react';
import { HelpCircle, Shuffle, Users, Sparkles, RefreshCw, Dice6 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DecisionWheel() {
  const [activeTab, setActiveTab] = useState<'wheel' | 'groups' | 'dice'>('wheel');

  // Wheel / Random picker
  const [itemsText, setItemsText] = useState('Anna\nBen\nClara\nDavid\nElena\nFelix\nGreta\nJonas');
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Group generator
  const [groupCount, setGroupCount] = useState(3);
  const [generatedGroups, setGeneratedGroups] = useState<string[][]>([]);

  // Dice roll
  const [diceSides, setDiceSides] = useState(6);
  const [diceResult, setDiceResult] = useState<number | null>(null);

  const getItemsList = () => itemsText.split('\n').map((s) => s.trim()).filter(Boolean);

  const spinRandom = () => {
    const list = getItemsList();
    if (list.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomPick = list[Math.floor(Math.random() * list.length)];
      setWinner(randomPick);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
        confetti({ particleCount: 40, spread: 60 });
      }
    }, 100);
  };

  const createGroups = () => {
    const list = [...getItemsList()];
    // Shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    const groups: string[][] = Array.from({ length: groupCount }, () => []);
    list.forEach((name, idx) => {
      groups[idx % groupCount].push(name);
    });

    setGeneratedGroups(groups);
  };

  const rollDice = () => {
    const res = Math.floor(Math.random() * diceSides) + 1;
    setDiceResult(res);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Sub tabs */}
      <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('wheel')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'wheel' ? 'bg-white dark:bg-neutral-900 text-purple-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Zufallsauswahl
        </button>
        <button
          onClick={() => setActiveTab('groups')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'groups' ? 'bg-white dark:bg-neutral-900 text-purple-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Gruppeneinteiler
        </button>
        <button
          onClick={() => setActiveTab('dice')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'dice' ? 'bg-white dark:bg-neutral-900 text-purple-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Würfel & Münze
        </button>
      </div>

      {activeTab === 'wheel' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-center">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Zufalls-Auswahl / Glücksrad</h3>
            <p className="text-xs text-neutral-500">
              Wer muss das nächste Referat halten oder an die Tafel?
            </p>
          </div>

          {/* Winner banner */}
          <div className="p-8 bg-purple-50 dark:bg-purple-950/40 rounded-3xl border border-purple-200 dark:border-purple-800 min-h-[140px] flex flex-col items-center justify-center">
            {winner ? (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                  {isSpinning ? 'Zufall wählt...' : '🎉 Ausgewählt:'}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
                  {winner}
                </div>
              </div>
            ) : (
              <span className="text-neutral-400 text-sm">Klicke auf den Button, um zu losen</span>
            )}
          </div>

          <button
            onClick={spinRandom}
            disabled={isSpinning}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition-all text-base"
          >
            {isSpinning ? 'Läuft...' : 'Zufällig auswählen 🎲'}
          </button>

          <div className="text-left space-y-1.5 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <label className="block text-xs font-bold text-neutral-500 uppercase">
              Namen / Optionen (eine pro Zeile):
            </label>
            <textarea
              rows={5}
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border rounded-2xl text-xs font-medium"
            />
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Automatischer Team- & Gruppeneinteiler
            </h3>
            <p className="text-xs text-neutral-500">Mischt alle Namen fair und zufällig in gleich große Gruppen</p>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-neutral-500 uppercase whitespace-nowrap">Anzahl Gruppen:</label>
            <select
              value={groupCount}
              onChange={(e) => setGroupCount(parseInt(e.target.value, 10))}
              className="px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
            >
              {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} Teams</option>
              ))}
            </select>
            <button
              onClick={createGroups}
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-xs"
            >
              Teams generieren 🎲
            </button>
          </div>

          {generatedGroups.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {generatedGroups.map((group, idx) => (
                <div key={idx} className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
                  <span className="text-xs font-black uppercase text-purple-700 dark:text-purple-300">
                    Gruppe {idx + 1} ({group.length} Pers.)
                  </span>
                  <ul className="text-xs font-medium space-y-1 text-neutral-800 dark:text-neutral-200">
                    {group.map((m, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'dice' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs text-center">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Würfel & Münzwurf</h3>

          <div className="flex justify-center gap-2">
            {[2, 6, 12, 20, 100].map((s) => (
              <button
                key={s}
                onClick={() => setDiceSides(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  diceSides === s ? 'bg-purple-600 text-white shadow-xs' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                }`}
              >
                {s === 2 ? 'Münze (W2)' : `W${s}`}
              </button>
            ))}
          </div>

          <div className="py-6 flex flex-col items-center justify-center">
            <div className="w-28 h-28 bg-purple-100 dark:bg-purple-950 border-2 border-purple-400 rounded-3xl flex items-center justify-center shadow-inner">
              <span className="text-5xl font-black font-mono text-purple-700 dark:text-purple-300">
                {diceResult !== null ? (diceSides === 2 ? (diceResult === 1 ? 'Kopf' : 'Zahl') : diceResult) : '—'}
              </span>
            </div>
          </div>

          <button
            onClick={rollDice}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
          >
            Würfeln 🎲
          </button>
        </div>
      )}
    </div>
  );
}
