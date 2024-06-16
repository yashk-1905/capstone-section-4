import { useContext } from "react";
import { ProductsContext } from "../../contexts/product.context";
import ProductCard from "../product-card/product-card.component";
import './shop-component-scss/shop-component.styles.css'

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return(
        <div className="products-container">
            {
                // products.map(({id,name}) => 
                products.map((product) => 
                    // <div key={id}>
                    //     <h1>{name}</h1>
                    // </div>
                    <ProductCard key={product.id} product={product}></ProductCard>
                )
            }
        </div>
    )
}

export default Shop;