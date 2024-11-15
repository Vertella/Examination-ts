import React from "react";
import Image from "next/image";

// Define props for the button
interface CartButtonProps {
  icon: string;  // Path to the icon (plus or minus)
  onClick: () => void;  // Function to call when the button is clicked
  altText: string;  // Alt text for the icon
}

const CartButton: React.FC<CartButtonProps> = ({ icon, onClick, altText }) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 p-1 bg-shade24dark rounded-full flex items-center justify-center"
    >
      <Image src={icon} alt={altText} width={12} height={12} />
    </button>
  );
};

export default CartButton;
