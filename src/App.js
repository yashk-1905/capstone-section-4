// since we have created the database now  we need to get the data from database inside our  shop page  from within products component  
import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import AllProducts from "./components/all-products/all-products.component";
import { useContext } from "react";
import { CategoriesContext } from "./contexts/categories.context";

const App = () => {
  const {urlTitle} = useContext(CategoriesContext); 
  const  title = urlTitle;
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="shop" element={<Shop></Shop>}></Route>
        <Route path="auth" element = {<Authentication></Authentication>}></Route>
        <Route path="checkout" element = {<Checkout></Checkout>}></Route>
        <Route path={`products/${title}`} element = {<AllProducts></AllProducts>}></Route>
      </Route>
    </Routes>
  );
};

export default App;