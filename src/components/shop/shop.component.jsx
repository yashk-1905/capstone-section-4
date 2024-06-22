import { useContext } from "react";
import ProductCard from "../product-card/product-card.component";
import './shop-component-scss/shop-component.styles.css'
import { CategoriesContext } from "../../contexts/categories.context";
import { useNavigate } from "react-router-dom";
import AllProducts from "../all-products/all-products.component";

const Shop = () => {
    const {categoriesMap, setUrlTitle} = useContext(CategoriesContext);

    const navigate  = useNavigate();
    const goToTitleProducts = (title) => {
        navigate(`/products/${title}`);
        setUrlTitle(title);
    }
    return(
        <>
            {
                Object.keys(categoriesMap).map((title, index) => {
                    return <>
                        <h2 onClick={() => goToTitleProducts(title)} style={{cursor:"pointer", textTransform: "capitalize"}}>{title}</h2>
                        <div className="products-container">
                            { 
                                //limiting the number of items i get from the map to 4 
                                categoriesMap[title].map((product,index) =>{
                                    if(index<4){
                                       return <ProductCard key={product.id} product={product}></ProductCard>
                                    }
                                } 
                                )
                            }
                        </div>
                    </>
                } )
            }
        </>
    )
}

export default Shop;