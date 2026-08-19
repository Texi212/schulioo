import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Calculator, RefreshCw, ZoomIn, ZoomOut, Check } from 'lucide-react';

export function GraphingCalc() {
  const [calcInput, setCalcInput] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);

  // Graph state
  const [funcExpr, setFuncExpr] = useState('x^2 - 4');
  const [zoom, setZoom] = useState(30); // pixels per unit
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scientific calculator keypad input
  const handleKey = (char: string) => {
    if (char === 'C') {
      setCalcInput('0');
    } else if (char === 'DEL') {
      setCalcInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (char === '=') {
      try {
        // Safe evaluation
        const sanitized = calcInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/\^/g, '**')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(');

        // evaluate safely
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcInput(res.toString());
      } catch (err) {
        setCalcInput('Fehler');
      }
    } else {
      setCalcInput((prev) => (prev === '0' || prev === 'Fehler' ? char : prev + char));
    }
  };

  // Draw 2D Function Graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid
    for (let x = originX % zoom; x < width; x += zoom) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    // Horizontal grid
    for (let y = originY % zoom; y < height; y += zoom) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 2;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px monospace';
    for (let x = originX + zoom; x < width; x += zoom * 2) {
      const val = Math.round((x - originX) / zoom);
      ctx.fillText(val.toString(), x - 4, originY + 14);
    }
    for (let x = originX - zoom * 2; x > 0; x -= zoom * 2) {
      const val = Math.round((x - originX) / zoom);
      ctx.fillText(val.toString(), x - 6, originY + 14);
    }
    for (let y = originY - zoom * 2; y > 0; y -= zoom * 2) {
      const val = Math.round((originY - y) / zoom);
      ctx.fillText(val.toString(), originX + 6, y + 4);
    }
    for (let y = originY + zoom * 2; y < height; y += zoom * 2) {
      const val = Math.round((originY - y) / zoom);
      ctx.fillText(val.toString(), originX + 6, y + 4);
    }

    // Function Curve
    try {
      const cleanExpr = funcExpr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/\^/g, '**')
        .replace(/(\d+)(x)/g, '$1*$2');

      const evalFn = new Function('x', `try { return (${cleanExpr}); } catch(e) { return NaN; }`);

      ctx.strokeStyle = '#0d9488'; // Teal
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let isFirst = true;
      for (let px = 0; px < width; px += 2) {
        const mathX = (px - originX) / zoom;
        const mathY = evalFn(mathX);

        if (!isNaN(mathY) && isFinite(mathY)) {
          const py = originY - mathY * zoom;
          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isFirst = true;
        }
      }
      ctx.stroke();
    } catch (err) {
      // Invalid function syntax
    }
  }, [funcExpr, zoom]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Scientific Calculator Column (5 cols) */}
      <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-teal-600" /> Wissenschaftlicher Rechner
        </h3>

        {/* Display Screen */}
        <div className="p-4 bg-neutral-950 text-white rounded-2xl font-mono text-right overflow-x-auto shadow-inner">
          <div className="text-xs text-neutral-400 min-h-4 truncate">f(x) / Speicher</div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight mt-1 truncate">{calcInput}</div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
          {['sin(', 'cos(', 'tan(', 'C', 'sqrt(', '^', '÷', 'DEL', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '(', ')'].map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`py-3 rounded-xl transition-all active:scale-95 ${
                key === 'C' || key === 'DEL'
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                  : ['÷', '×', '-', '+'].includes(key)
                  ? 'bg-teal-100 hover:bg-teal-200 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300'
                  : ['sin(', 'cos(', 'tan(', 'sqrt(', '^'].includes(key)
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs'
                  : 'bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white'
              }`}
            >
              {key}
            </button>
          ))}
          <button
            onClick={() => handleKey('=')}
            className="col-span-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs transition-all active:scale-98"
          >
            = Berechnen
          </button>
        </div>
      </div>

      {/* 2D Graph Plotter Column (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <LineChart className="w-4 h-4 text-teal-600" /> 2D-Funktionsplotter
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom((z) => Math.min(100, z + 5))}
                className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 hover:bg-neutral-200"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(10, z - 5))}
                className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 hover:bg-neutral-200"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Function expression input */}
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">f(x) =</span>
            <input
              type="text"
              value={funcExpr}
              onChange={(e) => setFuncExpr(e.target.value)}
              placeholder="z.B. x^2 - 4 oder sin(x)"
              className="flex-1 px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-sm font-semibold"
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['x^2 - 4', 'sin(x)', '2*x + 1', 'x^3 - 3*x', '1/x', 'sqrt(abs(x))'].map((preset) => (
              <button
                key={preset}
                onClick={() => setFuncExpr(preset)}
                className="text-[11px] font-mono px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-neutral-600 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={520}
            height={320}
            className="w-full h-auto max-h-[340px] block"
          />
        </div>
      </div>
    </div>
  );
}
