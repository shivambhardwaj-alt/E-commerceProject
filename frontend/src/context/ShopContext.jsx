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
  const [wishList,setWishList] = useState(new Set());
  const [verificationToken,setVerificationToken] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const[productId , setProductId] = useState(new Map());
const [userToken, setUserToken] = useState(() => localStorage.getItem('userToken') || '');

  


  // this will add into the cart and  get cart count will display the count of added items in objects
 const addToWishList = (id) => {
  setWishList(prev => {
    const newSet = new Set(prev);
    const exist = newSet.has(id);
    if(exist){
      toast.warn("Product already Exists");
      return newSet;
    }
    newSet.add(id);
    toast.success("Added in Wishlist");
    return newSet;
  });
};


const isInWishlist = (item_id) => {
  return wishList.has(item_id);
}





  //====================== FUNCTION TO ADD INTO THE CART ==================================


  const addToCart = (item_id) => {
    console.log(cartItems);
  setCartItems(prev => {
    const newCart = new Map(prev);
    if(newCart.has(item_id)){
      toast.warn("Product Already in Cart!");
      return newCart;
    }
    const currentQty = newCart.get(item_id) ?? 0;
    newCart.set(item_id, currentQty + 1);
    toast.success("Product Added ")
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
  
    const newCartMap = new Map(cartItems);
    let quantity = newCartMap.get(productId);
    if(quantity ===  1){
      newCartMap.delete(productId);
      toast.warn("Product Deleted!");

    }else{
      newCartMap.set(productId , quantity - 1);
      toast.success("Quantity Decreased");
    }
    setCartItems(newCartMap);


  }

  // =================  ADDING PRODUCT INTO THE CART============================
 const increaseQuantityInCart = (productId , stock) => {
    const newCartMap = new Map(cartItems);
    let quantity = 0 ;
    if(newCartMap.has(productId ,stock)){
        quantity = newCartMap.get(productId);
    }
    
    quantity = newCartMap.get(productId);   // <-- overwrites the line above, always
  
    const totalQuantity = stock ; 

    if(quantity + 1 <= totalQuantity){
        newCartMap.set(productId , quantity + 1);
        setCartItems( new Map(newCartMap));
        toast.success("Added to cart");
    }else{
      toast.error("product out of Stock");
    }
}

  // ==============================REMVOING ENTIRE PRODUCT FROM CART=========================


  const removeItemFromCart = (productId) => {
    const newCartMap = new Map(cartItems);
    const _id = productId;
    if(newCartMap.has(_id)){
      newCartMap.delete(_id);
      setCartItems(newCartMap);

    }else{
      toast.error("try Again");
    }
  }



  // ================== MAKE ORDER DETAILS FOR PLACING ORDER ===========================

  const makeOrder = ({product}) => {

  // use entire cart and to make the entire order 
    // now make order on the basis of cartData and useCartData to make the order with cartItems 
    // cart data will give me the product and cartItem will give me quantity 
   const mapLength = product.length;
   for(let i = 0 ;i < mapLength ;i++){

    const temp = {};
    temp.name =product.name;




   }

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
    decreaseQuantityFromCart,


  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;
