import React, { useState } from 'react';
import { GradeEntry } from '../../types';
import { INITIAL_GRADES, getStoredData, setStoredData } from '../../utils/storage';
import { Plus, Trash2, GraduationCap, Calculator, Target, TrendingUp, Sparkles } from 'lucide-react';

export function GradeCalculator() {
  const [grades, setGrades] = useState<GradeEntry[]>(() => getStoredData('grades', INITIAL_GRADES));
  const [gradingSystem, setGradingSystem] = useState<'standard' | 'oberstufe'>('standard'); // standard (1-6) or oberstufe (0-15 Punkte)

  // Form for adding new grade
  const [subject, setSubject] = useState('Mathematik');
  const [customSubject, setCustomSubject] = useState('');
  const [name, setName] = useState('');
  const [gradeVal, setGradeVal] = useState('2.0');
  const [weight, setWeight] = useState('1.0');
  const [type, setType] = useState<GradeEntry['type']>('written');

  // Goal Calculator state
  const [targetSubject, setTargetSubject] = useState('Mathematik');
  const [desiredAverage, setDesiredAverage] = useState('2.0');
  const [nextExamWeight, setNextExamWeight] = useState('2.0');

  const saveGrades = (newGrades: GradeEntry[]) => {
    setGrades(newGrades);
    setStoredData('grades', newGrades);
  };

  const handleAddGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = subject === 'Andere' ? customSubject.trim() || 'Sonstiges' : subject;
    const numericGrade = parseFloat(gradeVal);
    const numericWeight = parseFloat(weight);

    if (isNaN(numericGrade) || isNaN(numericWeight)) return;

    const newEntry: GradeEntry = {
      id: `grade-${Date.now()}`,
      subject: finalSubject,
      name: name.trim() || `${type === 'exam' ? 'Klausur' : type === 'oral' ? 'Mündlich' : 'Test'}`,
      grade: numericGrade,
      weight: numericWeight,
      type,
      date: new Date().toISOString().split('T')[0],
    };

    saveGrades([newEntry, ...grades]);
    setName('');
  };

  const handleDeleteGrade = (id: string) => {
    saveGrades(grades.filter((g) => g.id !== id));
  };

  // Group grades by subject
  const subjectsList: string[] = Array.from(new Set(grades.map((g) => g.subject)));

  const getSubjectAverage = (subj: string) => {
    const subjGrades = grades.filter((g) => g.subject === subj);
    if (subjGrades.length === 0) return null;
    const totalWeight = subjGrades.reduce((sum, g) => sum + g.weight, 0);
    const weightedSum = subjGrades.reduce((sum, g) => sum + g.grade * g.weight, 0);
    return weightedSum / totalWeight;
  };

  // Overall GPA
  const calculateOverallAverage = () => {
    if (subjectsList.length === 0) return null;
    let sum = 0;
    let count = 0;
    subjectsList.forEach((subj) => {
      const avg = getSubjectAverage(subj);
      if (avg !== null) {
        sum += avg;
        count++;
      }
    });
    return count > 0 ? sum / count : null;
  };

  const overallAvg = calculateOverallAverage();

  // Target Grade Calculation
  const calculateRequiredGrade = () => {
    const subjGrades = grades.filter((g) => g.subject === targetSubject);
    const target = parseFloat(desiredAverage);
    const wNext = parseFloat(nextExamWeight);
    if (isNaN(target) || isNaN(wNext) || subjGrades.length === 0) return null;

    const currentTotalWeight = subjGrades.reduce((sum, g) => sum + g.weight, 0);
    const currentWeightedSum = subjGrades.reduce((sum, g) => sum + g.grade * g.weight, 0);

    // Target = (currentWeightedSum + requiredGrade * wNext) / (currentTotalWeight + wNext)
    // Target * (currentTotalWeight + wNext) = currentWeightedSum + requiredGrade * wNext
    // requiredGrade = (Target * (currentTotalWeight + wNext) - currentWeightedSum) / wNext
    const req = (target * (currentTotalWeight + wNext) - currentWeightedSum) / wNext;
    return req;
  };

  const requiredGrade = calculateRequiredGrade();

  return (
    <div className="space-y-6">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-linear-to-br from-violet-500 to-indigo-600 rounded-3xl text-white shadow-md flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-violet-200">Gesamtdurchschnitt</div>
            <div className="text-3xl font-black mt-1">
              {overallAvg !== null ? overallAvg.toFixed(2) : '—'}
            </div>
            <div className="text-xs text-violet-200 mt-1">
              {gradingSystem === 'standard' ? 'Notenschnitt (1.0 - 6.0)' : 'Durchschnittliche Punkte (0-15)'}
            </div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
            <GraduationCap className="w-8 h-8" />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex items-center justify-between shadow-xs">
          <div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Erfasste Fächer</div>
            <div className="text-3xl font-black text-neutral-900 dark:text-white mt-1">{subjectsList.length}</div>
            <div className="text-xs text-neutral-400 mt-1">{grades.length} Einzelnoten</div>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 text-violet-600 rounded-2xl">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        {/* System toggle */}
        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl flex flex-col justify-between shadow-xs">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Notensystem</div>
          <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl mt-2">
            <button
              onClick={() => setGradingSystem('standard')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                gradingSystem === 'standard'
                  ? 'bg-white dark:bg-neutral-900 text-violet-600 shadow-xs'
                  : 'text-neutral-500'
              }`}
            >
              1 - 6 (Schule)
            </button>
            <button
              onClick={() => setGradingSystem('oberstufe')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                gradingSystem === 'oberstufe'
                  ? 'bg-white dark:bg-neutral-900 text-violet-600 shadow-xs'
                  : 'text-neutral-500'
              }`}
            >
              0 - 15 Pkt (Gymnasium)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Add Grade Form + Grades List & Target Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Grade Form */}
        <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-violet-600" /> Neue Note eintragen
          </h3>

          <form onSubmit={handleAddGrade} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Fach</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium"
              >
                {['Mathematik', 'Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Latein', 'Physik', 'Chemie', 'Biologie', 'Geschichte', 'Geografie', 'Informatik', 'Kunst', 'Musik', 'Sport', 'Religion / Ethik', 'Andere'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {subject === 'Andere' && (
              <div>
                <input
                  type="text"
                  placeholder="Fachname eingeben"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Bezeichnung (optional)</label>
              <input
                type="text"
                placeholder="z.B. 1. Schulaufgabe / Vokabeltest"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">
                  {gradingSystem === 'standard' ? 'Note (1.0 - 6.0)' : 'Punkte (0 - 15)'}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={gradingSystem === 'standard' ? 1 : 0}
                  max={gradingSystem === 'standard' ? 6 : 15}
                  value={gradeVal}
                  onChange={(e) => setGradeVal(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Gewichtung</label>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                >
                  <option value="1.0">1x (Einfach / Mündlich)</option>
                  <option value="2.0">2x (Doppelt / Schulaufgabe)</option>
                  <option value="0.5">0.5x (Halb / Stegreifaufgabe)</option>
                  <option value="3.0">3x (Dreifach / Abschlussprüfung)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Kategorie</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['written', 'oral', 'exam'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      type === t
                        ? 'bg-violet-50 dark:bg-violet-950/60 border-violet-500 text-violet-700 dark:text-violet-300 font-bold'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500'
                    }`}
                  >
                    {t === 'written' ? 'Schriftlich' : t === 'oral' ? 'Mündlich' : 'Klausur'}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-xs transition-all mt-2"
            >
              Note hinzufügen
            </button>
          </form>
        </div>

        {/* Subjects Breakdown & Target Goal Calculator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Subjects Cards */}
          <div className="space-y-3">
            <h3 className="font-bold text-neutral-900 dark:text-white">Fächer & Durchschnitte</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjectsList.map((subj) => {
                const avg = getSubjectAverage(subj);
                const subjGrades = grades.filter((g) => g.subject === subj);

                return (
                  <div
                    key={subj}
                    className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-white">{subj}</span>
                      <span className={`text-base font-black px-2.5 py-0.5 rounded-lg ${
                        avg !== null && (gradingSystem === 'standard' ? avg <= 2.5 : avg >= 10)
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        Ø {avg?.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {subjGrades.map((g) => (
                        <span
                          key={g.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-md"
                        >
                          <span className="font-bold">{g.grade}</span>
                          <span className="text-[10px] text-neutral-400">({g.weight}x)</span>
                          <button
                            onClick={() => handleDeleteGrade(g.id)}
                            className="hover:text-red-500 ml-0.5"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {subjectsList.length === 0 && (
                <div className="col-span-full py-8 text-center text-neutral-400 text-sm">
                  Noch keine Noten eingetragen. Trage links deine erste Note ein!
                </div>
              )}
            </div>
          </div>

          {/* Goal / Target Grade Calculator */}
          <div className="p-5 bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-950/40 border border-violet-200 dark:border-violet-800 rounded-3xl space-y-3">
            <h4 className="font-bold text-violet-900 dark:text-violet-200 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-600" />
              Zielnoten-Rechner („Was brauche ich noch für eine 2?“):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Fach</label>
                <select
                  value={targetSubject}
                  onChange={(e) => setTargetSubject(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-neutral-900 border border-violet-200 dark:border-violet-700 rounded-xl text-sm"
                >
                  {subjectsList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  {subjectsList.length === 0 && <option value="Mathematik">Mathematik</option>}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Wunsch-Schnitt</label>
                <input
                  type="number"
                  step="0.1"
                  value={desiredAverage}
                  onChange={(e) => setDesiredAverage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-neutral-900 border border-violet-200 dark:border-violet-700 rounded-xl text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Gewicht nächster Test</label>
                <select
                  value={nextExamWeight}
                  onChange={(e) => setNextExamWeight(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-neutral-900 border border-violet-200 dark:border-violet-700 rounded-xl text-sm"
                >
                  <option value="1.0">1x (Einfache Ex)</option>
                  <option value="2.0">2x (Schulaufgabe)</option>
                  <option value="3.0">3x (Abschluss)</option>
                </select>
              </div>
            </div>

            {requiredGrade !== null && (
              <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-violet-200 dark:border-violet-800 text-sm flex items-center justify-between">
                <span>Erforderliche Note in der nächsten Arbeit:</span>
                <span className={`text-lg font-black ${
                  (gradingSystem === 'standard' && requiredGrade > 6) || (gradingSystem === 'oberstufe' && requiredGrade < 0)
                    ? 'text-rose-500'
                    : 'text-violet-600 dark:text-violet-400'
                }`}>
                  {requiredGrade <= 0 && gradingSystem === 'standard' ? 'Bereits geschafft! 🎉' : requiredGrade.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
