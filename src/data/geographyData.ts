export interface CountryCapital {
  name: string;
  capital: string;
  continent: string;
  flag: string;
  currency: string;
  population: string;
  area: number;
}

export interface GermanState {
  name: string;
  capital: string;
  population: string;
  area: number;
}

export const COUNTRIES_DATA: CountryCapital[] = [
  { name: 'Deutschland', capital: 'Berlin', continent: 'Europa', flag: '🇩🇪', currency: 'Euro (€)', population: '84', area: 357588 },
  { name: 'Frankreich', capital: 'Paris', continent: 'Europa', flag: '🇫🇷', currency: 'Euro (€)', population: '68', area: 551695 },
  { name: 'Italien', capital: 'Rom', continent: 'Europa', flag: '🇮🇹', currency: 'Euro (€)', population: '59', area: 301338 },
  { name: 'Spanien', capital: 'Madrid', continent: 'Europa', flag: '🇪🇸', currency: 'Euro (€)', population: '48', area: 505990 },
  { name: 'Großbritannien', capital: 'London', continent: 'Europa', flag: '🇬🇧', currency: 'Pfund (£)', population: '67', area: 242495 },
  { name: 'Österreich', capital: 'Wien', continent: 'Europa', flag: '🇦🇹', currency: 'Euro (€)', population: '9.1', area: 83879 },
  { name: 'Schweiz', capital: 'Bern', continent: 'Europa', flag: '🇨🇭', currency: 'Franken (CHF)', population: '8.9', area: 41285 },
  { name: 'Polen', capital: 'Warschau', continent: 'Europa', flag: '🇵🇱', currency: 'Złoty (PLN)', population: '38', area: 312696 },
  { name: 'Schweden', capital: 'Stockholm', continent: 'Europa', flag: '🇸🇪', currency: 'Krone (SEK)', population: '10.5', area: 450295 },
  { name: 'Norwegen', capital: 'Oslo', continent: 'Europa', flag: '🇳🇴', currency: 'Krone (NOK)', population: '5.5', area: 385207 },
  { name: 'Niederlande', capital: 'Amsterdam', continent: 'Europa', flag: '🇳🇱', currency: 'Euro (€)', population: '18', area: 41850 },
  { name: 'Griechenland', capital: 'Athen', continent: 'Europa', flag: '🇬🇷', currency: 'Euro (€)', population: '10.4', area: 131957 },
  { name: 'Portugal', capital: 'Lissabon', continent: 'Europa', flag: '🇵🇹', currency: 'Euro (€)', population: '10.3', area: 92212 },
  { name: 'USA', capital: 'Washington, D.C.', continent: 'Nordamerika', flag: '🇺🇸', currency: 'US-Dollar ($)', population: '335', area: 9833517 },
  { name: 'Kanada', capital: 'Ottawa', continent: 'Nordamerika', flag: '🇨🇦', currency: 'CAD ($)', population: '40', area: 9984670 },
  { name: 'Japan', capital: 'Tokio', continent: 'Asien', flag: '🇯🇵', currency: 'Yen (¥)', population: '125', area: 377975 },
  { name: 'China', capital: 'Peking', continent: 'Asien', flag: '🇨🇳', currency: 'Yuan (¥)', population: '1410', area: 9596961 },
  { name: 'Indien', capital: 'Neu-Delhi', continent: 'Asien', flag: '🇮🇳', currency: 'Rupie (₹)', population: '1430', area: 3287263 },
  { name: 'Australien', capital: 'Canberra', continent: 'Ozeanien', flag: '🇦🇺', currency: 'AUD ($)', population: '26', area: 7692024 },
  { name: 'Brasilien', capital: 'Brasília', continent: 'Südamerika', flag: '🇧🇷', currency: 'Real (R$)', population: '215', area: 8515767 },
  { name: 'Ägypten', capital: 'Kairo', continent: 'Afrika', flag: '🇪🇬', currency: 'EGP (£)', population: '110', area: 1002450 },
  { name: 'Südafrika', capital: 'Pretoria', continent: 'Afrika', flag: '🇿🇦', currency: 'Rand (ZAR)', population: '60', area: 1221037 },
];

export const GERMAN_STATES: GermanState[] = [
  { name: 'Baden-Württemberg', capital: 'Stuttgart', population: '11.3', area: 35751 },
  { name: 'Bayern', capital: 'München', population: '13.4', area: 70542 },
  { name: 'Berlin', capital: 'Berlin', population: '3.7', area: 891 },
  { name: 'Brandenburg', capital: 'Potsdam', population: '2.6', area: 29654 },
  { name: 'Bremen', capital: 'Bremen', population: '0.7', area: 419 },
  { name: 'Hamburg', capital: 'Hamburg', population: '1.9', area: 755 },
  { name: 'Hessen', capital: 'Wiesbaden', population: '6.4', area: 21115 },
  { name: 'Mecklenburg-Vorpommern', capital: 'Schwerin', population: '1.6', area: 23214 },
  { name: 'Niedersachsen', capital: 'Hannover', population: '8.1', area: 47614 },
  { name: 'Nordrhein-Westfalen', capital: 'Düsseldorf', population: '18.1', area: 34110 },
  { name: 'Rheinland-Pfalz', capital: 'Mainz', population: '4.2', area: 19854 },
  { name: 'Saarland', capital: 'Saarbrücken', population: '1.0', area: 2570 },
  { name: 'Sachsen', capital: 'Dresden', population: '4.1', area: 18450 },
  { name: 'Sachsen-Anhalt', capital: 'Magdeburg', population: '2.2', area: 20452 },
  { name: 'Schleswig-Holstein', capital: 'Kiel', population: '2.9', area: 15799 },
  { name: 'Thüringen', capital: 'Erfurt', population: '2.1', area: 16173 },
];

export const TIMEZONES = [
  { city: 'Berlin / Wien / Zürich', zone: 'Europe/Berlin', offset: '+1' },
  { city: 'London', zone: 'Europe/London', offset: '±0' },
  { city: 'New York (EST)', zone: 'America/New_York', offset: '-5' },
  { city: 'San Francisco (PST)', zone: 'America/Los_Angeles', offset: '-8' },
  { city: 'Tokio', zone: 'Asia/Tokyo', offset: '+9' },
  { city: 'Sydney', zone: 'Australia/Sydney', offset: '+10' },
  { city: 'Peking', zone: 'Asia/Shanghai', offset: '+8' },
  { city: 'Dubai', zone: 'Asia/Dubai', offset: '+4' },
];
