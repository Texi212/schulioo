import React, { useState } from 'react';
import { HISTORY_EVENTS } from '../../data/historyTimelineData';
import { HistoryEvent } from '../../types';
import { History, Search, Calendar, Landmark } from 'lucide-react';

export function HistoryTimeline() {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<HistoryEvent>(HISTORY_EVENTS[0]);

  const filteredEvents = HISTORY_EVENTS.filter((e) => {
    const matchEra = selectedEra === 'all' || e.era === selectedEra;
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.displayYear.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchEra && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header and filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ereignis oder Jahr suchen (z.B. 1789, Mauerfall)..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
          />
        </div>

        <select
          value={selectedEra}
          onChange={(e) => setSelectedEra(e.target.value)}
          className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold"
        >
          <option value="all">Alle Epochen</option>
          <option value="Antike">Antike (bis 500 n. Chr.)</option>
          <option value="Mittelalter">Mittelalter (500 - 1500)</option>
          <option value="Frühe Neuzeit">Frühe Neuzeit (1500 - 1789)</option>
          <option value="19. Jahrhundert">19. Jahrhundert (1789 - 1914)</option>
          <option value="20. Jahrhundert">20. Jahrhundert (1914 - 1990)</option>
          <option value="Zeitgeschichte">Zeitgeschichte (ab 1990)</option>
        </select>
      </div>

      {/* Main Grid: Vertical Timeline + Event Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timeline list (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs max-h-[480px] overflow-y-auto space-y-3">
          <h3 className="text-xs font-bold uppercase text-neutral-500 mb-2">
            Chronologie ({filteredEvents.length} Meilensteine)
          </h3>

          <div className="relative pl-6 border-l-2 border-amber-200 dark:border-amber-900 space-y-4">
            {filteredEvents.map((evt) => {
              const isSelected = selectedEvent.id === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`relative p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 ring-2 ring-amber-400'
                      : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[31px] top-4 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-neutral-900 ${
                      isSelected ? 'bg-amber-500 scale-125' : 'bg-neutral-400'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                      {evt.year}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">{evt.era}</span>
                  </div>

                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-1.5">{evt.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                    {evt.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Details (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Landmark className="w-4 h-4" /> {selectedEvent.era}
            </div>

            <div className="text-3xl font-black font-mono text-amber-800 dark:text-amber-200 mt-2">
              {selectedEvent.year}
            </div>

            <h3 className="text-xl font-black text-neutral-900 dark:text-white mt-1 font-serif">
              {selectedEvent.title}
            </h3>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-4 leading-relaxed">
              {selectedEvent.description}
            </p>

            <div className="mt-5 p-4 bg-white/80 dark:bg-neutral-900/80 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block">Historische Bedeutung & Auswirkung:</span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {selectedEvent.significance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
