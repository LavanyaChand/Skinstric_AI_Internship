"use client";

import { useMemo, useState } from "react";
import { useAnalysisStore } from "@/lib/store";
import BackButton from "../sharedComponent/BackButton";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../public/icons/arrowRight.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
type RoutineStep = {
  step: number;
  category: string;
  product: string;
  ingredient: string;
  why: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function topKey(obj: Record<string, number>): string {
  return Object.entries(obj).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "";
}

// ─── Routine generator ────────────────────────────────────────────────────────
function generateRoutine(
  race: string,
  age: string,
): { morning: RoutineStep[]; evening: RoutineStep[] } {
  const r = race.toLowerCase().trim();
  const a = age.toLowerCase().trim();

  // Age buckets
  const isYoung  = ["0-2", "3-9", "10-19"].includes(a);
  const is30plus = ["30-39", "40-49", "50-59", "60-69", "70+"].some((x) => a === x);
  const is40plus = ["40-49", "50-59", "60-69", "70+"].some((x) => a === x);
  const isMature = ["50-59", "60-69", "70+"].some((x) => a === x);

  // Skin tendency based on race
  const hyperpigmentation = [
    "black", "south asian", "southeast asian", "east asian",
    "latino hispanic", "middle eastern",
  ].includes(r);
  const sensitive = ["east asian", "southeast asian"].includes(r);

  // ── Morning ──────────────────────────────────────────────────────────────
  const morning: RoutineStep[] = [];
  let s = 1;

  morning.push({
    step: s++,
    category: "Cleanser",
    product: sensitive ? "Gentle Gel Cleanser" : "Foaming Cleanser",
    ingredient: sensitive ? "Centella Asiatica" : "Salicylic Acid 0.5%",
    why: sensitive
      ? "Cleanses without disrupting the sensitive skin barrier"
      : "Removes excess oil and impurities",
  });

  morning.push({
    step: s++,
    category: "Toner",
    product: hyperpigmentation ? "Brightening Essence Toner" : "Hydrating Toner",
    ingredient: hyperpigmentation
      ? "Niacinamide 5% + Tranexamic Acid"
      : "Hyaluronic Acid + Glycerin",
    why: hyperpigmentation
      ? "Targets dark spots and evens skin tone from step one"
      : "Replenishes moisture and preps skin for actives",
  });

  if (!isYoung) {
    morning.push({
      step: s++,
      category: "Vitamin C Serum",
      product: isMature
        ? "Stabilised Vitamin C 20%"
        : is40plus
        ? "Vitamin C + E + Ferulic Acid"
        : "L-Ascorbic Acid 10%",
      ingredient: isMature ? "THD Ascorbate + Ferulic Acid" : "Ascorbic Acid + Vitamin E",
      why: isMature
        ? "High-potency brightening and collagen support for mature skin"
        : "Protects against UV-induced pigmentation and free radicals",
    });
  }

  if (is30plus) {
    morning.push({
      step: s++,
      category: "Eye Cream",
      product: isMature ? "Firming Eye Serum" : "Brightening Eye Cream",
      ingredient: isMature ? "Matrixyl 3000 + Caffeine" : "Vitamin K + Peptides",
      why: isMature
        ? "Firms and lifts the delicate under-eye area"
        : "Reduces dark circles and early fine lines",
    });
  }

  morning.push({
    step: s++,
    category: "Moisturizer",
    product: isMature
      ? "Rich Barrier Repair Cream"
      : isYoung
      ? "Lightweight Hydrating Lotion"
      : "Gel-Cream Moisturizer",
    ingredient: isMature
      ? "Ceramides + Shea Butter + Squalane"
      : isYoung
      ? "Aloe Vera + Glycerin"
      : "Ceramides + Hyaluronic Acid",
    why: isMature
      ? "Deeply restores the lipid barrier and prevents moisture loss"
      : isYoung
      ? "Lightweight hydration that won't clog pores"
      : "Locks in moisture without heaviness",
  });

  morning.push({
    step: s++,
    category: "Sunscreen",
    product: hyperpigmentation ? "Tinted Mineral SPF 50+" : "Broad Spectrum SPF 50",
    ingredient: "Zinc Oxide + Titanium Dioxide",
    why: hyperpigmentation
      ? "Shields from UV and IR rays while blending with deeper skin tones"
      : "Non-negotiable protection against UV-induced aging and pigmentation",
  });

  // ── Evening ──────────────────────────────────────────────────────────────
  const evening: RoutineStep[] = [];
  s = 1;

  evening.push({
    step: s++,
    category: "Pre-Cleanser",
    product: "Cleansing Balm / Oil",
    ingredient: "Jojoba Oil + Polysorbate 20",
    why: "Dissolves sunscreen and buildup without stripping the skin",
  });

  evening.push({
    step: s++,
    category: "Cleanser",
    product: sensitive ? "Cream Cleanser" : "Gentle Foam Cleanser",
    ingredient: sensitive ? "Oat Extract + Allantoin" : "Green Tea + Panthenol",
    why: "Completes the double-cleanse for a truly clean base",
  });

  if (!isYoung) {
    evening.push({
      step: s++,
      category: "Exfoliant",
      product: hyperpigmentation
        ? "AHA Exfoliant  (2–3× / week)"
        : "BHA Exfoliant  (2–3× / week)",
      ingredient: hyperpigmentation
        ? "Glycolic Acid 7% + Lactic Acid 5%"
        : "Betaine Salicylate 3%",
      why: hyperpigmentation
        ? "Accelerates cell turnover to fade dark spots and smooth texture"
        : "Unclogs pores and refines skin texture",
    });
  }

  evening.push({
    step: s++,
    category: "Treatment Serum",
    product: hyperpigmentation
      ? "Pigmentation Corrector"
      : is40plus
      ? "Retinoid Booster"
      : "Hydrating Repair Serum",
    ingredient: hyperpigmentation
      ? "Niacinamide 10% + Alpha Arbutin 2%"
      : is40plus
      ? "Retinol 0.5% + Bakuchiol"
      : "Peptides + Hyaluronic Acid",
    why: hyperpigmentation
      ? "Inhibits melanin transfer for a more even, luminous complexion"
      : is40plus
      ? "Accelerates cell renewal and reduces fine lines overnight"
      : "Repairs the moisture barrier and plumps skin while you sleep",
  });

  if (is30plus) {
    evening.push({
      step: s++,
      category: "Eye Cream",
      product: "Retinol Eye Treatment",
      ingredient: "Retinol 0.025% + Ceramides",
      why: "Gently addresses crow's feet and loss of firmness overnight",
    });
  }

  evening.push({
    step: s++,
    category: "Night Moisturizer",
    product: isMature ? "Regenerating Night Cream" : "Overnight Sleeping Mask",
    ingredient: isMature
      ? "Epidermal Growth Factors + Collagen Peptides"
      : "Beta-Glucan + Glycerin",
    why: isMature
      ? "Maximises overnight regeneration and collagen synthesis"
      : "Seals in all actives and repairs the barrier as you sleep",
  });

  if (is30plus) {
    evening.push({
      step: s++,
      category: "Face Oil",
      product: isMature ? "Rosehip + Argan Blend" : "Squalane Oil",
      ingredient: isMature
        ? "Rosehip Seed Oil + Omega-3 Fatty Acids"
        : "100% Plant-Derived Squalane",
      why: isMature
        ? "Replenishes lost lipids and enhances overnight repair"
        : "Locks in moisture and plumps skin without pore congestion",
    });
  }

  return { morning, evening };
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function RoutinePage() {
  const result    = useAnalysisStore((s) => s.result);
  const actual    = useAnalysisStore((s) => s.actual);
  const previewUrl = useAnalysisStore((s) => s.previewUrl);

  const [tab, setTab] = useState<"morning" | "evening">("morning");

  // Resolve demographics: user-corrected → AI top pick → sensible fallback
  const race   = actual.race   ?? (result?.data ? topKey(result.data.race)   : "East Asian");
  const age    = actual.age    ?? (result?.data ? topKey(result.data.age)    : "20-29");
  const gender = actual.gender ?? (result?.data ? topKey(result.data.gender) : "Female");

  const { morning, evening } = useMemo(
    () => generateRoutine(race, age),
    [race, age],
  );

  const activeSteps = tab === "morning" ? morning : evening;

  return (
    <div className="px-8 md:px-14 py-10 min-h-screen">

      {/* ── Print-only header ─────────────────────────────────────────── */}
      <div className="hidden print:block mb-8 pb-6 border-b border-[#1A1B1C]/20">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A0A0A0] mb-1">
          SKINSTRIC A.I.
        </p>
        <p className="text-2xl font-normal tracking-tighter text-[#1A1B1C]">
          Personalised Skin Routine
        </p>
        <div className="flex gap-6 mt-2">
          <span className="text-[11px] text-[#6C7280] uppercase tracking-wide">Race: {race}</span>
          <span className="text-[11px] text-[#6C7280] uppercase tracking-wide">Age: {age}</span>
          <span className="text-[11px] text-[#6C7280] uppercase tracking-wide">Gender: {gender}</span>
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="print:hidden text-start mx-4 md:mx-0 mb-6 pt-10">
        <h2 className="text-base font-semibold mb-1 leading-[24px] fadeInUp delay-1">
          A.I. ANALYSIS
        </h2>
        <h3 className="text-4xl md:text-[72px] font-normal leading-[1] md:leading-[64px] tracking-tighter fadeInUp delay-2">
          SKIN ROUTINE
        </h3>
        <h4 className="text-sm mt-2 font-normal leading-[24px] fadeInUp delay-2 text-[#6C7280]">
          PERSONALISED FOR YOUR SKIN PROFILE
        </h4>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 mt-8 mb-36 fadeIn delay-2_5">

        {/* Left sidebar — profile */}
        <aside className="flex flex-col gap-2">
          {/* Photo */}
          <div className="w-full aspect-square max-w-[200px] bg-[#F3F3F4] overflow-hidden border-t border-[#1A1B1C]/10">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Your photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[10px] text-[#A0A0A0] uppercase tracking-widest text-center px-2">
                  No image
                </span>
              </div>
            )}
          </div>

          {/* Demographics */}
          {[
            { label: "RACE",   value: race },
            { label: "AGE",    value: age },
            { label: "GENDER", value: gender },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col bg-[#F3F3F4] p-3 border-t border-[#1A1B1C]/10"
            >
              <span className="text-[9px] font-semibold tracking-[0.15em] text-[#6C7280] uppercase">
                {label}
              </span>
              <span className="text-sm font-semibold capitalize mt-0.5">{value}</span>
            </div>
          ))}
        </aside>

        {/* Right — routine */}
        <section>
          {/* Morning / Evening toggle — screen only */}
          <div className="print:hidden flex gap-0 mb-0 border-b border-[#1A1B1C]/20">
            {(["morning", "evening"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer border-b-2 -mb-px
                  ${
                    tab === t
                      ? "border-[#1A1B1C] text-[#1A1B1C]"
                      : "border-transparent text-[#A0A0A0] hover:text-[#1A1B1C]"
                  }`}
              >
                {t === "morning" ? "☀  Morning" : "🌙  Evening"}
              </button>
            ))}
          </div>

          {/* Steps — screen: active tab only */}
          <ul className="print:hidden">
            {activeSteps.map(({ step, category, product, ingredient, why }) => (
              <li
                key={`${tab}-${step}`}
                className="flex items-start gap-4 py-4 px-3 -mx-3 border-b border-[#E1E1E2]
                           hover:bg-[#F8F8F8] transition-colors duration-150"
              >
                <span className="text-[11px] font-bold text-[#CBCBCB] tracking-widest w-7 pt-[3px] shrink-0 select-none">
                  {String(step).padStart(2, "0")}
                </span>
                <span aria-hidden className="mt-[6px] inline-block w-[8px] h-[8px] rotate-45 border border-[#1A1B1C] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1B1C]">{category}</span>
                    <span className="text-sm font-normal text-[#3D3D3D]">{product}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#6C7280] tracking-wide">{ingredient}</p>
                  <p className="mt-1 text-[11px] leading-[18px] text-[#9CA3AF] italic">{why}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Steps — print: both morning + evening */}
          <div className="hidden print:block">
            {([["morning", morning], ["evening", evening]] as const).map(([label, steps]) => (
              <div key={label} className="mb-8">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1B1C] mb-3 pb-2 border-b border-[#E1E1E2]">
                  {label === "morning" ? "☀  Morning Routine" : "🌙  Evening Routine"}
                </p>
                <ul>
                  {steps.map(({ step, category, product, ingredient, why }) => (
                    <li key={`print-${label}-${step}`} className="flex items-start gap-4 py-3 border-b border-[#E1E1E2]">
                      <span className="text-[11px] font-bold text-[#CBCBCB] tracking-widest w-7 pt-[2px] shrink-0">{String(step).padStart(2, "0")}</span>
                      <span aria-hidden className="mt-[5px] inline-block w-[7px] h-[7px] rotate-45 border border-[#1A1B1C] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1A1B1C]">{category}</span>
                          <span className="text-sm text-[#3D3D3D]">{product}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#6C7280]">{ingredient}</p>
                        <p className="mt-0.5 text-[11px] text-[#9CA3AF] italic">{why}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────────── */}
      <div className="print:hidden fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
        <div className="relative h-24">

          {/* Back */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            <BackButton />
          </div>

          {/* Download PDF + Start Over */}
          <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto flex items-center gap-5">
            {/* Download PDF */}
            <button
              onClick={() => window.print()}
              className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-dark-2 hover:opacity-60 transition-opacity cursor-pointer"
            >
              <span className="inline-block w-[7px] h-[7px] rotate-45 border border-dark-2" />
              Download PDF
            </button>

            {/* Start Over */}
            <Link href="/" className="flex items-center text-dark-2 group">
              <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
                Start Over
              </span>
              <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                <span className="-rotate-45 md:hidden text-[8px] font-semibold uppercase tracking-wide text-center leading-tight">
                  Start
                </span>
                <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
                  <Image src={arrowRight} alt="Start over" />
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
