import React from 'react';
import './RelatedProducts.css'
import products from '../data';
import Item from '../Item/Item';

const RelatedProducts = () => {
     return (
          <div className='relatedproducts'>
               <h1>Related Products</h1>
               <hr />
               
               <div className="relatedproducts-item">
                    {products.map((item,i) =>{
                         return <Item key={i} id={item.id} name={item.name} image={item.imgUrl} new_price={item.newPrice} old_price={item.oldPrice}/>
                    })}
               </div>
          </div>
     );
}

export default RelatedProducts;
