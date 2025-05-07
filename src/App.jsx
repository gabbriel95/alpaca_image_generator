import { useEffect, useRef, useState } from 'react';

const partOptions = {
  hair: ['default', 'bang', 'curls', 'elegant', 'fancy', 'quiff', 'short'],
  backgrounds: ['blue50', 'darkblue50', 'green50', 'red50'],
  accessories: ['flower', 'earings', 'glasses','headphone'],
  ears: ['default', 'tilt-backward','tilt-forward'],
  eyes: ['default', 'angry', 'naughty', 'panda', 'smart','star'],
  leg: ['default', 'bubble-tea', 'cookie', 'game-console','tilt-backward','tilt-forward'],
  mouth: ['default', 'astonished', 'eating', 'laugh','tongue'],
  neck: ['default', 'bend-backward','bend-forward','thick'],
  nose: ['nose'],
};

function getImagePath(part, option) {
  return `/${part}/${option}.png`;
}

function App() {
  const canvasRef = useRef(null);
  const [selectedParts, setSelectedParts] = useState({
    backgrounds: 'blue50',
    accessories: 'flower',
    ears: 'default',
    eyes: 'default',
    hair: 'default',
    leg: 'default',
    mouth: 'default',
    neck: 'default',
    nose: 'nose',
  });

  const [selectedCategory, setSelectedCategory] = useState('hair');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const parts = ['backgrounds', 'hair', 'leg', 'neck', 'nose', 'ears', 'eyes','accessories','mouth'];

    const imagePromises = parts.map(part => {
      return new Promise(resolve => {
        const img = new Image();
        const src = getImagePath(part, selectedParts[part]);
        img.src = src;

        img.onload = () => resolve({ img });
        img.onerror = () => {
          console.error(`❌ Error cargando imagen: ${src}`);
          resolve({ img: null });
        };
      });
    });

    Promise.all(imagePromises).then(images => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      images.forEach(({ img }) => {
        if (img) ctx.drawImage(img, 0, 0, 150, 150);
      });
    });
  }, [selectedParts]);

  const handlePartSelection = (part, value) => {
    setSelectedParts(prev => ({
      ...prev,
      [part]: value,
    }));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personaliza tu Alpaca</h1>
      <canvas ref={canvasRef} width="150" height="150" style={{ border: '1px solid black' }} />

      <div style={{ marginTop: '20px' }}>
        <h2>¿Qué parte querés cambiar?</h2>
        {Object.keys(partOptions).map(part => (
          <button
            key={part}
            onClick={() => setSelectedCategory(part)}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
              padding: '6px 12px',
              backgroundColor: selectedCategory === part ? '#007bff' : '#f0f0f0',
              color: selectedCategory === part ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {part}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Estilos disponibles para: {selectedCategory}</h2>
        {partOptions[selectedCategory]?.map(option => (
          <button
            key={option}
            onClick={() => handlePartSelection(selectedCategory, option)}
            style={{
              marginRight: '10px',
              marginBottom: '10px',
              padding: '6px 12px',
              backgroundColor: selectedParts[selectedCategory] === option ? '#28a745' : '#f8f9fa',
              color: selectedParts[selectedCategory] === option ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
