import React, { useState } from 'react';
import { Dna, Sparkles, BookOpen, Layers } from 'lucide-react';

export function GeneticsCalculator() {
  const [parent1Allele1, setParent1Allele1] = useState('A');
  const [parent1Allele2, setParent1Allele2] = useState('a');
  const [parent2Allele1, setParent2Allele1] = useState('A');
  const [parent2Allele2, setParent2Allele2] = useState('a');

  // Trait name
  const [dominantTrait, setDominantTrait] = useState('Braune Augen (A)');
  const [recessiveTrait, setRecessiveTrait] = useState('Blaue Augen (a)');

  // Punnett square 2x2 grid
  const cell1 = parent1Allele1 + parent2Allele1;
  const cell2 = parent1Allele2 + parent2Allele1;
  const cell3 = parent1Allele1 + parent2Allele2;
  const cell4 = parent1Allele2 + parent2Allele2;

  // Normalize (e.g., 'aA' -> 'Aa')
  const normalize = (pair: string) => {
    const chars = pair.split('');
    if (chars[0] === chars[0].toLowerCase() && chars[1] === chars[1].toUpperCase()) {
      return chars[1] + chars[0];
    }
    return pair;
  };

  const c1 = normalize(cell1);
  const c2 = normalize(cell2);
  const c3 = normalize(cell3);
  const c4 = normalize(cell4);

  const combinations = [c1, c2, c3, c4];

  // Genotype counts
  const counts: Record<string, number> = {};
  combinations.forEach((c) => {
    counts[c] = (counts[c] || 0) + 1;
  });

  // Phenotype counts (dominant if contains at least one uppercase letter)
  let dominantCount = 0;
  let recessiveCount = 0;
  combinations.forEach((c) => {
    if (c.includes('A')) {
      dominantCount++;
    } else {
      recessiveCount++;
    }
  });

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Dna className="w-5 h-5 text-emerald-600" />
            Genetik: Punnett-Quadrat & Kreuzungs-Rechner
          </h3>
          <p className="text-xs text-neutral-500">
            Berechnet das Genotyp- und Phänotyp-Verhältnis nach den Mendelschen Regeln
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
              Elternteil 1 (Genotyp)
            </h4>
            <div className="flex gap-3">
              <select
                value={parent1Allele1}
                onChange={(e) => setParent1Allele1(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold font-mono text-center text-lg"
              >
                <option value="A">A (Dominant)</option>
                <option value="a">a (Rezessiv)</option>
              </select>
              <select
                value={parent1Allele2}
                onChange={(e) => setParent1Allele2(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold font-mono text-center text-lg"
              >
                <option value="A">A (Dominant)</option>
                <option value="a">a (Rezessiv)</option>
              </select>
            </div>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              Genotyp: <span className="font-bold font-mono">{parent1Allele1}{parent1Allele2}</span> ({parent1Allele1 === parent1Allele2 ? 'Homozygot / Reinerbig' : 'Heterozygot / Mischerbig'})
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs uppercase tracking-wider">
              Elternteil 2 (Genotyp)
            </h4>
            <div className="flex gap-3">
              <select
                value={parent2Allele1}
                onChange={(e) => setParent2Allele1(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold font-mono text-center text-lg"
              >
                <option value="A">A (Dominant)</option>
                <option value="a">a (Rezessiv)</option>
              </select>
              <select
                value={parent2Allele2}
                onChange={(e) => setParent2Allele2(e.target.value)}
                className="flex-1 px-3 py-2 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-700 rounded-xl font-bold font-mono text-center text-lg"
              >
                <option value="A">A (Dominant)</option>
                <option value="a">a (Rezessiv)</option>
              </select>
            </div>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              Genotyp: <span className="font-bold font-mono">{parent2Allele1}{parent2Allele2}</span> ({parent2Allele1 === parent2Allele2 ? 'Homozygot / Reinerbig' : 'Heterozygot / Mischerbig'})
            </div>
          </div>
        </div>

        {/* Punnett Visual Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* Punnett Table */}
          <div className="bg-neutral-100 dark:bg-neutral-800/80 p-5 rounded-3xl max-w-xs mx-auto border border-neutral-200 dark:border-neutral-700">
            <div className="grid grid-cols-3 gap-2 text-center font-bold font-mono text-sm">
              <div className="p-2 text-xs text-neutral-400 font-sans flex items-center justify-center">E1 \ E2</div>
              <div className="p-2 bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-xl">{parent2Allele1}</div>
              <div className="p-2 bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-xl">{parent2Allele2}</div>

              <div className="p-2 bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-xl flex items-center justify-center">{parent1Allele1}</div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-base shadow-xs">{c1}</div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-base shadow-xs">{c3}</div>

              <div className="p-2 bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-xl flex items-center justify-center">{parent1Allele2}</div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-base shadow-xs">{c2}</div>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-base shadow-xs">{c4}</div>
            </div>
          </div>

          {/* Ratios & Probabilities */}
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Phänotyp-Wahrscheinlichkeit (Ausprägung)
              </span>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Dominantes Merkmal:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {(dominantCount / 4) * 100}% ({dominantCount}/4)
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">Rezessives Merkmal:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                  {(recessiveCount / 4) * 100}% ({recessiveCount}/4)
                </span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1 text-xs">
              <span className="font-bold text-neutral-500 uppercase">Genotyp-Verhältnis:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {Object.entries(counts).map(([genotype, count]) => (
                  <span key={genotype} className="px-2.5 py-1 bg-white dark:bg-neutral-900 rounded-lg border font-mono font-bold">
                    {genotype}: {(count / 4) * 100}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mendel Laws Cheat Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1">
          <span className="text-xs font-bold text-emerald-600">1. Uniformitätsregel</span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Kreuzt man zwei reinerbige (homozygote) Individuen, sind die Nachkommen der F1-Generation im Phänotyp alle gleich (uniform).
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1">
          <span className="text-xs font-bold text-emerald-600">2. Spaltungsregel</span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Kreuzt man die F1-Generation untereinander, spaltet sich die F2-Generation bei dominant-rezessivem Erbgang im Verhältnis 3:1 auf.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1">
          <span className="text-xs font-bold text-emerald-600">3. Unabhängigkeitsregel</span>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Gene werden bei Kreuzung frei und unabhängig voneinander vererbt (Verhältnis 9:3:3:1 bei dihybriden Erbgängen).
          </p>
        </div>
      </div>
    </div>
  );
}
