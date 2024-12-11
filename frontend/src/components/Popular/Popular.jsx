import React, { useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useState } from 'react';

const Popular = () => {

     const [popular, setpopular] = useState([]);

     useEffect(() => {
          fetch('http://localhost:3001/popularinwomen')
               .then((response) => response.json())
               .then((data) => setpopular(data));
     }, []);

     return (
          <div className='popular'>
               <h1>POPULAR IN WOMEN</h1>
               <hr />
               <div className="popular-item">
                    {popular.map((item, i) => {
                         return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}
               </div>
          </div>
     );
}

export default Popular;
