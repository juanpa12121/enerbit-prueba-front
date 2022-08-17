import { createContext } from "react";
import ProductList from "../components/ProductList";

//1. Crear el contexto (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsContext = createContext();

//2. Crear el provider (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsProvider = ({children}) =>{


    return(
        <ProductsContext.Provider value = {{ProductList}}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsProvider };
export default ProductsContext;