import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api_paths from '../config/apis';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { Circles } from 'react-loader-spinner';
import { RotatingLines } from "react-loader-spinner";

import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DiscriptionBox from '../components/DiscriptionBox/DiscriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {

     const { productId } = useParams();

     const [product, setproduct] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {

          const findproduct = async () => {

               try {

                    setLoading(true); // Start loading

                    const response = await fetch(`${api_paths.singleproduct}/${productId}`)

                    if (!response.ok) {
                         throw new Error(`Failed to fetch product: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setproduct(data);

               } catch (error) {

                    console.error(error);

               } finally {

                    setTimeout(() => {
                         setLoading(false); // Stop loading
                    },300)

               }

          };

          findproduct();

     }, [productId]);

     const styles = {
          loader: {
               position: 'fixed',
               top: '0',
               left: '0',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%',
               height: '100%',
               background: 'rgba(0,0,0,.8)',
               zIndex: '9999',
          }
     }

     if (loading) {
          // Show spinner while loading
          return (

               <div style={styles.loader}>
                    <RotatingLines
                         strokeColor=" rgb(57, 212, 255)"
                         strokeWidth="5"
                         animationDuration="0.90"
                         width="120"
                         visible={true}
                    />
               </div>

          );

     }

     return (

          <div>

               <Breadcrums product={product} />
               <ProductDisplay product={product} />
               <DiscriptionBox />
               <RelatedProducts />

          </div>

     );

}

export default Product;
