// vid 146, 147
import Home from "./routes/home/home.component";
import { Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        {/* <Route index element={<Home></Home>}></Route> */}
        <Route index element={<Authentication></Authentication>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="shop/*" element={<Shop></Shop>}></Route>
        {/* <Route path="auth" element = {<Authentication></Authentication>}></Route> */}
        <Route path="checkout" element = {<Checkout></Checkout>}></Route>
      </Route>
    </Routes>
  );
};

export default App;