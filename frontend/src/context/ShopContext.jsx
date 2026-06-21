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


  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;
