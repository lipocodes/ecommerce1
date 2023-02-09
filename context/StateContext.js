import React, {createContext,useContext, useState, useEffect} from "react";
import {toast} from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children})=>{
  const [showCart, setShowCart] =  useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;
 
  const onAdd = ((product,quantity)=>{
   const checkProductInCart = cartItems.find((item)=>item._id===product._id);
   //if we try to add a product aleady in cart
   setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity); 
   setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities + quantity);
   if(checkProductInCart){
    const updatedCartItems = cartItems.map((cartProduct)=>{
        if(cartProduct._id===product._id){ //if this product is already in cart, we need only increase its quantity
            return {
             ...cartProduct, //copy all fields of cartProduct 
             quantity: cartProduct.quantity+quantity   //modify this field
            }
        }
    });
    setCartItems(updatedCartItems);
   }else{
     product.quantity = quantity;
     setCartItems([...cartItems,{...product}]);
   }
   toast.success(`${qty} ${product.name} added to the cart.`);
  });

  const incQty = () =>{
    setQty((prevQty)=> prevQty+1);  
  }
  
 const onRemove = (product) =>{
    foundProduct = cartItems.find((item)=> item._id===product._id);
    //filter out found product
    const newCartItems = cartItems.filter((item)=>item._id!==product._id);
    setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price*foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities-foundProduct.quantity);
    setCartItems(newCartItems);
 }

  const toggleCartItemQuantity  = (id,value) => {
    foundProduct = cartItems.find((item)=> item._id===id);

     //filter out found product
     const newCartItems = cartItems.filter((item)=>item._id!==id);       
    if(value==="inc"){
        setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity+1}]);
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price);
        setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities+1);
    }else if(value==="dec"){
        if(foundProduct.quantity>1){
            setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity-1}]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities-1);
        }
       
    }
  }


  const decQty = () => {
    setQty((prevQty)=> {
      if(prevQty-1 < 1) return 1;  
      return prevQty-1;
    });  
  }

  return (<Context.Provider value={{cartItems,totalPrice,totalQuantities,showCart,qty,incQty,decQty, onAdd,setShowCart,toggleCartItemQuantity,onRemove,setCartItems,setTotalPrice,setTotalQuantities}}>
    {children}
  </Context.Provider>);
}

//this is what we import from pages in the app
export const useStateContext = () => useContext(Context);

