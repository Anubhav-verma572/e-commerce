import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

// Create a context for the Shop
export const ShopContext = createContext(null);

// Function to initialize the default cart
const getDefaultCart = () => {
  let cart = {};
  // Initialize cart items with 0 quantity
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      console.log(updatedCart); // Log the updated cart items
      return updatedCart;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }; // Prevent negative quantities
      return updatedCart;
    });
  };

  const getTotalCartAmount= ()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        let itemInfo  = all_product.find((product)=>product.id===Number(item))
      }
    }
  }

  // Context values to be shared across the app
  const ContextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
