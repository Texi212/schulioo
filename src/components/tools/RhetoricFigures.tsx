import React, { useState } from 'react';
import { RHETORIC_DEVICES } from '../../data/verbsData';
import { RhetoricFigure } from '../../types';
import { Search, Sparkles, BookOpen, Quote } from 'lucide-react';

export function RhetoricFigures() {
  const [search, setSearch] = useState('');
  const [selectedFigure, setSelectedFigure] = useState<RhetoricFigure>(RHETORIC_DEVICES[0]);

  const filtered = RHETORIC_DEVICES.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.definition.toLowerCase().includes(search.toLowerCase()) ||
      r.example.toLowerCase().includes(search.toLowerCase()) ||
      r.effect.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Stilmittel suchen (z.B. Alliteration, Metapher)..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Main Grid: Card list + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Figure list (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs max-h-[460px] overflow-y-auto space-y-2.5">
          <h3 className="text-xs font-bold uppercase text-neutral-500 mb-2">
            Stilmittel-Katalog ({filtered.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filtered.map((item) => {
              const isSelected = selectedFigure.name === item.name;
              return (
                <div
                  key={item.name}
                  onClick={() => setSelectedFigure(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 ring-2 ring-rose-400'
                      : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white">{item.name}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{item.definition}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-rose-200 dark:border-rose-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Detail-Analyse
            </span>
            <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
              {selectedFigure.name}
            </h3>

            <div className="space-y-4 mt-4">
              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">Definition:</span>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-1 leading-relaxed">
                  {selectedFigure.definition}
                </p>
              </div>

              <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-rose-200 dark:border-rose-900 shadow-xs space-y-1">
                <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1">
                  <Quote className="w-3 h-3" /> Typisches Textbeispiel:
                </span>
                <p className="text-xs italic font-serif text-neutral-800 dark:text-neutral-200">
                  „{selectedFigure.example}“
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase">Wirkung / Funktion im Text:</span>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                  {selectedFigure.effect}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/70 dark:bg-neutral-900/70 rounded-xl text-[11px] text-neutral-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Tipp: Perfekt für Gedichts- &amp; Sachtextanalysen im Deutschunterricht.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
