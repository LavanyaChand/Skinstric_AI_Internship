"use client";

import React, { useMemo, useState } from "react";
import { useAnalysisStore } from "@/lib/store";
import { sortBuckets } from "@/lib/phase2";
import BackButton from "../sharedComponent/BackButton";
import Link from "next/link";
import arrowLeft from '../../public/icons/arrowLeft.svg';
import arrowRight from '../../public/icons/arrowRight.svg';
import Image from 'next/image';

type Block = "race" | "age" | "gender";

const fmt = (n: number) => `${n.toFixed(2)}%`; // values from sortBuckets are already 0–100 with 2dp

export default function Page() {
    const result = useAnalysisStore((s) => s.result);
    const actual = useAnalysisStore((s) => s.actual);
    const setActual = useAnalysisStore((s) => s.setActual);

    // Redirect guard if no result, tell user to upload first
    if (!result?.data) {
        return (
            <>
                <div className="px-8 py-10">
                    <h1 className="text-2xl font-semibold">No analysis yet</h1>
                    <p className="text-gray-500 mt-2">Please upload a photo and run the analysis.</p>
                </div>

                <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
                    <div className="relative h-24">
                        <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
                            <Link href="/result"
                                aria-label="Back"
                                className="flex items-center text-dark-2 group bg-transparent">
                                <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                                    {/* mobile label inside diamond */}
                                    <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                                        Back
                                    </span>
                                    {/* desktop arrow inside diamond */}
                                    <span className="-rotate-45 hidden md:block leading-none transition-transform duration-300 group-hover:scale-90">
                                        <Image src={arrowLeft} alt="" />
                                    </span>
                                </div>
                                {/* desktop label outside */}
                                <span className="hidden md:inline-block ml-6 text-sm font-semibold uppercase tracking-wide">
                                    Back
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const [block, setBlock] = useState<Block>("race");

    // Prepare sorted buckets (desc, 2dp %) once
    const sorted = useMemo(() => {
        const { race, age, gender } = result.data;
        return {
            race: sortBuckets(race),     // -> [{label, value: 2dp%}]
            age: sortBuckets(age),
            gender: sortBuckets(gender),
        };
    }, [result.data]);

    // What's shown as the “actual” for each tab (defaults to the top AI pick)
    const actualRace = actual.race ?? sorted.race[0]?.label ?? "";
    const actualAge = actual.age ?? sorted.age[0]?.label ?? "";
    const actualGender = actual.gender ?? sorted.gender[0]?.label ?? "";

    const activeList =
        block === "race" ? sorted.race : block === "age" ? sorted.age : sorted.gender;

    const top = activeList[0];
    const ringPct = top?.value ?? 0; // already 0–100

    return (
        <div className="px-8 md:px-14 py-10">
             
            {/* Header */}
            <div className="text-start mx-4 md:mx-0 mb-4 pt-14">
                <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
                <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">DEMOGRAPHICS</h3>
                <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE & AGE</h4>
            </div>


            <div className="mt-10 grid grid-cols-12 gap-6">
                {/* Left rail */}
                <aside className="col-span-12 md:col-span-2 space-y-3">
                    <button
                        onClick={() => setBlock("race")}
                        className={`w-full h-16 text-left px-4 ${block === "race" ? "bg-black text-white" : "bg-gray-100"}`}
                    >
                        <div className="text-xs uppercase text-gray-400">Race</div>
                        <div className="font-semibold capitalize">{actualRace}</div>
                    </button>

                    <button
                        onClick={() => setBlock("age")}
                        className={`w-full h-16 text-left px-4 ${block === "age" ? "bg-black text-white" : "bg-gray-100"}`}
                    >
                        <div className="text-xs uppercase text-gray-400">Age</div>
                        <div className="font-semibold capitalize">{actualAge}</div>
                    </button>

                    <button
                        onClick={() => setBlock("gender")}
                        className={`w-full h-16 text-left px-4 ${block === "gender" ? "bg-black text-white" : "bg-gray-100"}`}
                    >
                        <div className="text-xs uppercase text-gray-400">Sex</div>
                        <div className="font-semibold capitalize">{actualGender}</div>
                    </button>
                </aside>

                {/* Middle panel with ring */}
                <section className="col-span-12 md:col-span-7 bg-gray-100 p-8">
                    <div className="text-3xl mb-6 capitalize">{top?.label ?? ""}</div>

                    <div className="mx-auto w-[520px] max-w-full aspect-square grid place-items-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#111827"
                                strokeWidth="6"
                                strokeDasharray={`${Math.max(0, Math.min(100, ringPct)) / 100 * 251} 251`}
                                transform="rotate(-90 50 50)"
                                strokeLinecap="round"
                            />
                            <text x="50" y="54" textAnchor="middle" fontSize="14" fill="#111827" fontWeight={600}>
                                {Math.round(ringPct)}%
                            </text>
                        </svg>
                    </div>
                </section>

                {/* Right table — click to set "actual" */}
                <aside className="col-span-12 md:col-span-3">
                    <div className="border">
                        <div className="px-4 py-3 text-xs uppercase flex justify-between text-gray-500">
                            <span className="capitalize">{block}</span>
                            <span>A.I. Confidence</span>
                        </div>
                        <ul>
                            {activeList.map(({ label, value }) => {
                                const active =
                                    (block === "race" && actualRace === label) ||
                                    (block === "age" && actualAge === label) ||
                                    (block === "gender" && actualGender === label);
                                return (
                                    <li
                                        key={label}
                                        onClick={() => setActual(block, label)}
                                        className={`px-4 py-3 text-sm flex items-center justify-between cursor-pointer ${active ? "bg-black text-white" : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <span className="capitalize">{label}</span>
                                        <span>{fmt(value)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>
            </div>

            <div className="mt-6 text-center text-gray-500 text-sm">
                If A.I. estimate is wrong, select the correct one.
            </div>

            {/* Bottom bar */}
            <div className="relative inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
                <div className="h-24">
                    {/* left/corner */}
                    <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
                        <BackButton />
                    </div>

                    {/* right/corner */}
                    <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
                        <div className="flex items-center text-dark-2 group">
                            {/* desktop label outside */}
                            <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
                                Home
                            </span>

                            <Link href="/" aria-label="Home">
                                <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                                    {/* mobile label inside diamond */}
                                    <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                                        Home
                                    </span>
                                    {/* desktop arrow inside diamond */}
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




