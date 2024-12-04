import React from "react";
import { MenuItem } from "../types";

interface DrinksSectionProps {
  items: MenuItem[];
  price: number;
  onAddToCart: (item: MenuItem) => void;
}

const DrinksSection: React.FC<DrinksSectionProps> = ({
  items,
  price,
  onAddToCart,
}) => {
  const drinkNames = items.map((item) => {
    console.log("Drink Item Price:", item.price);  // Log the price of each individual drink
    return (
    <p
      key={item.id}
      className="bg-shade24 rounded py-2 px-3 cursor-pointer hover:bg-coal active:bg-clay"
      onClick={() => onAddToCart(item)}
    >
      {item.name}
    </p>
  )});

  return (
    <div className="w-full bg-clay p-4 rounded-lg">
      <div className="flex flex-row text-2xl font-bold justify-evenly">
        <h2 className="text-2xl font-bold">DRICKA</h2>
        <div className="flex-grow mx-2 border-b-2 border-dotted border-snow"></div>
        <p className="">19 SEK</p>
      </div>


      {items.length === 0 ? (
        <p>No drinks available</p>
      ) : (
        <div className="flex flex-wrap">
          <div className="flex flex-col">
            <div className="flex flex-wrap m-2 gap-4 text-sm font-medium">
              {drinkNames}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrinksSection;
