import React from "react";
import { AlpacaPart, PartOptions } from "../types/alpaca";

interface Props {
  currentCategory: AlpacaPart;
  partOptions: PartOptions;
  onSelectCategory: (part: AlpacaPart) => void;
}

export const CategorySelector: React.FC<Props> = ({
  currentCategory,
  partOptions,
  onSelectCategory,
}) => (
  <div className="button-container">
    <h2>¿Qué parte querés cambiar?</h2>
    {Object.keys(partOptions).map((part) => (
      <button
        key={part}
        onClick={() => onSelectCategory(part as AlpacaPart)}
        className={currentCategory === part ? "selected" : ""}
      >
        {part}
      </button>
    ))}
  </div>
);
