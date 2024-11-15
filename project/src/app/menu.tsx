"use client";
import React, { useEffect, useState } from "react";
import { fetchMenuItems } from "./api";
import { MenuItems, CartItem, MenuItem } from "./types";
import WontonsSection from "./Components/Wontons";
import DipsSection from "./Components/Dips";
import DrinksSection from "./Components/Drinks";

interface MenuComponentProps {
  onAddToCart: (item: MenuItem) => void;
}

export const MenuComponent: React.FC<MenuComponentProps> = ({ onAddToCart }) => {
  const [menuItems, setMenuItems] = useState<MenuItems>({
    wontons: { items: [] },
    dips: { items: [] },
    drinks: { items: [] },
  });
  const apiKey = "yum-KwOi5vm2TYNmi8Dd";
  
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const wontonItems = await fetchMenuItems("wonton", apiKey);
        console.log("Fetched Wonton Items:", wontonItems);
        const dipItems = await fetchMenuItems("dip", apiKey);
        console.log("Fetched dip Items:", dipItems);

        const drinkItems = await fetchMenuItems("drink", apiKey);

        // Update the state with all the menu items
        setMenuItems({
          wontons: wontonItems,
          dips: dipItems,
          drinks: drinkItems,
        });
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchItems();
  }, [apiKey]);


  return (
    <div className="flex flex-col w-[358px] pl-4 mt-20">
      <h1 className="text-3xl font-bold text-left mb-4 ">MENY</h1>
      <div className="flex flex-col gap-4 w-96 overflow-y-auto">
        <WontonsSection items={menuItems.wontons.items} onAddToCart={onAddToCart} />
        <DipsSection items={menuItems.dips.items} price={menuItems.dips?.items[0]?.price} onAddToCart={onAddToCart} />
        <DrinksSection items={menuItems.drinks.items} price={menuItems.drinks?.items[0]?.price} onAddToCart={onAddToCart} />
      </div>


    </div>
  );
};
export default MenuComponent;
