import Button from '../button/button.component';
import './product-card-scss/product-card.styles.css'

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product
    return(
        <div className='product-card-container'>
            <img  src={imageUrl} alt={`${name}`}></img>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType = 'inverted'>Add to Cart</Button>
        </div>
    )
}

export default ProductCard;

//now we are gonna use this product card inside of our shop component 