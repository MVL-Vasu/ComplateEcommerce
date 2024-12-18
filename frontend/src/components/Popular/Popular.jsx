import React, { useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { useState } from 'react';
import api_paths from '../../config/apis';
import Loader from '../Loader/Loader';

const Popular = () => {

     const [popular, setpopular] = useState([]);
     const [loading, setloading] = useState(true);
     const [iserror, setiserror] = useState(false);

     const fetchproduct = async () => {

          try {

               await fetch(api_paths.popularinwomen)
                    .then((response) => response.json())
                    .then((data) => setpopular(data));

          }
          catch (error) {

               console.error(error)
               setiserror(true);

          }
          finally {

               setTimeout(() => {
                    setloading(false);
               }, 300)

          }
     }

     useEffect(() => {

          fetchproduct();

     }, []);

     if (loading) {
          return;
     }


     return (
          <>
               {
                    loading ? (
                         <Loader />
                    ) : iserror ? (
                         <h1>error</h1>
                    ) : (

                         <div className='popular'>
                              <h1>POPULAR IN WOMEN</h1>
                              <hr />
                              <div className="popular-item">
                                   {popular.map((item, i) => {
                                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                                   })}
                              </div>
                         </div>

                    )
               }
          </>
     );
}

export default Popular;
