import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Code, Layers } from 'lucide-react';

export function BinaryConverter() {
  const [decVal, setDecVal] = useState('42');
  const [textInput, setTextInput] = useState('Schule');

  // Convert decimal to other bases
  const parseDec = parseInt(decVal, 10) || 0;
  const binVal = (parseDec >>> 0).toString(2);
  const hexVal = (parseDec >>> 0).toString(16).toUpperCase();
  const octVal = (parseDec >>> 0).toString(8);

  const handleBaseChange = (value: string, base: number) => {
    try {
      const parsed = parseInt(value, base);
      if (!isNaN(parsed)) {
        setDecVal(parsed.toString(10));
      } else if (value === '') {
        setDecVal('0');
      }
    } catch (e) {}
  };

  // Convert text to ASCII binary
  const textToBinary = (text: string) => {
    return text
      .split('')
      .map((char) => {
        const bin = char.charCodeAt(0).toString(2);
        return '0'.repeat(8 - bin.length) + bin;
      })
      .join(' ');
  };

  const textToHex = (text: string) => {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Number System Converter */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Binary className="w-5 h-5 text-indigo-600" />
            Zahlensysteme-Umrechner (Dezimal, Binär, Hex, Oktal)
          </h3>
          <p className="text-xs text-neutral-500">Ändere ein beliebiges Feld für Live-Synchronisation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Decimal */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Dezimal (Basis 10)
            </label>
            <input
              type="number"
              value={decVal}
              onChange={(e) => setDecVal(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border rounded-xl font-mono font-bold text-base"
            />
            <span className="text-[10px] text-neutral-400">Ziffern 0-9</span>
          </div>

          {/* Binary */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Binär / Dual (Basis 2)
            </label>
            <input
              type="text"
              value={binVal}
              onChange={(e) => handleBaseChange(e.target.value, 2)}
              className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border rounded-xl font-mono font-bold text-base"
            />
            <span className="text-[10px] text-neutral-400">Bits 0 und 1</span>
          </div>

          {/* Hexadecimal */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Hexadezimal (Basis 16)
            </label>
            <input
              type="text"
              value={hexVal}
              onChange={(e) => handleBaseChange(e.target.value, 16)}
              className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border rounded-xl font-mono font-bold text-base"
            />
            <span className="text-[10px] text-neutral-400">0-9 und A-F</span>
          </div>

          {/* Octal */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Oktal (Basis 8)
            </label>
            <input
              type="text"
              value={octVal}
              onChange={(e) => handleBaseChange(e.target.value, 8)}
              className="w-full px-3 py-2 bg-white dark:bg-neutral-900 border rounded-xl font-mono font-bold text-base"
            />
            <span className="text-[10px] text-neutral-400">Ziffern 0-7</span>
          </div>
        </div>

        {/* 8-Bit Visualizer */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
          <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 block">
            8-Bit Register Darstellung (2⁷ bis 2⁰):
          </span>
          <div className="grid grid-cols-8 gap-1.5 text-center font-mono">
            {[128, 64, 32, 16, 8, 4, 2, 1].map((weight, idx) => {
              const bit = (parseDec & weight) ? 1 : 0;
              return (
                <div
                  key={weight}
                  className={`p-2.5 rounded-xl border transition-all ${
                    bit ? 'bg-indigo-600 text-white font-bold border-indigo-700' : 'bg-white dark:bg-neutral-900 text-neutral-400 border-indigo-100'
                  }`}
                >
                  <div className="text-lg font-black">{bit}</div>
                  <div className="text-[9px] opacity-75">{weight}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ASCII Text to Binary & Hex */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Code className="w-4 h-4 text-indigo-600" />
          Text zu ASCII Binär- & Hex-Code
        </h3>

        <div>
          <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Text eingeben</label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border space-y-1">
            <span className="text-xs font-bold text-neutral-500 uppercase">Binär (8-Bit pro Zeichen)</span>
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all pt-1 leading-relaxed">
              {textToBinary(textInput) || '—'}
            </div>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border space-y-1">
            <span className="text-xs font-bold text-neutral-500 uppercase">Hexadezimal Byte-Folge</span>
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all pt-1 leading-relaxed">
              {textToHex(textInput) || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
