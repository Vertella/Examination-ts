import React from "react";
import { MenuItem } from "../types";

interface WontonsSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const WontonsSection: React.FC<WontonsSectionProps> = ({ items, onAddToCart }) => {
    console.log("WontonsSection items:", items);

    return (
  <div className="w-full bg-clay p-4 rounded-lg">
    {Array.isArray(items) && items.length === 0 ? (
      <p>No wontons available</p>
    ) : ( 
        Array.isArray(items) &&
      items.map((item, index) => (
        <div key={index} className="flex flex-col p-4 cursor-pointer hover:bg-coal active:bg-clay hover:rounded" 
        onClick={() => {
            console.log("Item clicked:", item);
            onAddToCart(item)}} // Add click handler
        >
          <div className="flex flex-row items-center gap-2">
            <h3 className="font-bold text-lg">{(item.name || "Unknown Wonton").toUpperCase()}</h3>
            <div className="flex-grow mx-2 border-b-2 border-dotted border-snow"></div>
            <p className="font-bold text-medium">{item.price ? `${item.price} SEK` : "Price not available"}</p>
          </div>
          <p className="font-medium text-sm text-snow">
            
            {item.ingredients ? item.ingredients.join(", ") : "Not specified"}
          </p>
        </div>
      ))
    )}
  </div>
)};

export default WontonsSection;
