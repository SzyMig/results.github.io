import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg'; 

// ... rest of your code ...

import './App.css'
import template from './assets/newtemplate.png'

function App() {
  const [coinName, setCoinName] = useState('')
  const [totalProf, setTotalProf] = useState('')
  const [solVal, setSolVal] = useState('')
  const [roi, setRoi] = useState('')
  const [initial, setInitial] = useState('')
  const [solanaPrice, setSolanaPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    drawCanvas();
  }, [coinName, totalProf, solVal, roi, initial]);

  const drawCanvas = () => {
    if (imageRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = imageRef.current;
      let totalProf2 = Number(totalProf).toLocaleString("en-US", {style:"currency", currency:"USD", minimumFractionDigits: 0, maximumFractionDigits: 2});
      let solVal2 = Number(solanaPrice);
      let totalSol = totalProf / solVal2;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      ctx.drawImage(image, 0, 0);

      ctx.fillStyle = 'black';
      ctx.font = '900 120px "input-sans", sans-serif';

      ctx.fillText(`${coinName}`, image.naturalWidth * 0.38, image.naturalHeight * 0.534);
      ctx.font = '800 80px "input-sans", sans-serif'; // Increase font size to 40px
      ctx.fillStyle = 'green'
      ctx.fillText(`${totalProf2}`, image.naturalWidth * 0.51, image.naturalHeight * 0.629);
      ctx.fillStyle = 'black';
      ctx.fillText(`${totalSol.toFixed(2)}`, image.naturalWidth * 0.515, image.naturalHeight * 0.69);
      ctx.fillText(`${roi}`, image.naturalWidth * 0.41, image.naturalHeight * 0.753);
      ctx.fillText(`$${initial}`, image.naturalWidth * 0.45, image.naturalHeight * 0.848);
      ctx.font = '800 50px "input-sans", sans-serif'; // Increase font size to 40px
      ctx.fillText(`$${solVal2.toFixed(2)}`, image.naturalWidth * 0.445, image.naturalHeight * 0.948);
    }
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'custom-image.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };
  useEffect(() => {
    const fetchSolanaPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        setSolanaPrice(data.solana.usd);
        setIsLoading(false); // Set loading to false after fetching price
      } catch (error) {
        console.error('Error fetching Solana price:', error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchSolanaPrice();
  }, []);
  const handleCoinNameChange = (e) => {
    setCoinName(e.target.value)
  }
  const handleTotalProfChange = (e) => {
    setTotalProf(e.target.value)
  }
  const handleSolValChange = (e) => {
    setSolVal(e.target.value)
  }
  const handleRoiChange = (e) => {
    const profits = Number(totalProf) - Number(initial);
    const roiWork = (profits / Number(initial)) * 100;
    setRoi(roiWork.toFixed(2) + "%")
  }
  const handleInitialChange = (e) => {
    const initialInvestmentValue = Number(e.target.value);
    setInitial(initialInvestmentValue);
    calculateRoi(Number(totalProf), initialInvestmentValue);
  };

  const calculateRoi = (totalProfitValue, initialInvestmentValue) => {
    if (initialInvestmentValue > 0) {
      const profits = totalProfitValue - initialInvestmentValue;
      const roiWork = (profits / initialInvestmentValue) * 100;
      setRoi(roiWork.toFixed(2) + "%");
    }
  };

  return (
    <div className="App">
      <h1 className=''>$PT inc.</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Change parameters:</h2>
          <link rel="stylesheet" href="https://use.typekit.net/gir1yop.css"></link>
          <label className="input input-bordered flex items-center gap-2">
            CoinName:
            <input type="text" className="grow" placeholder="Flub" onChange={handleCoinNameChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Total profit (in $USD):
            <input type="text" className="grow" placeholder="$1M"  onChange={handleTotalProfChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Initial investment (in $USD):
            <input type="text" className="grow" placeholder="Initial" onChange={handleInitialChange} />
          </label>

          <button className="btn" onClick={downloadImage}>Download Image</button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading Solana price...</p>
      ) : (
      <div className='image-canvas'>
        <img src={template} alt='Background' ref={imageRef} />
        <canvas ref={canvasRef} className="canvas" />
      </div>
      )}
    </div>
  );
}

export default App