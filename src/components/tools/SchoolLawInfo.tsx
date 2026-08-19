import React, { useState } from 'react';
import { Scale, FileText, Copy, Check, ShieldCheck, AlertTriangle } from 'lucide-react';

export function SchoolLawInfo() {
  const [activeTab, setActiveTab] = useState<'excuse' | 'rights'>('excuse');
  const [copied, setCopied] = useState(false);

  // Excuse generator state
  const [studentName, setStudentName] = useState('Max Mustermann');
  const [parentName, setParentName] = useState('Erika Mustermann');
  const [schoolClass, setSchoolClass] = useState('9b');
  const [teacherName, setTeacherName] = useState('Herr Schmidt');
  const [reason, setReason] = useState('einer akuten fiebrigen Erkältung');
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [isSportOnly, setIsSportOnly] = useState(false);

  const generateExcuseLetter = () => {
    if (isSportOnly) {
      return `Sehr geehrte/r ${teacherName},

hiermit bitte ich, meine/n Sohn/Tochter ${studentName} (Klasse ${schoolClass}) vom Sportunterricht im Zeitraum vom ${dateFrom} bis zum ${dateTo} aus gesundheitlichen Gründen (${reason}) freizustellen.

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen,
${parentName}`;
    }

    return `Sehr geehrte/r ${teacherName},

hiermit möchte ich das Fehlen meiner Tochter / meines Sohnes ${studentName} (Klasse ${schoolClass}) im Zeitraum vom ${dateFrom} bis zum ${dateTo} entschuldigen.

Grund für das Schulversäumnis war die Erkrankung wegen ${reason}. ${studentName} wird den versäumten Unterrichtsstoff selbstständig nachholen.

Mit freundlichen Grüßen,
${parentName}`;
  };

  const letterText = generateExcuseLetter();

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SCHOOL_RIGHTS = [
    {
      title: 'Klausuren-Dichte & Belastungsgrenze',
      rule: 'In den meisten Bundesländern (z.B. Bayern, NRW, BaWü) dürfen nicht mehr als 2 bis maximal 3 große Schulaufgaben/Klausuren pro Kalenderwoche und maximal eine pro Tag geschrieben werden.',
      category: 'Klassenarbeiten',
    },
    {
      title: 'Ankündigungspflicht von Tests & Arbeiten',
      rule: 'Große Klassenarbeiten und Klausuren müssen in der Regel mindestens eine Woche vorher verbindlich angekündigt werden. Bei unangekündigten Tests (Exen / Stegreifaufgaben) darf nur der Stoff der letzten maximal 2 Unterrichtsstunden abgefragt werden.',
      category: 'Klassenarbeiten',
    },
    {
      title: 'Notenkorrektur & Rückgabefrist',
      rule: 'Lehrkräfte sind verpflichtet, geschriebene Arbeiten zeitnah (üblicherweise innerhalb von 2 bis spätestens 3 Wochen) korrigiert und mit klarem Notenspiegel zurückzugeben, bevor eine neue Arbeit im selben Fach geschrieben wird.',
      category: 'Bewertung',
    },
    {
      title: 'Hausaufgaben über das Wochenende & Ferien',
      rule: 'In vielen Schulgesetzen ist geregelt, dass von Freitag auf Montag oder über Feiertage und Schulferien keine umfangreichen Hausaufgaben aufgegeben werden dürfen, die den Erholungszweck gefährden.',
      category: 'Hausaufgaben',
    },
    {
      title: 'Smartphone & Eigentumskontrolle',
      rule: 'Lehrkräfte dürfen bei Störungen Smartphones vorübergehend einziehen, sie sind jedoch NIEMALS berechtigt, private Chatnachrichten, Fotos oder Dateien auf dem Schüler-Handy zu durchsuchen (Verletzung des Fernmeldegeheimnisses & Grundrechts).',
      category: 'Privatsphäre',
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Sub tabs */}
      <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('excuse')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'excuse' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Entschuldigungsschreiben
        </button>
        <button
          onClick={() => setActiveTab('rights')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'rights' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Schülerrechte & Schulrecht
        </button>
      </div>

      {activeTab === 'excuse' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              Offizieller Entschuldigungs-Generator für die Schule
            </h3>
            <p className="text-xs text-neutral-500">Erstelle ein formgerechtes Schreiben zum Ausdrucken oder Kopieren</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Name Schüler/in</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Klasse</label>
              <input
                type="text"
                value={schoolClass}
                onChange={(e) => setSchoolClass(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Lehrkraft (Klassenlehrer)</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Name Erziehungsberechtigte/r</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Krankheitsgrund</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Zeitraum von - bis</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-neutral-700 dark:text-neutral-300">
            <input
              type="checkbox"
              checked={isSportOnly}
              onChange={(e) => setIsSportOnly(e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500"
            />
            Nur Befreiung vom Sportunterricht (körperliche Einschränkung)
          </label>

          {/* Formatted Letter Output */}
          <div className="p-5 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                Vorschau Entschuldigungsschreiben:
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 text-xs font-bold text-sky-700 dark:text-sky-300 rounded-xl transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Kopiert!' : 'Kopieren'}
              </button>
            </div>

            <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-sky-100 dark:border-sky-900 text-xs font-mono leading-relaxed whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
              {letterText}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rights' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-sky-600" />
              Schülerrechte-Guide & Gesetzesvorgaben
            </h3>
            <p className="text-xs text-neutral-500">
              Wichtige rechtliche Richtlinien für Schulklausuren, Noten, Hausaufgaben & Datenschutz
            </p>
          </div>

          <div className="space-y-3">
            {SCHOOL_RIGHTS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{item.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
