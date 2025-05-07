import React from "react";
import { AlpacaPart, PartOptions, SelectedParts } from "../types/alpaca";

interface Props {
  selectedParts: SelectedParts;
  selectedCategory: AlpacaPart;
  partOptions: PartOptions;
  onSelectOption: (part: AlpacaPart, option: string) => void;
}

export const PartOptionsList: React.FC<Props> = ({
  selectedParts,
  selectedCategory,
  partOptions,
  onSelectOption,
}) => (
  <div className="button-container">
    <h2>Estilos disponibles para: {selectedCategory}</h2>
    {partOptions[selectedCategory]?.map((option) => (
      <button
        key={option}
        onClick={() => onSelectOption(selectedCategory, option)}
        className={selectedParts[selectedCategory] === option ? "selected" : ""}
      >
        {option}
      </button>
    ))}
  </div>
);
