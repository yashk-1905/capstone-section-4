import { createContext, useEffect, useReducer, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListner,
  signOutUser,
} from "../utils/firebase/firebase.utils";
import { CreateAction } from "../utils/reducer/reducer.utils";

export const SignInContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state,action) => {
  console.log('dispatched');
  console.log(action);
  const {type, payload} = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:  
      return {
        ...state,   
        currentUser: payload
      }
     default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}
const INITIAL_STATE = {
  currentUser: null
}
export const SignInProvider = ({ children }) => {
  const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE); 
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(
      // {type: USER_ACTION_TYPES.SET_CURRENT_USER, payload:user}
      CreateAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)
    )
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
};
