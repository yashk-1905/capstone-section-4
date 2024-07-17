import { act, createContext, useEffect, useReducer, useState } from "react";
import { CreateAction } from "../utils/reducer/reducer.utils";

const itemExists = (cartItems, product) =>
  cartItems.find((item) => item.id === product.id);

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = itemExists(cartItems, productToAdd);
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceItem = (cartItems, productToReduce) => {
  const existingCartItem = itemExists(cartItems, productToReduce);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id != productToReduce.id);
  }

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToReduce.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

const deleteItem = (cartItems, productToRemove) => {
  const existingCartItem = itemExists(cartItems, productToRemove);
  if (existingCartItem) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }
};

const USER_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};
const reducerFunction = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case USER_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in reducerFunction`);
  }
};

export const CartDropdownContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  reduceCartItem: () => {},
  removeCartItem: () => {},
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CartDropdownProvider = ({ children }) => {
  const [{ cartCount, isCartOpen, cartTotal, cartItems }, dispatch] =
    useReducer(reducerFunction, INITIAL_STATE);
  const setIsCartOpen = (decision) => {
    dispatch(
      // { type: USER_ACTION_TYPES.SET_IS_CART_OPEN, payload: decision }
      //  using the helper function instead
      CreateAction(USER_ACTION_TYPES.SET_IS_CART_OPEN, decision)
    );
  };
  const updateCartItemsReducer = (newCartItems) => {
    // after getting the updatede cartItems in newCartItems, let's generate newCartTotal
    const newCartTotal = newCartItems.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);

    // generate cartCount
    const newCartCount = newCartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    // dispatch
    dispatch(
    /**
        type: USER_ACTION_TYPES.SET_CART_ITEMS,
        payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
        },
     */   
      CreateAction(USER_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const reduceCartItem = (productToReduce) => {
    const newCartItems = reduceItem(cartItems, productToReduce);
    updateCartItemsReducer(newCartItems);
  };

  const removeCartItem = (productToRemove) => {
    const newCartItems = deleteItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    // setIsCartOpen: () => {},
    addItemToCart,
    cartItems,
    cartCount,
    reduceCartItem,
    removeCartItem,
    cartTotal,
  };
  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
