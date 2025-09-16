"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAnalysisStore } from "@/lib/store";
import { uploadPhase2 } from "@/lib/phase2";
import { Phase2Response } from "@/lib/types";

import BackButton from "../sharedComponent/BackButton";
import LoadingOverlay from "../sharedComponent/LoadingOverlay";

export default function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { setImage, setResult } = useAnalysisStore();

  const [isReady, setIsReady] = useState(false);
  const [shotDataUrl, setShotDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Start the camera and play after metadata */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;

      const v = videoRef.current;
      if (!v) return;

      if (v.srcObject !== stream) v.srcObject = stream;

      v.muted = true;
      (v as any).playsInline = true;

      const play = () => {
        const p = v.play();
        if (p && typeof p.then === "function") {
          p.catch((err) => {
            if ((err as any)?.name !== "AbortError") console.error(err);
          });
        }
        setIsReady(true);
      };

      if (v.readyState >= 2) play();
      else v.addEventListener("loadedmetadata", play, { once: true });
    } catch (e) {
      console.error("getUserMedia failed:", e);
      alert("Could not access the camera. Please allow camera access and try again.");
      router.push("/result");
    }
  };

  /** Stop the camera right away (turns off LED, frees camera) */
  const stopCamera = React.useCallback(() => {
    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.srcObject = null;
      }
    } catch { }
    setIsReady(false);
  }, []);


  // Start on mount; stop on unmount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Safety: whenever we switch back to video, ensure it's playing */
  useEffect(() => {
    if (!shotDataUrl && videoRef.current) {
      const v = videoRef.current;
      if (v.srcObject) {
        const p = v.play();
        if (p && typeof p.then === "function") {
          p.catch((err) => {
            if ((err as any)?.name !== "AbortError") console.error(err);
          });
        }
      } else {
        // stream was stopped earlier; start it again
        startCamera();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shotDataUrl]);

  function takeShot() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    canvas.width = vw;
    canvas.height = vh;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, vw, vh);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setShotDataUrl(dataUrl);

    // stop camera on next frame so the draw finishes cleanly
    requestAnimationFrame(() => stopCamera());
  }

  function retake() {
    setShotDataUrl(null); // shows <video> again
    // start immediately (useEffect above also ensures it plays)
    startCamera();
  }

  async function proceed() {
    if (!shotDataUrl) return;
    const base64 = shotDataUrl.split(",")[1] ?? "";

    setLoading(true);
    try {
      setImage(base64, shotDataUrl);

      const apiRes: Phase2Response = await uploadPhase2(base64);
      setResult(apiRes);

      await new Promise((r) => setTimeout(r, 900));
      router.push("/select");
    } catch (e) {
      console.error(e);
      alert("Failed to analyze your photo. Please retake and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Full-bleed stage */}
      <main className="fixed inset-0 bg-black overflow-hidden">
         {!isReady && (
    <div className="absolute inset-0 grid place-items-center bg-white text-black">
      <div className="relative">
        {/* three rotated outlines (diamonds) */}
        <div className="absolute inset-0 -rotate-12 w-[240px] h-[240px] border border-black/20 mx-auto" />
        <div className="absolute inset-0 rotate-0   w-[260px] h-[260px] border border-black/30 mx-auto" />
        <div className="absolute inset-0 rotate-12  w-[280px] h-[280px] border border-black/40 mx-auto" />
        <div className="relative grid place-items-center w-[280px] h-[280px]">
          <Image src="/icons/camera-icon.png" alt="" width={96} height={96} />
          <p className="mt-4 text-xs tracking-widest">SETTING UP CAMERA…</p>
        </div>
      </div>
    </div>
  )}
        {/* Live video or captured photo (fills the screen) */}
        {!shotDataUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shotDataUrl}
            alt="Captured"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Bottom tip (only visible while live) */}
        {!shotDataUrl && (
          <div className=" mb-5 pointer-events-none absolute inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] flex justify-center">
            <div className="text-white/75 text-[11px] md:text-xs tracking-wide">
              <p className="uppercase text-center mb-4">
                To get better results make sure to have
              </p>

              <div className="flex items-center justify-center gap-6">
                {/* bullet 1 */}
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-[8px] h-[8px] md:w-2 md:h-2 rotate-45 border border-white/80"></span>
                  <span className="uppercase">Neutral expression</span>
                </span>

                {/* bullet 2 */}
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-[8px] h-[8px] md:w-2 md:h-2 rotate-45 border border-white/80"></span>
                  <span className="uppercase">Frontal pose</span>
                </span>

                {/* bullet 3 */}
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-[8px] h-[8px] md:w-2 md:h-2 rotate-45 border border-white/80"></span>
                  <span className="uppercase">Adequate lighting</span>
                </span>
              </div>
            </div>
          </div>
        )}


        {/* Controls */}
        {!shotDataUrl ? (
          <>
            <button
              onClick={takeShot}
              aria-disabled={!isReady}
              className={`
                group absolute z-50 flex items-center gap-3 text-white
                ${!isReady ? "opacity-50 pointer-events-none" : ""}
                left-1/2 -translate-x-1/2 bottom-[calc(72px+env(safe-area-inset-bottom))]
                md:left-auto md:translate-x-0 md:bottom-auto md:top-1/2 md:right-6
              `}
              aria-label="Take picture"
              title="Take picture"
            >
              <span>Take capture</span>
              <span
                className="inline-grid place-items-center w-[62px] h-[62px] rounded-full
                           transition-transform duration-300 ease-out will-change-transform
                           group-hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Image src="/icons/cameraCapture.png" alt="" width={62} height={62} priority />
              </span>
            </button>

            {/* Back button (while live) */}
            <div className="fixed inset-x-0 bottom-0 z-[100] bg-transparent pointer-events-none md:px-9 px-13">
              <div className="relative h-24">
                <div className="absolute left-6 md:left-0 bottom-8 pointer-events-auto">
                  <BackButton onBeforeBack={stopCamera} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-1/5 left-1/2 -translate-x-1/2 text-light-1 font-medium">
              Great Shot!
            </div>
            <div className="absolute left-[max(16px,env(safe-area-inset-left))] bottom-[max(16px,env(safe-area-inset-bottom))] flex gap-3">
              <button
                onClick={retake}
                className="px-4 py-2 border border-white/80 text-white bg-white/10 hover:bg-white/20 transition text-sm backdrop-blur-sm"
              >
                Retake
              </button>
              <button
                onClick={proceed}
                className="px-4 py-2 bg-white text-black hover:bg-[#EAEAEA] transition text-sm"
              >
                Proceed
              </button>
            </div>
          </>
        )}
      </main>

      {loading && <LoadingOverlay text="PREPARING YOUR ANALYSIS..." />}
    </>
  );
}
