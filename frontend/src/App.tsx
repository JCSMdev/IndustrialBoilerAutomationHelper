import { useEffect, useState } from "react";
import { getPrices } from "./api";
import PriceHeatmap from "./components/PriceHeatmap";

interface PriceData {
    timestamp: string;
    values: {
        day_ahead_price: number;
    };
}

interface PriceResponse {
    data: PriceData[];
}

function App() {
    const [prices, setPrices] = useState<PriceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPrices()
            .then((response: PriceResponse) => {
                setPrices(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load energy prices.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading prices...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="app">
            <h1>Energy Prices</h1>

            <PriceHeatmap data={prices} />
        </main>
    );
}

export default App;
