import { useNavigate } from 'react-router-dom';
import './categoryItem-scss/categoryItem.style.css'

const CategoryItem = ({ item }) => {
  const { title, imageUrl, route } = item;

  const navigate = useNavigate();
  const onNavigationHandler = () => {
    navigate(route);
  }
  return (
    <div className="category-container" onClick={onNavigationHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
