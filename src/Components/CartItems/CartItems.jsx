import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { all_product = [], getTotalCartAmount, cartItems, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);

  const handleIncreaseQuantity = (id) => {
    updateCartItemQuantity(id, cartItems[id] + 1);
  };

  const handleDecreaseQuantity = (id) => {
    if (cartItems[id] > 1) {
      updateCartItemQuantity(id, cartItems[id] - 1);
    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {Array.isArray(all_product) && all_product.length > 0 ? (
        all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt={e.name} className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <div className='cartitems-quantity'>
                    <button onClick={() => handleDecreaseQuantity(e.id)}>-</button>
                    <p>{cartItems[e.id]}</p>
                    <button onClick={() => handleIncreaseQuantity(e.id)}>+</button>
                  </div>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img className='carticon-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="Remove" />
                </div>
                <hr />
              </div>
            );
          }
          return null; // Return null if CartItems[e.id] is 0
        })
      ) : (
        <p>Your cart is empty or products are not available.</p> 
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>Proceed to checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promocode, Enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
