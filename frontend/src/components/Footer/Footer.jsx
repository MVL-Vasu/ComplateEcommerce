import React from 'react';
import './Footer.css';
import logo from '../image/logo.png';

const Footer = () => {
     return (
          <div className='footer'>
               <div className="footer-logo">
                    <img src={logo} alt="" />
                    <p>SHOPPER</p>
               </div>
               <ul className='footer-links'>
                    <li>Company</li>
                    <li>Products</li>
                    <li>Offices</li>
                    <li>About</li>
                    <li>Contact</li>
               </ul>
               <div className="footer-social-icon">
                    <a href="/" ><i className="fa-brands fa-facebook" style={{ color: '#155dd7' }}></i></a>
                    <a href="/" ><i className="fa-brands fa-twitter" style={{ color: '#74C0FC' }}></i></a>
                    <a href="/" ><i className="fa-brands fa-instagram" style={{ color: '#fa00e5' }}></i></a>
                    <a href="/" ><i className="fa-brands fa-linkedin" style={{ color: '#2868d7' }}></i></a>
               </div>
               <div className="footer-copyright">
                    <hr />
                    <p>Copyright @2024 - All Right Reserved</p>
               </div>
          </div>
     );
}

export default Footer;
