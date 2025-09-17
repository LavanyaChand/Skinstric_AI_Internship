"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAnalysisStore } from "@/lib/store";
import { uploadPhase2 } from "@/lib/phase2";
import { Phase2Response } from "@/lib/types";

import BackButton from "../sharedComponent/BackButton";
import LoadingOverlay from "../sharedComponent/LoadingOverlay";

import largeDiamond from "../../public/images/largeDiamond.png";
import mediumDiamond from "../../public/images/mediumDiamond.png";
import smallDiamond from "../../public/images/smallDiamond.png";

export default function CameraPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { setImage, setResult } = useAnalysisStore();

  const [isReady, setIsReady] = useState(false);
  const [shotDataUrl, setShotDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (loading) {
      root.style.setProperty("--nav-logo-color", "#111111"); // black
    } else {
      root.style.removeProperty("--nav-logo-color");
    }

    // cleanup returns void
    return () => {
      root.style.removeProperty("--nav-logo-color");
    };
  }, [loading]);


  /** Start the camera and play after metadata */
  const startCamera = useCallback(async () => {
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
  }, [router]);

  /* Stop the camera */
  const stopCamera = useCallback(() => {
    // already stopped? bail
    if (!streamRef.current && !videoRef.current?.srcObject) {
      setIsReady(false);
      return;
    }

    const v = videoRef.current;
    const s = streamRef.current;

    try {
      // 1) Detach the stream from the <video> ASAP
      if (v) {
        try { v.pause(); } catch { }
        // Clearing srcObject first helps some browsers stop rendering immediately
        try { (v as any).srcObject = null; } catch { }
        // Also clear src to cover Safari/WebKit oddities
        try { v.removeAttribute("src"); } catch { }
        // Force a readyState reset
        try { v.load(); } catch { }
      }

      // 2) Stop *all* tracks (video+audio in case audio sneaks in)
      if (s) {
        for (const t of s.getTracks()) {
          try { t.stop(); } catch { }
          // Optional: detach from stream for good measure
          try { s.removeTrack?.(t as any); } catch { }
        }
      }
    } finally {
      streamRef.current = null;
      setIsReady(false);
    }
  }, []);


  // Start on mount; stop on unmount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  /** If we switch back to video, ensure it's playing */
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
        startCamera();
      }
    }
  }, [shotDataUrl, startCamera]);

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

    // grab the current frame
    ctx.drawImage(video, 0, 0, vw, vh);

    // persist the image first
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setShotDataUrl(dataUrl);

    // HARD STOP immediately (don’t wait for next frame)
    stopCamera();
  }


  function retake() {
    setShotDataUrl(null);
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
      {/* Wrapping main keeps the video area responsive under your navbar */}
      <main className="flex flex-col min-h-screen bg-black">
        {/* Camera stage (same height behavior as your ref: ~92vh under the header) */}
        <div className="relative w-screen h-[100vh] overflow-hidden bg-black">
          {/* Figma-accurate loader. Keeps exact sizes; only scales on very small screens */}
          {!isReady && !shotDataUrl && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-white text-black">
              <div className="relative w-[760px] max-w-[92vw] aspect-square">
                <Image
                  alt="Diamond Large"
                  src={largeDiamond}
                  priority
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             w-[404.03px] h-[404.03px] md:w-[604.03px] md:h-[604.03px]
                             animate-spin-slow rotate-[190deg] select-none pointer-events-none will-change-transform"
                />
                <Image
                  alt="Diamond Medium"
                  src={mediumDiamond}
                  priority
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             w-[298px] h-[298px] md:w-[498px] md:h-[498px]
                             animate-spin-slower rotate-[185deg] select-none pointer-events-none will-change-transform"
                />
                <Image
                  alt="Diamond Small"
                  src={smallDiamond}
                  priority
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             w-[205.18px] h-[205.18px] md:w-[405.18px] md:h-[405.18px]
                             animate-spin-slowest select-none pointer-events-none will-change-transform"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Image
                    src="/icons/camera-icon.png"
                    alt=""
                    width={152}
                    height={152}
                    className="w-[80px] h-[80px] md:w-[152px] md:h-[152px]"
                    priority
                  />
                  <p className="mt-4 tracking-widest font-semibold text-[10px] md:text-[16px]">
                    SETTING UP CAMERA…
                  </p>

                  {/* Helper bullets (as in your Figma) */}
                  <div className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-sm md:text-xs mt-2.5 text-black/70">
                    <p className="uppercase text-center mb-3">
                      To get better results make sure to have
                    </p>
                    <div className="flex items-center justify-center gap-6">
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-[8px] h-[8px] rotate-45 border border-black/60"></span>
                        <span className="uppercase">Neutral expression</span>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-[8px] h-[8px] rotate-45 border border-black/60"></span>
                        <span className="uppercase">Frontal pose</span>
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block w-[8px] h-[8px] rotate-45 border border-black/60"></span>
                        <span className="uppercase">Adequate lighting</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live video or captured image (full-bleed) */}
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

          {/* Bottom tip (only while live) */}
          {!shotDataUrl && isReady && (
            <div className="pointer-events-none absolute inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] flex justify-center">
              <div className="text-white/75 text-[11px] md:text-xs tracking-wide">
                <p className="uppercase text-center mb-3">
                  To get better results make sure to have
                </p>
                <div className="flex items-center justify-center gap-6">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block w-[8px] h-[8px] md:w-2 md:h-2 rotate-45 border border-white/80"></span>
                    <span className="uppercase">Neutral expression</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block w-[8px] h-[8px] md:w-2 md:h-2 rotate-45 border border-white/80"></span>
                    <span className="uppercase">Frontal pose</span>
                  </span>
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
              {/* Capture: bottom-center on mobile, right-center on md+.
                  Hidden while overlay is showing (isReady=false). */}
              {isReady && (
                <button
                  onClick={takeShot}
                  className="
                    group absolute z-30 flex items-center gap-3 text-white

                    left-1/2 -translate-x-1/2 bottom-[calc(84px+env(safe-area-inset-bottom))]
                    md:left-auto md:translate-x-0 md:bottom-auto md:top-1/2 md:right-8

                    select-none
                  "
                  aria-label="Take picture"
                  title="Take picture"
                >
                  <span className="hidden md:inline whitespace-nowrap">Take capture</span>
                  <span
                    className="inline-grid place-items-center w-[62px] h-[62px] rounded-full
                               transition-transform duration-300 ease-out will-change-transform
                               group-hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Image src="/icons/cameraCapture.png" alt="" width={62} height={62} priority />
                  </span>
                </button>
              )}

              {/* Back button (while live) */}
              {isReady && (
                <div className="absolute inset-x-0 bottom-0 z-30 bg-transparent pointer-events-none md:px-9 px-13">
                  <div className="relative h-24">
                    <div className="absolute left-0 bottom-20 md:bottom-8 pointer-events-auto">
                      <BackButton onBeforeBack={stopCamera} />
                    </div>
                  </div>
                </div>
              )}

            </>
          ) : (
            <>
              <div className="absolute top-1/5 left-1/2 -translate-x-1/2 text-light-1 font-medium">
                Great Shot!
              </div>
              <div className="absolute right-[max(16px,env(safe-area-inset-left))] bottom-[max(16px,env(safe-area-inset-bottom))] flex gap-3 z-30">
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
        </div>
      </main>

      {loading && <LoadingOverlay text="PREPARING YOUR ANALYSIS..." />}
    </>
  );
}
