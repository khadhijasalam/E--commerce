import './AddProduct.css'
import {useState} from 'react'
import upload_area from '../../assets/upload_area.svg'
import { API_URL } from "../../config/api";
const AddProduct   = () => {
    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails]= useState({

        name:"",
        image: "",
        category:"women",
        new_price:"",
        old_price:""
    }    )

    const imageHandler= (e)=>{
        setImage(e.target.files[0]);

    }
const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
}

const handleAddProduct = async () => {
  try {
    const formData = new FormData();

    // FILE (KEY MUST MATCH backend .single("image"))
    formData.append("product", image);

    // TEXT FIELDS
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      body: formData,      //  NO HEADERS NEEDED
    });

    const data = await res.json();

    if (data.success) {
      alert("Product Added Successfully!");
    } else {
      alert("Failed: " + data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Error submitting product");
  }
};




  return (
    <>
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p className="">Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Enter Title"/>
            </div> 
            <div className="addproduct-price">
        <div className="addproduct-itemfield ">
            <p className="addproduct-itemfield">Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder=" Enter price"/>
            </div> 
        <div className="addproduct-itemfield">
            <p className="addproduct-itemfield">Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder=" Enter Offer price"/>
            </div> 
            </div>
        <div className="addproduct-itemfield">
            <p className="addproduct-itemfield">Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">

                <option >Category</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kids">Kids</option>
            </select>
            </div> 
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-image' alt=""/>
                </label>

            <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden />
            </div> 
            
                        <button onClick={()=>{handleAddProduct()}} className='addproduct-btn' >ADD</button>

            </div>
            </>
  )
}

export default AddProduct  