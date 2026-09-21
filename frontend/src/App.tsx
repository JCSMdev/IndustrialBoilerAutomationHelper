const token = import.meta.env.VITE_API_TOKEN;
import { useEffect, useState } from "react";
import "./App.css";


interface boxStyle {
  backgroundColor: string;
  color: string;
}

function PriceBlock({ price, style }: { price: number, style: boxStyle }) {
  return (
    <div className="price-block" style={style}>{price} </div>
  );
}


function GetColor(normalized: number) {
  const hue = 120 - normalized * 120;
  return `hsl(${hue}, 98%, 50%)`;
}

function App() {

  const REFRESH_MINUTES = 15.0;
  const REFRESH_INTERVAL = REFRESH_MINUTES * 60 * 1000;

  const [secondsLeft, setSecondsLeft] = useState(
    REFRESH_MINUTES * 60
  );
  // Fetch prices from API
  const [priceData, setPriceData] = useState<any[]>([]);

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
        if (!response.ok) {
          return(<h1>Error: HTTP ${response.status}</h1>);
        }


        const result = await response.json();

        setPriceData(result.data ?? []);
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

  const prices = priceData.map(
    (item) => item.values.day_ahead_price
  );

  // Get info for rendering
  let maxPrice = Math.max(...prices);
  let minPrice = Math.min(...prices);

  const normalize = (price: number) => (price - minPrice) / (maxPrice - minPrice);

  // Rendering heatmap
  return (
    <div>
      <h1>Energy Prices</h1>
      <p>{countdown}</p>
      <div className="heatmap">
        {prices.map((price, id) => {
          const normalized = normalize(price)
          return <PriceBlock key={id}
            price={price}
            style={{
              backgroundColor: GetColor(normalized),
              color: "black",
            }} />
        }
        )}
      </div>
    </div>
  );
}

export default App;
