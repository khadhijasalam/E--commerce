import {useState, useEffect} from "react";
import "./RelatedProducts.css";
// import data_product from "../Assets/data";
import Item from "../Item/Item";
import { API_URL } from "../../config/api";
const RelatedProducts = (props) => {
  const [related, setRelated] = useState([])
  const {product}=props;
useEffect(() => {
  const category = product?.category || "women"; 
  
  fetch(`${API_URL}/products/related?category=${category}`)
    .then(res => res.json())
    .then(data => setRelated(data));
}, [product]);

// console.log(product?.category)


  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
