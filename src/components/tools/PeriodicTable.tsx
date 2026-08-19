import React, { useState } from 'react';
import { ELEMENTS_DATA, CATEGORY_COLORS } from '../../data/periodicTableData';
import { ChemicalElement } from '../../types';
import { Atom, Search, Calculator, Sparkles } from 'lucide-react';

export function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement>(ELEMENTS_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Molar mass formula calculator state
  const [formulaInput, setFormulaInput] = useState('C6H12O6');

  const filteredElements = ELEMENTS_DATA.filter((el) => {
    const matchQuery =
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.germanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.number.toString() === searchQuery;

    const matchCategory = selectedCategory === 'all' || el.category === selectedCategory;
    return matchQuery && matchCategory;
  });

  // Calculate Molar Mass for chemical formulas (e.g., H2O, C6H12O6, H2SO4, NaCl)
  const calculateMolarMass = (formula: string) => {
    try {
      // Regex parsing: find Element (Capital + optional lowercase) followed by optional number
      const regex = /([A-Z][a-z]*)(\d*)/g;
      let match;
      let totalMass = 0;
      const breakdown: { symbol: string; count: number; mass: number; subtotal: number }[] = [];

      while ((match = regex.exec(formula)) !== null) {
        const symbol = match[1];
        const count = match[2] ? parseInt(match[2], 10) : 1;
        const el = ELEMENTS_DATA.find((e) => e.symbol === symbol);

        if (el) {
          const subtotal = el.atomicMass * count;
          totalMass += subtotal;
          breakdown.push({ symbol, count, mass: el.atomicMass, subtotal });
        } else {
          return { error: `Element '${symbol}' nicht in der Datenbank gefunden` };
        }
      }

      if (breakdown.length === 0) return { error: 'Ungültige Formel' };

      return {
        totalMass: totalMass.toFixed(3),
        breakdown,
      };
    } catch (e) {
      return { error: 'Fehler beim Berechnen' };
    }
  };

  const molarResult = calculateMolarMass(formulaInput.trim());

  return (
    <div className="space-y-6">
      {/* Top Filter and Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Element suchen (z.B. Gold, Fe, 26)..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold"
        >
          <option value="all">Alle Element-Gruppen</option>
          <option value="nonmetal">Nichtmetalle</option>
          <option value="noble-gas">Edelgase</option>
          <option value="alkali-metal">Alkalimetalle</option>
          <option value="alkaline-earth">Erdalkalimetalle</option>
          <option value="halogen">Halogene</option>
          <option value="transition-metal">Übergangsmetalle</option>
          <option value="metalloid">Halbmetalle</option>
        </select>
      </div>

      {/* Main Grid: Element Cards + Inspector Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Elements Grid List (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-neutral-500">
              Elemente ({filteredElements.length})
            </h3>
            <span className="text-[11px] text-neutral-400">Klicke ein Element für Details</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredElements.map((el) => {
              const cat = CATEGORY_COLORS[el.category] || CATEGORY_COLORS.nonmetal;
              const isSelected = selectedElement.number === el.number;

              return (
                <div
                  key={el.number}
                  onClick={() => setSelectedElement(el)}
                  className={`p-2.5 rounded-2xl border text-center cursor-pointer transition-all ${
                    cat.bg
                  } ${cat.border} ${isSelected ? 'ring-2 ring-indigo-500 scale-105 shadow-md' : 'hover:scale-102'}`}
                >
                  <div className="text-[10px] text-neutral-500 font-mono flex justify-between">
                    <span>{el.number}</span>
                    <span>{el.period}</span>
                  </div>
                  <div className="text-xl font-black text-neutral-900 dark:text-white my-0.5">{el.symbol}</div>
                  <div className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 truncate">{el.germanName}</div>
                  <div className="text-[9px] text-neutral-400 font-mono mt-0.5">{el.atomicMass.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Element Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {CATEGORY_COLORS[selectedElement.category]?.label || selectedElement.category}
                </span>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                  {selectedElement.germanName} ({selectedElement.name})
                </h3>
              </div>

              <div className="w-14 h-14 bg-white dark:bg-neutral-900 border border-indigo-300 dark:border-indigo-700 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                <span className="text-[10px] text-neutral-400 font-mono">{selectedElement.number}</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{selectedElement.symbol}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed">
              {selectedElement.summary}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-indigo-200/60 dark:border-indigo-800/60 text-xs">
              <div className="p-2 bg-white dark:bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block">Relative Atommasse</span>
                <span className="font-bold font-mono">{selectedElement.atomicMass} u</span>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block">Aggregatzustand (RT)</span>
                <span className="font-bold">{selectedElement.phase}</span>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block">Elektronenkonfig.</span>
                <span className="font-bold font-mono text-[11px]">{selectedElement.electronConfig}</span>
              </div>
              <div className="p-2 bg-white dark:bg-neutral-900 rounded-xl">
                <span className="text-neutral-400 block">Periode & Gruppe</span>
                <span className="font-bold">Periode {selectedElement.period}, Gr. {selectedElement.group}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Molar Mass Calculator for Molecules */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h4 className="font-bold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
          <Calculator className="w-4 h-4 text-indigo-600" />
          Molarer Massen-Rechner für Moleküle & chemische Formeln
        </h4>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              placeholder="z.B. H2O, C6H12O6, H2SO4, NaCl"
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono font-bold text-base"
            />
          </div>

          <div className="flex gap-1.5">
            {['H2O', 'CO2', 'C6H12O6 (Glukose)', 'H2SO4', 'NaCl'].map((f) => (
              <button
                key={f}
                onClick={() => setFormulaInput(f.split(' ')[0])}
                className="px-2.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-neutral-600 dark:text-neutral-300 rounded-lg text-xs font-mono border border-neutral-200 dark:border-neutral-700"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Result Breakdown */}
        {'error' in molarResult ? (
          <div className="text-xs text-rose-500 font-semibold">{molarResult.error}</div>
        ) : (
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-neutral-500 font-semibold">Molmasse (M)</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {molarResult.totalMass} <span className="text-sm font-normal">g/mol</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {molarResult.breakdown?.map((b) => (
                <div key={b.symbol} className="p-2 bg-white dark:bg-neutral-900 rounded-xl border border-indigo-100 dark:border-indigo-900">
                  <span className="font-bold">{b.count}× {b.symbol}</span> = {b.subtotal.toFixed(2)} g/mol
                  <span className="text-neutral-400 text-[10px] block">
                    ({((b.subtotal / parseFloat(molarResult.totalMass || '1')) * 100).toFixed(1)}% Masse)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
