import React from "react";
import { MenuItem } from "../types";

interface DipsSectionProps {
  items: MenuItem[];
  price: number | null;
  onAddToCart: (item: MenuItem) => void;
}

const DipsSection: React.FC<DipsSectionProps> = ({ items, price, onAddToCart }) => {
  const dipNames = items.map((item) => (
    <p key={item.id} className="bg-shade24 rounded py-2 px-3 font-medium text-sm cursor-pointer" onClick={() => onAddToCart(item)}>{item.name}</p>
  ));

  return (
    <div className="w-full bg-clay p-4 rounded-lg">
      <div className="flex">
        <h2 className="text-2xl font-bold">DIPSÅS</h2>
        <div className="flex-grow mx-2 border-b-2 border-dotted border-snow"></div>
        <p className="font-bold text-medium">19 SEK</p>
      </div>

      {items.length === 0 ? (
        <p>No dips available</p>
      ) : (
        <div className="flex flex-wrap">
          <div className="flex rounded">
            <div className="flex flex-wrap m-2 gap-4 text-sm font-medium" >
              {dipNames}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DipsSection;
