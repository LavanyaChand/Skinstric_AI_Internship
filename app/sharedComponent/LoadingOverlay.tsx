"use client";
import DottedDiamonds from "./DottedDiamonds";

export default function LoadingOverlay({ text = "PREPARING YOUR ANALYSIS..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-light-1 z-[100] grid place-items-center">
      <div className="relative w-[760px] max-w-[92vw] aspect-square">
        <DottedDiamonds />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-sm tracking-widest text-dark-2 font-semibold mb-3">{text}</div>
          <div className="flex items-center gap-2">
            <span className="loading-dot" />
            <span className="loading-dot dot-delay-1" />
            <span className="loading-dot dot-delay-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
