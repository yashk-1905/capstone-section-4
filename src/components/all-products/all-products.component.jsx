import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../product-card/product-card.component";

const AllProducts = () => {
  const { categoriesMap, urlTitle } = useContext(CategoriesContext);
  const title = urlTitle;
  return (
    <>
      <h2 style={{textAlign: "center", textTransform: "capitalize"}}>
        {title}
      </h2>
      <div className="products-container">
        {
          categoriesMap[title].map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                ></ProductCard>
              );
          })
        }
      </div>
    </>
  );
};

export default AllProducts;
