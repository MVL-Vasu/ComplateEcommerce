import React, { useEffect } from 'react';
import './NewCollections.css';
import products from './products.json'; // Import the JSON file
import Item from '../Item/Item';
import { useState } from 'react';

const NewCollections = () => {

     const [newcollection, setnewcollection] = useState([]);

     useEffect(() => {
          fetch('http://localhost:3001/necollections')
               .then((response) => response.json())
               .then((data) => setnewcollection(data))
     }, []);

     return (
          <div className='newcollections'>
               <h1>NEW COLLECTIONS</h1>
               <hr />
               <div className="collections">
                    {newcollection.map((item, i) => {
                         return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}
               </div>
          </div>
     );
}

export default NewCollections;