import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';

export function ColorStudio() {
  const [hex, setHex] = useState('#6366f1'); // Indigo default
  const [copied, setCopied] = useState<string | null>(null);

  // Convert Hex to RGB
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Harmonies
  const complementaryHex = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
  const triadic1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
  const triadic2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
  const analog1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
  const analog2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Main Studio Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-fuchsia-600" />
            Kunst- & Design-Farbtheorie (Farbkreis nach Johannes Itten)
          </h3>
          <p className="text-xs text-neutral-500">
            Wähle eine Farbe und berechne Harmonien, Kontraste und Farbmodelle
          </p>
        </div>

        {/* Color Picker & Values */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Big Color swatch */}
          <div className="md:col-span-5 flex flex-col items-center gap-4">
            <div
              className="w-full h-36 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-md flex items-end p-4 transition-all"
              style={{ backgroundColor: hex }}
            >
              <span className="font-mono font-black text-sm px-3 py-1 bg-white/90 dark:bg-neutral-900/90 rounded-xl shadow-xs">
                {hex.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-12 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-mono text-sm font-bold uppercase"
              />
            </div>
          </div>

          {/* Color Values Table */}
          <div className="md:col-span-7 space-y-2.5">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">RGB (Rot, Grün, Blau)</span>
                <div className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-500"
              >
                {copied === `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">HSL (Hue, Saturation, Lightness)</span>
                <div className="font-mono font-bold text-sm text-neutral-900 dark:text-white">
                  hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-500"
              >
                {copied === `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Harmonies & Schemes */}
        <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Farbharmonien nach der Kunstlehre</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Complementary */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border space-y-2">
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">Komplementärfarbe (180°)</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: hex }} />
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: complementaryHex }} />
              </div>
              <span className="font-mono text-xs text-neutral-500 block">{complementaryHex.toUpperCase()}</span>
            </div>

            {/* Triadic */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border space-y-2">
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">Triadischer Dreiklang (120°)</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: hex }} />
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: triadic1 }} />
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: triadic2 }} />
              </div>
            </div>

            {/* Analogous */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border space-y-2">
              <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">Analoge Nachbarfarben (±30°)</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: analog1 }} />
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: hex }} />
                <div className="w-10 h-10 rounded-xl border shadow-xs" style={{ backgroundColor: analog2 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
