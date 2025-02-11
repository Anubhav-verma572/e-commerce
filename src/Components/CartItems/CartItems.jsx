import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {
    const { all_Product = [], CartItems, removeFromCart } = useContext(ShopContext); // Default to an empty array if undefined

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
            {/* Check if all_Product is an array before using map */}
            {Array.isArray(all_Product) && all_Product.length > 0 ? (
                all_Product.map((e) => {
                    if (CartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format">
                                    <img src={e.image} alt={e.name} className='carticon-product-icon' />
                                    <p>{e.name}</p>
                                    <p>${e.new_price}</p>
                                    <button className='cartitems-quantity'>{CartItems[e.id]}</button>
                                    <p>{e.new_price * CartItems[e.id]}</p>
                                    <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="Remove" />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; // Return null if CartItems[e.id] is 0
                })
            ) : (
                <p>Your cart is empty or products are not available.</p> // Fallback message when there are no products
            )}
        </div>
    );
}

export default CartItems;
