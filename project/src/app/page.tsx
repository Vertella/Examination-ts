"use client";
import React, { useState } from "react";
import Image from "next/image";
import MenuComponent from "./menu";
import CartComponent from "./Components/Cart";
import { MenuItem, CartItem } from "./types";

export default function Home() {
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addItemToCart = (item: MenuItem) => {
    setItemsInCart((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems.push({ ...item, quantity: 1 });
      }
      return updatedItems;
    });
  };

  // Function to increase quantity of an item in the cart
  const increaseItemQuantity = (item: CartItem) => {
    setItemsInCart((prevItems) => {
      const updatedItems = prevItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      return updatedItems;
    });
  };
  
  const removeItemFromCart = (item: CartItem) => {
    setItemsInCart((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex].quantity -= 1;  // Decrease quantity by 1
        } else {
          updatedItems.splice(existingItemIndex, 1);  // Remove item completely if quantity is 1
        }
      }
  
      return updatedItems;
    });
  };

  return (
    <div className="items-start min-h-screen pb-20 sm:p-20 bg-darkmint">
      <main className="flex flex-col sm:items-start">
        <CartComponent cartItems={itemsInCart} 
        onIncreaseItemQuantity={increaseItemQuantity} 
        onRemoveItemFromCart={removeItemFromCart} />
        
        <MenuComponent onAddToCart={addItemToCart} />
      </main>
    </div>
  );
}
