import { useState, createContext } from "react";
import { products ,winterProducts} from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState(new Map());
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const googleClientId = import.meta.env.VITE_CLIENT_ID;
  const [wishList,setWishList] = useState(new Map());
  const [verificationToken,setVerificationToken] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const[productId , setProductId] = useState(new Map());
const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken') || '');

  


  // this will add into the cart and  get cart count will display the count of added items in objects
 const addToWishList = (item) => {
  setWishList(prev => {
    const newMap = new Map(prev);
    const exist = newMap.get(item._id);
    if(exist){
      return newMap;
      toast.warn("Product already Exists");
    }
    newMap.set(item._id,item);
    return newMap;

    
  });
};


const isInWishlist = (item_id) => {
  return wishList.has(item_id);
}





  //====================== FUNCTION TO ADD INTO THE CART ==================================


  const addToCart = (item_id) => {
  setCartItems(prev => {
    const newCart = new Map(prev);
    const currentQty = newCart.get(item_id) ?? 0;
    newCart.set(item_id, currentQty + 1);
    return newCart;
  });
};


  //  ==================== Getting total number of items in cart ===========================


  const getCartCount =() => {
    const cart_count = [...cartItems.values()].reduce((a,b) => a + b,0);
    return cart_count;
  }



  // ====================FUNCTION TO GET THE TOTAL AMOUNT FROM THE CART=============


  const getCartAmount = () => {
    let amount = 0 ;
    for(const [key,value] of Object.entries(cartItems)){
      const product = winterProducts.find(item=>  item_id === key);
      if(!product)continue;
      amount += product.pricing.sellingPrice* value;
    }
    return amount;
  }


  const   removeFromWishlist =(productId) => {

   
    const newWishList = new Map(wishList);
    if(!newWishList){
      toast.error("try again!");
    }
    newWishList.delete(productId);
    setWishList(newWishList);

  }

//================== REMOVING (Quantity) PRODUCT FROM THE CART ======================================

  const decreaseQuantityFromCart = (productId) => {
    // console.log("Quantity is Getting decreased here");
    const newCartMap = new Map(cartItems);
    let quantity = newCartMap.get(productId);
    if(quantity ===  1){
      newCartMap.delete(productId);

    }else{
      newCartMap.set(productId , quantity - 1);
    }
    setCartItems(newCartMap);

  }

  // =================  ADDING PRODUCT INTO THE CART============================
  const  increaseQuantityInCart = (product) => {
    const newCartMap = new Map(cartItems);
    let quantity = 0 ;
    if(newCartMap.has(product._id)){
        quantity = newCartMap.get(product._id);
    }
    
    // let quantity = newCartMap.get(product._id);
  
    // const totalQuantity = product.quantity !== ( undefined || null) ? product.quantity : 10; // make it zero after
    const totalQuantity  = 10;
    // console.log(cartItems);
    if(quantity + 1 <= totalQuantity){
        newCartMap.set(product._id , quantity + 1);
        setCartItems( new Map(newCartMap));

        toast.success("Added to cart");

    }else{
      toast.error("product out of Stock");
    }

  }

  // ==============================REMVOING ENTIRE PRODUCT FROM CART=========================


  const removeItemFromCart = (product) => {
    const newCartMap = new Map(cartItems);
    const _id = product._id;
    if(newCartMap.has(_id)){
      newCartMap.delete(_id);
      setCartItems(newCartMap);

    }else{
      toast.error("try Again");
    }
  }



  // ================== MAKE ORDER DETAILS FOR PLACING ORDER ===========================

  const makeOrder = () => {

  // use entire cart and to make the entire order 


  const orderDetails  = []

    for(const [productId,quantity]  in cartItems ) {
      const tempOrder = {};
        const product = winterProducts.find((item) => item._id === productId);
        if(!product)continue;
        tempOrder.name = product.name;
        tempOrder.mrp = product.pricing.mrp;
        tempOrder.sellingPrice = product.pricing.sellingPrice;
        tempOrder.discountpercentage = product.pricing.discountPercentage;
        tempOrder.taxIncluded = product.pricing.taxIncluded;
        tempOrder.gstPercentage = product.pricing.gstPercentage;

        




    }

  return null;


  }



  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    userToken,
    setUserToken,
    verificationToken,
    setVerificationToken,
    addToCart,
    removeFromWishlist,
    getCartCount,
    setWishList,
    addToWishList,
    googleClientId,
    
    navigate,
    backendUrl,
    winterProducts,
    wishList,


 
    cartItems,
    setCartItems,
    addToCart,
    getCartAmount,
    increaseQuantityInCart,
    removeItemFromCart,


  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;
