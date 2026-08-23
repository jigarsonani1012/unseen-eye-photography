"use client";

import { Calculator, Check, Send, Sparkles, Building, Camera, Moon, User } from "lucide-react";
import { useState } from "react";

const COMMISSIONS = [
  {
    id: "portrait",
    title: "Editorial & Cultural Portraiture",
    icon: User,
    basePrice: 2400,
    days: "2-3 Days",
    desc: "Intimate, slow-paced sitting on 35mm and 120 medium format. For publications, artists, and cultural institutions.",
  },
  {
    id: "arch",
    title: "Architectural Monograph & Site Study",
    icon: Building,
    basePrice: 4800,
    days: "4-6 Days",
    desc: "Comprehensive diurnal lighting study across dawn, hard midday sun, and long dusk shadows.",
  },
  {
    id: "commercial",
    title: "Commercial & Night Campaign",
    icon: Moon,
    basePrice: 8500,
    days: "5-8 Days",
    desc: "Atmospheric nocturnal cinematic photography with global editorial rights and color grading.",
  },
  {
    id: "fineart",
    title: "Private Fine Art Darkroom Commission",
    icon: Camera,
    basePrice: 3200,
    days: "3-4 Days",
    desc: "One-of-a-kind silver gelatin gelatin darkroom prints, toned by hand with signed Certificates of Authenticity.",
  },
];

const ADDONS = [
  { id: "largeformat", name: "Large Format 4×5 Sheet Film Process", price: 900, desc: "Ultra-high resolution negatives hand-developed in PMK Pyro" },
  { id: "prints", name: "Exhibition Museum Master Prints (3× 50×75cm)", price: 1500, desc: "Printed on Hahnemühle Photo Rag 308gsm with custom oak framing" },
  { id: "buyout", name: "Global Advertising & Uncapped Commercial Buyout", price: 2800, desc: "Perpetual worldwide commercial license across all media" },
  { id: "monograph", name: "Bespoke Hardcover Cloth Monograph (30 Copies)", price: 1800, desc: "Printed in Verona on Fedrigoni Tatami with blind debossing" },
];

export default function CommissionEstimator() {
  const [selectedType, setSelectedType] = useState("portrait");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["largeformat"]);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });

  const activeType = COMMISSIONS.find((c) => c.id === selectedType) || COMMISSIONS[0];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const total = activeType.basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto select-none">
      <div className="p-4 sm:p-8 rounded-xl border hairline bg-[var(--panel)] shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b hairline">
          <div>
            <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase">
              <Calculator size={13} />
              <span>BESPOKE COMMISSION ESTIMATOR · STUDIO PARIS</span>
            </div>
            <h2 className="display text-3xl sm:text-4xl mt-1">Configure Your Project</h2>
          </div>
          <div className="text-right hidden sm:block">
            <span className="meta !text-[8.5px] font-mono opacity-60">ESTIMATED PRODUCTION FEE</span>
            <div className="display text-3xl text-[var(--accent)]">€{total.toLocaleString()}</div>
          </div>
        </div>

        {/* Step 1: Select Commission Type */}
        <div className="py-6 border-b hairline space-y-4">
          <div className="flex items-center justify-between">
            <span className="meta !text-[9px] uppercase tracking-widest font-mono font-bold">
              01 · SELECT SCOPE OF WORK
            </span>
            <span className="meta !text-[8px] font-mono opacity-60">SELECT ONE BASE SERVICE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMMISSIONS.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedType === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedType(c.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-[var(--accent)] bg-[var(--bg)] shadow-md ring-1 ring-[var(--accent)]"
                      : "border-transparent bg-[var(--bg)]/40 hover:bg-[var(--bg)]/80 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={isSelected ? "text-[var(--accent)]" : "opacity-60"} />
                      <span className="font-bold text-sm">{c.title}</span>
                    </div>
                    <span className="display text-lg text-[var(--accent)]">€{c.basePrice}</span>
                  </div>
                  <p className="body-serif text-xs text-[var(--fg-soft)] leading-relaxed">{c.desc}</p>
                  <span className="meta !text-[8px] font-mono opacity-50 block mt-2">
                    PRODUCTION WINDOW: {c.days}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Addons */}
        <div className="py-6 border-b hairline space-y-4">
          <div className="flex items-center justify-between">
            <span className="meta !text-[9px] uppercase tracking-widest font-mono font-bold">
              02 · ARCHIVAL DELIVERABLES & RIGHTS
            </span>
            <span className="meta !text-[8px] font-mono opacity-60">OPTIONAL SPECIALIST UPGRADES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ADDONS.map((a) => {
              const isChecked = selectedAddons.includes(a.id);
              return (
                <div
                  key={a.id}
                  onClick={() => toggleAddon(a.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isChecked
                      ? "border-[var(--accent)] bg-[var(--bg)] shadow-sm"
                      : "border-transparent bg-[var(--bg)]/30 hover:bg-[var(--bg)]/60 opacity-70"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold">{a.name}</div>
                    <div className="text-[9px] opacity-60 leading-tight">{a.desc}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-semibold">+€{a.price}</span>
                    <div
                      className={`w-4 h-4 rounded mt-1 ml-auto flex items-center justify-center border ${
                        isChecked ? "bg-[var(--accent)] border-[var(--accent)] text-black" : "border-white/20"
                      }`}
                    >
                      {isChecked && <Check size={11} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Instant Dispatch Form */}
        <div className="pt-6">
          {submitted ? (
            <div className="p-8 rounded-lg bg-[var(--bg)] border border-[var(--accent)] text-center space-y-3 animate-in fade-in">
              <div className="inline-flex p-3 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                <Check size={24} />
              </div>
              <h3 className="display text-2xl">Commission Request Received</h3>
              <p className="body-serif text-sm max-w-md mx-auto text-[var(--fg-soft)]">
                We have prepared your estimate for <strong>€{total.toLocaleString()}</strong> ({activeType.title}). Studio Paris will respond within 24 hours.
              </p>
              <span className="meta !text-[9px] font-mono opacity-50 block">REF: EV-PARIS-2026-COMM</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="meta !text-[9px] uppercase tracking-widest font-mono font-bold">
                  03 · DIRECT INQUIRY DISPATCH
                </span>
                <div className="sm:hidden text-right">
                  <span className="text-xs font-mono font-bold text-[var(--accent)]">€{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Studio / Agency"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-3 bg-[var(--bg)] border hairline rounded text-xs focus:outline-none focus:border-[var(--accent)]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address (e.g. director@house.com)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-3 bg-[var(--bg)] border hairline rounded text-xs focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Briefly describe the brief, timeline, location, or subject..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-[var(--bg)] border hairline rounded text-xs focus:outline-none focus:border-[var(--accent)]"
              />

              <button
                type="submit"
                className="w-full py-4 bg-[var(--fg)] text-[var(--bg)] rounded text-xs font-mono tracking-widest uppercase font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <Send size={14} />
                <span>DISPATCH ESTIMATE INQUIRY · €{total.toLocaleString()}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
