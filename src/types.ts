export type ToolCategory = 
  | 'all'
  | 'organisation'
  | 'stem'
  | 'languages'
  | 'humanities'
  | 'creative'
  | 'math_science'
  | 'planning'
  | 'productivity';

export interface ToolDefinition {
  id: string;
  title: string;
  name?: string;
  description: string;
  shortDesc?: string;
  category: string;
  categoryName?: string;
  icon: string;
  tags: string[];
  color: string;
  badge?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  box: number; // 1 to 5 for Leitner system
  lastReviewed?: number;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  description: string;
  cardsCount?: number;
}

export interface GradeEntry {
  id: string;
  subject: string;
  name: string;
  grade: number; // 1.0 - 6.0 or points 0 - 15
  weight: number; // e.g. 1 for oral, 2 for written
  type: 'oral' | 'written' | 'exam' | 'other';
  date: string;
}

export interface TimetableSlot {
  id: string;
  day: number; // 1 = Monday, 5 = Friday
  period: number; // 1 to 10
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  teacher: string;
  color: string;
  notes?: string;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  type: 'homework' | 'exam' | 'presentation' | 'project';
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  subject: string;
  color: string;
  pinned: boolean;
  updatedAt: number;
}

export interface ChemicalElement {
  number: number;
  symbol: string;
  name: string;
  germanName: string;
  atomicMass: number;
  category: 'nonmetal' | 'noble-gas' | 'alkali-metal' | 'alkaline-earth' | 'metalloid' | 'halogen' | 'post-transition' | 'transition-metal' | 'lanthanide' | 'actinide';
  period: number;
  group: number;
  phase: 'Gas' | 'Flüssig' | 'Fest';
  electronConfig: string;
  summary: string;
}

export interface HistoryEvent {
  id: string;
  year: number;
  displayYear: string;
  era: 'Antike' | 'Mittelalter' | 'Frühe Neuzeit' | '19. Jahrhundert' | '20. Jahrhundert' | 'Gegenwart';
  title: string;
  description: string;
  category: 'Krieg & Politik' | 'Kultur & Wissenschaft' | 'Gesellschaft & Entdeckungen';
}

export interface RhetoricFigure {
  name: string;
  definition: string;
  example: string;
  effect: string;
  category?: string;
}
