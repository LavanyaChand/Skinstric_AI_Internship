"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { uploadPhase2 } from "@/lib/phase2";
import { useAnalysisStore } from "@/lib/store";
import { Phase2Response } from "@/lib/types";

import BackButton from "../sharedComponent/BackButton";
import SideHeading from "../sharedComponent/SideHeading";
import TileDiamondsCamera from "../sharedComponent/TileDiamondsCamera";
import LoadingOverlay from "../sharedComponent/LoadingOverlay";

type CamPrompt = "idle" | "prompt";

// util: file -> base64 (no data: prefix)
function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result).split(",")[1] || "");
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export default function ResultPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // store setters (needed so /select has data)
  const { setImage, setResult } = useAnalysisStore();

  // preview (object URL) for the small box on the right
  const [preview, setPreview] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [camPrompt, setCamPrompt] = useState<CamPrompt>("idle");

  useEffect(() => {
    // cleanup object-URL when leaving the page
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  async function handleFile(file: File) {
    // Show preview immediately
    const url = URL.createObjectURL(file);
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = url;
    setPreview(url);

    setLoading(true);
    try {
      const base64 = await fileToBase64(file);

      setImage(base64, url);

      const apiRes: Phase2Response = await uploadPhase2(base64);
      setResult(apiRes);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Image analyzed successfully!");
      router.push("/select");

    } catch (e) {
      console.error(e);
      alert("Failed to analyze image. Please try a different image.");
    } finally {
      setLoading(false);
    }
  }


  /* ----- camera permission modal actions ----- */
  function openCameraPrompt() {
    setCamPrompt("prompt");
  }
  function denyCamera() {
    setCamPrompt("idle");
  }
  function allowCamera() {
    setCamPrompt("idle");
    router.push("/camera"); // your dedicated camera flow
  }

  return (
    <main className="relative min-h-[100vh] flex flex-col bg-light-2 md:pt-[64px] justify-center">
      <SideHeading />

      {/* Tiles area */}
      <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
        {/* CAMERA TILE (left) */}
        <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />
          <TileDiamondsCamera />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src="/icons/camera-icon.png"
              alt="Camera Icon"
              width={136}
              height={136}
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              onClick={openCameraPrompt}
            />
            <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px]">
              <p className="text-xs md:text-sm font-normal mt-1 leading-[24px]">
                ALLOW A.I.<br />TO SCAN YOUR FACE
              </p>
            </div>
          </div>
        </div>

        {/* GALLERY TILE (right) */}
        <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300">
          <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]" />
          <TileDiamondsCamera />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src="/icons/gallery-icon.png"
              alt="Photo Upload Icon"
              width={136}
              height={136}
              className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-108 duration-700 ease-in-out cursor-pointer"
              onClick={() => inputRef.current?.click()}
            />
            <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px]">
              <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right">
                ALLOW A.I.<br />ACCESS GALLERY
              </p>
            </div>
          </div>
        </div>

        {/* Preview box (top-right of tiles area) */}
        <div className="absolute top-[-50px] right-7 md:top-[50px] md:right-8 z-[250]">
          <h1 className="text-xs md:text-sm font-medium mb-1">Preview</h1>
          <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-white/50">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom transparent bar with Back */}
      <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
        <div className="relative h-24">
          <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
            <BackButton />
          </div>
        </div>
      </div>

      {/* Hidden gallery input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {/* Camera Allow/Deny modal */}
      {camPrompt === "prompt" && (
        <div className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-[1px] grid place-items-center">
          <div className="w-[420px] max-w-[92vw] bg-dark-2 text-light-2">
            <div className="px-6 py-5 text-[12px] tracking-widest uppercase">
              ALLOW A.I. TO ACCESS YOUR CAMERA
            </div>
            <div className="border-t border-black/30 flex">
              <button
                className="flex-1 py-3 text-[#9CA3AF] hover:bg-black/30 transition"
                onClick={denyCamera}
              >
                DENY
              </button>
              <button
                className="flex-1 py-3 font-semibold hover:bg-black/30 transition"
                onClick={allowCamera}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && <LoadingOverlay text="PREPARING YOUR ANALYSIS..." />}
    </main>
  );
}
