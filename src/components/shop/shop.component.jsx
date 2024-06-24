import { Route, Routes } from 'react-router-dom';
import './shop-component-scss/shop-component.styles.css'
import CategoriesPreview from '../../routes/categories-preview/categories-preview.component';
import Category from '../../routes/category/category.component';


const Shop = () => {
    return(
       <Routes>
        <Route index element= {<CategoriesPreview></CategoriesPreview>}></Route>
        <Route path=":category" element = {<Category></Category>}></Route>
       </Routes>
    )
}

export default Shop; 