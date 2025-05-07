import React from "react";
import { useAlpaca } from "./hooks/useAlpaca";
import { AlpacaCanvas } from "./components/AlpacaCanvas";
import { CategorySelector } from "./components/CategorySelector";
import { PartOptionsList } from "./components/PartOptions";

function App() {
  const {
    selectedParts,
    selectedCategory,
    updatePart,
    generateRandom,
    partOptions,
  } = useAlpaca();

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "alpaca.png";
    link.click();
  };

  return (
    <div id="root">
      <h1>Personaliza tu Alpaca</h1>
      <AlpacaCanvas selectedParts={selectedParts} />
      <CategorySelector
        currentCategory={selectedCategory}
        partOptions={partOptions}
        onSelectCategory={(part) => updatePart(part, selectedParts[part])}
      />
      <PartOptionsList
        selectedParts={selectedParts}
        selectedCategory={selectedCategory}
        partOptions={partOptions}
        onSelectOption={updatePart}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={generateRandom}>🎲 Generar Aleatoriamente</button>
        <button onClick={handleDownload}>⬇️ Descargar Imagen</button>
      </div>
    </div>
  );
}

export default App;
