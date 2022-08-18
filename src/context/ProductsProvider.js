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

    const [open, setOpen] = useState(false);

    const [typeModal, setTypeModal] = useState("")

    const [productInput, setProductInput] = useState({});

    const [search, setSearch] = useState("")



    const handleFrmInputLogin = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleProductInput = async(e) =>{
        const tName = e.target.name;
        setProductInput({...productInput, [tName]: tName === 'i_b' || tName === "i_max" || tName === 'i_n' || tName === "seals" ?
        parseFloat(e.target.value) 
        : e.target.value});
        //setProductInput({...productInput, i_max: parseFloat(e.target.value)});
    }

    //Estado que guarda lo que se escriba en la barra de búsqueda
    const handleSearchChange = (e) => {
        setSearch(e.target.value); //Guardar/capturar texto de la barra de búsqueda
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setProductInput({id: "", serial: "", connection_type: "", storage_system: "", condition: "", owner: "", location: "", manufacturer: "", purchase: "", i_max: Number, i_b: Number, i_n:Number, seals: "", created_at: "", updated_at: ""});
        setTypeModal("")
    };

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

    const validarInputs = () =>{
        const { serial, connection_type, storage_system, condition, owner, location, manufacturer, i_max, i_b, i_n, seals} = productInput;

        if(serial === "" || connection_type === "" || storage_system === "" || condition === "" || owner === "" || location === "" || manufacturer === "" || isNaN(i_max) || isNaN(i_b)  || isNaN(i_n) || isNaN(seals)){
            sweetAlert("error", "Error", "Todos los campos son obligatorios", true);
            return;
        }else if(connection_type !== 'directa' && connection_type !== 'indirecta' && connection_type !== 'semidirecta'){
            sweetAlert("error", "Error", "El tipo de conexion debe ser unicamente directa, indirecta, semidirecta", true);
            return;
        }else if(storage_system !== 'interno' && storage_system !== 'externo'){
            sweetAlert("error", "Error", "El tipo de almacenamiento debe ser unicamente interno, externo", true);
            return;
        }else if(condition !== 'nuevo' && condition !== 'usado'){
            sweetAlert("error", "Error", "La condición debe ser unicamente nuevo, usado", true);
            return;
        }else if(owner !== 'RF' && owner !== 'OR'){
            sweetAlert("error", "Error", "El propietario debe ser unicamente RF, OR", true);
            return;
        }
    }

    const getProducts = async () =>{
        const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters?page=0&size=5";
        await axios.get(urlApi).then(res=>{
            setProducts(res.data.items)
        }).catch(err=>{
            console.log(err.message)
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    const postProducts = async () =>{
        
        const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters";
        validarInputs();
        await axios.post(urlApi, productInput).then(res=>{
            setOpen(false);
            getProducts();
            sweetAlert("success", "Producto agregado", "El producto ha sido agregado correctamente", true, 3000);
        }).catch(err=>{
        
            console.log(err.response.data)
        })
    }

    const getProduct = (product) =>{
        setProductInput(product);
        setOpen(true);
    }

    const putProduct =  () =>{
        const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters/" + productInput.id;
        validarInputs();
         axios.patch( urlApi, productInput).then(res=>{
            setOpen(false);
            getProducts();
            sweetAlert("success", "Producto actualizado", "El producto ha sido actualizado correctamente", true, 3000);
        })
    }

    const deleteProduct = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters/" + id
                axios.delete(urlApi).then(res=>{
                    getProducts();
                })
                
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })

    }


    return(
        <ProductsContext.Provider value = {{ ProductList, user, handleFrmInputLogin, sweetAlert, products, open, handleClickOpen, handleClose, handleProductInput, productInput, setProductInput, postProducts, getProduct, typeModal, setTypeModal, putProduct, deleteProduct, search, handleSearchChange }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsProvider };
export default ProductsContext;