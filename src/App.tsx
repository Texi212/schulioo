import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Timer,
  Layers,
  ArrowRightLeft,
  GraduationCap,
  CalendarDays,
  CheckSquare,
  SquareRadical,
  LineChart,
  Atom,
  Zap,
  Dna,
  Languages,
  History,
  Globe,
  BookMarked,
  Quote,
  Binary,
  Palette,
  Mic,
  Bot,
  BookOpen,
  Activity,
  Shuffle,
  FileText,
  Scale,
  Sparkles,
  ArrowLeft,
  Sun,
  Moon,
  Compass,
  Bookmark,
  Check,
  Star,
  Flame,
  LayoutGrid,
} from 'lucide-react';
import { TOOLS_LIST } from './data/toolsList';
import { ToolDefinition } from './types';

// Tool Components
import { StudyTimer } from './components/tools/StudyTimer';
import { Flashcards } from './components/tools/Flashcards';
import { UnitConverter } from './components/tools/UnitConverter';
import { GradeCalculator } from './components/tools/GradeCalculator';
import { Timetable } from './components/tools/Timetable';
import { HomeworkPlanner } from './components/tools/HomeworkPlanner';
import { MathFormulas } from './components/tools/MathFormulas';
import { GraphingCalc } from './components/tools/GraphingCalc';
import { PeriodicTable } from './components/tools/PeriodicTable';
import { PhysicsCalculator } from './components/tools/PhysicsCalculator';
import { GeneticsCalculator } from './components/tools/GeneticsCalculator';
import { VerbConjugator } from './components/tools/VerbConjugator';
import { HistoryTimeline } from './components/tools/HistoryTimeline';
import { GeographyAtlas } from './components/tools/GeographyAtlas';
import { CitationGenerator } from './components/tools/CitationGenerator';
import { RhetoricFigures } from './components/tools/RhetoricFigures';
import { BinaryConverter } from './components/tools/BinaryConverter';
import { ColorStudio } from './components/tools/ColorStudio';
import { SpeechPacer } from './components/tools/SpeechPacer';
import { AiTutor } from './components/tools/AiTutor';
import { SpeedReader } from './components/tools/SpeedReader';
import { MentalMathTrainer } from './components/tools/MentalMathTrainer';
import { MusicTheory } from './components/tools/MusicTheory';
import { SportsFitness } from './components/tools/SportsFitness';
import { DecisionWheel } from './components/tools/DecisionWheel';
import { TextAnalyzer } from './components/tools/TextAnalyzer';
import { SchoolLawInfo } from './components/tools/SchoolLawInfo';

const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  Timer,
  Layers,
  ArrowRightLeft,
  GraduationCap,
  CalendarDays,
  CheckSquare,
  SquareRadical,
  LineChart,
  Atom,
  Zap,
  Dna,
  Languages,
  History,
  Globe,
  BookMarked,
  Quote,
  Binary,
  Palette,
  Mic,
  Bot,
  BookOpen,
  Activity,
  Shuffle,
  FileText,
  Scale,
};

const CATEGORIES = [
  { id: 'all', label: 'Alle Werkzeuge' },
  { id: 'organisation', label: 'Organisation & Planung' },
  { id: 'stem', label: 'Mathe & Naturwissenschaften' },
  { id: 'languages', label: 'Sprachen & Vokabeln' },
  { id: 'humanities', label: 'Geistes- & Sozialwissenschaften' },
  { id: 'creative', label: 'Kreativ, Sport & KI-Tools' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [favoriteTools, setFavoriteTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('schulportal_favs');
      return saved ? JSON.parse(saved) : ['timer', 'homework', 'grades', 'flashcards', 'aitutor'];
    } catch {
      return ['timer', 'homework', 'grades', 'flashcards', 'aitutor'];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut Ctrl+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        document.getElementById('main-search-input')?.focus();
      }
      if (e.key === 'Escape' && activeToolId) {
        setActiveToolId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeToolId]);

  const toggleFavorite = (toolId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavoriteTools((prev) => {
      const updated = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      localStorage.setItem('schulportal_favs', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter tools
  const filteredTools = useMemo(() => {
    return TOOLS_LIST.filter((tool) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const activeTool = TOOLS_LIST.find((t) => t.id === activeToolId);

  // Render Tool Component
  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'timer': return <StudyTimer />;
      case 'flashcards': return <Flashcards />;
      case 'unitconverter': return <UnitConverter />;
      case 'grades': return <GradeCalculator />;
      case 'timetable': return <Timetable />;
      case 'homework': return <HomeworkPlanner />;
      case 'mathformulas': return <MathFormulas />;
      case 'graphingcalc': return <GraphingCalc />;
      case 'periodictable': return <PeriodicTable />;
      case 'physicscalc': return <PhysicsCalculator />;
      case 'genetics': return <GeneticsCalculator />;
      case 'verbs': return <VerbConjugator />;
      case 'historytimeline': return <HistoryTimeline />;
      case 'geography': return <GeographyAtlas />;
      case 'citation': return <CitationGenerator />;
      case 'rhetoric': return <RhetoricFigures />;
      case 'binary': return <BinaryConverter />;
      case 'color': return <ColorStudio />;
      case 'speechpacer': return <SpeechPacer />;
      case 'aitutor': return <AiTutor />;
      case 'speedreader': return <SpeedReader />;
      case 'mentalmath': return <MentalMathTrainer />;
      case 'musictheory': return <MusicTheory />;
      case 'sports': return <SportsFitness />;
      case 'wheel': return <DecisionWheel />;
      case 'textanalyzer': return <TextAnalyzer />;
      case 'schoollaw': return <SchoolLawInfo />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Portal title */}
          <div
            onClick={() => setActiveToolId(null)}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-violet-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-base sm:text-lg tracking-tight bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
                SchulPortal<span className="text-neutral-900 dark:text-white font-medium"> Plus</span>
              </div>
              <div className="text-[10px] text-neutral-400 font-medium">Dein Schul-Cockpit &amp; 25+ Werkzeuge</div>
            </div>
          </div>

          {/* Centered Global Search Bar */}
          <div className="flex-1 max-w-xl mx-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400 pointer-events-none" />
            <input
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Werkzeug, Formel, Fach oder Einheit suchen... (Drücke '/' oder Strg+K)"
              className="w-full pl-10 pr-10 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all placeholder:text-neutral-400"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            ) : (
              <kbd className="hidden sm:inline-block absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-400">
                /
              </kbd>
            )}
          </div>

          {/* Actions & Theme toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              aria-label="Theme toggle"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Active Tool Workbench View */}
        {activeTool ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Breadcrumb & Tool Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveToolId(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
                </button>

                <div className="h-4 w-px bg-neutral-200 dark:border-neutral-700" />

                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl text-white ${activeTool.color}`}>
                    {(() => {
                      const IconComp = ICON_COMPONENTS[activeTool.icon] || Sparkles;
                      return <IconComp className="w-4 h-4" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white leading-tight">
                      {activeTool.title}
                    </h2>
                    <span className="text-xs text-neutral-400">{activeTool.description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rendered Tool Body */}
            <div>{renderActiveTool()}</div>
          </div>
        ) : (
          /* Dashboard & Tools Overview Matrix */
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Tools Grid (Cards with search results) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Gefundene Werkzeuge ({filteredTools.length})</span>
                {searchQuery && (
                  <span>Suchergebnisse für „{searchQuery}“</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool) => {
                  const IconComp = ICON_COMPONENTS[tool.icon] || Sparkles;

                  return (
                    <div
                      key={tool.id}
                      onClick={() => setActiveToolId(tool.id)}
                      className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl cursor-pointer hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md transition-all flex flex-col justify-between group space-y-4 relative"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className={`p-3 rounded-2xl text-white ${tool.color} shadow-xs group-hover:scale-105 transition-transform`}>
                            <IconComp className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/60 text-[11px]">
                        <span className="font-medium text-neutral-400 capitalize truncate">
                          {tool.category}
                        </span>
                        <span className="font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Öffnen &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredTools.length === 0 && (
                <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">Kein passendes Werkzeug gefunden</h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Probiere einen anderen Suchbegriff wie „Mathe“, „Timer“, „Physik“, „Grammatik“ oder „Noten“.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold hover:bg-neutral-200"
                  >
                    Suche zurücksetzen
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
