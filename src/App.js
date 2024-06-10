//vid 102 Sign in form
/**
 * firstly
 * we changed the name of signin within routes to authentication
 * 
 * secondly 
 * we updated the imports everywhere within the app{app, navigation}
 * 
 * thirdly
 * creating a signIn component within components it is gonna be similar to signUp so firstly we are gonna copy the signUp exactly and then do the changes required 
 */

import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
// import SignIn from "./routes/authentication/authentication.component";
import Authentication from "./routes/authentication/authentication.component";


const Shop = () =>  {
  return(
    <h1>I am the shop page</h1>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="shop" element={<Shop></Shop>}></Route>
        <Route path="auth" element = {<Authentication></Authentication>}></Route>
      </Route>
    </Routes>
  );
};

export default App;