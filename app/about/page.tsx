"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../public/icons/arrowRight.svg";
import arrowLeft from "../../public/icons/arrowLeft.svg";

// ─ Static data ───────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Introduce Yourself",
    description:
      "Tell us your name and where you're from. This personalises your experience before the A.I. even sees your face.",
  },
  {
    number: "02",
    title: "Upload or Capture",
    description:
      "Upload a photo from your gallery or take a live selfie. Your image is sent securely and never stored after your session ends.",
  },
  {
    number: "03",
    title: "Demographic Analysis",
    description:
      "Computer vision predicts your race, age group, and gender, each with a confidence score you can review and correct.",
  },
  {
    number: "04",
    title: "Your Skin Routine",
    description:
      "Your unique profile drives a step-by-step morning and evening routine, with ingredients targeted to your exact skin needs.",
  },
];

const DIMENSIONS = [
  {
    label: "Race",
    count: 7,
    unit: "Categories",
    items: [
      "Black",
      "White",
      "East Asian",
      "Southeast Asian",
      "South Asian",
      "Latino Hispanic",
      "Middle Eastern",
    ],
  },
  {
    label: "Age",
    count: 9,
    unit: "Age Groups",
    items: ["0–2", "3–9", "10–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70+"],
  },
  {
    label: "Gender",
    count: 2,
    unit: "Identities",
    items: ["Male", "Female"],
  },
];

const STATS = [
  { n: "7",   label: "Race\nCategories",   highlight: false },
  { n: "×",   label: null },
  { n: "9",   label: "Age\nGroups",        highlight: false },
  { n: "×",   label: null },
  { n: "2",   label: "Gender\nIdentities", highlight: false },
  { n: "=",   label: null },
  { n: "126", label: "Unique Skin\nProfiles", highlight: true },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-light-1">

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-14 pt-28 pb-16 border-b border-[#1A1B1C]/10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-dark-3 mb-4 fadeInUp delay-1">
          Skinstric A.I.
        </p>
        <h1 className="text-[52px] md:text-[80px] lg:text-[100px] font-normal tracking-tighter leading-none text-dark-2 fadeInUp delay-2">
          DISCOVER<br className="hidden sm:block" /> THE TECHNOLOGY
        </h1>
        <p className="mt-6 max-w-[540px] text-sm md:text-[15px] text-dark-5 leading-relaxed fadeInUp delay-2_5">
          Skinstric developed a computer vision A.I. that analyses your facial
          features to predict your demographic profile, then uses that data to
          generate a highly-personalised skincare routine built for your skin.
        </p>
      </section>

      {/* ── 2. How It Works ──────────────────────────────────────────── */}
      <section className="px-8 md:px-14 py-14 border-b border-[#1A1B1C]/10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-dark-3 mb-10 fadeIn delay-2">
          How it works
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1B1C]/10">
          {HOW_IT_WORKS.map(({ number, title, description }, i) => (
            <div
              key={number}
              className={`flex flex-col gap-5 p-6 fade-up fade-up-delay-${i + 1}`}
            >
              {/* Big step number */}
              <span className="text-[52px] md:text-[64px] font-normal tracking-tighter text-[#E8E8E8] leading-none select-none">
                {number}
              </span>

              {/* Diamond accent */}
              <span className="block w-[8px] h-[8px] rotate-45 border border-dark-2 shrink-0" />

              {/* Title */}
              <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-dark-2">
                {title}
              </h3>

              {/* Body */}
              <p className="text-[13px] text-dark-5 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. What the A.I. Sees ────────────────────────────────────── */}
      <section className="px-8 md:px-14 py-14 border-b border-[#1A1B1C]/10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-dark-3 mb-10 fadeIn delay-2">
          What the A.I. analyses
        </p>

        {/* 3-column dimension cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1A1B1C]/10">
          {DIMENSIONS.map(({ label, count, unit, items }, i) => (
            <div key={label} className={`p-6 fade-up fade-up-delay-${i + 1}`}>
              {/* Count */}
              <span className="text-[72px] md:text-[88px] font-normal tracking-tighter text-dark-2 leading-none block">
                {count}
              </span>

              {/* Unit label with diamond */}
              <div className="flex items-center gap-2 mt-1 mb-8">
                <span className="block w-[6px] h-[6px] rotate-45 border border-dark-3 shrink-0" />
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-dark-3">
                  {unit}
                </span>
              </div>

              {/* Item list */}
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-dark-2">
                    <span className="block w-[5px] h-[5px] rotate-45 border border-dark-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Stats bar 7 × 9 × 2 = 126 ── */}
        <div className="mt-12 pt-10 border-t border-[#1A1B1C]/10 fadeIn delay-2_5">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            {STATS.map((item, i) =>
              item.label ? (
                <div key={i} className="flex flex-col items-center">
                  <span
                    className={`font-normal tracking-tighter leading-none ${
                      item.highlight
                        ? "text-[48px] md:text-[64px] text-dark-2"
                        : "text-[36px] md:text-[48px] text-dark-3"
                    }`}
                  >
                    {item.n}
                  </span>
                  <span className="text-[9px] font-semibold tracking-[0.12em] uppercase text-dark-3 text-center whitespace-pre-line mt-1 leading-tight">
                    {item.label}
                  </span>
                </div>
              ) : (
                <span
                  key={i}
                  className="text-[36px] md:text-[48px] font-normal text-[#CBCBCB] leading-none pb-5"
                >
                  {item.n}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── 4. Privacy note ──────────────────────────────────────────── */}
      <section className="px-8 md:px-14 py-12 mb-24 fadeIn delay-3">
        <div className="flex items-start gap-4 max-w-[500px]">
          {/* Diamond icon */}
          <span className="mt-[3px] block w-[10px] h-[10px] rotate-45 border border-dark-2 shrink-0" />
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-dark-2 mb-2">
              Privacy First
            </p>
            <p className="text-sm text-dark-5 leading-relaxed">
              Your photo is analysed in-session via a secure API. Images are
              never stored, sold, or used to train models. You own your data.
              The moment your session ends, it is gone.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom nav ───────────────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-[100] pointer-events-none md:px-9 px-13">
        <div className="relative h-24">

          {/* ← Back to home */}
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            <Link
              href="/"
              aria-label="Back to home"
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
          </div>

          {/* Take the Test → */}
          <div className="absolute right-6 md:right-0 bottom-8 pointer-events-auto">
            <Link href="/testing" className="flex items-center text-dark-2 group">
              <span className="hidden md:inline-block mr-6 text-sm font-semibold uppercase tracking-wide">
                Take the Test
              </span>
              <div className="diamond-44 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                <span className="-rotate-45 md:hidden text-[10px] font-semibold uppercase tracking-wide">
                  Test
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
  );
}
