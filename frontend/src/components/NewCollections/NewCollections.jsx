import React, { useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';
import { useState } from 'react';
import api_paths from '../../config/apis';
import Loader from '../Loader/Loader';

const NewCollections = () => {

     const [newcollection, setnewcollection] = useState([]);
     const [loading, setloading] = useState(true);
     // const [iserror, setiserror] = useState(false);

     const fetchproduct = async () => {

          try {

               await fetch(api_paths.newcollections)
                    .then((response) => response.json())
                    .then((data) => setnewcollection(data));

          }
          catch (error) {

               console.error(error)
               // setiserror(true);

          }
          finally {

               // setTimeout(() => {
               //      setloading(false);
               // }, 300)
               setloading(false);

          }
     }

     useEffect(() => {

          fetchproduct();

     }, []);

     if (loading) {
          return <Loader />
     }

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
