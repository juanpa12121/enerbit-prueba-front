import { useContext } from "react"
import ProductsContext from "../context/ProductsProvider"


const useProducts = () =>{
    return useContext(ProductsContext)
};

export default useProducts;