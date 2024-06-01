import './categories-scss/categories.style.css';
import CategoryItem from "../category-item/category-item.component";

const Categories = ({categories}) => {
  return (
    <div className="categories-container">
      {categories.map((item) => {
        return <CategoryItem key={item.id} item={item}></CategoryItem>;
      })}
    </div>
  );
};

export default Categories;
