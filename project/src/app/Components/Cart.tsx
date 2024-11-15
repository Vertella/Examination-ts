"use client";
import React, { useState, useEffect } from "react";
import CartButton from "./CartButton";
import Image from "next/image";
import { CartItem } from "../types";
import { useRouter } from "next/navigation";
import { fetchOrderNumber } from "../api";

interface CartProps {
  cartItems: CartItem[];
  onIncreaseItemQuantity: (item: CartItem) => void;
  onRemoveItemFromCart: (item: CartItem) => void;
}

const CartComponent: React.FC<CartProps> = ({
  cartItems = [],
  onIncreaseItemQuantity,
  onRemoveItemFromCart,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const router = useRouter(); // Move this outside of the handler

  // Calculate total item count in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Toggle the cart overlay
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Handle checkout button click
  const handleCheckout = async () => {
    const apiKey = "yum-vKkkQHqQboi7c6JF";
    const tenantId = "hg72";
    const itemsToSend = cartItems.map((item) => item.id);
    console.log("Items being sent to API:", itemsToSend);
    try {
      const orderNumber = await fetchOrderNumber(apiKey, tenantId, itemsToSend);
      console.log("Order created successfully:", orderNumber);
      if (!orderNumber) {
        throw new Error('Order number is undefined');
      }
      // Navigate to EtaPage with the orderNumber
      const url = `/checkout?orderNumber=${orderNumber}`;
      router.push(url);
    } catch (error) {
      console.log("Failed to create order:", error);
    }
  };

  return (
    <div className="cart-container relative ">
      {/* Cart Button */}
      <div className="cart-button fixed top-4 right-6 z-50">
        <div
          className={`absolute -right-2 -top-2 ${
            isCartOpen ? "hidden" : "flex"
          } bg-alert w-6 h-6 rounded-full items-center justify-center text-xs text-snow font-bold`}
        >
          {itemCount}
        </div>
        <div
          className="flex h-16 w-16 bg-snow rounded justify-around cursor-pointer"
          onClick={toggleCart}
        >
          <Image
            className="dark:invert flex self-center"
            src="/cart.svg"
            alt="Cart Icon"
            width={32}
            height={30}
            priority
          />
        </div>
      </div>

      {/* Cart Overlay (appears when `isCartOpen` is true) */}
      {isCartOpen && (
        <div className="cart-overlay fixed top-0 w-full h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
          {/* Cart Items and Actions */}
          <div className="mt-20">
            <div className="absolute top-4 right-6">
              <button
                className="flex h-16 w-16 bg-snow rounded justify-around cursor-pointer"
                onClick={toggleCart}
              >
                <Image
                  className="dark:invert flex self-center"
                  src="/cart.svg"
                  alt="Cart Icon"
                  width={32}
                  height={30}
                  priority
                />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="flex flex-col my-2">
                  <div className="flex flex-row items-center">
                    <p className="font-bold text-coal text-lg">
                      {item.name.toUpperCase()}
                    </p>
                    <div className="flex-grow mx-2 border-b-2 border-dotted border-coal"></div>
                    <p className="font-bold text-medium text-coal">
                      {item.price * item.quantity} SEK
                    </p>
                  </div>
                  <div className="flex flex-row gap-[10px]">
                    <CartButton
                      icon="./Plus.svg"
                      onClick={() => onIncreaseItemQuantity(item)}
                      altText="Add item"
                    />
                    <p className="text-sm text-coal font-medium">
                      {item.quantity} stycken
                    </p>
                    <CartButton
                      icon="./Minus.svg"
                      onClick={() => onRemoveItemFromCart(item)}
                      altText="Remove item"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
          {/* Checkout Button */}
          {cartItems.length > 0 && (
            <div className="flex w-[358px] mt-4 self-end place-self-center h-full  flex-col gap-4 text-center">
              <div className="bg-shade24dark w-full rounded flex flex-row justify-between p-4">
                <div className="">
                  <p className="font-bold text-2xl text-coal">TOTAL</p>
                  <p className="text-sm font-medium text-coal">inkl 20% moms</p>
                </div>
                <div className="flex align-self-end">
                  <p className="text-coal text-3xl font-bold ">
                    {totalPrice} SEK
                  </p>
                </div>
              </div>
              <button
                className="bg-coal flex w-full text-snow py-2 px-6 rounded-md p-4"
                onClick={handleCheckout}
              >
                <p className="font-bold text-2xl text-center">TAKE MY MONEY</p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartComponent;
