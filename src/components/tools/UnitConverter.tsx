import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';

interface UnitCategory {
  id: string;
  name: string;
  icon: string;
  baseUnit: string;
  units: { id: string; name: string; symbol: string; factor: number; offset?: number }[];
}

const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Länge & Distanz',
    icon: '📏',
    baseUnit: 'm',
    units: [
      { id: 'mm', name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { id: 'cm', name: 'Zentimeter', symbol: 'cm', factor: 0.01 },
      { id: 'dm', name: 'Dezimeter', symbol: 'dm', factor: 0.1 },
      { id: 'm', name: 'Meter', symbol: 'm', factor: 1 },
      { id: 'km', name: 'Kilometer', symbol: 'km', factor: 1000 },
      { id: 'in', name: 'Zoll (Inch)', symbol: 'in', factor: 0.0254 },
      { id: 'ft', name: 'Fuß (Foot)', symbol: 'ft', factor: 0.3048 },
      { id: 'yd', name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { id: 'mi', name: 'Meile (Mile)', symbol: 'mi', factor: 1609.344 },
      { id: 'nmi', name: 'Seemeile (Nautical)', symbol: 'NM', factor: 1852 },
    ]
  },
  {
    id: 'mass',
    name: 'Masse & Gewicht',
    icon: '⚖️',
    baseUnit: 'kg',
    units: [
      { id: 'mg', name: 'Milligramm', symbol: 'mg', factor: 0.000001 },
      { id: 'g', name: 'Gramm', symbol: 'g', factor: 0.001 },
      { id: 'kg', name: 'Kilogramm', symbol: 'kg', factor: 1 },
      { id: 't', name: 'Tonne', symbol: 't', factor: 1000 },
      { id: 'oz', name: 'Unze (Ounce)', symbol: 'oz', factor: 0.0283495 },
      { id: 'lb', name: 'Pfund (Pound)', symbol: 'lb', factor: 0.45359237 },
      { id: 'st', name: 'Stone (UK)', symbol: 'st', factor: 6.35029 },
    ]
  },
  {
    id: 'area',
    name: 'Fläche',
    icon: '📐',
    baseUnit: 'm2',
    units: [
      { id: 'mm2', name: 'Quadratmillimeter', symbol: 'mm²', factor: 0.000001 },
      { id: 'cm2', name: 'Quadratzentimeter', symbol: 'cm²', factor: 0.0001 },
      { id: 'm2', name: 'Quadratmeter', symbol: 'm²', factor: 1 },
      { id: 'a', name: 'Ar', symbol: 'a', factor: 100 },
      { id: 'ha', name: 'Hektar', symbol: 'ha', factor: 10000 },
      { id: 'km2', name: 'Quadratkilometer', symbol: 'km²', factor: 1000000 },
      { id: 'sqft', name: 'Square Foot', symbol: 'sq ft', factor: 0.092903 },
      { id: 'sqyd', name: 'Square Yard', symbol: 'sq yd', factor: 0.836127 },
      { id: 'acre', name: 'Acre (Morgen)', symbol: 'ac', factor: 4046.86 },
    ]
  },
  {
    id: 'volume',
    name: 'Volumen & Hohlmaße',
    icon: '🧪',
    baseUnit: 'l',
    units: [
      { id: 'ml', name: 'Milliliter (cm³)', symbol: 'ml', factor: 0.001 },
      { id: 'cl', name: 'Zentiliter', symbol: 'cl', factor: 0.01 },
      { id: 'dl', name: 'Deziliter', symbol: 'dl', factor: 0.1 },
      { id: 'l', name: 'Liter (dm³)', symbol: 'l', factor: 1 },
      { id: 'm3', name: 'Kubikmeter', symbol: 'm³', factor: 1000 },
      { id: 'floz', name: 'Fluid Ounce (US)', symbol: 'fl oz', factor: 0.0295735 },
      { id: 'cup', name: 'Cup (US Tasse)', symbol: 'cup', factor: 0.24 },
      { id: 'pt', name: 'Pint (US)', symbol: 'pt', factor: 0.473176 },
      { id: 'gal', name: 'Gallone (US)', symbol: 'gal', factor: 3.78541 },
      { id: 'tbsp', name: 'Esslöffel (EL)', symbol: 'tbsp', factor: 0.015 },
      { id: 'tsp', name: 'Teelöffel (TL)', symbol: 'tsp', factor: 0.005 },
    ]
  },
  {
    id: 'temperature',
    name: 'Temperatur',
    icon: '🌡️',
    baseUnit: 'c',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', factor: 1 },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 1 },
      { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1 },
      { id: 'r', name: 'Rankine', symbol: '°R', factor: 1 },
    ]
  },
  {
    id: 'time',
    name: 'Zeit',
    icon: '⏳',
    baseUnit: 's',
    units: [
      { id: 'ms', name: 'Millisekunden', symbol: 'ms', factor: 0.001 },
      { id: 's', name: 'Sekunden', symbol: 's', factor: 1 },
      { id: 'min', name: 'Minuten', symbol: 'min', factor: 60 },
      { id: 'h', name: 'Stunden', symbol: 'h', factor: 3600 },
      { id: 'd', name: 'Tage', symbol: 'd', factor: 86400 },
      { id: 'w', name: 'Wochen', symbol: 'w', factor: 604800 },
      { id: 'mon', name: 'Monate (30 Tage)', symbol: 'Monate', factor: 2592000 },
      { id: 'y', name: 'Jahre (365,25 Tage)', symbol: 'a / J.', factor: 31557600 },
    ]
  },
  {
    id: 'speed',
    name: 'Geschwindigkeit',
    icon: '🚀',
    baseUnit: 'mps',
    units: [
      { id: 'mps', name: 'Meter pro Sekunde', symbol: 'm/s', factor: 1 },
      { id: 'kmh', name: 'Kilometer pro Stunde', symbol: 'km/h', factor: 1 / 3.6 },
      { id: 'mph', name: 'Meilen pro Stunde', symbol: 'mph', factor: 0.44704 },
      { id: 'kn', name: 'Knoten (Seemeilen/h)', symbol: 'kn', factor: 0.514444 },
      { id: 'mach', name: 'Schallgeschwindigkeit (Mach)', symbol: 'Ma', factor: 343 },
    ]
  },
  {
    id: 'data',
    name: 'Daten & Speicher',
    icon: '💾',
    baseUnit: 'byte',
    units: [
      { id: 'bit', name: 'Bit', symbol: 'b', factor: 0.125 },
      { id: 'byte', name: 'Byte', symbol: 'B', factor: 1 },
      { id: 'kb', name: 'Kilobyte (1000 B)', symbol: 'KB', factor: 1000 },
      { id: 'kib', name: 'Kibibyte (1024 B)', symbol: 'KiB', factor: 1024 },
      { id: 'mb', name: 'Megabyte (1000 KB)', symbol: 'MB', factor: 1000000 },
      { id: 'mib', name: 'Mebibyte (1024 KiB)', symbol: 'MiB', factor: 1048576 },
      { id: 'gb', name: 'Gigabyte (1000 MB)', symbol: 'GB', factor: 1000000000 },
      { id: 'gib', name: 'Gibibyte (1024 MiB)', symbol: 'GiB', factor: 1073741824 },
      { id: 'tb', name: 'Terabyte (1000 GB)', symbol: 'TB', factor: 1000000000000 },
    ]
  },
  {
    id: 'pressure',
    name: 'Druck',
    icon: '💨',
    baseUnit: 'pa',
    units: [
      { id: 'pa', name: 'Pascal (N/m²)', symbol: 'Pa', factor: 1 },
      { id: 'hpa', name: 'Hektopascal / mbar', symbol: 'hPa', factor: 100 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factor: 100000 },
      { id: 'atm', name: 'Phys. Atmosphäre', symbol: 'atm', factor: 101325 },
      { id: 'psi', name: 'Pfund pro Quadratzoll', symbol: 'psi', factor: 6894.76 },
      { id: 'torr', name: 'Torr / mm Quecksilbersäule', symbol: 'mmHg', factor: 133.322 },
    ]
  },
  {
    id: 'energy',
    name: 'Energie & Leistung',
    icon: '⚡',
    baseUnit: 'j',
    units: [
      { id: 'j', name: 'Joule (Nm / Ws)', symbol: 'J', factor: 1 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      { id: 'cal', name: 'Kalorie', symbol: 'cal', factor: 4.184 },
      { id: 'kcal', name: 'Kilokalorie (Nährwert)', symbol: 'kcal', factor: 4184 },
      { id: 'wh', name: 'Wattstunde', symbol: 'Wh', factor: 3600 },
      { id: 'kwh', name: 'Kilowattstunde', symbol: 'kWh', factor: 3600000 },
      { id: 'ev', name: 'Elektronenvolt', symbol: 'eV', factor: 1.602176634e-19 },
    ]
  }
];

export function UnitConverter() {
  const [selectedCatId, setSelectedCatId] = useState<string>('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('km');
  const [copied, setCopied] = useState(false);

  const currentCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const convertTemperature = (val: number, from: string, to: string): number => {
    let celsius = val;
    if (from === 'f') celsius = (val - 32) * (5 / 9);
    else if (from === 'k') celsius = val - 273.15;
    else if (from === 'r') celsius = (val - 491.67) * (5 / 9);

    if (to === 'c') return celsius;
    if (to === 'f') return celsius * (9 / 5) + 32;
    if (to === 'k') return celsius + 273.15;
    if (to === 'r') return (celsius + 273.15) * (9 / 5);
    return celsius;
  };

  const calculateResult = (): number => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 0;

    if (currentCategory.id === 'temperature') {
      return convertTemperature(val, fromUnitId, toUnitId);
    }

    const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId);
    const toUnit = currentCategory.units.find((u) => u.id === toUnitId);

    if (!fromUnit || !toUnit) return 0;

    // Convert from source to base, then base to target
    const baseValue = val * fromUnit.factor;
    return baseValue / toUnit.factor;
  };

  const swapUnits = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const result = calculateResult();
  const formattedResult = Number.isInteger(result)
    ? result.toString()
    : result.toPrecision(7).replace(/\.?0+$/, '');

  const fromUnitObj = currentCategory.units.find((u) => u.id === fromUnitId);
  const toUnitObj = currentCategory.units.find((u) => u.id === toUnitId);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${inputValue} ${fromUnitObj?.symbol} = ${formattedResult} ${toUnitObj?.symbol}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Slider */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCatId === cat.id
                ? 'bg-emerald-600 text-white shadow-sm scale-102'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Conversion Panel */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* FROM Input Box */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Ausgangswert & Einheit</label>
            <div className="space-y-2">
              <input
                type="number"
                step="any"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 text-2xl font-bold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 tabular-nums"
              />
              <select
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:col-span-1">
            <button
              onClick={swapUnits}
              title="Einheiten tauschen"
              className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-neutral-700 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-xs transition-all active:scale-95"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* TO Result Box */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Ergebnis & Ziel-Einheit</label>
            <div className="space-y-2">
              <div className="w-full px-4 py-3 text-2xl font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 rounded-2xl flex items-center justify-between overflow-x-auto tabular-nums">
                <span>{formattedResult}</span>
                <button
                  onClick={copyToClipboard}
                  title="Ergebnis kopieren"
                  className="p-1.5 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 transition-colors shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Quick Conversion Matrix / Cheat Table for All Units in this category */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Schnell-Übersicht für alle {currentCategory.name}-Einheiten ({inputValue || 1} {fromUnitObj?.symbol})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {currentCategory.units.map((u) => {
              const val = parseFloat(inputValue) || 0;
              let converted = 0;
              if (currentCategory.id === 'temperature') {
                converted = convertTemperature(val, fromUnitId, u.id);
              } else {
                const f = fromUnitObj?.factor || 1;
                converted = (val * f) / u.factor;
              }
              const display = Number.isInteger(converted) ? converted.toString() : converted.toPrecision(6).replace(/\.?0+$/, '');

              return (
                <div
                  key={u.id}
                  onClick={() => setToUnitId(u.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    toUnitId === u.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 font-bold text-emerald-900 dark:text-emerald-200'
                      : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200/80 dark:border-neutral-700/60 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-neutral-500 dark:text-neutral-400 font-medium truncate">{u.name}</div>
                  <div className="text-sm font-semibold truncate mt-0.5">
                    {display} <span className="text-xs text-neutral-400 font-normal">{u.symbol}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
