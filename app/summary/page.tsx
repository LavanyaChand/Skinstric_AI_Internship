// "use client";

// import React, { useMemo, useState } from "react";
// import { useAnalysisStore } from "@/lib/store";
// import { sortBuckets } from "@/lib/phase2";
// import BackButton from "../sharedComponent/BackButton";
// import Link from "next/link";
// import arrowLeft from '../../public/icons/arrowLeft.svg';
// import arrowRight from '../../public/icons/arrowRight.svg';
// import Image from 'next/image';

// type Block = "race" | "age" | "gender";

// const fmt = (n: number) => `${n.toFixed(2)}%`; // values from sortBuckets are already 0–100 with 2dp

// export default function Page() {
//     const result = useAnalysisStore((s) => s.result);
//     const actual = useAnalysisStore((s) => s.actual);
//     const setActual = useAnalysisStore((s) => s.setActual);

//     // Redirect guard if no result, tell user to upload first
//     if (!result?.data) {
//         return (
//             <>
//                 <div className="px-8 py-10">
//                     <h1 className="text-2xl font-semibold">No analysis yet</h1>
//                     <p className="text-gray-500 mt-2">Please upload a photo and run the analysis.</p>
//                 </div>

//                 <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
//                     <div className="relative h-24">
//                         <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
//                             <Link href="/result"
//                                 aria-label="Back"
//                                 className="flex items-center text-dark-2 group bg-transparent">
//                                 <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
//                                     {/* mobile label inside diamond */}
//                                     <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
//                                         Back
//                                     </span>
//                                     {/* desktop arrow inside diamond */}
//                                     <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
//                                         <Image src={arrowLeft} alt="" />
//                                     </span>
//                                 </div>
//                                 {/* desktop label outside */}
//                                 <span className="hidden md:inline-block ml-6 text-sm font-semibold uppercase tracking-wide">
//                                     Back
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     const [block, setBlock] = useState<Block>("race");

//     // Prepare sorted buckets (desc, 2dp %) once
//     const sorted = useMemo(() => {
//         const { race, age, gender } = result.data;
//         return {
//             race: sortBuckets(race),     // -> [{label, value: 2dp%}]
//             age: sortBuckets(age),
//             gender: sortBuckets(gender),
//         };
//     }, [result.data]);

//     // What's shown as the “actual” for each tab (defaults to the top AI pick)
//     const actualRace = actual.race ?? sorted.race[0]?.label ?? "";
//     const actualAge = actual.age ?? sorted.age[0]?.label ?? "";
//     const actualGender = actual.gender ?? sorted.gender[0]?.label ?? "";

//     const activeList =
//         block === "race" ? sorted.race : block === "age" ? sorted.age : sorted.gender;

//     const top = activeList[0];
//     const ringPct = top?.value ?? 0; // already 0–100

//     return (
//         <div className="px-8 md:px-14 py-10">
             
//             {/* Header */}
//             <div className="text-start mx-4 md:mx-0 mb-4 pt-10">
//                 <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
//                 <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">DEMOGRAPHICS</h3>
//                 <h4 className="text-sm mt-2 font-normal leading-[24px]">PREDICTED RACE & AGE</h4>
//             </div>


//             <div className="mt-12 grid grid-cols-12 gap-6">
//                 {/* Left rail */}
//                 <aside className="col-span-12 md:col-span-2 space-y-3">
//                     <button
//                         onClick={() => setBlock("race")}
//                         className={`w-full h-16 text-left px-4 border-t-1 ${block === "race" ? "bg-black text-white" : "bg-gray-100"}`}
//                     >
//                         <div className="text-xs uppercase text-gray-400">Race</div>
//                         <div className="font-semibold capitalize">{actualRace}</div>
//                     </button>

//                     <button
//                         onClick={() => setBlock("age")}
//                         className={`w-full h-16 text-left px-4 border-t-1 ${block === "age" ? "bg-black text-white" : "bg-gray-100"}`}
//                     >
//                         <div className="text-xs uppercase text-gray-400">Age</div>
//                         <div className="font-semibold capitalize">{actualAge}</div>
//                     </button>

//                     <button
//                         onClick={() => setBlock("gender")}
//                         className={`w-full h-16 text-left px-4 border-t-1 ${block === "gender" ? "bg-black text-white" : "bg-gray-100"}`}
//                     >
//                         <div className="text-xs uppercase text-gray-400">Sex</div>
//                         <div className="font-semibold capitalize">{actualGender}</div>
//                     </button>
//                 </aside>

//                 {/* Middle panel with ring */}
//                 <section className="col-span-12 md:col-span-7 bg-gray-100 p-8">
//                     <div className="text-3xl mb-6 capitalize">{top?.label ?? ""}</div>

//                     <div className="mx-auto w-[520px] max-w-full aspect-square grid place-items-center">
//                         <svg viewBox="0 0 100 100" className="w-full h-full">
//                             <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="6" />
//                             <circle
//                                 cx="50"
//                                 cy="50"
//                                 r="40"
//                                 fill="none"
//                                 stroke="#111827"
//                                 strokeWidth="6"
//                                 strokeDasharray={`${Math.max(0, Math.min(100, ringPct)) / 100 * 251} 251`}
//                                 transform="rotate(-90 50 50)"
//                                 strokeLinecap="round"
//                             />
//                             <text x="50" y="54" textAnchor="middle" fontSize="14" fill="#111827" fontWeight={600}>
//                                 {Math.round(ringPct)}%
//                             </text>
//                         </svg>
//                     </div>
//                 </section>

//                 {/* Right table — click to set "actual" */}
//                 <aside className="col-span-12 md:col-span-3">
//                     <div className="border">
//                         <div className="px-4 py-3 text-xs uppercase flex justify-between text-gray-500">
//                             <span className="capitalize">{block}</span>
//                             <span>A.I. Confidence</span>
//                         </div>
//                         <ul>
//                             {activeList.map(({ label, value }) => {
//                                 const active =
//                                     (block === "race" && actualRace === label) ||
//                                     (block === "age" && actualAge === label) ||
//                                     (block === "gender" && actualGender === label);
//                                 return (
//                                     <li
//                                         key={label}
//                                         onClick={() => setActual(block, label)}
//                                         className={`px-4 py-3 text-sm flex items-center justify-between cursor-pointer ${active ? "bg-black text-white" : "hover:bg-gray-100"
//                                             }`}
//                                     >
//                                         <span className="capitalize">{label}</span>
//                                         <span>{fmt(value)}</span>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </div>
//                 </aside>
//             </div>

//             <div className="mt-6 text-center text-gray-500 text-sm">
//                 If A.I. estimate is wrong, select the correct one.
//             </div>

//             {/* Bottom bar */}
//             <div className="relative inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
//                 <div className="h-24">
//                     {/* left/corner */}
//                     <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
//                         <BackButton />
//                     </div>

//                     {/* right/corner */}
//                     <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
//                         <div className="flex items-center text-dark-2 group">
//                             {/* desktop label outside */}
//                             <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
//                                 Home
//                             </span>

//                             <Link href="/" aria-label="Home">
//                                 <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
//                                     {/* mobile label inside diamond */}
//                                     <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
//                                         Home
//                                     </span>
//                                     {/* desktop arrow inside diamond */}
//                                     <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
//                                         <Image src={arrowRight} alt="" />
//                                     </span>
//                                 </div>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




"use client";

import React, { useMemo, useState } from "react";
import { useAnalysisStore } from "@/lib/store";
import { sortBuckets } from "@/lib/phase2";
import BackButton from "../sharedComponent/BackButton";
import Link from "next/link";
import arrowRight from "../../public/icons/arrowRight.svg";
import arrowLeft from "../../public/icons/arrowLeft.svg";
import Image from "next/image";

type Block = "race" | "age" | "gender";
type Row = { label: string; value: number };

const fmt = (n: number) => `${n.toFixed(2)}%`; // values from sortBuckets are already 0–100 with 2dp

// ---------- FALLBACK DATA  ----------
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

// Diamond bullet that shows a dot when active
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

  const nothingLoaded = !result?.data;

  // Use real analysis when present; otherwise the fallback set above
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

  // Defaults to user's selection if set, else top of current list (works for fallback or real)
  const actualRace = actual.race ?? sorted.race[0]?.label ?? "";
  const actualAge = actual.age ?? sorted.age[0]?.label ?? "";
  const actualGender = actual.gender ?? sorted.gender[0]?.label ?? "";

  const activeList =
    block === "race" ? sorted.race : block === "age" ? sorted.age : sorted.gender;

  // --- Make the middle panel follow the selected ("actual") option ---
  const selectedLabel =
    block === "race" ? actualRace : block === "age" ? actualAge : actualGender;

  const currentRow = useMemo(() => {
    const norm = (s?: string) => (s || "").toLowerCase().trim();
    return activeList.find((r) => norm(r.label) === norm(selectedLabel)) ?? activeList[0];
  }, [activeList, selectedLabel]);

  const displayLabel = currentRow?.label ?? "";
  const ringPct = currentRow?.value ?? 0; // 0–100

  return (
    <div className="px-8 md:px-14 py-10">
      {/* Header (with top padding so it sits below your fixed navbar) */}
      <div className="text-start mx-4 md:mx-0 mb-4 pt-10">
        <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
        <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
          DEMOGRAPHICS
        </h3>
        <h4 className="text-sm mt-2 font-normal leading-[24px]">PREDICTED RACE &amp; AGE</h4>
      </div>

      {nothingLoaded && (
        <><p className="mx-4 md:mx-0 text-xs text-gray-400">
                  Showing sample data until an image is uploaded and analysis is run.
              </p>
            </>

      )}

      <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
        {/* Left rail */}
        <aside className="bg-white-100 space-y-3 md:flex md:flex-col h-[62%]">
          <button
            onClick={() => setBlock("race")}
            className={`p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${
              block === "race"
                ? "bg-[#1A1B1C] text-white hover:bg-black"
                : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
            }`}
          >
            <p className="text-base font-semibold capitalize">{actualRace}</p>
            <h4 className="text-base font-semibold mb-1">RACE</h4>
          </button>

          <button
            onClick={() => setBlock("age")}
            className={`p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${
              block === "age"
                ? "bg-[#1A1B1C] text-white hover:bg-black"
                : "bg-[#F3F3F4] hover:bg-[#E1E1E2]"
            }`}
          >
            <p className="text-base font-semibold">{actualAge}</p>
            <h4 className="text-base font-semibold mb-1">AGE</h4>
          </button>

          <button
            onClick={() => setBlock("gender")}
            className={`p-3 cursor-pointer flex-1 flex flex-col justify-between text-left border-t ${
              block === "gender"
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
          {/* Big label top-left on md+ */}
          <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 capitalize">
            {displayLabel}
          </p>

          {/* Ring bottom-right on md+ */}
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
              <svg
                className="CircularProgressbar text-[#1A1B1C]"
                viewBox="0 0 100 100"
                data-test-id="CircularProgressbar"
              >
                {/* trail */}
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
                    strokeDasharray: "308.819px, 308.819px",
                    strokeDashoffset: 0,
                  }}
                />
                {/* progress */}
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
                    strokeDasharray: "308.819px, 308.819px",
                    strokeDashoffset: `${
                      308.819 - (Math.max(0, Math.min(100, ringPct)) / 100) * 308.819
                    }px`,
                  }}
                />
              </svg>

              {/* % in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl md:text-[40px] font-normal">
                  {Math.round(Math.max(0, Math.min(100, ringPct)))}{" "}
                  <span className="absolute text-xl md:text-3xl">%</span>
                </p>
              </div>
            </div>
          </div>

          {/* helper text like reference */}
          <p className="md:absolute text-xs text-[#A0A0A0] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </section>

        {/* Right table — click to set "actual" */}
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
                    className={`flex items-center justify-between h-[48px] px-4 cursor-pointer ${
                      isActive
                        ? "bg-[#1A1B1C] text-white hover:bg-black"
                        : "hover:bg-[#E1E1E2]"
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
          {/* left/corner */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            {nothingLoaded ? (
              // When no analysis loaded, route back to /result
              <Link
                href="/result"
                aria-label="Back"
                className="flex items-center text-dark-2 group"
              >
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

          {/* right/corner */}
          <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
            <div className="flex items-center text-dark-2 group">
              <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
                Home
              </span>

              <Link href="/" aria-label="Home">
                <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                  <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                    Home
                  </span>
                  <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
                    <Image src={arrowRight} alt="" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
