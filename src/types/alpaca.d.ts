export type AlpacaPart =
  | "hair"
  | "backgrounds"
  | "accessories"
  | "ears"
  | "eyes"
  | "leg"
  | "mouth"
  | "neck"
  | "nose";

export type PartOptions = Record<AlpacaPart, string[]>;

export type SelectedParts = Record<AlpacaPart, string>;
