import React, { useState } from 'react';
import { ENGLISH_IRREGULAR_VERBS, FOREIGN_CONJUGATIONS } from '../../data/verbsData';
import { Languages, Search, BookOpen } from 'lucide-react';

export function VerbConjugator() {
  const [langTab, setLangTab] = useState<'english' | 'french' | 'spanish' | 'latin'>('english');
  const [search, setSearch] = useState('');

  const filteredEnglish = ENGLISH_IRREGULAR_VERBS.filter(
    (v) =>
      v.infinitive.toLowerCase().includes(search.toLowerCase()) ||
      v.translation.toLowerCase().includes(search.toLowerCase()) ||
      v.pastSimple.toLowerCase().includes(search.toLowerCase()) ||
      v.pastParticiple.toLowerCase().includes(search.toLowerCase())
  );

  const currentForeign = FOREIGN_CONJUGATIONS.filter((c) => {
    if (langTab === 'french') return c.language === 'Französisch';
    if (langTab === 'spanish') return c.language === 'Spanisch';
    if (langTab === 'latin') return c.language === 'Latein';
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Language Switcher Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-xl mx-auto">
        <button
          onClick={() => { setLangTab('english'); setSearch(''); }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            langTab === 'english' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          🇬🇧 Englisch (Irregular Verbs)
        </button>
        <button
          onClick={() => { setLangTab('french'); setSearch(''); }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            langTab === 'french' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          🇫🇷 Französisch
        </button>
        <button
          onClick={() => { setLangTab('spanish'); setSearch(''); }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            langTab === 'spanish' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          🇪🇸 Spanisch
        </button>
        <button
          onClick={() => { setLangTab('latin'); setSearch(''); }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            langTab === 'latin' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          🏛️ Latein
        </button>
      </div>

      {langTab === 'english' ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Unregelmäßige englische Verben</h3>
              <p className="text-xs text-neutral-500">Infinitive, Past Simple, Past Participle & Übersetzung</p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Verb suchen (z.B. break, sehen)..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800 font-bold uppercase tracking-wider text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
                <tr>
                  <th className="p-3">Infinitive</th>
                  <th className="p-3">Past Simple</th>
                  <th className="p-3">Past Participle</th>
                  <th className="p-3">Deutsch</th>
                  <th className="p-3">Beispielsatz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {filteredEnglish.map((v) => (
                  <tr key={v.infinitive} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="p-3 font-bold text-blue-600 dark:text-blue-400">{v.infinitive}</td>
                    <td className="p-3 font-semibold text-neutral-800 dark:text-neutral-200">{v.pastSimple}</td>
                    <td className="p-3 font-semibold text-neutral-800 dark:text-neutral-200">{v.pastParticiple}</td>
                    <td className="p-3 text-neutral-600 dark:text-neutral-300">{v.translation}</td>
                    <td className="p-3 italic text-neutral-400 font-serif">{v.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentForeign.map((table) => (
            <div
              key={table.verb}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif">{table.verb}</h3>
                  <span className="text-xs text-neutral-500">{table.translation}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {table.language}
                </span>
              </div>

              <div className="space-y-4">
                {table.tenses.map((tense) => (
                  <div key={tense.name} className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">{tense.name}</span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs">
                      {tense.forms.map((form, i) => (
                        <div key={i} className="p-2 bg-neutral-50 dark:bg-neutral-800 rounded-xl font-medium">
                          {form}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
