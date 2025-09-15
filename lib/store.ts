import { create } from "zustand";
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

export const useAnalysisStore = create<AnalysisState>((set) => ({
  imageBase64: undefined,
  previewUrl: undefined,
  result: undefined,
  actual: {},
  setImage: (imageBase64, previewUrl) => set({ imageBase64, previewUrl }),
  setResult: (result) => set({ result }),
  setActual: (key, value) =>
    set((s) => ({ actual: { ...s.actual, [key]: value } })),
  reset: () => set({ imageBase64: undefined, previewUrl: undefined, result: undefined, actual: {} }),
}));
