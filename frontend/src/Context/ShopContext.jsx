import { createContext, useState,useEffect } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};


const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_product,setAll_Product]=useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/api/products')
    .then((res)=>res.json())
    .then((data)=>setAll_Product(data))

    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/api/cart',{
        method:'GET',
        headers:{
          'auth-token':`${localStorage.getItem('auth-token')}`,
          
        }
      }).then((res)=>res.json())
      .then((data)=>setCartItems(data))

    }

  },[])


const addToCart = (itemId) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: (prev[itemId] || 0) + 1,
  }));

 if(localStorage.getItem('auth-token')){
    fetch(`http://localhost:4000/api/cart/${itemId}`,{
        method:'PUT',
        headers:{
          
            'auth-token': `${localStorage.getItem('auth-token')}`,
           
        },
       
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}


};
const removeFromCart = (itemId) => {
 setCartItems(prev => {
  if (!prev[itemId]) return prev;

  const updated = { ...prev };
  if (updated[itemId] > 1) {
    updated[itemId] -= 1;
  } else {
    delete updated[itemId];
  }
  return updated;
});
   if(localStorage.getItem('auth-token')){
    fetch(`http://localhost:4000/api/cart/${itemId}`,{
        method:'DELETE',
        headers:{
         
            'auth-token': `${localStorage.getItem('auth-token')}`,
            
        },
        
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
}
};

const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    if (cartItems[itemId] > 0) {
      let itemInfo = all_product.find((p) => p.id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.new_price * cartItems[itemId];
      }
    }
  }
  return totalAmount;
};


const getTotalCartItems = () => {
  let totalItem = 0;
  for (const itemId in cartItems) {
    totalItem += cartItems[itemId];
  }
  return totalItem;
};


  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
