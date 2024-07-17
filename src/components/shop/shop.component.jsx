import { Route, Routes, useNavigate } from "react-router-dom";
import "./shop-component-scss/shop-component.styles.css";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../../routes/category/category.component";
import { useContext } from "react";
import { SignInContext } from "../../contexts/user.context";

const Shop = () => {
  const { currentUser } = useContext(SignInContext);
  const navigate = useNavigate();
  return (
    <>
      {currentUser ? (
        <Routes>
          <Route
            index
            element={<CategoriesPreview></CategoriesPreview>}
          ></Route>
          <Route path=":category" element={<Category></Category>}></Route>
        </Routes>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Shop;
