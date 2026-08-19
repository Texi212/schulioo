import React, { useState } from 'react';
import { COUNTRIES_DATA, GERMAN_STATES } from '../../data/geographyData';
import { Globe, Search, Award, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GeographyAtlas() {
  const [activeTab, setActiveTab] = useState<'countries' | 'states' | 'quiz'>('countries');
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Generate quiz questions
  const quizPool = [
    { question: 'Was ist die Hauptstadt von Australien?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], answer: 'Canberra' },
    { question: 'Was ist die Landeshauptstadt von Hessen?', options: ['Frankfurt am Main', 'Wiesbaden', 'Kassel', 'Darmstadt'], answer: 'Wiesbaden' },
    { question: 'Was ist die Hauptstadt von Kanada?', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'], answer: 'Ottawa' },
    { question: 'Welches Bundesland hat die Hauptstadt Erfurt?', options: ['Sachsen', 'Thüringen', 'Sachsen-Anhalt', 'Brandenburg'], answer: 'Thüringen' },
    { question: 'Was ist die Hauptstadt von Brasilien?', options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'], answer: 'Brasília' },
    { question: 'Was ist die Landeshauptstadt von Mecklenburg-Vorpommern?', options: ['Rostock', 'Schwerin', 'Stralsund', 'Greifswald'], answer: 'Schwerin' },
  ];

  const currentQ = quizPool[quizQuestionIndex % quizPool.length];

  const handleSelectAnswer = (opt: string) => {
    if (quizAnswered) return;
    setSelectedAnswer(opt);
    setQuizAnswered(true);

    if (opt === currentQ.answer) {
      setQuizScore((s) => s + 1);
      confetti({ particleCount: 30, spread: 60 });
    }
  };

  const nextQuestion = () => {
    setQuizAnswered(false);
    setSelectedAnswer(null);
    setQuizQuestionIndex((i) => (i + 1) % quizPool.length);
  };

  const filteredCountries = COUNTRIES_DATA.filter((c) => {
    const matchContinent = selectedContinent === 'all' || c.continent === selectedContinent;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.capital.toLowerCase().includes(search.toLowerCase());
    return matchContinent && matchSearch;
  });

  const filteredStates = GERMAN_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.capital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('countries')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'countries' ? 'bg-white dark:bg-neutral-900 text-teal-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Länder & Hauptstädte
        </button>
        <button
          onClick={() => setActiveTab('states')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'states' ? 'bg-white dark:bg-neutral-900 text-teal-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          16 Bundesländer
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quiz' ? 'bg-white dark:bg-neutral-900 text-teal-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Hauptstadt-Quiz
        </button>
      </div>

      {activeTab === 'countries' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Land oder Hauptstadt suchen..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
              />
            </div>

            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold"
            >
              <option value="all">Alle Kontinente</option>
              <option value="Europa">Europa</option>
              <option value="Asien">Asien</option>
              <option value="Nordamerika">Nordamerika</option>
              <option value="Südamerika">Südamerika</option>
              <option value="Afrika">Afrika</option>
              <option value="Ozeanien">Ozeanien</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredCountries.map((c) => (
              <div
                key={c.name}
                className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl space-y-1 hover:border-teal-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                    {c.continent}
                  </span>
                </div>
                <div className="font-bold text-neutral-900 dark:text-white pt-1">{c.name}</div>
                <div className="text-xs text-neutral-500">
                  Hauptstadt: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{c.capital}</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  {c.population} Mio. Einw. | {c.area.toLocaleString()} km²
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'states' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              Die 16 Bundesländer der Bundesrepublik Deutschland
            </h3>
            <span className="text-xs text-neutral-400">{filteredStates.length} Länder</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {filteredStates.map((s) => (
              <div
                key={s.name}
                className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl space-y-1.5"
              >
                <div className="font-bold text-sm text-neutral-900 dark:text-white">{s.name}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300">
                  Landeshauptstadt: <span className="font-bold text-teal-600 dark:text-teal-400">{s.capital}</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">
                  {s.population} Mio. Einw. | {s.area.toLocaleString()} km²
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Frage {quizQuestionIndex + 1} von {quizPool.length}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-lg">
              Score: {quizScore}
            </span>
          </div>

          <h3 className="text-xl font-black text-neutral-900 dark:text-white">
            {currentQ.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt) => {
              const isChosen = selectedAnswer === opt;
              const isRight = opt === currentQ.answer;

              let btnStyle = 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-teal-400';
              if (quizAnswered) {
                if (isRight) btnStyle = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                else if (isChosen) btnStyle = 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all ${btnStyle}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all"
              >
                Nächste Frage &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
