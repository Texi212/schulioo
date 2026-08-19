export interface IrregularVerb {
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
  example: string;
}

export const ENGLISH_IRREGULAR_VERBS: IrregularVerb[] = [
  { infinitive: 'be (am/is/are)', pastSimple: 'was / were', pastParticiple: 'been', translation: 'sein', example: 'I have been to London.' },
  { infinitive: 'become', pastSimple: 'became', pastParticiple: 'become', translation: 'werden', example: 'She became a doctor.' },
  { infinitive: 'begin', pastSimple: 'began', pastParticiple: 'begun', translation: 'beginnen', example: 'The lesson has begun.' },
  { infinitive: 'break', pastSimple: 'broke', pastParticiple: 'broken', translation: 'brechen', example: 'He broke the pencil.' },
  { infinitive: 'bring', pastSimple: 'brought', pastParticiple: 'brought', translation: 'bringen', example: 'She brought some cookies.' },
  { infinitive: 'buy', pastSimple: 'bought', pastParticiple: 'bought', translation: 'kaufen', example: 'They bought a new book.' },
  { infinitive: 'choose', pastSimple: 'chose', pastParticiple: 'chosen', translation: 'wählen', example: 'He was chosen as class captain.' },
  { infinitive: 'come', pastSimple: 'came', pastParticiple: 'come', translation: 'kommen', example: 'They came yesterday.' },
  { infinitive: 'do', pastSimple: 'did', pastParticiple: 'done', translation: 'tun / machen', example: 'I have done my homework.' },
  { infinitive: 'drink', pastSimple: 'drank', pastParticiple: 'drunk', translation: 'trinken', example: 'She drank cold water.' },
  { infinitive: 'drive', pastSimple: 'drove', pastParticiple: 'driven', translation: 'fahren', example: 'He drove safely.' },
  { infinitive: 'eat', pastSimple: 'ate', pastParticiple: 'eaten', translation: 'essen', example: 'We have eaten lunch.' },
  { infinitive: 'fall', pastSimple: 'fell', pastParticiple: 'fallen', translation: 'fallen', example: 'The leaves fell down.' },
  { infinitive: 'find', pastSimple: 'found', pastParticiple: 'found', translation: 'finden', example: 'I found my keys.' },
  { infinitive: 'fly', pastSimple: 'flew', pastParticiple: 'flown', translation: 'fliegen', example: 'The bird flew high.' },
  { infinitive: 'forget', pastSimple: 'forgot', pastParticiple: 'forgotten', translation: 'vergessen', example: 'Don’t forget your notes!' },
  { infinitive: 'get', pastSimple: 'got', pastParticiple: 'got / gotten', translation: 'bekommen', example: 'He got an A in math.' },
  { infinitive: 'give', pastSimple: 'gave', pastParticiple: 'given', translation: 'geben', example: 'She gave me advice.' },
  { infinitive: 'go', pastSimple: 'went', pastParticiple: 'gone', translation: 'gehen', example: 'They went to school.' },
  { infinitive: 'grow', pastSimple: 'grew', pastParticiple: 'grown', translation: 'wachsen', example: 'The plant has grown.' },
  { infinitive: 'have', pastSimple: 'had', pastParticiple: 'had', translation: 'haben', example: 'We had a good time.' },
  { infinitive: 'hear', pastSimple: 'heard', pastParticiple: 'heard', translation: 'hören', example: 'I heard the bell ring.' },
  { infinitive: 'know', pastSimple: 'knew', pastParticiple: 'known', translation: 'wissen / kennen', example: 'She knew the formula.' },
  { infinitive: 'leave', pastSimple: 'left', pastParticiple: 'left', translation: 'verlassen', example: 'The train left at 8.' },
  { infinitive: 'make', pastSimple: 'made', pastParticiple: 'made', translation: 'herstellen / machen', example: 'They made a poster.' },
  { infinitive: 'read', pastSimple: 'read (red)', pastParticiple: 'read (red)', translation: 'lesen', example: 'I have read the book.' },
  { infinitive: 'run', pastSimple: 'ran', pastParticiple: 'run', translation: 'rennen / laufen', example: 'He ran fast.' },
  { infinitive: 'see', pastSimple: 'saw', pastParticiple: 'seen', translation: 'sehen', example: 'Have you seen my pen?' },
  { infinitive: 'speak', pastSimple: 'spoke', pastParticiple: 'spoken', translation: 'sprechen', example: 'She spoke fluently.' },
  { infinitive: 'take', pastSimple: 'took', pastParticiple: 'taken', translation: 'nehmen', example: 'He took notes.' },
  { infinitive: 'write', pastSimple: 'wrote', pastParticiple: 'written', translation: 'schreiben', example: 'She wrote an essay.' }
];

export interface ConjugationTable {
  verb: string;
  translation: string;
  language: 'Französisch' | 'Spanisch' | 'Latein';
  tenses: {
    name: string;
    forms: string[];
  }[];
}

export const FOREIGN_CONJUGATIONS: ConjugationTable[] = [
  {
    verb: 'être',
    translation: 'sein (Französisch)',
    language: 'Französisch',
    tenses: [
      { name: 'Présent', forms: ['je suis', 'tu es', 'il/elle est', 'nous sommes', 'vous êtes', 'ils/elles sont'] },
      { name: 'Passé Composé', forms: ['j’ai été', 'tu as été', 'il a été', 'nous avons été', 'vous avez été', 'ils ont été'] },
      { name: 'Futur Simple', forms: ['je serai', 'tu seras', 'il sera', 'nous serons', 'vous serez', 'ils seront'] },
      { name: 'Imparfait', forms: ['j’étais', 'tu étais', 'il était', 'nous étions', 'vous étiez', 'ils étaient'] }
    ]
  },
  {
    verb: 'avoir',
    translation: 'haben (Französisch)',
    language: 'Französisch',
    tenses: [
      { name: 'Présent', forms: ['j’ai', 'tu as', 'il/elle a', 'nous avons', 'vous avez', 'ils/elles ont'] },
      { name: 'Passé Composé', forms: ['j’ai eu', 'tu as eu', 'il a eu', 'nous avons eu', 'vous avez eu', 'ils ont eu'] },
      { name: 'Futur Simple', forms: ['j’aurai', 'tu auras', 'il aura', 'nous aurons', 'vous aurez', 'ils auront'] }
    ]
  },
  {
    verb: 'ser / estar',
    translation: 'sein (Spanisch)',
    language: 'Spanisch',
    tenses: [
      { name: 'Ser (dauerhaft: Wesen/Herkunft)', forms: ['yo soy', 'tú eres', 'él/ella es', 'nosotros somos', 'vosotros sois', 'ellos son'] },
      { name: 'Estar (Zustand / Ort)', forms: ['yo estoy', 'tú estás', 'él/ella está', 'nosotros estamos', 'vosotros estáis', 'ellos están'] },
      { name: 'Indefinido (ser/ir)', forms: ['yo fui', 'tú fuiste', 'él fue', 'nosotros fuimos', 'vosotros fuisteis', 'ellos fueron'] }
    ]
  },
  {
    verb: 'esse (Latein)',
    translation: 'sein (Latein)',
    language: 'Latein',
    tenses: [
      { name: 'Präsens', forms: ['sum (ich bin)', 'es (du bist)', 'est (er/sie/es ist)', 'sumus (wir sind)', 'estis (ihr seid)', 'sunt (sie sind)'] },
      { name: 'Imperfekt', forms: ['eram (ich war)', 'eras (du warst)', 'erat (er war)', 'eramus (wir waren)', 'eratis (ihr wart)', 'erant (sie waren)'] },
      { name: 'Perfekt', forms: ['fui (ich bin gewesen)', 'fuisti', 'fuit', 'fuimus', 'fuistis', 'fuerunt'] }
    ]
  }
];

export const RHETORIC_DEVICES = [
  {
    name: 'Alliteration',
    definition: 'Gleicher Anlaut aufeinanderfolgender Wörter (Stabreim).',
    example: 'Milch macht müde Männer munter.',
    effect: 'Betonung, Einprägsamkeit, Rhythmus',
  },
  {
    name: 'Anapher',
    definition: 'Wiederholung eines oder mehrerer Wörter an Satz- oder Versanfängen.',
    example: 'Das Wasser rauscht’, das Wasser schwoll...',
    effect: 'Verstärkung, eindringliche Betonung',
  },
  {
    name: 'Antithese',
    definition: 'Gegenüberstellung gegensätzlicher Begriffe oder Gedanken.',
    example: 'Harter Kern, weiche Schale. / Der Wahn ist kurz, die Reu ist lang.',
    effect: 'Hervorhebung von Kontrasten, Spannungsaufbau',
  },
  {
    name: 'Chiasmus',
    definition: 'Überkreuzstellung von Satzgliedern (A-B-B-A Schema).',
    example: 'Die Kunst ist lang, und kurz ist unser Leben.',
    effect: 'Gegensatzbetonung, kunstvolle Struktur',
  },
  {
    name: 'Ellipse',
    definition: 'Grammatikalisch unvollständiger Satz (Auslassung von Wörtern).',
    example: 'Erst die Arbeit, dann das Vergnügen! / Je schneller, desto besser.',
    effect: 'Dramatik, Eile, Umgangssprache',
  },
  {
    name: 'Epipher',
    definition: 'Wiederholung gleicher Wörter am Ende aufeinanderfolgender Sätze.',
    example: 'Doch alle Lust will Ewigkeit, will tiefe, tiefe Ewigkeit!',
    effect: 'Rhythmische Steigerung, feierlicher Nachhall',
  },
  {
    name: 'Euphemismus',
    definition: 'Beschönigende oder verharmlosende Umschreibung.',
    example: 'Einschlafen (für sterben), vollschlank (für übergewichtig).',
    effect: 'Abmilderung unangenehmer Wahrheiten, Höflichkeit',
  },
  {
    name: 'Hyperbel',
    definition: 'Starke, oft maßlose Übertreibung.',
    example: 'Ich habe dir das schon tausendmal gesagt! / Ein Meer von Tränen.',
    effect: 'Dramatisierung, Gefühlsverstärkung, Ironie',
  },
  {
    name: 'Ironie',
    definition: 'Das Gegenteil des Gemeinten wird gesagt (erkennbar am Tonfall/Kontext).',
    example: 'Du hast ja heute wieder eine tolle Glanzleistung vollbracht!',
    effect: 'Spott, Distanzierung, Belustigung',
  },
  {
    name: 'Klimax',
    definition: 'Dreigliedrige Steigerung (vom Schwächeren zum Stärkeren).',
    example: 'Er kam, sah und siegte. / Für diese Stadt, für unser Land, für die ganze Welt.',
    effect: 'Spannungssteigerung, Emotionalisierung',
  },
  {
    name: 'Litotes',
    definition: 'Bejahung durch doppelte Verneinung oder Verneinung des Gegenteils.',
    example: 'Das ist nicht übel. / Sie ist nicht gerade die Ungeschickteste.',
    effect: 'Bescheidenheit, feine Ironie, Untertreibung',
  },
  {
    name: 'Metapher',
    definition: 'Bildhafter Ausdruck im übertragenen Sinn ohne Vergleichswort ("wie").',
    example: 'Rabenmutter, Bücherwurm, Warteschlange, Mauer des Schweigens.',
    effect: 'Anschaulichkeit, emotionale Verknüpfung',
  },
  {
    name: 'Oxymoron',
    definition: 'Verbindung zweier sich scheinbar widersprechender Begriffe.',
    example: 'Hassliebe, bittersüß, beredtes Schweigen, offenes Geheimnis.',
    effect: 'Verblüffung, Tiefsinn, Vielschichtigkeit',
  },
  {
    name: 'Personifikation',
    definition: 'Vermenschlichung von Dingen, Begriffen oder Tieren.',
    example: 'Die Sonne lacht. / Die Zeit rennt uns davon.',
    effect: 'Lebendigkeit, Poesie, Bildhaftigkeit',
  },
  {
    name: 'Rhetorische Frage',
    definition: 'Scheinfrage, auf die keine Antwort erwartet wird, da sie klar ist.',
    example: 'Wer möchte nicht gerne gute Noten schreiben?',
    effect: 'Einbindung des Publikums, Meinungsbestätigung',
  },
  {
    name: 'Vergleich',
    definition: 'Verknüpfung zweier Bereiche durch das Vergleichswort "wie" oder "als".',
    example: 'Stark wie ein Bär. / Schlau wie ein Fuchs.',
    effect: 'Veranschaulichung, Verstärkung von Eigenschaften',
  },
];

