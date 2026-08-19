import React, { useState } from 'react';
import { Zap, Activity, BatteryCharging, ShieldAlert } from 'lucide-react';

export function PhysicsCalculator() {
  const [topic, setTopic] = useState<'mechanics' | 'energy' | 'electricity' | 'density'>('mechanics');

  // Mechanics: F = m * a  or v = s / t
  const [mechMass, setMechMass] = useState('70'); // kg
  const [mechAcc, setMechAcc] = useState('9.81'); // m/s^2

  // Energy: E_kin = 0.5 * m * v^2, E_pot = m * g * h
  const [energyMass, setEnergyMass] = useState('1200'); // kg
  const [energyVel, setEnergyVel] = useState('25'); // m/s (90 km/h)
  const [energyHeight, setEnergyHeight] = useState('10'); // m

  // Electricity: U = R * I, P = U * I
  const [ohmR, setOhmR] = useState('220'); // Ohm
  const [ohmI, setOhmI] = useState('1.5'); // A

  // Density: rho = m / V
  const [densMass, setDensMass] = useState('500'); // g
  const [densVol, setDensVol] = useState('250'); // cm^3

  return (
    <div className="space-y-6">
      {/* Topic Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-2xl max-w-xl mx-auto">
        <button
          onClick={() => setTopic('mechanics')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            topic === 'mechanics' ? 'bg-white dark:bg-neutral-900 text-amber-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Kräfte & Bewegung
        </button>
        <button
          onClick={() => setTopic('energy')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            topic === 'energy' ? 'bg-white dark:bg-neutral-900 text-amber-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Energie & Arbeit
        </button>
        <button
          onClick={() => setTopic('electricity')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            topic === 'electricity' ? 'bg-white dark:bg-neutral-900 text-amber-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Elektrizität (Ohm)
        </button>
        <button
          onClick={() => setTopic('density')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            topic === 'density' ? 'bg-white dark:bg-neutral-900 text-amber-600 shadow-xs' : 'text-neutral-500'
          }`}
        >
          Dichte & Masse
        </button>
      </div>

      {/* Mechanics */}
      {topic === 'mechanics' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">2. Newtonsches Axiom: Kraft (F = m · a)</h3>
            <p className="text-xs text-neutral-500">Grundgleichung der klassischen Mechanik</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Masse (m in kg)</label>
              <input
                type="number"
                value={mechMass}
                onChange={(e) => setMechMass(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Beschleunigung (a in m/s²)</label>
              <input
                type="number"
                value={mechAcc}
                onChange={(e) => setMechAcc(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          {(() => {
            const m = parseFloat(mechMass) || 0;
            const a = parseFloat(mechAcc) || 0;
            const force = m * a;
            return (
              <div className="p-5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 font-semibold">Resultierende Kraft (F)</span>
                  <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {force.toFixed(2)} <span className="text-base font-normal">N (Newton)</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-400 font-mono">1 N = 1 kg·m/s²</div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Energy */}
      {topic === 'energy' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Kinetische & Potenzielle Energie</h3>
            <p className="text-xs text-neutral-500">
              Formeln: <span className="font-mono">E_kin = ½·m·v²</span> &nbsp;|&nbsp; <span className="font-mono">E_pot = m·g·h</span> (mit g = 9.81 m/s²)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Masse (m in kg)</label>
              <input
                type="number"
                value={energyMass}
                onChange={(e) => setEnergyMass(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Geschwindigkeit (v in m/s)</label>
              <input
                type="number"
                value={energyVel}
                onChange={(e) => setEnergyVel(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                = {((parseFloat(energyVel) || 0) * 3.6).toFixed(1)} km/h
              </span>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Höhe (h in m)</label>
              <input
                type="number"
                value={energyHeight}
                onChange={(e) => setEnergyHeight(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          {(() => {
            const m = parseFloat(energyMass) || 0;
            const v = parseFloat(energyVel) || 0;
            const h = parseFloat(energyHeight) || 0;
            const ekin = 0.5 * m * v * v;
            const epot = m * 9.81 * h;

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-neutral-500 font-semibold">Kinetische Energie (Bewegung)</span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {(ekin / 1000).toFixed(2)} <span className="text-sm font-normal">kJ</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">{ekin.toFixed(0)} Joule</div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-neutral-500 font-semibold">Potenzielle Energie (Lageenergie)</span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {(epot / 1000).toFixed(2)} <span className="text-sm font-normal">kJ</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">{epot.toFixed(0)} Joule</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Electricity */}
      {topic === 'electricity' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Ohmsches Gesetz & Elektrische Leistung</h3>
            <p className="text-xs text-neutral-500">
              Formeln: <span className="font-mono">U = R · I</span> &nbsp;|&nbsp; <span className="font-mono">P = U · I = R · I²</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Widerstand (R in Ω)</label>
              <input
                type="number"
                value={ohmR}
                onChange={(e) => setOhmR(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Stromstärke (I in Ampere A)</label>
              <input
                type="number"
                value={ohmI}
                onChange={(e) => setOhmI(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          {(() => {
            const r = parseFloat(ohmR) || 0;
            const i = parseFloat(ohmI) || 0;
            const u = r * i;
            const p = u * i;

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-neutral-500 font-semibold">Elektrische Spannung (U = R·I)</span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {u.toFixed(2)} <span className="text-base font-normal">Volt (V)</span>
                  </div>
                </div>
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <span className="text-xs text-neutral-500 font-semibold">Elektrische Leistung (P = U·I)</span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {p.toFixed(2)} <span className="text-base font-normal">Watt (W)</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Density */}
      {topic === 'density' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs max-w-lg">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Dichte-Rechner (ρ = m / V)</h3>
            <p className="text-xs text-neutral-500">Masse geteilt durch Volumen</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Masse (m in g)</label>
              <input
                type="number"
                value={densMass}
                onChange={(e) => setDensMass(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Volumen (V in cm³)</label>
              <input
                type="number"
                value={densVol}
                onChange={(e) => setDensVol(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border rounded-xl font-bold"
              />
            </div>
          </div>

          {(() => {
            const m = parseFloat(densMass) || 0;
            const v = parseFloat(densVol) || 1;
            const rho = m / v;

            return (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 font-semibold">Dichte (ρ)</span>
                  <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
                    {rho.toFixed(3)} <span className="text-sm font-normal">g/cm³</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-500">
                  = {(rho * 1000).toFixed(1)} kg/m³
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
