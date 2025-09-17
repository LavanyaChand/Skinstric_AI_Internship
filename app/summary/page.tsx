"use client";

import React, { useMemo, useState } from "react";
import { useAnalysisStore } from "@/lib/store";
import { sortBuckets } from "@/lib/phase2";
import BackButton from "../sharedComponent/BackButton";
import Link from "next/link";
import arrowLeft from "../../public/icons/arrowLeft.svg";
import Image from "next/image";

type Block = "race" | "age" | "gender";
type Row = { label: string; value: number };

const fmt = (n: number) => `${n.toFixed(2)}%`;

// ---------- FALLBACK DATA ----------
const FALLBACK: Record<Block, Row[]> = {
  race: [
    { label: "Southeast asian", value: 69 },
    { label: "South asian", value: 17 },
    { label: "East asian", value: 10 },
    { label: "White", value: 3 },
    { label: "Black", value: 0 },
    { label: "Latino hispanic", value: 0 },
    { label: "Middle eastern", value: 0 },
  ],
  age: [
    { label: "70+", value: 72 },
    { label: "60–69", value: 18 },
    { label: "50–59", value: 10 },
  ],
  gender: [
    { label: "Female", value: 72 },
    { label: "Male", value: 28 },
  ],
};

const DiamondBullet: React.FC<{ active: boolean }> = ({ active }) => (
  <span aria-hidden className="relative inline-block w-[12px] h-[12px] mr-2">
    <span className="block w-full h-full rotate-45 border border-current rounded-[2px]" />
    {active && (
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-current" />
    )}
  </span>
);

function Page() {
  const result = useAnalysisStore((s) => s.result);
  const actual = useAnalysisStore((s) => s.actual);
  const setActual = useAnalysisStore((s) => s.setActual);

  const [block, setBlock] = useState<Block>("race");
  const [justSaved, setJustSaved] = useState(false);

  const nothingLoaded = !result?.data;

  const sorted = useMemo(() => {
    if (result?.data) {
      const { race, age, gender } = result.data;
      return {
        race: sortBuckets(race),
        age: sortBuckets(age),
        gender: sortBuckets(gender),
      };
    }
    return FALLBACK;
  }, [result?.data]);

  // Current values
  const actualRace = actual.race ?? sorted.race[0]?.label ?? "";
  const actualAge = actual.age ?? sorted.age[0]?.label ?? "";
  const actualGender = actual.gender ?? sorted.gender[0]?.label ?? "";

  // Defaults (AI top picks)
  const defaults = useMemo(
    () => ({
      race: sorted.race[0]?.label ?? "",
      age: sorted.age[0]?.label ?? "",
      gender: sorted.gender[0]?.label ?? "",
    }),
    [sorted]
  );


  const isConfirm =
    actualRace !== defaults.race ||
    actualAge !== defaults.age ||
    actualGender !== defaults.gender;

  const activeList =
    block === "race" ? sorted.race : block === "age" ? sorted.age : sorted.gender;

  const selectedLabel =
    block === "race" ? actualRace : block === "age" ? actualAge : actualGender;

  const currentRow = useMemo(() => {
    const norm = (s?: string) => (s || "").toLowerCase().trim();
    return activeList.find((r) => norm(r.label) === norm(selectedLabel)) ?? activeList[0];
  }, [activeList, selectedLabel]);

  const displayLabel = currentRow?.label ?? "";
  const ringPct = currentRow?.value ?? 0;

  //handlers for Reset / Confirm
  const handleReset = () => {
    setActual("race", defaults.race);
    setActual("age", defaults.age);
    setActual("gender", defaults.gender);
  };

  const handleConfirm = () => {
    const payload = {
      race: actualRace,
      age: actualAge,
      gender: actualGender,
      ts: Date.now(),
    };
    try {
      localStorage.setItem("skinstric.demographics.overrides", JSON.stringify(payload));
    } catch { }
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

  return (
    <div className="px-8 md:px-14 py-10">
      {/* Header */}
      <div className="text-start mx-4 md:mx-0 mb-4 pt-10">
        <h2 className="text-base font-semibold mb-1 leading-[24px] fadeInUp delay-1">A.I. ANALYSIS</h2>
        <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter fadeInUp delay-2">
          DEMOGRAPHICS
        </h3>
        <h4 className="text-sm mt-2 font-normal leading-[24px] fadeInUp delay-2">PREDICTED RACE &amp; AGE</h4>
      </div>

      {nothingLoaded && (
        <p className="mx-4 md:mx-0 text-xs text-red-500">
          This is a sample data for your reference. Please upload an image or choose to let A.I. scan your face to run your actual analysis.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 lg:mb-0 lg:gap-4 pb-0 fadeIn delay-2_5">

        {/* Left rail */}
        <aside className="w-full bg-white-100 space-y-3 lg:flex lg:flex-col h-[62%]">
          <button
            onClick={() => setBlock("race")}
            className={`w-full p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${block === "race"
                ? "bg-[#1A1B1C] text-white hover:bg-black"
                : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
              }`}
          >
            <p className="text-base font-semibold capitalize">{actualRace}</p>
            <h4 className="text-base font-semibold mb-1">RACE</h4>
          </button>

          <button
            onClick={() => setBlock("age")}
            className={`w-full p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${block === "age"
                ? "bg-[#1A1B1C] text-white hover:bg-black"
                : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
              }`}
          >
            <p className="text-base font-semibold">{actualAge}</p>
            <h4 className="text-base font-semibold mb-1">AGE</h4>
          </button>

          <button
            onClick={() => setBlock("gender")}
            className={`w-full p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${block === "gender"
                ? "bg-[#1A1B1C] text-white hover:bg-black"
                : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
              }`}
          >
            <p className="text-base font-semibold uppercase">{actualGender}</p>
            <h4 className="text-base font-semibold mb-1">SEX</h4>
          </button>
        </aside>


        {/* Middle panel with ring */}
        <section className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[500px] md:border-t">
          <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
            {displayLabel}
          </p>

          <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
            <div
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 384,
                position: "relative",
                transform: "scale(1)",
                transformOrigin: "center center",
              }}
            >
              <svg className="CircularProgressbar text-[#1A1B1C]" viewBox="0 0 100 100">
                <path
                  className="CircularProgressbar-trail"
                  d="
                    M 50,50
                    m 0,-49.15
                    a 49.15,49.15 0 1 1 0,98.3
                    a 49.15,49.15 0 1 1 0,-98.3
                  "
                  strokeWidth="1.7"
                  fillOpacity="0"
                  style={{
                    strokeLinecap: "butt",
                    strokeDasharray: "350px, 350px",
                    strokeDashoffset: 0,
                  }}
                />
                <path
                  className="CircularProgressbar-path"
                  d="
                    M 50,50
                    m 0,-49.15
                    a 49.15,49.15 0 1 1 0,98.3
                    a 49.15,49.15 0 1 1 0,-98.3
                  "
                  strokeWidth="1.7"
                  fillOpacity="0"
                  style={{
                    stroke: "rgb(26, 27, 28)",
                    strokeLinecap: "butt",
                    transitionDuration: "0.8s",
                    strokeDasharray: "350px, 350px",
                    strokeDashoffset: `${350 - (Math.max(0, Math.min(100, ringPct)) / 100) * 350
                      }px`,
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl md:text-[40px] font-normal">
                  {Math.round(Math.max(0, Math.min(100, ringPct)))}{" "}
                  <span className="absolute text-xl md:text-3xl">%</span>
                </p>
              </div>
            </div>
          </div>

          <p className="md:absolute text-xs text-[#A0A0A0] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </section>

        {/* Right list */}
        <aside className="bg-gray-100 pt-4 pb-4 md:border-t md:h-[500px]">
          <div className="space-y-0">
            <div className="flex justify-between px-4">
              <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2 uppercase">
                {block}
              </h4>
              <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
                A.I. CONFIDENCE
              </h4>
            </div>
            <ul>
              {activeList.map(({ label, value }) => {
                const isActive =
                  (block === "race" && actualRace === label) ||
                  (block === "age" && actualAge === label) ||
                  (block === "gender" && actualGender === label);

                return (
                  <li
                    key={label}
                    onClick={() => setActual(block, label)}
                    className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${isActive ? "bg-[#1A1B1C] text-white hover:bg-black" : "hover:bg-[#E1E1E2]"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <DiamondBullet active={isActive} />
                      <span className="font-normal text-base leading-6 tracking-tight capitalize">
                        {label}
                      </span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">
                      {fmt(value)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* Bottom bar */}
      <div className="relative inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
        <div className="h-24">
          {/* Back button */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            {nothingLoaded ? (
              <Link href="/result" aria-label="Back" className="flex items-center text-dark-2 group">
                <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                  <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                    Back
                  </span>
                  <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
                    <Image src={arrowLeft} alt="" />
                  </span>
                </div>
                <span className="hidden md:inline-block ml-6 text-sm font-semibold uppercase tracking-wide">
                  Back
                </span>
              </Link>
            ) : (
              <BackButton />
            )}
          </div>

          {/* right/corner: Reset / Confirm */}
          <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 px-6 border border-[#1A1B1C] bg-white text-[#1A1B1C] text-sm font-semibold tracking-wide hover:bg-[#F5F5F5] transition cursor-pointer"
            >
              RESET
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isConfirm}
              className={`h-10 px-6 text-sm font-semibold tracking-wide transition
                ${isConfirm ? "bg-[#1A1B1C] text-white hover:bg-black cursor-pointer" : "bg-dark-2/30 text-white/70 cursor-not-allowed"}`}
            >
              CONFIRM
            </button>

            {justSaved && (
              <span className="ml-2 text-xs text-chart-2">Saved</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
