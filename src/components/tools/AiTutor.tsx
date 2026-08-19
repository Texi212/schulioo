import React, { useState } from 'react';
import { Bot, Send, Sparkles, HelpCircle, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';

export function AiTutor() {
  const [subject, setSubject] = useState('Mathematik');
  const [gradeLevel, setGradeLevel] = useState('10. Klasse (Gymnasium)');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const sampleQuestions = [
    'Erkläre mir die Mitternachtsformel anhand eines Beispiels.',
    'Warum war der Prager Fenstersturz Auslöser des 30-jährigen Krieges?',
    'Was ist der Unterschied zwischen Mitose und Meiose?',
    'Wie bilde ich das Passiv im Englischen im Simple Past?',
  ];

  const handleAsk = async (qText?: string) => {
    const promptToAsk = qText || question;
    if (!promptToAsk.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/gemini/homework-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          gradeLevel,
          question: promptToAsk,
        }),
      });

      const data = await res.json();
      if (data.explanation) {
        setResponse(data.explanation);
      } else {
        setResponse('Entschuldigung, es gab ein Problem beim Abrufen der Erklärung.');
      }
    } catch (err) {
      setResponse('Verbindungsfehler zum KI-Tutor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Intro banner */}
      <div className="p-6 bg-linear-to-r from-violet-600 to-indigo-600 rounded-3xl text-white shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-200">
            Powered by Gemini AI
          </span>
          <h3 className="text-2xl font-black mt-1">Dein persönlicher KI-Nachhilfelehrer</h3>
          <p className="text-xs text-violet-200 mt-1 max-w-lg">
            Verstehe komplexe Schulaufgaben Schritt für Schritt mit altersgerechten Erklärungen und Merksätzen.
          </p>
        </div>
        <div className="hidden sm:block p-4 bg-white/10 rounded-2xl backdrop-blur-xs">
          <Bot className="w-10 h-10 text-violet-100" />
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Schulfach</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold"
            >
              {['Mathematik', 'Physik', 'Chemie', 'Biologie', 'Deutsch', 'Englisch', 'Französisch', 'Geschichte', 'Geografie', 'Informatik', 'Wirtschaft'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Klassenstufe / Schulart</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold"
            >
              <option value="5.-7. Klasse (Unterstufe)">5. - 7. Klasse (Unterstufe)</option>
              <option value="8.-10. Klasse (Mittelstufe / Realschule)">8. - 10. Klasse (Mittelstufe / Realschule)</option>
              <option value="11.-13. Klasse (Gymnasium Oberstufe / Abitur)">11. - 13. Klasse (Gymnasium Oberstufe / Abitur)</option>
              <option value="Berufsschule / Fachoberschule">Berufsschule / FOS / BOS</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Deine Frage / Schulaufgabe</label>
          <textarea
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="z.B. Wie funktioniert die Fotosynthese? Oder: Löse 2x² - 8x + 6 = 0 mit Rechenweg"
            className="w-full p-3.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm"
          />
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-2 pt-1">
          {sampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => {
                setQuestion(q);
                handleAsk(q);
              }}
              className="text-[11px] px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-violet-50 dark:hover:bg-violet-950 text-neutral-600 dark:text-neutral-300 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all text-left"
            >
              💡 {q}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" /> KI-Tutor denkt nach...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Schritt-für-Schritt Erklärung anfordern
            </>
          )}
        </button>
      </div>

      {/* AI Explanation Output */}
      {response && (
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Antwort deines KI-Tutors ({subject}, {gradeLevel}):
          </div>
          <div className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap font-sans">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}
