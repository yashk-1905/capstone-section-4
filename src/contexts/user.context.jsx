import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListner, signOutUser } from "../utils/firebase/firebase.utils";
export const SignInContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const SignInProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner(
      (user) => {
        if(user){
          createUserDocumentFromAuth(user);
        }
        console.log(user);
        setCurrentUser(user);
      } 
    );
    return unsubscribe;
  }, []);

  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
};
