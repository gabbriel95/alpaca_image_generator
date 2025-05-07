import { useState, useCallback } from "react";
import { AlpacaPart, PartOptions, SelectedParts } from "../types/alpaca";

export const partOptions: PartOptions = {
  hair: ["default", "bang", "curls", "elegant", "fancy", "quiff", "short"],
  backgrounds: ["blue50", "darkblue50", "green50", "red50"],
  accessories: ["flower", "earings", "glasses", "headphone"],
  ears: ["default", "tilt-backward", "tilt-forward"],
  eyes: ["default", "angry", "naughty", "panda", "smart", "star"],
  leg: ["default", "bubble-tea", "cookie", "game-console", "tilt-backward", "tilt-forward"],
  mouth: ["default", "astonished", "eating", "laugh", "tongue"],
  neck: ["default", "bend-backward", "bend-forward", "thick"],
  nose: ["nose"],
};

const defaultParts: SelectedParts = {
  backgrounds: "blue50",
  accessories: "flower",
  ears: "default",
  eyes: "default",
  hair: "default",
  leg: "default",
  mouth: "default",
  neck: "default",
  nose: "nose",
};

export const useAlpaca = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedParts>(defaultParts);
  const [selectedCategory, setSelectedCategory] = useState<AlpacaPart>("hair");

  const updatePart = (part: AlpacaPart, value: string) => {
    setSelectedCategory(part);
    setSelectedParts((prev) => ({
      ...prev,
      [part]: value,
    }));
  };

  const generateRandom = useCallback(() => {
    const randomSelection: SelectedParts = {} as SelectedParts;
    Object.entries(partOptions).forEach(([part, options]) => {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      randomSelection[part as AlpacaPart] = randomOption;
    });
    setSelectedParts(randomSelection);
  }, []);

  return {
    selectedParts,
    selectedCategory,
    updatePart,
    generateRandom,
    partOptions,
  };
};
