import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: AI Homework / School Explainer & Study Helper
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { question, subject, level = 'Schule / Gymnasium' } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Frage oder Aufgabe fehlt' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'Gemini API Key ist im System noch nicht hinterlegt.',
          fallback: true,
          answer: `Hinweis: Du kannst diesen Assistenten nutzen, sobald ein GEMINI_API_KEY konfiguriert ist.\n\nTipp für "${question}": Teile deine Frage in Teilaufgaben auf, schreibe die gegebene und gesuchte Information auf und nutze die passenden Formeln aus dem Formel-Werkzeug!`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Du bist ein freundlicher, hochqualifizierter Schul-Tutor und Lernbegleiter für Schüler (Fach: ${subject || 'Allgemein'}, Niveau: ${level}).
Erkläre die folgende Frage oder Aufgabe verständlich, pädagogisch wertvoll, Schritt für Schritt mit Beispielen und eventuell einer kurzen Merk-Box:

Frage / Aufgabe: "${question}"

Strukturiere die Antwort in:
1. 💡 Kurze Erklärung auf den Punkt
2. 📝 Schritt-für-Schritt Lösungsweg / Vertiefung
3. 🧠 Merksatz & Praxistipp für die Klassenarbeit / Klausur`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      res.json({ answer: response.text });
    } catch (error: any) {
      console.error('Error in /api/ai/ask:', error);
      res.status(500).json({
        error: error?.message || 'Fehler bei der KI-Anfrage.',
      });
    }
  });

  // API Route: Generate Flashcard Deck via AI
  app.post('/api/ai/generate-flashcards', async (req, res) => {
    try {
      const { topic, count = 6, subject } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'Gemini API Key nicht konfiguriert.',
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Erstelle genau ${count} strukturierte Lernkarteikarten zum Schulthema "${topic}" (Fach: ${subject || 'Allgemein'}).
Gib die Antwort AUSSCHLIESSLICH als gültiges JSON-Array im folgenden Format zurück, ohne Markdown-Backticks:
[
  { "front": "Frage / Begriff / Aufgabe", "back": "Präzise Antwort / Definition / Lösung" }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      let parsed = [];
      try {
        const text = response.text || '[]';
        parsed = JSON.parse(text);
      } catch (err) {
        parsed = [];
      }

      res.json({ cards: parsed });
    } catch (error: any) {
      console.error('Error in /api/ai/generate-flashcards:', error);
      res.status(500).json({ error: error?.message || 'Fehler beim Erstellen der Karteikarten' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SchulPortal server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
