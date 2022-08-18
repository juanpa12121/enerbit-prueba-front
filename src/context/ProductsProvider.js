import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductList from "../components/ProductList";

//1. Crear el contexto (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsContext = createContext();

//2. Crear el provider (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsProvider = ({children}) =>{

    //Estado para guardar la informacion del usuario admin a loguearse
    const [user, setUser] = useState({username: "", password: ""});

    const [products, setProducts] = useState([])

    const handleFrmInputLogin = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    //Funcion para alertas
    function sweetAlert(icon, title, text, showConfirmButton, timer){
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: showConfirmButton,
            timer: timer
        });
    }

    useEffect(() => {
        const getProducts = async () =>{
            const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters?page=0&size=5";
            const { data } = await axios.get(urlApi)
            console.log(data.items)
            setProducts(data.items)
        }
        getProducts();
    }, [])

    const postProducts = async () =>{
        
    }
    

    return(
        <ProductsContext.Provider value = {{ ProductList, user, handleFrmInputLogin, sweetAlert, products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsProvider };
export default ProductsContext;