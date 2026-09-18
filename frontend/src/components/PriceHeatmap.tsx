import type { CSSProperties } from "react";

interface PriceData {
    timestamp: string;
    values: {
        day_ahead_price: number;
    };
}

interface PriceHeatmapProps {
    data: PriceData[];
}

function getPriceColor(
    price: number,
    min: number,
    max: number
): string {
    if (max === min) {
        return "rgb(255, 255, 0)";
    }

    const normalized = (price - min) / (max - min);

    let r: number;
    let g: number;

    if (normalized < 0.5) {
        // Green -> Yellow
        const t = normalized * 2;

        r = Math.round(255 * t);
        g = 200;
    } else {
        // Yellow -> Red
        const t = (normalized - 0.5) * 2;

        r = 255;
        g = Math.round(200 * (1 - t));
    }

    return `rgb(${r}, ${g}, 0)`;
}

export default function PriceHeatmap({
    data,
}: PriceHeatmapProps) {
    const prices = data.map(
        (item) => item.values.day_ahead_price
    );

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return (
        <div className="price-heatmap">
            {data.map((item) => {
                const price = item.values.day_ahead_price;
                const color = getPriceColor(price, min, max);

                const style: CSSProperties = {
                    backgroundColor: color,
                };

                return (
                    <div
                        key={item.timestamp}
                        className="price-cell"
                        style={style}
                        title={`${new Date(item.timestamp).toLocaleString()} — ${price.toFixed(2)} €/MWh`}
                    >
                        <span>
                            {price.toFixed(0)}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
