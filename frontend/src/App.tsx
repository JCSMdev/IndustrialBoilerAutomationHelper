const token = import.meta.env.VITE_API_TOKEN;
import { useEffect, useState } from "react";
import "./App.css";
import HeatMap from "./components/HeatMap"
import { EnergyPrice } from "./components/PriceBlock";





function App() {

  const REFRESH_MINUTES = 15.0;
  const REFRESH_INTERVAL = REFRESH_MINUTES * 60 * 1000;

  const [secondsLeft, setSecondsLeft] = useState(
    REFRESH_MINUTES * 60
  );
  // Fetch prices from API
  const [priceData, setPriceData] = useState<any[]>([]);
  let gotData = true;
  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/prices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        gotData = response.ok;
        if (!gotData) {
          return (<h1>Error: HTTP ${response.status}</h1>);
        }


        const result = await response.json();
        console.log(result)
        setPriceData(result ?? []);
        setSecondsLeft(REFRESH_MINUTES * 60);
      }
      catch (error) { console.error("Failed to fetch prices:", error); }
    }

    // Initial fetch
    fetchPrices();

    // Refresh API
    const refreshInterval = setInterval(
      fetchPrices,
      REFRESH_INTERVAL
    );

    // Countdown
    const countdownInterval = setInterval(() => {
      setSecondsLeft((previous) =>
        previous > 0 ? previous - 1 : 0
      );
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);
  // Calculate remaining time
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const countdown = `Automatic refresh in: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  
 const pricesFromatted: EnergyPrice[]  = priceData.map(
   (data) => new EnergyPrice(data.price,data.timestamp));

  // Rendering heatmap
  if (!gotData) {
    return (<h1>ERROR</h1>);
  }
  return (
    <div>
      <h1>Energy Prices</h1>
      <p>{countdown}</p>
      <HeatMap data={pricesFromatted} />
    </div>
  );
}

export default App;
