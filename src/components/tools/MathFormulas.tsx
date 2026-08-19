import React, { useState } from 'react';
import { SquareRadical, Shapes, Box, Percent, ArrowRight } from 'lucide-react';

export function MathFormulas() {
  const [activeTab, setActiveTab] = useState<'quadratic' | 'geometry2d' | 'geometry3d' | 'percent'>('quadratic');

  // Quadratic equation state: ax² + bx + c = 0
  const [quadA, setQuadA] = useState('1');
  const [quadB, setQuadB] = useState('-4');
  const [quadC, setQuadC] = useState('3');

  // Geometry 2D: Circle / Triangle / Rectangle / Trapezoid
  const [shape2D, setShape2D] = useState<'circle' | 'triangle' | 'rectangle' | 'trapezoid'>('circle');
  const [circleR, setCircleR] = useState('5');
  const [triA, setTriA] = useState('3');
  const [triB, setTriB] = useState('4');
  const [triC, setTriC] = useState('5');
  const [rectA, setRectA] = useState('6');
  const [rectB, setRectB] = useState('4');

  // Geometry 3D: Sphere / Cylinder / Cone / Cuboid
  const [shape3D, setShape3D] = useState<'sphere' | 'cylinder' | 'cuboid' | 'cone'>('sphere');
  const [sphereR, setSphereR] = useState('4');
  const [cylR, setCylR] = useState('3');
  const [cylH, setCylH] = useState('8');
  const [cubA, setCubA] = useState('4');
  const [cubB, setCubB] = useState('5');
  const [cubC, setCubC] = useState('6');

  // Percent & Dreisatz
  const [baseVal, setBaseVal] = useState('250');
  const [percentRate, setPercentRate] = useState('19');

  // Calculate Quadratic Solution
  const solveQuadratic = () => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) return { error: 'Ungültige Zahlen' };
    if (a === 0) return { error: 'Für a = 0 ist dies eine lineare Gleichung: x = ' + (-c / b).toFixed(3) };

    const discriminant = b * b - 4 * a * c;
    const p = b / a;
    const q = c / a;

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return {
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        d: discriminant.toFixed(4),
        p: p.toFixed(4),
        q: q.toFixed(4),
        type: 'two_solutions',
      };
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      return {
        x1: x.toFixed(4),
        d: '0',
        p: p.toFixed(4),
        q: q.toFixed(4),
        type: 'one_solution',
      };
    } else {
      return {
        d: discriminant.toFixed(4),
        p: p.toFixed(4),
        q: q.toFixed(4),
        type: 'no_real_solution',
      };
    }
  };

  const quadResult = solveQuadratic();

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-xl mx-auto">
        <button
          onClick={() => setActiveTab('quadratic')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'quadratic' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          pq- & Mitternachtsformel
        </button>
        <button
          onClick={() => setActiveTab('geometry2d')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'geometry2d' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          2D Flächen & Umfang
        </button>
        <button
          onClick={() => setActiveTab('geometry3d')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'geometry3d' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          3D Körper & Volumen
        </button>
        <button
          onClick={() => setActiveTab('percent')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'percent' ? 'bg-white dark:bg-neutral-900 text-sky-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Prozent & Zinsen
        </button>
      </div>

      {/* Tab 1: Quadratic Equations */}
      {activeTab === 'quadratic' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Quadratische Gleichungen Löser</h3>
            <p className="text-xs text-neutral-500">
              Form: <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">a·x² + b·x + c = 0</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Koeffizient a</label>
              <input
                type="number"
                step="any"
                value={quadA}
                onChange={(e) => setQuadA(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Koeffizient b</label>
              <input
                type="number"
                step="any"
                value={quadB}
                onChange={(e) => setQuadB(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Koeffizient c</label>
              <input
                type="number"
                step="any"
                value={quadC}
                onChange={(e) => setQuadC(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-bold"
              />
            </div>
          </div>

          {/* Step by Step calculation box */}
          <div className="p-5 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl space-y-4">
            <h4 className="font-bold text-sky-900 dark:text-sky-200 text-sm flex items-center gap-2">
              <SquareRadical className="w-4 h-4" /> Schritt-für-Schritt Lösungsweg
            </h4>

            {'error' in quadResult ? (
              <p className="text-sm text-red-600 font-semibold">{quadResult.error}</p>
            ) : (
              <div className="space-y-3 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-sky-100 dark:border-sky-900 space-y-1">
                  <div className="text-neutral-500 text-xs font-sans">1. Normalform (x² + px + q = 0) durch Teilen mit a={quadA}:</div>
                  <div>x² + ({quadResult.p})x + ({quadResult.q}) = 0 &rarr; p = {quadResult.p}, q = {quadResult.q}</div>
                </div>

                <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-sky-100 dark:border-sky-900 space-y-1">
                  <div className="text-neutral-500 text-xs font-sans">2. Diskriminante D = b² - 4ac:</div>
                  <div>D = ({quadB})² - 4·({quadA})·({quadC}) = <span className="font-bold text-sky-600">{quadResult.d}</span></div>
                </div>

                <div className="p-4 bg-sky-600 text-white rounded-xl shadow-xs">
                  <div className="text-xs uppercase font-sans tracking-wider opacity-80 mb-1">3. Ergebnis / Nullstellen</div>
                  {quadResult.type === 'two_solutions' && (
                    <div className="text-lg font-black font-sans">
                      x₁ = {quadResult.x1} &nbsp;&nbsp;|&nbsp;&nbsp; x₂ = {quadResult.x2}
                    </div>
                  )}
                  {quadResult.type === 'one_solution' && (
                    <div className="text-lg font-black font-sans">
                      Genau eine doppelte Nullstelle: x = {quadResult.x1}
                    </div>
                  )}
                  {quadResult.type === 'no_real_solution' && (
                    <div className="text-base font-bold font-sans">
                      Keine reellen Lösungen (Diskriminante D &lt; 0)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: 2D Geometry */}
      {activeTab === 'geometry2d' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex gap-2">
            {[
              { id: 'circle', label: 'Kreis' },
              { id: 'triangle', label: 'Dreieck' },
              { id: 'rectangle', label: 'Rechteck' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setShape2D(s.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  shape2D === s.id ? 'bg-sky-600 text-white shadow-xs' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {shape2D === 'circle' && (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Radius (r)</label>
                <input
                  type="number"
                  value={circleR}
                  onChange={(e) => setCircleR(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Fläche A = π · r²</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(Math.PI * Math.pow(parseFloat(circleR) || 0, 2)).toFixed(3)}
                  </div>
                </div>
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Umfang U = 2 · π · r</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(2 * Math.PI * (parseFloat(circleR) || 0)).toFixed(3)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {shape2D === 'rectangle' && (
            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Seite a</label>
                  <input
                    type="number"
                    value={rectA}
                    onChange={(e) => setRectA(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Seite b</label>
                  <input
                    type="number"
                    value={rectB}
                    onChange={(e) => setRectB(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800">
                  <span className="text-[11px] text-neutral-500">Fläche A = a·b</span>
                  <div className="text-xl font-black text-sky-600 mt-1">
                    {((parseFloat(rectA) || 0) * (parseFloat(rectB) || 0)).toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800">
                  <span className="text-[11px] text-neutral-500">Umfang U = 2(a+b)</span>
                  <div className="text-xl font-black text-sky-600 mt-1">
                    {(2 * ((parseFloat(rectA) || 0) + (parseFloat(rectB) || 0))).toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800">
                  <span className="text-[11px] text-neutral-500">Diagonale d = √(a²+b²)</span>
                  <div className="text-xl font-black text-sky-600 mt-1">
                    {Math.sqrt(Math.pow(parseFloat(rectA) || 0, 2) + Math.pow(parseFloat(rectB) || 0, 2)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {shape2D === 'triangle' && (
            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Seite a</label>
                  <input
                    type="number"
                    value={triA}
                    onChange={(e) => setTriA(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Seite b</label>
                  <input
                    type="number"
                    value={triB}
                    onChange={(e) => setTriB(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Seite c</label>
                  <input
                    type="number"
                    value={triC}
                    onChange={(e) => setTriC(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
              </div>
              {/* Heron formula */}
              {(() => {
                const a = parseFloat(triA) || 0;
                const b = parseFloat(triB) || 0;
                const c = parseFloat(triC) || 0;
                const s = (a + b + c) / 2;
                const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
                return (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                      <span className="text-xs text-neutral-500 font-semibold">Fläche (Satz des Heron)</span>
                      <div className="text-2xl font-black text-sky-600 mt-1">{area.toFixed(3)}</div>
                    </div>
                    <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                      <span className="text-xs text-neutral-500 font-semibold">Umfang (a+b+c)</span>
                      <div className="text-2xl font-black text-sky-600 mt-1">{(a + b + c).toFixed(2)}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: 3D Geometry */}
      {activeTab === 'geometry3d' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex gap-2">
            {[
              { id: 'sphere', label: 'Kugel' },
              { id: 'cylinder', label: 'Zylinder' },
              { id: 'cuboid', label: 'Quader / Würfel' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setShape3D(s.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  shape3D === s.id ? 'bg-sky-600 text-white shadow-xs' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {shape3D === 'sphere' && (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Radius (r)</label>
                <input
                  type="number"
                  value={sphereR}
                  onChange={(e) => setSphereR(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Volumen V = 4/3 · π · r³</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {((4 / 3) * Math.PI * Math.pow(parseFloat(sphereR) || 0, 3)).toFixed(3)}
                  </div>
                </div>
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Oberfläche O = 4 · π · r²</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(4 * Math.PI * Math.pow(parseFloat(sphereR) || 0, 2)).toFixed(3)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {shape3D === 'cylinder' && (
            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Radius (r)</label>
                  <input
                    type="number"
                    value={cylR}
                    onChange={(e) => setCylR(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Höhe (h)</label>
                  <input
                    type="number"
                    value={cylH}
                    onChange={(e) => setCylH(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Volumen V = π · r² · h</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(Math.PI * Math.pow(parseFloat(cylR) || 0, 2) * (parseFloat(cylH) || 0)).toFixed(3)}
                  </div>
                </div>
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Oberfläche O = 2πr(r+h)</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(2 * Math.PI * (parseFloat(cylR) || 0) * ((parseFloat(cylR) || 0) + (parseFloat(cylH) || 0))).toFixed(3)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {shape3D === 'cuboid' && (
            <div className="space-y-4 max-w-md">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Breite a</label>
                  <input
                    type="number"
                    value={cubA}
                    onChange={(e) => setCubA(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Tiefe b</label>
                  <input
                    type="number"
                    value={cubB}
                    onChange={(e) => setCubB(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Höhe c</label>
                  <input
                    type="number"
                    value={cubC}
                    onChange={(e) => setCubC(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Volumen V = a·b·c</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {((parseFloat(cubA) || 0) * (parseFloat(cubB) || 0) * (parseFloat(cubC) || 0)).toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">Oberfläche O = 2(ab+bc+ac)</span>
                  <div className="text-2xl font-black text-sky-600 mt-1">
                    {(2 * ((parseFloat(cubA) || 0) * (parseFloat(cubB) || 0) + (parseFloat(cubB) || 0) * (parseFloat(cubC) || 0) + (parseFloat(cubA) || 0) * (parseFloat(cubC) || 0))).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Percent and Dreisatz */}
      {activeTab === 'percent' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs max-w-xl">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Prozent- & Dreisatz-Rechner</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Grundwert (G)</label>
              <input
                type="number"
                value={baseVal}
                onChange={(e) => setBaseVal(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Prozentsatz (p %)</label>
              <input
                type="number"
                value={percentRate}
                onChange={(e) => setPercentRate(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          {(() => {
            const g = parseFloat(baseVal) || 0;
            const p = parseFloat(percentRate) || 0;
            const pw = (g * p) / 100;
            const plus = g + pw;
            const minus = g - pw;

            return (
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800">
                  <span className="text-xs text-neutral-500 font-semibold">{p}% Anteil</span>
                  <div className="text-xl font-black text-sky-600 mt-1">{pw.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <span className="text-xs text-neutral-500 font-semibold">Wert + {p}%</span>
                  <div className="text-xl font-black text-emerald-600 mt-1">{plus.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
                  <span className="text-xs text-neutral-500 font-semibold">Wert - {p}%</span>
                  <div className="text-xl font-black text-rose-600 mt-1">{minus.toFixed(2)}</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
