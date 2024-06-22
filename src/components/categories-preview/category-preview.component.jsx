import ProductCard from '../product-card/product-card.component';
import  './category-preview-scss/category-preview.styles.css';

// it has to revieve the apt title as well as the products to generate the right heading and list
const CategoryPreview = ({title, products}) => {
    return(
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {
                    products
                    .filter((_,idx) => idx<4)
                    .map((product) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;