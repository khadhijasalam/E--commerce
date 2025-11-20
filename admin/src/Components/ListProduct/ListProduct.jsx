import React from 'react'
import './ListProduct.css'
import {useState,useEffect} from 'react'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {

  const [allProducts, setAllProducts]=useState([])

const fetchInfo=()=>{
   fetch('http://localhost:4000/allproducts')
  .then((res)=>res.json())
  .then((data)=>{setAllProducts(data)})
}

useEffect(()=>{
  fetchInfo();

},[])

const remove_product= async(id)=>{
  console.log('Clicked',id)
  await fetch('http://localhost:4000/removeproduct',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({id:id})
  })
  await fetchInfo()

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

  return  <><div key={idx} className="listproduct-format-main listproduct-format">

    <img src={`${product.image}`} alt="" className="listproduct-product-icon" />
    <p>{product.name}</p>
    <p>${product.old_price}</p>
    <p>${product.new_price}</p>
    <p>{product.category}</p>
    <img onClick= {()=>{remove_product(product.id)}}className='listproduct-remove-icon' src={cross_icon}> 
    </img>
  </div>
  <hr/>
 </>


})}

        </div>


    </div>
  )
}

export default ListProduct