import React, { useState } from 'react';
import { Flashcard, FlashcardDeck } from '../../types';
import { INITIAL_DECKS, INITIAL_FLASHCARDS, getStoredData, setStoredData } from '../../utils/storage';
import { Plus, RotateCw, Check, X, Sparkles, BookOpen, Trash2, ArrowLeft, Download, Upload, Shuffle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Flashcards() {
  const [decks, setDecks] = useState<FlashcardDeck[]>(() => getStoredData('decks', INITIAL_DECKS));
  const [cards, setCards] = useState<Flashcard[]>(() => getStoredData('flashcards', INITIAL_FLASHCARDS));
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  
  // Practice session state
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [practiceCards, setPracticeCards] = useState<Flashcard[]>([]);
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | 'all'>('all');

  // New card modal/form
  const [showAddCard, setShowAddCard] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  // New deck modal
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckSubject, setNewDeckSubject] = useState('Allgemein');
  const [newDeckDesc, setNewDeckDesc] = useState('');

  // AI Generator state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const saveDecks = (newDecks: FlashcardDeck[]) => {
    setDecks(newDecks);
    setStoredData('decks', newDecks);
  };

  const saveCards = (newCards: Flashcard[]) => {
    setCards(newCards);
    setStoredData('flashcards', newCards);
  };

  const activeDeck = decks.find((d) => d.id === activeDeckId);
  const deckCards = cards.filter((c) => c.deckId === activeDeckId);

  const startPractice = (boxFilter: number | 'all' = 'all') => {
    let pool = deckCards;
    if (boxFilter !== 'all') {
      pool = pool.filter((c) => c.box === boxFilter);
    }
    if (pool.length === 0) return;
    
    // Shuffle cards
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setPracticeCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsPracticing(true);
  };

  const handleCardResult = (known: boolean) => {
    const currentCard = practiceCards[currentCardIndex];
    if (!currentCard) return;

    // Leitner system: if known -> move to next box (max 5), if not -> back to box 1
    const newBox = known ? Math.min(5, currentCard.box + 1) : 1;
    const updatedCards = cards.map((c) =>
      c.id === currentCard.id ? { ...c, box: newBox, lastReviewed: Date.now() } : c
    );
    saveCards(updatedCards);

    if (currentCardIndex + 1 < practiceCards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Completed practice
      setIsPracticing(false);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim() || !activeDeckId) return;

    const newCard: Flashcard = {
      id: `card-${Date.now()}`,
      deckId: activeDeckId,
      front: newFront.trim(),
      back: newBack.trim(),
      box: 1,
    };
    saveCards([...cards, newCard]);
    setNewFront('');
    setNewBack('');
    setShowAddCard(false);
  };

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;

    const newDeck: FlashcardDeck = {
      id: `deck-${Date.now()}`,
      title: newDeckTitle.trim(),
      subject: newDeckSubject.trim(),
      description: newDeckDesc.trim(),
    };
    saveDecks([...decks, newDeck]);
    setActiveDeckId(newDeck.id);
    setNewDeckTitle('');
    setNewDeckDesc('');
    setShowAddDeck(false);
  };

  const handleDeleteDeck = (deckId: string) => {
    if (confirm('Möchtest du dieses Kartendeck und alle enthaltenen Karten wirklich löschen?')) {
      saveDecks(decks.filter((d) => d.id !== deckId));
      saveCards(cards.filter((c) => c.deckId !== deckId));
      if (activeDeckId === deckId) setActiveDeckId(null);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    saveCards(cards.filter((c) => c.id !== cardId));
  };

  // AI Flashcard Generator
  const handleGenerateWithAi = async () => {
    if (!aiTopic.trim()) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          count: aiCount,
          subject: activeDeck?.subject || 'Allgemein',
        }),
      });
      const data = await res.json();
      if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
        const targetDeckId = activeDeckId || decks[0]?.id || 'deck-vocab-en';
        const generatedCards: Flashcard[] = data.cards.map((c: any, index: number) => ({
          id: `card-ai-${Date.now()}-${index}`,
          deckId: targetDeckId,
          front: c.front || 'Frage',
          back: c.back || 'Antwort',
          box: 1,
        }));
        saveCards([...cards, ...generatedCards]);
        setShowAiModal(false);
        setAiTopic('');
        confetti({ particleCount: 50, spread: 60 });
      } else {
        alert('Keine Karten generiert. Bitte stelle sicher, dass die KI erreichbar ist.');
      }
    } catch (err) {
      console.error(err);
      alert('Fehler bei der Kartengenerierung.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar inside tool */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            {activeDeck ? activeDeck.title : 'Karteikarten-Studio'}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {activeDeck ? `${activeDeck.subject} • ${deckCards.length} Karten` : 'Wähle ein Deck oder erstelle neue Lernkarten'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeDeckId ? (
            <>
              <button
                onClick={() => {
                  setActiveDeckId(null);
                  setIsPracticing(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" /> Alle Decks
              </button>
              <button
                onClick={() => setShowAddCard(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Karte hinzufügen
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowAddDeck(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Neues Deck
              </button>
              <button
                onClick={() => setShowAiModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800 hover:bg-purple-200 rounded-xl transition-all"
              >
                <Sparkles className="w-4 h-4" /> KI-Deck erstellen
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {!activeDeckId ? (
        /* Decks Overview */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {decks.map((deck) => {
            const count = cards.filter((c) => c.deckId === deck.id).length;
            return (
              <div
                key={deck.id}
                onClick={() => setActiveDeckId(deck.id)}
                className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      {deck.subject}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDeck(deck.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {deck.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {deck.description || 'Keine Beschreibung'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-semibold">{count} {count === 1 ? 'Karte' : 'Karten'}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    Lernen →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : isPracticing ? (
        /* Active Quiz / Flipcard Practice Mode */
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>Karte {currentCardIndex + 1} von {practiceCards.length}</span>
            <button
              onClick={() => setIsPracticing(false)}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              Abbrechen
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentCardIndex + 1) / practiceCards.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-64 bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border-2 border-indigo-200 dark:border-indigo-900/60 rounded-3xl p-8 shadow-lg cursor-pointer flex flex-col justify-between text-center select-none relative group hover:border-indigo-400 transition-all"
          >
            <div className="flex justify-between items-center text-xs font-bold text-neutral-400">
              <span>{isFlipped ? 'ANTWORT' : 'FRAGE / BEGRIFF'}</span>
              <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 rounded-md">
                Kasten {practiceCards[currentCardIndex]?.box || 1}
              </span>
            </div>

            <div className="my-auto py-6">
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                {isFlipped ? practiceCards[currentCardIndex]?.back : practiceCards[currentCardIndex]?.front}
              </p>
              <p className="text-xs text-neutral-400 mt-4 flex items-center justify-center gap-1">
                <RotateCw className="w-3.5 h-3.5" /> Klicken zum Umdrehen
              </p>
            </div>

            <div className="text-xs text-neutral-400">Leitner-Prinzip: Richtige Antworten steigen auf</div>
          </div>

          {/* Feedback Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleCardResult(false)}
              className="flex items-center justify-center gap-2 py-3.5 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold rounded-2xl border border-rose-200 dark:border-rose-900 transition-all active:scale-95"
            >
              <X className="w-5 h-5" /> Nicht gewusst (Fach 1)
            </button>
            <button
              onClick={() => handleCardResult(true)}
              className="flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95"
            >
              <Check className="w-5 h-5" /> Gewusst (+1 Fach)
            </button>
          </div>
        </div>
      ) : (
        /* Deck Details & Management */
        <div className="space-y-6">
          {/* Leitner Box Barometer */}
          <div className="grid grid-cols-5 gap-2 p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl text-center">
            {[1, 2, 3, 4, 5].map((boxNum) => {
              const count = deckCards.filter((c) => c.box === boxNum).length;
              return (
                <button
                  key={boxNum}
                  onClick={() => startPractice(boxNum)}
                  disabled={count === 0}
                  className="p-3 bg-white dark:bg-neutral-900 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-neutral-200 dark:border-neutral-700/60 disabled:opacity-40 transition-all"
                >
                  <div className="text-xs text-neutral-500 font-medium">Kasten {boxNum}</div>
                  <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">{count}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Üben →</div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-neutral-900 dark:text-white">Alle Karten im Deck ({deckCards.length})</h3>
            <button
              onClick={() => startPractice('all')}
              disabled={deckCards.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-sm transition-all"
            >
              <Shuffle className="w-4 h-4" /> Gesamtes Deck abfragen
            </button>
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deckCards.map((card) => (
              <div
                key={card.id}
                className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-neutral-900 dark:text-white">{card.front}</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">{card.back}</div>
                  <div className="text-[11px] text-indigo-500 font-medium">Kasten {card.box} / 5</div>
                </div>
                <button
                  onClick={() => handleDeleteCard(card.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {deckCards.length === 0 && (
              <div className="col-span-full py-12 text-center text-neutral-500">
                Dieses Deck ist noch leer. Füge deine erste Karte hinzu!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Neue Karteikarte erstellen</h3>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Vorderseite (Frage / Begriff)</label>
                <textarea
                  required
                  rows={2}
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  placeholder="z.B. Fotosynthese Formel"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Rückseite (Antwort / Erklärung)</label>
                <textarea
                  required
                  rows={3}
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  placeholder="z.B. 6 CO2 + 6 H2O -> C6H12O6 + 6 O2"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 rounded-xl"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  Karte speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Deck Modal */}
      {showAddDeck && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Neues Kartendeck</h3>
            <form onSubmit={handleCreateDeck} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Titel</label>
                <input
                  required
                  type="text"
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  placeholder="z.B. Französisch Vokabeln Unité 3"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Schulfach</label>
                <select
                  value={newDeckSubject}
                  onChange={(e) => setNewDeckSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                >
                  {['Mathematik', 'Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Latein', 'Physik', 'Chemie', 'Biologie', 'Geschichte', 'Geografie', 'Informatik', 'Allgemein'].map((subj) => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Beschreibung</label>
                <input
                  type="text"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  placeholder="Kurze Zusammenfassung des Inhalts"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDeck(false)}
                  className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-xl"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  Deck anlegen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Deck Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">KI-Karten Generator</h3>
            </div>
            <p className="text-xs text-neutral-500">
              Lass Gemini automatisch strukturierte Frage-und-Antwort-Karten für dein Thema erstellen.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Thema oder Begriff</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="z.B. Französische Revolution Ursachen oder Mitose Phasen"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Anzahl der Karten</label>
                <input
                  type="number"
                  min="3"
                  max="15"
                  value={aiCount}
                  onChange={(e) => setAiCount(parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Abbrechen
              </button>
              <button
                type="button"
                disabled={isGeneratingAi || !aiTopic.trim()}
                onClick={handleGenerateWithAi}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl shadow-md"
              >
                {isGeneratingAi ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {isGeneratingAi ? 'Erstelle Karten...' : 'Karten generieren'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
