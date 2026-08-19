import React, { useState } from 'react';
import { AlignLeft, FileText, Sparkles, BarChart2, CheckCircle2 } from 'lucide-react';

export function TextAnalyzer() {
  const [text, setText] = useState(
    'Klimawandel bezeichnet die langfristige Erwärmung der Erde und die daraus resultierenden Veränderungen der globalen Wettermuster. Der Hauptgrund für den aktuellen Wandel sind Treibhausgasemissionen durch menschliche Aktivitäten wie das Verbrennen fossiler Brennstoffe, Entwaldung und industrielle Landwirtschaft.'
  );

  // Metrics
  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const paragraphCount = Math.max(1, paragraphs.length);

  // Syllable estimation for German Flesch Index
  // Approximate syllable count by counting vowel clusters
  const countSyllables = (word: string) => {
    const clean = word.toLowerCase().replace(/[^a-zäöüß]/g, '');
    if (clean.length <= 3) return 1;
    const matches = clean.match(/[aeiouyäöü]+/g);
    return matches ? matches.length : 1;
  };

  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);

  // German Flesch Reading Ease formula:
  // FRE_de = 180 - (ASL) - (58.5 * ASW)
  // ASL = Average Sentence Length (Words / Sentences)
  // ASW = Average Syllables per Word (Syllables / Words)
  const asl = wordCount / sentenceCount;
  const asw = wordCount > 0 ? totalSyllables / wordCount : 1;
  const fleschScore = Math.max(0, Math.min(100, Math.round(180 - asl - 58.5 * asw)));

  const getFleschRating = (score: number) => {
    if (score >= 80) return { label: 'Sehr leicht (Grundschule)', color: 'text-emerald-600 dark:text-emerald-400' };
    if (score >= 65) return { label: 'Leicht (Mittelstufe 5.-8. Klasse)', color: 'text-teal-600 dark:text-teal-400' };
    if (score >= 50) return { label: 'Mittelschwer (Realschule / 10. Klasse)', color: 'text-amber-600 dark:text-amber-400' };
    if (score >= 35) return { label: 'Schwer (Gymnasium Oberstufe / Abitur)', color: 'text-orange-600 dark:text-orange-400' };
    return { label: 'Sehr anspruchsvoll (Wissenschaftlich / Fachliteratur)', color: 'text-red-600 dark:text-red-400' };
  };

  const rating = getFleschRating(fleschScore);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase">Wörter</span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">{wordCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase">Zeichen (inkl. Leerz.)</span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">{charCountWithSpaces}</div>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase">Sätze</span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">{sentenceCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase">Normseiten (~1500 Z.)</span>
          <div className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
            {(charCountWithSpaces / 1500).toFixed(1)}
          </div>
        </div>
      </div>

      {/* Flesch Reading Ease Bar */}
      <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-3xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            Lesbarkeitsindex (Flesch-Reading-Ease nach Amstad)
          </span>
          <span className={`text-sm font-black ${rating.color}`}>
            {fleschScore} / 100 ({rating.label})
          </span>
        </div>

        <div className="w-full bg-white dark:bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-indigo-200 dark:border-indigo-800">
          <div
            className="bg-indigo-600 h-full transition-all duration-300"
            style={{ width: `${fleschScore}%` }}
          />
        </div>
      </div>

      {/* Input Text Area */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600" />
          Textanalyse-Eingabe (Aufsatz, Essay, Zusammenfassung)
        </h3>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Füge hier deinen Text für Echtzeitanalyse ein..."
          className="w-full p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-sm leading-relaxed"
        />

        <div className="flex justify-between items-center text-xs text-neutral-400 pt-1">
          <span>Ø Satzlänge: {asl.toFixed(1)} Wörter/Satz</span>
          <span>Ø Silben pro Wort: {asw.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
