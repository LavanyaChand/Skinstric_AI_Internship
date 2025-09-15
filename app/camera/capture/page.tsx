"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadPhase2 } from "../../../lib/phase2";
import { useAnalysisStore } from "../../../lib/store";
import Image from "next/image";
import BackButton from "@/app/sharedComponent/BackButton";
// import shutterIcon from "@/public/icons/camera.svg";

/** Small utility to convert a Blob to base64 (without the data: prefix) */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result).split(",")[1] || "");
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

type Mode = "stream" | "review" | "uploading";

export default function CameraCapturePage() {
  const router = useRouter();
  const { setImage, setResult } = useAnalysisStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // UI mode
  const [mode, setMode] = useState<Mode>("stream");
  const [toast, setToast] = useState("");

  // captured image
  const capturedBlobRef = useRef<Blob | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  /** Start the live camera */
  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setMode("stream");
    } catch (e) {
      alert("Camera permission denied.");
      router.push("/result");
    }
  }

  /** Stop the live camera */
  function stop() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  useEffect(() => {
    start();
    return () => {
      // cleanup
      if (previewURL) URL.revokeObjectURL(previewURL);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Take a photo and show the review UI */
  async function capture() {
    if (!videoRef.current) return;
    const vid = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = vid.videoWidth || 1280;
    canvas.height = vid.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);

    const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b as Blob), "image/jpeg", 0.92));

    // Keep for upload confirmation
    capturedBlobRef.current = blob;

    // Make a preview URL
    if (previewURL) URL.revokeObjectURL(previewURL);
    const url = URL.createObjectURL(blob);
    setPreviewURL(url);

    // nice “great shot!” blip
    setToast("GREAT SHOT!");
    setTimeout(() => setToast(""), 900);

    // Pause/stop the stream while reviewing (optional)
    stop();
    setTimeout(() => {
      setMode("review");
    }, 100); // 100ms delay
  }

  /** User chose to retake the photo */
  async function retake() {
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(null);
    capturedBlobRef.current = null;

    stop(); // Ensure previous stream is fully stopped
    await new Promise((r) => setTimeout(r, 100)); // Small delay before restarting
    start();
  }

  /** User confirmed the photo */
  async function useThisPhoto() {
    const blob = capturedBlobRef.current;
    if (!blob) return;

    setMode("uploading");

    try {
      const base64 = await blobToBase64(blob);

      // keep preview URL in the store so the small preview on /result/select can show it
      const url = previewURL || "";
      setImage(base64, url);

      const res = await uploadPhase2(base64);
      setResult(res);

      router.push("/select");
    } catch (e) {
      console.error(e);
      alert("Failed to analyze image. Please try again.");
      // If it fails, let them try again from review
      setMode("review");
    }
  }

  return (
    <main className="relative h-[100vh] w-screen overflow-hidden bg-black">
      {/* BACK button like your comps */}
      <button
        onClick={() => router.push("/result")}
        className="absolute left-8 bottom-8 z-20 text-white/90 text-xs tracking-widest"
      >
        <BackButton />
      </button>

      {/* STREAM MODE -------------------------------------------------- */}
      {mode === "stream" && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* shutter */}
          <div className="absolute right-[9%] top-1/2 -translate-y-1/2 grid place-items-center z-10">
            <button
              onClick={capture}
              className="grid place-items-center w-[56px] h-[56px] rounded-full bg-white/85 hover:bg-white transition shadow"
              aria-label="Take picture"
            >
              <Image src="/icons/cameraCapture.png" alt="" width={24} height={24} className="opacity-80" />
            </button>
            <div className="mt-2 text-white text-[10px] tracking-widest opacity-80">TAKE PICTURE</div>
          </div>

          {/* tips footer */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[44px] text-white/90 text-[10px] tracking-wide">
            <span className="mx-3">◇ Neutral expression</span>
            <span className="mx-3">◇ Frontal pose</span>
            <span className="mx-3">◇ Adequate lighting</span>
          </div>

          {/* Great Shot toast */}
          {toast && (
            <div className="absolute top-[22%] left-1/2 -translate-x-1/2 text-white text-[11px] tracking-widest">
              {toast}
            </div>
          )}
        </>
      )}

      {/* REVIEW MODE -------------------------------------------------- */}
      {mode === "review" && previewURL && (
        <>
          {/* frozen photo as background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewURL}
            alt="preview"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* preview panel */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[64px] z-20">
            <div className="w-[min(92vw,520px)] mx-auto text-center">
              <div className="text-white text-sm mb-3">Preview</div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={retake}
                  className="px-4 py-2 text-sm bg-white/80 hover:bg-white text-black rounded"
                >
                  Retake
                </button>
                <button
                  onClick={useThisPhoto}
                  className="px-4 py-2 text-sm font-semibold bg-black/80 hover:bg-black text-white rounded"
                >
                  Use This Photo
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* UPLOADING / ANALYZING --------------------------------------- */}
      {mode === "uploading" && (
        <>
          {/* keep the frozen photo in the background while we analyze */}
          {previewURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewURL}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/30 grid place-items-center z-30">
            <div className="backdrop-blur-sm bg-white/75 px-8 py-6 rounded-md shadow">
              <div className="text-[12px] font-medium tracking-widest text-dark-2">
                ANALYZING IMAGE
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="loading-dot" />
                <span className="loading-dot dot-delay-1" />
                <span className="loading-dot dot-delay-2" />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
