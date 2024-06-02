//vid 86 React Router Link 

/**first i will need to move this navigation component into a different route */
import Home from "./routes/home/home.component";
import { Outlet, Route, Routes } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";

// const Navigation = () => {
//   return(
//     <div>
//       <div>
//         <h1>
//           I am the Navigation bar 
//         </h1>
//       </div>     
//         <Outlet></Outlet>
//     </div>
//   )
// }

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
        <Route path="/shop" element={<Shop></Shop>}></Route>
      </Route>
    </Routes>
  );
};

export default App;