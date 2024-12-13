import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2';


export const ShopContext = createContext(null);

const getDefaultCart = () => {
     let cart = {};
     for (let i = 0; i < 300 + 1; i++) {
          cart[i] = 0;
     }
     return cart;
}

const ShopContextProvider = (props) => {

     const [all_product, setall_product] = useState([]);

     const [cartItem, setcartItem] = useState(getDefaultCart());

     useEffect(() => {
          fetch('http://localhost:3001/allproducts')
               .then((response) => response.json())
               .then((data) => setall_product(data))

          if (localStorage.getItem('auth-token')) {
               fetch('http://localhost:3001/getcart', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'auth-token': `${localStorage.getItem('auth-token')}`,
                         'Content-Type': 'application/json',
                    },
                    body: "",
               })
                    .then((response) => response.json())
                    .then((data) => setcartItem(data))
          }

     }, [])

     const addToCart = (itemId) => {
          if (localStorage.getItem('auth-token')) {
               setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
               fetch('http://localhost:3001/addtocart', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'auth-token': `${localStorage.getItem('auth-token')}`,
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "itemId": itemId })
               })
                    .then((response) => response.json())
                    .then((data) => {
                         Swal.fire({
                              title: "Added to Cart",
                              icon: "success",
                         });
                    })
          }
          else {
               Swal.fire({
                    title : "Please Login/Register",
                    text: "Login to Add to Cart",
                    icon : "warning",
                    timer: 3000
               })
               window.location.replace("#/login");
          }
     }

     const RemoveFromCart = (itemId) => {
          if (localStorage.getItem('auth-token')) {
               setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
               fetch('http://localhost:3001/removefromcart', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'auth-token': `${localStorage.getItem('auth-token')}`,
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "itemId": itemId })
               })
                    .then((response) => response.json())
                    .then((data) => {
                         Swal.fire({
                              title: "Removed Successfull",
                              icon: "success",
                         });
                    })
          }
          else {
               alert("no token found");
          }
     }

     const getTotalCartCount = () => {

          let totalAmount = 0;
          for (const item in cartItem) {
               if (cartItem[item] > 0) {
                    let itemInfo = all_product.find((product) => product.id === Number(item))
                    totalAmount += itemInfo.new_price * cartItem[item];
               }
          }
          return totalAmount;
     }

     const getTotalCartItems = () => {
          let totalItem = 0;
          for (const item in cartItem) {
               if (cartItem[item] > 0) {
                    totalItem += 1;
               }
          }
          return totalItem;
     }

     const contextValue = { getTotalCartItems, getTotalCartCount, all_product, cartItem, addToCart, RemoveFromCart }

     return (
          <ShopContext.Provider value={contextValue}>
               {props.children}
          </ShopContext.Provider>

     )

}

export default ShopContextProvider;
