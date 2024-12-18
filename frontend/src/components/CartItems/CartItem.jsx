
import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../context/ShopContext.jsx';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx';

const CartItem = () => {

     const { RemoveFromCart, isloading, all_product, cartItem } = useContext(ShopContext);

     if (isloading) {
          return <Loader />
     }

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

               {all_product.map((e, i) => {
                    const item = cartItem.find(p => Number(p.productId) === e.id);
                    if (item) {
                         return (
                              <div key={i}>
                                   <div className="cartitems-format cartitems-format-main">
                                        <Link to={`/product/${e.id}`}>
                                             <img src={e.image} alt="" className='cartitems-product-icon' />
                                        </Link>
                                        <p>{e.name}</p>
                                        <p>₹{e.new_price}</p>
                                        <button className='cartitems-quantity'>{item.quantity}</button>
                                        <p>₹{e.new_price * item.quantity}</p>
                                        <button onClick={() => RemoveFromCart(e.id)} className='remove-cart-item fa-solid fa-x' style={{ color: "#f11e48" }}></button>
                                   </div>
                                   <hr />
                              </div>
                         );
                    }
                    return null;
               })}

               <div className="cartitems-down">
                    <div className="cartitems-total">
                         <h1>Cart Total</h1>
                         <div>
                              <div className="cartitems-total-item">
                                   <p>Subtotal</p>
                              </div>
                              <hr />
                              <div className="cartitems-total-item">
                                   <p>Shipping Fee</p>
                                   <p>Free</p>
                              </div>
                              <hr />
                              <div className="cartitems-total-item">
                                   <h3>Total</h3>
                              </div>
                         </div>
                         <button>PROCEED TO CHECKOUT</button>
                    </div>
                    <div className="cartitems-promocode">
                         <p>If you have a promo code, Enter it here</p>
                         <div className="cartitems-promobox">
                              <input type="text" placeholder='Promo Code' />
                              <button>Submit</button>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default CartItem;