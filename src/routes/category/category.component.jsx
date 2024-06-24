import { useParams } from "react-router-dom";
import "./category-scss/category.styles.css";
import { useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  console.log(products);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="cat-title">{category.toUpperCase()}</h2>
      <div className="cat-container">
        {products &&
          products.map((item) => (
            <ProductCard key={item.id} product={item}></ProductCard>
          ))}
      </div>
    </>
  );
};

export default Category;
