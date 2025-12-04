import React from 'react'
import './ListProduct.css'
import {useState,useEffect} from 'react'
import cross_icon from '../../assets/cross_icon.png'
import { API_URL } from "../../config/api";
const ListProduct = () => {

  const [allProducts, setAllProducts]=useState([])

const fetchInfo=()=>{
   fetch(`${API_URL}/products`)
  .then((res)=>res.json())
  .then((data)=>{setAllProducts(data)})
}

useEffect(()=>{
  fetchInfo();

},[])

const remove_product= async(id)=>{
  console.log('Deleted',id)
  await fetch(`${API_URL}/products/${id}`,{
    method:'DELETE',
    
  })
 setAllProducts(prev => prev.filter(p => p.id !== id));


}



  return (
    <div className="list-product">
      <h1>All Prducts List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Cateory</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr/>

{allProducts.map((product,idx)=>{

  return   <div key={product.id}>
    <div className="listproduct-format-main listproduct-format">
      <img src={product.image} alt="" className="listproduct-product-icon" />
      <p>{product.name}</p>
      <p>${product.old_price}</p>
      <p>${product.new_price}</p>
      <p>{product.category}</p>
      <img
        onClick={() => remove_product(product.id)}
        className="listproduct-remove-icon"
        src={cross_icon}
        alt="delete"
      />
    </div>
    <hr />
  </div>


})}

        </div>


    </div>
  )
}

export default ListProduct