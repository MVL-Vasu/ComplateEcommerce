import React, { useContext, useState } from 'react';
import logo from '../image/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import Swal from 'sweetalert2';

const Navbar = () => {

     const [menu, setMenu] = useState("shop");
     const { getTotalCartItems } = useContext(ShopContext);

     const logout = async () => {

          let results = false;

          Swal.fire({
               title: 'Are you sure?',
               text: "After Logout You have to login again!",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: `<i class="fa-solid fa-power-off"></i> Logout`,
               cancelButtonText: 'Cancel',
               showLoaderOnConfirm : true,
          })
               .then(async (result) => {
                    if (result.isConfirmed) {
                         await Swal.fire({
                              title: "Logout Successfull",
                              icon: "success",
                         });
                         localStorage.removeItem('auth-token');
                         window.location.replace('/')
                    }
               })

          if (results) {


          }
     }

     return (
          <div className='navbar'>
               <div className="nav-logo">
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
               </div>
               <ul className='nav-menu'>
                    <li onClick={() => { setMenu("shop") }}><Link to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("mens") }}><Link to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("womens") }}><Link to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                    <li onClick={() => { setMenu("kids") }}><Link to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
               </ul>
               <div className="nav-login-cart"> 
                    {
                         localStorage.getItem("auth-token")
                              ? <button onClick={() => logout()}>Logout</button>
                              : <Link to='/login' > <button>Login</button></Link>
                    }
                    <div className="cart-box">
                         <Link to='/cart'><i className="cart-icon fa-solid fa-cart-shopping"></i></Link>
                         <div className="nav-cart-count">{getTotalCartItems()}</div>
                    </div>
               </div>
          </div>
     );
}

export default Navbar; 
