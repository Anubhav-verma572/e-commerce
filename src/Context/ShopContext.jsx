import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

// Create a context for the Shop
export const ShopContext = createContext(null);

// Function to initialize the default cart from LocalStorage
const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });

  // Load cart data from localStorage if available
  const savedCart = JSON.parse(localStorage.getItem("cartItems"));
  if (savedCart) {
    cart = savedCart;
  }
  
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Store the cartItems in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
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

  // Update the quantity of an item in the cart
  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(newQuantity, 0) }; // Prevent negative quantity
      return updatedCart;
    });
  };

  // Function to calculate the total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Context values to be shared across the app
  const ContextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
