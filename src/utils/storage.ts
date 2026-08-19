import { Flashcard, FlashcardDeck, GradeEntry, HomeworkItem, NoteItem, TimetableSlot } from '../types';

export const INITIAL_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-vocab-en',
    title: 'Englisch: Advanced Vocab',
    subject: 'Englisch',
    description: 'Wichtige Vokabeln & Redewendungen für Klausuren und Texte',
  },
  {
    id: 'deck-math-formulas',
    title: 'Mathematik: Grundformeln',
    subject: 'Mathematik',
    description: 'Geometrie, quadratische Gleichungen & Analysis',
  },
  {
    id: 'deck-bio-cells',
    title: 'Biologie: Zellorganellen & Genetik',
    subject: 'Biologie',
    description: 'Mitochondrien, Ribosomen, DNS-Aufbau & Mendel',
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  { id: 'c1', deckId: 'deck-vocab-en', front: 'ubiquitous', back: 'allgegenwärtig / überall vorkommend', box: 1 },
  { id: 'c2', deckId: 'deck-vocab-en', front: 'to scrutinize', back: 'eingehend untersuchen / genau prüfen', box: 2 },
  { id: 'c3', deckId: 'deck-vocab-en', front: 'consequently', back: 'infolgedessen / somit', box: 3 },
  { id: 'c4', deckId: 'deck-vocab-en', front: 'furthermore', back: 'darüber hinaus / ferner', box: 4 },
  { id: 'c5', deckId: 'deck-vocab-en', front: 'inevitable', back: 'unvermeidlich / unausweichlich', box: 1 },

  { id: 'c6', deckId: 'deck-math-formulas', front: 'pq-Formel für x² + px + q = 0', back: 'x₁,₂ = -(p/2) ± √((p/2)² - q)', box: 2 },
  { id: 'c7', deckId: 'deck-math-formulas', front: 'Kreisfläche (A)', back: 'A = π · r²', box: 3 },
  { id: 'c8', deckId: 'deck-math-formulas', front: 'Satz des Pythagoras', back: 'a² + b² = c² (im rechtwinkligen Dreieck)', box: 5 },
  { id: 'c9', deckId: 'deck-math-formulas', front: 'Volumen eines Zylinders (V)', back: 'V = π · r² · h', box: 1 },

  { id: 'c10', deckId: 'deck-bio-cells', front: 'Mitochondrien', back: '„Kraftwerke der Zelle“ – zuständig für Zellatmung & ATP-Synthese', box: 3 },
  { id: 'c11', deckId: 'deck-bio-cells', front: 'Ribosomen', back: 'Ort der Proteinbiosynthese (Translation von mRNA)', box: 2 },
  { id: 'c12', deckId: 'deck-bio-cells', front: '1. Mendelsche Regel (Uniformitätsregel)', back: 'Kreuzt man zwei homozygote Individuen, sind die Nachkommen in F1 im Phänotyp alle uniform.', box: 1 },
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 't1', day: 1, period: 1, startTime: '08:00', endTime: '08:45', subject: 'Mathematik', room: 'R204', teacher: 'Fr. Weber', color: 'blue' },
  { id: 't2', day: 1, period: 2, startTime: '08:50', endTime: '09:35', subject: 'Mathematik', room: 'R204', teacher: 'Fr. Weber', color: 'blue' },
  { id: 't3', day: 1, period: 3, startTime: '09:55', endTime: '10:40', subject: 'Deutsch', room: 'R102', teacher: 'Hr. Müller', color: 'emerald' },
  { id: 't4', day: 1, period: 4, startTime: '10:45', endTime: '11:30', subject: 'Englisch', room: 'R105', teacher: 'Fr. Smith', color: 'purple' },
  { id: 't5', day: 1, period: 5, startTime: '11:45', endTime: '12:30', subject: 'Physik', room: 'Physiksaal 1', teacher: 'Hr. Schmidt', color: 'amber' },

  { id: 't6', day: 2, period: 1, startTime: '08:00', endTime: '08:45', subject: 'Geschichte', room: 'R102', teacher: 'Hr. Bauer', color: 'rose' },
  { id: 't7', day: 2, period: 2, startTime: '08:50', endTime: '09:35', subject: 'Biologie', room: 'Biosaal 2', teacher: 'Fr. Klein', color: 'teal' },
  { id: 't8', day: 2, period: 3, startTime: '09:55', endTime: '10:40', subject: 'Chemie', room: 'Chemiesaal', teacher: 'Hr. Koch', color: 'indigo' },
  { id: 't9', day: 2, period: 4, startTime: '10:45', endTime: '11:30', subject: 'Informatik', room: 'PC-Raum A', teacher: 'Hr. Neumann', color: 'cyan' },

  { id: 't10', day: 3, period: 1, startTime: '08:00', endTime: '08:45', subject: 'Deutsch', room: 'R102', teacher: 'Hr. Müller', color: 'emerald' },
  { id: 't11', day: 3, period: 2, startTime: '08:50', endTime: '09:35', subject: 'Englisch', room: 'R105', teacher: 'Fr. Smith', color: 'purple' },
  { id: 't12', day: 3, period: 3, startTime: '09:55', endTime: '10:40', subject: 'Sport', room: 'Sporthalle', teacher: 'Hr. Berg', color: 'orange' },
  { id: 't13', day: 3, period: 4, startTime: '10:45', endTime: '11:30', subject: 'Sport', room: 'Sporthalle', teacher: 'Hr. Berg', color: 'orange' },

  { id: 't14', day: 4, period: 1, startTime: '08:00', endTime: '08:45', subject: 'Mathematik', room: 'R204', teacher: 'Fr. Weber', color: 'blue' },
  { id: 't15', day: 4, period: 2, startTime: '08:50', endTime: '09:35', subject: 'Physik', room: 'Physiksaal 1', teacher: 'Hr. Schmidt', color: 'amber' },
  { id: 't16', day: 4, period: 3, startTime: '09:55', endTime: '10:40', subject: 'Geografie', room: 'R301', teacher: 'Fr. Meyer', color: 'teal' },
  { id: 't17', day: 4, period: 4, startTime: '10:45', endTime: '11:30', subject: 'Kunst', room: 'Kunstraum 1', teacher: 'Fr. Wolf', color: 'pink' },

  { id: 't18', day: 5, period: 1, startTime: '08:00', endTime: '08:45', subject: 'Englisch', room: 'R105', teacher: 'Fr. Smith', color: 'purple' },
  { id: 't19', day: 5, period: 2, startTime: '08:50', endTime: '09:35', subject: 'Deutsch', room: 'R102', teacher: 'Hr. Müller', color: 'emerald' },
  { id: 't20', day: 5, period: 3, startTime: '09:55', endTime: '10:40', subject: 'Politik & Wirtschaft', room: 'R102', teacher: 'Hr. Bauer', color: 'rose' },
  { id: 't21', day: 5, period: 4, startTime: '10:45', endTime: '11:30', subject: 'Mathematik', room: 'R204', teacher: 'Fr. Weber', color: 'blue' },
];

export const INITIAL_HOMEWORK: HomeworkItem[] = [
  { id: 'hw1', subject: 'Mathematik', title: 'S. 142 Nr. 4 a-d (Kurvendiskussion)', dueDate: '2026-08-21', priority: 'high', completed: false, type: 'homework' },
  { id: 'hw2', subject: 'Deutsch', title: 'Essay-Gliederung zu Friedrich Schiller fertigstellen', dueDate: '2026-08-24', priority: 'medium', completed: false, type: 'homework' },
  { id: 'hw3', subject: 'Physik', title: 'Schulaufgabe: Mechanik & Kräfte', dueDate: '2026-08-28', priority: 'high', completed: false, type: 'exam' },
  { id: 'hw4', subject: 'Englisch', title: 'Unit 4 Vocabularies lernen', dueDate: '2026-08-20', priority: 'medium', completed: true, type: 'homework' },
  { id: 'hw5', subject: 'Biologie', title: 'Referat: Zellteilung & Stammbaum', dueDate: '2026-09-02', priority: 'medium', completed: false, type: 'presentation' },
];

export const INITIAL_GRADES: GradeEntry[] = [
  { id: 'g1', subject: 'Mathematik', name: '1. Klausur (Analysis)', grade: 2.0, weight: 2, type: 'exam', date: '2026-05-12' },
  { id: 'g2', subject: 'Mathematik', name: 'Mündliche Mitarbeit', grade: 1.5, weight: 1, type: 'oral', date: '2026-06-01' },
  { id: 'g3', subject: 'Deutsch', name: 'Gedichtanalyse', grade: 2.3, weight: 2, type: 'written', date: '2026-05-20' },
  { id: 'g4', subject: 'Englisch', name: 'Vocabulary Quiz', grade: 1.0, weight: 1, type: 'oral', date: '2026-06-05' },
  { id: 'g5', subject: 'Physik', name: 'Kräfte-Test', grade: 2.7, weight: 2, type: 'exam', date: '2026-05-28' },
  { id: 'g6', subject: 'Biologie', name: 'Referat Genetik', grade: 1.3, weight: 1.5, type: 'oral', date: '2026-06-10' },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n1',
    title: 'Klausur-Fahrplan & Schwerpunkte',
    content: 'Mathe: Ableitungsregeln (Produktregel, Kettenregel), Nullstellen bestimmen, Tangentengleichung y = f\'(x₀)(x - x₀) + f(x₀).\nPhysik: F = m·a, Einheiten immer in SI umrechnen (m, s, kg)!',
    subject: 'Allgemein',
    color: 'amber',
    pinned: true,
    updatedAt: Date.now(),
  },
  {
    id: 'n2',
    title: 'Referat: Aufbau der Französischen Revolution',
    content: '1. Ursachen: 3 Stände, Staatsbankrott, Missernten 1788/89\n2. Generalstände Mai 1789\n3. Ballhausschwur & Sturm auf Bastille (14. Juli 1789)\n4. Menschenrechte & Verfassung 1791\n5. Radikalisierung & Schreckensherrschaft Robespierre',
    subject: 'Geschichte',
    color: 'rose',
    pinned: false,
    updatedAt: Date.now() - 3600000,
  }
];

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`schulportal_${key}`);
    if (item) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.warn(`Error reading localStorage for ${key}:`, err);
  }
  return defaultValue;
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`schulportal_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage for ${key}:`, err);
  }
}
