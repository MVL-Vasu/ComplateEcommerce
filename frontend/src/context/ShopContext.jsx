import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import api_paths from "../config/apis";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

     const [all_product, setall_product] = useState([]);

     const [cartItem, setcartItem] = useState([]);

     const [isloading, setisloading] = useState(true);

     const GetCartProduct = async () => {

          await fetch(api_paths.getcartitem, {
               method: "POST",
               headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
               },
               body: "",
          })
               .then((res) => res.json())
               .then((data) => setcartItem(data))

     }

     const GetAllProduct = async () => {

          await fetch('http://localhost:3001/products/allproducts')
               .then((response) => response.json())
               .then((data) => setall_product(data))

     }

     useEffect(() => {

          GetAllProduct();

          if (localStorage.getItem('auth-token')) {

               GetCartProduct();

          }

          setisloading(false);

     }, [])

     const addToCart = (itemId) => {
          if (localStorage.getItem('auth-token')) {
               const existingItem = cartItem.find(item => item.productId === itemId);
               if (existingItem) {
                    setcartItem(cartItem.map(item =>
                         item.productId === itemId
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                    ));
               } else {
                    setcartItem([...cartItem, { productId: itemId, quantity: 1 }]);
               }
               fetch(api_paths.addtocart, {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'auth-token': `${localStorage.getItem('auth-token')}`,
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId })
               })
                    .then((response) => response.json())
                    .then((data) => {
                         toast.success("Added to Cart", {
                              position: "bottom-center",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: false,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                         });
                    })
          }
          else {
               Swal.fire({
                    title: "Please Login/Register",
                    text: "Login to Add to Cart",
                    icon: "warning",
                    timer: 3000
               })
               window.location.replace("#/login");
          }
     }

     const RemoveFromCart = (itemId) => {
          if (localStorage.getItem('auth-token')) {
               const existingItem = cartItem.find(item => item.productId === itemId);

               if (existingItem) {
                    setcartItem(cartItem.map(item =>
                         item.productId === itemId
                              ? { ...item, quantity: item.quantity - 1 }
                              : item
                    ));
               } else {
                    setcartItem(cartItem.filter(item => item.productId !== itemId));
               }

               fetch(api_paths.removefromcart, {
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
                              title: "Removed Successfully",
                              icon: "success",
                         });
                         // GetCartProduct();
                    })
          }
          else {
               alert("no token found");
          }
     }

     const getTotalCartItems = () => {
          return cartItem.length;
     }

     const contextValue = { getTotalCartItems, isloading, all_product, cartItem, addToCart, RemoveFromCart }

     return (
          <ShopContext.Provider value={contextValue}>
               {props.children}
          </ShopContext.Provider>

     )

}

export default ShopContextProvider;



