import React, { useState } from 'react';
import { TimetableSlot } from '../../types';
import { INITIAL_TIMETABLE, getStoredData, setStoredData } from '../../utils/storage';
import { Plus, Trash2, Edit2, Clock, MapPin, User, Printer } from 'lucide-react';

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
const PERIODS = [
  { num: 1, start: '08:00', end: '08:45' },
  { num: 2, start: '08:50', end: '09:35' },
  { num: 3, start: '09:55', end: '10:40' },
  { num: 4, start: '10:45', end: '11:30' },
  { num: 5, start: '11:45', end: '12:30' },
  { num: 6, start: '12:35', end: '13:20' },
  { num: 7, start: '13:30', end: '14:15' },
  { num: 8, start: '14:20', end: '15:05' },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/60', border: 'border-blue-300 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/60', border: 'border-emerald-300 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/60', border: 'border-purple-300 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/60', border: 'border-amber-300 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/60', border: 'border-rose-300 dark:border-rose-800', text: 'text-rose-700 dark:text-rose-300' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-950/60', border: 'border-teal-300 dark:border-teal-800', text: 'text-teal-700 dark:text-teal-300' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/60', border: 'border-indigo-300 dark:border-indigo-800', text: 'text-indigo-700 dark:text-indigo-300' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/60', border: 'border-orange-300 dark:border-orange-800', text: 'text-orange-700 dark:text-orange-300' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-950/60', border: 'border-pink-300 dark:border-pink-800', text: 'text-pink-700 dark:text-pink-300' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/60', border: 'border-cyan-300 dark:border-cyan-800', text: 'text-cyan-700 dark:text-cyan-300' },
};

export function Timetable() {
  const [slots, setSlots] = useState<TimetableSlot[]>(() => getStoredData('timetable', INITIAL_TIMETABLE));
  const [selectedSlot, setSelectedSlot] = useState<TimetableSlot | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [day, setDay] = useState(1);
  const [period, setPeriod] = useState(1);
  const [subject, setSubject] = useState('Mathematik');
  const [room, setRoom] = useState('R204');
  const [teacher, setTeacher] = useState('Fr. Weber');
  const [color, setColor] = useState('blue');
  const [notes, setNotes] = useState('');

  const saveSlots = (newSlots: TimetableSlot[]) => {
    setSlots(newSlots);
    setStoredData('timetable', newSlots);
  };

  const openSlotEditor = (d: number, p: number) => {
    const existing = slots.find((s) => s.day === d && s.period === p);
    if (existing) {
      setSelectedSlot(existing);
      setDay(existing.day);
      setPeriod(existing.period);
      setSubject(existing.subject);
      setRoom(existing.room);
      setTeacher(existing.teacher);
      setColor(existing.color);
      setNotes(existing.notes || '');
    } else {
      setSelectedSlot(null);
      setDay(d);
      setPeriod(p);
      setSubject('');
      setRoom('');
      setTeacher('');
      setColor('blue');
      setNotes('');
    }
    setIsModalOpen(true);
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const periodData = PERIODS.find((p) => p.num === period) || PERIODS[0];
    const newSlot: TimetableSlot = {
      id: selectedSlot?.id || `slot-${day}-${period}-${Date.now()}`,
      day,
      period,
      startTime: periodData.start,
      endTime: periodData.end,
      subject: subject.trim(),
      room: room.trim(),
      teacher: teacher.trim(),
      color,
      notes: notes.trim(),
    };

    const filtered = slots.filter((s) => !(s.day === day && s.period === period));
    saveSlots([...filtered, newSlot]);
    setIsModalOpen(false);
  };

  const handleDeleteSlot = () => {
    if (selectedSlot) {
      saveSlots(slots.filter((s) => s.id !== selectedSlot.id));
      setIsModalOpen(false);
    }
  };

  // Check current active day and period based on local time
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 1 = Monday, 5 = Friday
  const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const isCurrentSlot = (d: number, p: number) => {
    if (d !== currentDayOfWeek) return false;
    const pData = PERIODS.find((item) => item.num === p);
    if (!pData) return false;
    return currentTimeStr >= pData.start && currentTimeStr <= pData.end;
  };

  return (
    <div className="space-y-6">
      {/* Timetable Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Stundenplan & Raumübersicht</h2>
          <p className="text-xs text-neutral-500">Klicke auf ein Feld zum Bearbeiten oder Hinzufügen</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-xl transition-all"
        >
          <Printer className="w-4 h-4" /> Drucken / PDF
        </button>
      </div>

      {/* Main Timetable Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xs">
          {/* Header Days */}
          <div className="grid grid-cols-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-center font-bold text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
            <div className="p-3 border-r border-neutral-200 dark:border-neutral-800">Zeit / Std.</div>
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={`p-3 border-r last:border-r-0 border-neutral-200 dark:border-neutral-800 ${
                  currentDayOfWeek === i + 1 ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-extrabold' : ''
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Body Periods */}
          {PERIODS.map((p) => (
            <div key={p.num} className="grid grid-cols-6 border-b last:border-b-0 border-neutral-200 dark:border-neutral-800">
              {/* Period indicator */}
              <div className="p-3 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-center items-center bg-neutral-50/50 dark:bg-neutral-800/20 text-center">
                <span className="text-sm font-black text-neutral-900 dark:text-white">{p.num}.</span>
                <span className="text-[10px] text-neutral-400 font-mono mt-0.5">{p.start}-{p.end}</span>
              </div>

              {/* 5 Days */}
              {[1, 2, 3, 4, 5].map((d) => {
                const slot = slots.find((s) => s.day === d && s.period === p.num);
                const isNow = isCurrentSlot(d, p.num);
                const colorStyle = slot ? COLOR_MAP[slot.color] || COLOR_MAP.blue : null;

                return (
                  <div
                    key={d}
                    onClick={() => openSlotEditor(d, p.num)}
                    className={`p-2 border-r last:border-r-0 border-neutral-200 dark:border-neutral-800 min-h-20 transition-all cursor-pointer relative group hover:bg-neutral-50 dark:hover:bg-neutral-800/40 ${
                      isNow ? 'ring-2 ring-cyan-500 ring-inset bg-cyan-50/40 dark:bg-cyan-950/20' : ''
                    }`}
                  >
                    {isNow && (
                      <span className="absolute top-1 right-1 text-[9px] font-bold px-1.5 py-0.2 bg-cyan-500 text-white rounded-full">
                        JETZT
                      </span>
                    )}

                    {slot ? (
                      <div className={`h-full p-2 rounded-xl border ${colorStyle?.bg} ${colorStyle?.border} flex flex-col justify-between`}>
                        <div className="font-bold text-xs leading-tight text-neutral-900 dark:text-white truncate">
                          {slot.subject}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                          <span className="truncate flex items-center gap-0.5 font-medium">
                            <MapPin className="w-2.5 h-2.5" /> {slot.room || '—'}
                          </span>
                          <span className="truncate flex items-center gap-0.5">
                            <User className="w-2.5 h-2.5" /> {slot.teacher || '—'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 text-neutral-400 text-xs">
                        <Plus className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Slot Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {selectedSlot ? 'Unterrichtsstunde bearbeiten' : 'Neue Stunde eintragen'}
            </h3>
            <p className="text-xs text-neutral-500">
              {DAYS[day - 1]}, {period}. Stunde ({PERIODS.find((p) => p.num === period)?.start} - {PERIODS.find((p) => p.num === period)?.end})
            </p>

            <form onSubmit={handleSaveSlot} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Schulfach</label>
                <input
                  required
                  type="text"
                  placeholder="z.B. Mathematik"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Raum</label>
                  <input
                    type="text"
                    placeholder="z.B. R204"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Lehrkraft</label>
                  <input
                    type="text"
                    placeholder="z.B. Fr. Weber"
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                    className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Farbe</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(COLOR_MAP).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        color === c ? 'scale-125 border-neutral-900 dark:border-white shadow-xs' : 'border-transparent'
                      } ${COLOR_MAP[c].bg.replace('50', '400').replace('dark:bg-neutral-900', '')}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                {selectedSlot ? (
                  <button
                    type="button"
                    onClick={handleDeleteSlot}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" /> Löschen
                  </button>
                ) : <div />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-xl"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl"
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
