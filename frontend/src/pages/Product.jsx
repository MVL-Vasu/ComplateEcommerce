import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api_paths from '../config/apis';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { Circles } from 'react-loader-spinner';

import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DiscriptionBox from '../components/DiscriptionBox/DiscriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import Loader from '../components/Loader/Loader';

const Product = () => {

     const { productId } = useParams();

     const [product, setproduct] = useState(null);
     const [loading, setLoading] = useState(true);

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

     useEffect(() => {

          findproduct();

     }, [productId]);


     if (loading) {
          // Show spinner while loading
          return (

               <Loader/>

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
