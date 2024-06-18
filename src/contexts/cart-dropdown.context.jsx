import { createContext, useEffect, useState } from "react"

const itemExists = (cartItems,product) => cartItems.find((item) => item.id === product.id)

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = itemExists(cartItems,productToAdd);
    if(existingCartItem){
        return cartItems.map((item)=> 
            item.id === productToAdd.id ? {...item, quantity:item.quantity+1}:item
        )
    }
    return ([...cartItems, {...productToAdd, quantity:1}])
}

const reduceItem = (cartItems, productToReduce) => {
    const existingCartItem = itemExists(cartItems,productToReduce);
    
    if(existingCartItem.quantity === 1){
      return cartItems.filter((item) => item.id != productToReduce.id)  
    }

    if(existingCartItem){
        return cartItems.map((item)=> 
            item.id === productToReduce.id ? {...item, quantity:item.quantity-1}:item
        )
    }
}



const deleteItem = (cartItems, productToRemove) => {
    const existingCartItem = itemExists(cartItems,productToRemove);
    if(existingCartItem){
        return cartItems.filter((item)=> item.id!==productToRemove.id)
    }
}

export const CartDropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen : () => {},
    cartItems: [],      
    addItemToCart: () => {},
    cartCount: 0,
    reduceCartItem: () => {},
    removeCartItem: () => {},
    cartTotal: 0
})

export const CartDropdownProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((acc,item)=>{
            return acc + item.quantity;
        },0)
        setCartCount(newCartCount);
    }, [cartItems])

    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((acc,item)=>{
            return acc + item.quantity*item.price;
        },0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const reduceCartItem = (productToReduce) => {
        setCartItems(reduceItem(cartItems,productToReduce))
    }

    const removeCartItem = (productToRemove) => {
        setCartItems(deleteItem(cartItems,productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, reduceCartItem, removeCartItem, cartTotal};
    return(
        <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
    )
}