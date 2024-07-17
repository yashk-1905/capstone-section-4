import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview-scss/category-preview.styles.css";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <div className="title-head">
        <h2 className="title">
            {title.toUpperCase()}
        </h2>
        <Link className="title-all" to={title}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" stroke="#db8080" stroke-width="1.5"/></svg>
        </Link>
      </div>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
