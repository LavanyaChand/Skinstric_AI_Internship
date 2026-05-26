import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Phase2Response } from "./types";

type AnalysisState = {
  imageBase64?: string;
  previewUrl?: string;
  result?: Phase2Response;
  actual: {
    race?: string;
    age?: string;
    gender?: string;
  };
  setImage: (base64: string, previewUrl: string) => void;
  setResult: (res: Phase2Response) => void;
  setActual: (key: "race" | "age" | "gender", value: string) => void;
  reset: () => void;
};

export const useAnalysisStore = create<AnalysisState>()(
  persist(
    (set) => ({
      imageBase64: undefined,
      previewUrl: undefined,
      result: undefined,
      actual: {},
      setImage: (imageBase64, previewUrl) => set({ imageBase64, previewUrl }),
      setResult: (result) => set({ result }),
      setActual: (key, value) =>
        set((s) => ({ actual: { ...s.actual, [key]: value } })),
      reset: () =>
        set({ imageBase64: undefined, previewUrl: undefined, result: undefined, actual: {} }),
    }),
    {
      name: "skinstric-analysis", // localStorage key
      // Only persist analysis data — imageBase64 is too large for localStorage
      // and previewUrl is a blob URL that expires when the session ends
      partialize: (state) => ({
        result: state.result,
        actual:  state.actual,
      }),
    }
  )
);
