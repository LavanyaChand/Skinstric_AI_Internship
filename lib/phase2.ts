import axios from "axios";
import { Phase2Response } from "./types";

export const PHASE2_ENDPOINT =
  "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo";

/** upload base64 image -> Phase 2 API */
export async function uploadPhase2(imageBase64: string) {
  // API expects { image: "base64" } per your PDF
  const payload = { image: imageBase64 };
  const { data } = await axios.post<Phase2Response>(PHASE2_ENDPOINT, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

/** Sort an object of {label: number} to a {label, value}[] descending, 2 dp */
export function sortBuckets(obj: Record<string, number>) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value: Math.round(value * 10000) / 100 })); // → percent with 2dp
}
