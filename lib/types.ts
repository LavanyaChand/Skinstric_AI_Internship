export type DemographicBuckets = {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
};

export type Phase2Response = {
  message: string; // "SUCCESS: You hit the Level 2 API..."
  data: DemographicBuckets;
};
