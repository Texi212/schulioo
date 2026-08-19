import React, { useState } from 'react';
import { BookMarked, Copy, Check, Sparkles } from 'lucide-react';

export function CitationGenerator() {
  const [sourceType, setSourceType] = useState<'book' | 'website' | 'journal'>('book');
  const [style, setStyle] = useState<'APA' | 'DIN' | 'MLA'>('APA');
  const [copied, setCopied] = useState(false);

  // Form fields
  const [authors, setAuthors] = useState('Mustermann, Max');
  const [title, setTitle] = useState('Grundlagen der modernen Physik');
  const [year, setYear] = useState('2023');
  const [publisher, setPublisher] = useState('Springer Verlag');
  const [city, setCity] = useState('Berlin');
  const [url, setUrl] = useState('https://www.beispiel.de/artikel');
  const [accessDate, setAccessDate] = useState(new Date().toLocaleDateString('de-DE'));

  const generateCitation = () => {
    if (style === 'APA') {
      if (sourceType === 'book') {
        return `${authors} (${year}). *${title}*. ${publisher}.`;
      } else if (sourceType === 'website') {
        return `${authors} (${year}). *${title}*. Abgerufen am ${accessDate}, von ${url}`;
      } else {
        return `${authors} (${year}). ${title}. *Wissenschaftsjournal*, 12(3), 45-60.`;
      }
    } else if (style === 'DIN') {
      // DIN ISO 690
      if (sourceType === 'book') {
        return `${authors.toUpperCase()}: *${title}*. ${city}: ${publisher}, ${year}.`;
      } else if (sourceType === 'website') {
        return `${authors.toUpperCase()}: *${title}* [online]. ${year} [Zugriff am: ${accessDate}]. Verfügbar unter: ${url}`;
      } else {
        return `${authors.toUpperCase()}: ${title}. In: *Journal*, ${year}, Jg. 12, Nr. 3, S. 45-60.`;
      }
    } else {
      // MLA 9th
      if (sourceType === 'book') {
        return `${authors}. *${title}*. ${publisher}, ${year}.`;
      } else if (sourceType === 'website') {
        return `${authors}. "${title}." *Webseite*, ${year}, ${url}. Zugriff am ${accessDate}.`;
      } else {
        return `${authors}. "${title}." *Fachjournal*, vol. 12, no. 3, ${year}, pp. 45-60.`;
      }
    }
  };

  const citationResult = generateCitation();

  const handleCopy = () => {
    navigator.clipboard.writeText(citationResult.replace(/\*/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-indigo-600" />
          Quellen- & Zitat-Generator (APA, DIN ISO 690, MLA)
        </h3>
        <p className="text-xs text-neutral-500">
          Erstelle regelkonforme Literaturangaben für deine Hausarbeiten & Referate
        </p>
      </div>

      {/* Style & Source selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Zitierstil</label>
          <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            {(['APA', 'DIN', 'MLA'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  style === s ? 'bg-white dark:bg-neutral-900 text-indigo-600 shadow-xs' : 'text-neutral-500'
                }`}
              >
                {s === 'DIN' ? 'DIN ISO 690' : s === 'APA' ? 'APA 7th' : 'MLA 9th'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Quellenart</label>
          <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            {(['book', 'website', 'journal'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSourceType(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sourceType === t ? 'bg-white dark:bg-neutral-900 text-indigo-600 shadow-xs' : 'text-neutral-500'
                }`}
              >
                {t === 'book' ? 'Buch' : t === 'website' ? 'Internet' : 'Journal'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Autor(en) [Nachname, Vorname]</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Erscheinungsjahr</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Titel des Werkes / Artikels</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
          />
        </div>

        {sourceType === 'book' ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Verlag</label>
              <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Ort</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">URL / Link</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Abrufdatum</label>
              <input
                type="text"
                value={accessDate}
                onChange={(e) => setAccessDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* Generated Result Output */}
      <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            Formatierte Quellenangabe ({style}):
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 text-xs font-bold text-indigo-700 dark:text-indigo-300 rounded-xl transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Kopiert!' : 'Kopieren'}
          </button>
        </div>

        <div className="p-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-indigo-100 dark:border-indigo-900 text-sm font-serif leading-relaxed text-neutral-900 dark:text-white">
          {citationResult.split('*').map((part, index) =>
            index % 2 === 1 ? <em key={index}>{part}</em> : part
          )}
        </div>
      </div>
    </div>
  );
}
