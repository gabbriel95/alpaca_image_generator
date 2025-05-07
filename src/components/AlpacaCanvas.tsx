import React, { useEffect, useRef, useState } from "react";
import { SelectedParts, AlpacaPart } from "../types/alpaca";

interface Props {
  selectedParts: SelectedParts;
}

function getImagePath(part: AlpacaPart, option: string) {
  return `/${part}/${option}.png`;
}

export const AlpacaCanvas: React.FC<Props> = ({ selectedParts }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const partsOrder: AlpacaPart[] = [
      "backgrounds",
      "hair",
      "leg",
      "neck",
      "nose",
      "ears",
      "eyes",
      "accessories",
      "mouth",
    ];

    const imagePromises = partsOrder.map((part) => {
      const src = getImagePath(part, selectedParts[part]);
      return new Promise<{ part: string; img: HTMLImageElement | null }>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve({ part, img });
        img.onerror = () => resolve({ part, img: null });
      });
    });

    Promise.all(imagePromises).then((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      results.forEach(({ img }) => {
        if (img) ctx.drawImage(img, 0, 0, 300, 300);
      });
    });
  }, [selectedParts]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};
