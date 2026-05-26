"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const STEPS: Record<string, { step: number; label: string }> = {
  "/testing": { step: 1, label: "Introduce Yourself" },
  "/result":  { step: 2, label: "Upload Image" },
  "/camera":  { step: 2, label: "Upload Image" },
  "/select":  { step: 3, label: "A.I. Analysis" },
  "/summary": { step: 4, label: "Demographics" },
  "/routine": { step: 5, label: "Skin Routine" },
};

const TOTAL_STEPS = 5;

const NavBar = () => {
  const pathname = usePathname();
  const isCamera = pathname?.startsWith("/camera");
  const isHome = pathname === "/";

  const currentStep = pathname ? STEPS[pathname] : null;
  const textColor = isCamera ? "text-light-1" : "text-dark-2";

  return (
    <div className="print:hidden absolute top-0 left-0 flex flex-row h-[64px] w-full justify-between items-center py-3 mb-3 z-[1000] bg-transparent">

      {/* Logo */}
      <div className="flex-center flex-row pt-1 scale-75">
        <Link
          href="/"
          className={`font-bold h-9 px-4 py-2 ${isCamera ? "text-light-1" : "text-dark-1"}`}
          style={{ color: "var(--nav-logo-color)" }}
        >
          SKINSTRIC
        </Link>
      </div>

      {/* Right side */}
      {isHome ? null : currentStep ? (
        <div className={`flex flex-col items-end justify-center pr-5 md:pr-9 ${textColor}`}
             style={{ color: isCamera ? undefined : "var(--nav-logo-color, inherit)" }}>
          {/* Step dots */}
          <div className="flex items-center gap-[5px] mb-[3px]">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`block w-[6px] h-[6px] rotate-45 border transition-all duration-300
                  ${i < currentStep.step
                    ? isCamera
                      ? "bg-white border-white"
                      : "bg-dark-2 border-dark-2"
                    : isCamera
                      ? "border-white/40"
                      : "border-dark-2/30"
                  }`}
              />
            ))}
          </div>
          {/* Label */}
          <span className="text-[9px] font-semibold tracking-[0.15em] uppercase opacity-70 leading-none">
            Step {currentStep.step} of {TOTAL_STEPS}&nbsp;&nbsp;·&nbsp;&nbsp;{currentStep.label}
          </span>
        </div>
      ) : null}

    </div>
  );
};

export default NavBar;
