import PriceBlock from "./PriceBlock"; 
import type { BoxStyle, EnergyPrice } from "./PriceBlock"; 


function GetColor(normalized: number) {
  const hue = 110 - normalized * 110;
  return `hsl(${hue}, 98%, 50%)`;
}

export default function 
HeatMap({data}:{data: EnergyPrice[]}) {
  
  const prices = data.map((item) => item.price);
  // Get info for rendering
  let maxPrice = Math.max(...prices);
  let minPrice = Math.min(...prices);

  const normalize = (price: number) => 
                    (price - minPrice) / (maxPrice - minPrice);

  return(

    <div className="heatmap">
      {data.map((info, id) => {
        const normalized: number = normalize(info.price)
        const isHour: boolean = info.time.getMinutes() === 0;
        return (
           <>
          {isHour ?  (
            <div className="sep">
              <p>{info.getTimeString()}</p>
              <div></div>
            </div>
          ) : null } 
          <PriceBlock key={id}
            priceData={info}
            style={{
              backgroundColor: GetColor(normalized),
              color: "black",
            }} />
          
            </>
        );
        })
      }
      
      </div>
         
  );
}
