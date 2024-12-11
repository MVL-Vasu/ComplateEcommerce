import React from 'react';
import './DiscriptionBox.css'

const DiscriptionBox = () => {
     return (
          <div className='discriptionbox'>
               <div className="discriptionbox-navigator">
                    <div className="discriptionbox-nav-box">Description</div>
                    <div className="discriptionbox-nav-box fade">Reviews (122)</div>
               </div>
               <div className="discriptionbox-discription">
                    <p>
                         An e-commerce website is a digital platform that enables individuals or businesses to buy and sell products or services over the internet. These websites serve as online storefronts where users can browse products, compare prices, make purchases, and manage their orders from the comfort of their homes or offices.
                    </p>
                    <p>
                         Displays the products or services with details like descriptions, prices, images, and reviews. Allows users to search for specific items and filter them by categories, price, ratings, etc.
                    </p>
               </div>
          </div>
     );
}

export default DiscriptionBox;
