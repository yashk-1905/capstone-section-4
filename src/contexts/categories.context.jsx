import { createContext, useEffect, useState } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
    categoriesMap: {},
    urlTitle: '',
    setUrlTitle: () => {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const [urlTitle, setUrlTitle] = useState('');

    useEffect( () => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);

            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);
    const value = {categoriesMap, urlTitle, setUrlTitle};
    return(
        <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
    )
}

// now let's do the change inside of  our index.js