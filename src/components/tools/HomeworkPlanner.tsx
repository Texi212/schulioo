import React, { useState } from 'react';
import { HomeworkItem } from '../../types';
import { INITIAL_HOMEWORK, getStoredData, setStoredData } from '../../utils/storage';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Calendar, Clock, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

export function HomeworkPlanner() {
  const [items, setItems] = useState<HomeworkItem[]>(() => getStoredData('homework', INITIAL_HOMEWORK));
  const [filterType, setFilterType] = useState<'all' | 'homework' | 'exam' | 'presentation'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'completed'>('open');

  // Form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematik');
  const [dueDate, setDueDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [priority, setPriority] = useState<HomeworkItem['priority']>('medium');
  const [type, setType] = useState<HomeworkItem['type']>('homework');

  const saveItems = (newItems: HomeworkItem[]) => {
    setItems(newItems);
    setStoredData('homework', newItems);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: HomeworkItem = {
      id: `hw-${Date.now()}`,
      title: title.trim(),
      subject,
      dueDate,
      priority,
      completed: false,
      type,
    };

    saveItems([newItem, ...items]);
    setTitle('');
    setShowAddModal(false);
  };

  const toggleComplete = (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextState = !item.completed;
        if (nextState) confetti({ particleCount: 35, spread: 50 });
        return { ...item, completed: nextState };
      }
      return item;
    });
    saveItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    saveItems(items.filter((i) => i.id !== id));
  };

  const calculateDaysLeft = (dueDateStr: string) => {
    const due = new Date(dueDateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredItems = items.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterStatus === 'open' && item.completed) return false;
    if (filterStatus === 'completed' && !item.completed) return false;
    return true;
  });

  // Upcoming Exams
  const upcomingExams = items.filter((i) => !i.completed && (i.type === 'exam' || i.type === 'presentation')).sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="space-y-6">
      {/* Upcoming Exams Countdown Barometer */}
      {upcomingExams.length > 0 && (
        <div className="p-4 bg-linear-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 border border-rose-200 dark:border-rose-900/50 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" /> Nächste Klausuren & Präsentationen
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {upcomingExams.map((exam) => {
              const days = calculateDaysLeft(exam.dueDate);
              return (
                <div key={exam.id} className="p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-rose-100 dark:border-rose-900/30 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{exam.subject}</span>
                    <div className="text-sm font-semibold text-neutral-900 dark:text-white truncate max-w-[160px]">{exam.title}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                      days <= 2 ? 'bg-red-500 text-white animate-pulse' : days <= 7 ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {days < 0 ? 'Überfällig' : days === 0 ? 'Heute!' : days === 1 ? 'Morgen' : `In ${days} Tagen`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action and Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Type filters */}
        <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all' ? 'bg-white dark:bg-neutral-900 text-rose-600 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Alle ({items.length})
          </button>
          <button
            onClick={() => setFilterType('homework')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'homework' ? 'bg-white dark:bg-neutral-900 text-rose-600 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Hausaufgaben
          </button>
          <button
            onClick={() => setFilterType('exam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'exam' ? 'bg-white dark:bg-neutral-900 text-rose-600 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Klausuren
          </button>
        </div>

        {/* Status filters & Add button */}
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium"
          >
            <option value="open">Nur Offene</option>
            <option value="completed">Nur Erledigte</option>
            <option value="all">Alle anzeigen</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Neue Aufgabe
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredItems.map((item) => {
          const daysLeft = calculateDaysLeft(item.dueDate);

          return (
            <div
              key={item.id}
              className={`p-4 bg-white dark:bg-neutral-900 border rounded-2xl flex items-center justify-between gap-4 transition-all group ${
                item.completed
                  ? 'border-neutral-200 dark:border-neutral-800 opacity-60'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-rose-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`shrink-0 transition-transform active:scale-90 ${
                    item.completed ? 'text-emerald-500' : 'text-neutral-300 hover:text-neutral-500'
                  }`}
                >
                  {item.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {item.subject}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      item.priority === 'high' ? 'bg-red-100 text-red-700' : item.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.priority === 'high' ? 'Wichtig' : item.priority === 'medium' ? 'Mittel' : 'Normal'}
                    </span>
                    <span className="text-[11px] text-neutral-400 capitalize">
                      {item.type === 'homework' ? 'Hausaufgabe' : item.type === 'exam' ? 'Klausur' : 'Referat'}
                    </span>
                  </div>
                  <p className={`font-semibold text-neutral-900 dark:text-white truncate ${item.completed ? 'line-through text-neutral-400' : ''}`}>
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Due date badge and delete */}
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                  item.completed
                    ? 'bg-neutral-100 text-neutral-400'
                    : daysLeft < 0
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : daysLeft === 0
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
                }`}>
                  <Calendar className="w-3.5 h-3.5" />
                  {item.dueDate}
                </span>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-neutral-400 text-sm">
            Keine Aufgaben in dieser Ansicht gefunden!
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Neue Aufgabe eintragen</h3>

            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Aufgabe / Beschreibung</label>
                <input
                  required
                  type="text"
                  placeholder="z.B. S. 89 Nr. 3 a, b und Vokabeln lernen"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Fach</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  >
                    {['Mathematik', 'Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Latein', 'Physik', 'Chemie', 'Biologie', 'Geschichte', 'Geografie', 'Informatik', 'Sonstiges'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Art</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  >
                    <option value="homework">Hausaufgabe</option>
                    <option value="exam">Klausur / Schulaufgabe</option>
                    <option value="presentation">Referat</option>
                    <option value="project">Projekt</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Fälligkeitsdatum</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Priorität</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  >
                    <option value="low">Niedrig (Zeit lassen)</option>
                    <option value="medium">Mittel (Wichtig)</option>
                    <option value="high">Hoch (Dringend!)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
