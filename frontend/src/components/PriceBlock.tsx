
export class EnergyPrice {
  price: number;
  time: Date;
  constructor(price: number, timestamp: string) {
    this.price = price;
    this.time = new Date(timestamp);
  }
  getTimeString() : string {
    return `${this.time.getHours()
                  .toString()
                  .padStart(2,"0")}:${
              this.time.getMinutes()
                  .toString()
                  .padStart(2,"0")}`;
  }
}

export interface BoxStyle {
  backgroundColor: string;
  color: string;
}

export default function 
PriceBlock({ priceData, style }:{
             priceData: EnergyPrice,
             style: BoxStyle
          }) {

  return (
    <div className="price-block" style={style}><p>
      {new Intl.NumberFormat("hu-HU")
            .format(priceData.price * 380)} HUF 
    </p>
    </div>
  );
}
