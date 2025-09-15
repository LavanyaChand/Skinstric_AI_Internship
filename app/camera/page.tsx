"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


import TileDiamondsCamera from "../sharedComponent/TileDiamondsCamera";

export default function CameraSetupPage() {
  const router = useRouter();

  useEffect(() => {
    // short pause to mimic setup, then go capture
    const t = setTimeout(() => router.push("/camera/capture"), 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Dotted diamond stack (rotated a little) */}
      <div className="pointer-events-none relative w-[340px] h-[340px] md:w-[520px] md:h-[520px] rotate-45">
        <TileDiamondsCamera />
        {/* camera glyph */}
        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
          <Image src="/icons/camera-icon.png" alt="" width={120} height={120} className="opacity-70" />
        </div>
      </div>

      {/* label */}
      <p className="mt-8 text-[12px] tracking-widest uppercase text-dark-2">
        Setting up camera ...
      </p>

      {/* tips row */}
      <div className="mt-8 text-[10px] md:text-[11px] tracking-wide text-dark-3">
        <span className="mx-3">◇ Neutral expression</span>
        <span className="mx-3">◇ Frontal pose</span>
        <span className="mx-3">◇ Adequate lighting</span>
      </div>

      {/* subtle track under tips (purely visual) */}
      <div className="mt-3 w-[320px] md:w-[480px] h-[6px] bg-black/10 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-black/20 animate-pulse" />
      </div>
    </main>
  );
}
