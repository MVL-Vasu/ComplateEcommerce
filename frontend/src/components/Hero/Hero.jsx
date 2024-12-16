import React from 'react';
import './Hero.css';
import hand_iocn from '../image/hand_icon.png'
import hero_image from '../image/hero_image.png'

const Hero = () => {
     return (
          <div className='hero'>

               <div className="hero-left">
                    <h2>NEW ARRIVALS ONLY</h2>
                    <div>
                         <div className="hero-hand-icon"> 
                              <p>new</p>
                              <img src={hand_iocn} alt="" />
                         </div>
                         <p>collections</p>
                         <p>for everyone</p>
                    </div>
                    <div className="hero-latest-btn">
                         <div>Letest Collection</div>
                         <i className="fa-solid fa-arrow-right"></i>
                    </div>

               </div>

               <div className="hero-right">
                    <img src={hero_image} alt="" />
               </div>
          </div>
     );
}

export default Hero;
