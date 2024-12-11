import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {

     const [allproducts, setallproducts] = useState([]);

     const fetchInfo = async () => {
          await fetch('http://localhost:3001/allproducts')
               .then((res) => res.json())
               .then((data) => { setallproducts(data) });
     }

     useEffect(() => {
          fetchInfo();
     }, [])

     const remove_product = async (id) => {

          let result;

          if (navigator.onLine) 
          {
               result = await swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this product",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
               });
          }
          else
          {
               result = confirm("Are you sure? Once deleted, you will not be able to recover this product");
          }

          if (result) {
               await fetch('http://localhost:3001/remove_product', {
                    method: 'POST',
                    headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
               })
               await fetchInfo();

               navigator.onLine ? swal("Product Deleted Successfully", { icon: "success", }) : alert("Product Deleted Successfully");
          }


     }

     return (
          <div className='listproduct'>
               <h1>All Products List</h1>
               <div className="listproduct-format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
               </div>
               <div className="listproduct-allproducts">
                    <hr />
                    {allproducts.map((product, index) => {
                         return <div key={index} className="listproduct-format-main listproduct-format">
                              <img src={product.image} className='listproduct-product-icon' alt="" />
                              <p>{product.name}</p>
                              <p>₹{product.old_price}</p>
                              <p>₹{product.new_price}</p>
                              <p>{product.category}</p>
                              <button onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon fa-solid fa-trash' style={{ color: "#f11e48" }}></button>
                         </div>
                    })}
               </div>
          </div>
     );
}

export default ListProduct;
