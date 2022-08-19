import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductList from "../components/ProductList";

//1. Crear el contexto (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsContext = createContext();

//2. Crear el provider (Permite que otros componentes puedan acceder a los datos del contexto)
const ProductsProvider = ({ children }) => {
  //Estado para guardar la informacion del usuario admin a loguearse
  const [user, setUser] = useState({
    username: window.localStorage.getItem("username"),
    password: window.localStorage.getItem("password"),
  });
  //Estados que guardan la informacion del usuArio
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [password, setPassword] = useState(localStorage.getItem("password"));

  //Estado para recibir los productos de la API
  const [products, setProducts] = useState([]);

  //Estado para mostrar u ocultar ventana modal
  const [open, setOpen] = useState(false);

  //Estado para saber que tipo de ventana modal mostrar
  const [typeModal, setTypeModal] = useState("");

  //Estado para guardar la informacion del producto al agregar, editar o leer
  const [productInput, setProductInput] = useState({});

  //Estado para guardar lo que escriba el usuario en la barra de búsqueda
  const [search, setSearch] = useState("");

  //Para la paginacion
  const [info, setInfo] = useState({
    page: "",
    url_actual: "",
    pages: "",
    next_page: "",
    url_next: "",
    previous_page: "",
    url_prev: "",
  });
  //Metodo para guardar username en localstorage
  const setLocalStorage = (e) => {
    try {
      setUsername(e.target.value);
      window.localStorage.setItem("username", e.target.value);
    } catch (error) {
      console.log(error);
    }
  };
  //Metodo para guardar password en localstorage
  const setLocalStorage2 = (e) => {
    try {
      setPassword(e.target.value);
      window.localStorage.setItem("password", e.target.value);
    } catch (error) {
      console.log(error);
    }
  };
    //Metodo para guardar el usuario en el estado (no localstorage)
//   const handleFrmInputLogin = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//Metodo para guardar la información del modal en el estado
  const handleProductInput = async (e) => {
    const tName = e.target.name;
    setProductInput({
      ...productInput,
      [tName]:
        tName === "i_b" ||
        tName === "i_max" ||
        tName === "i_n" ||
        tName === "seals"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };


  //Estado que guarda lo que se escriba en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value); //Guardar/capturar texto de la barra de búsqueda
  };

  //Metodo para abrir ventana modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Metodo para cerrar ventana modal
  const handleClose = () => {
    setOpen(false);
    setProductInput({});
    setTypeModal("");
  };

  //Funcion para alertas
  function sweetAlert(icon, title, text, showConfirmButton, timer) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: showConfirmButton,
      timer: timer,
    });
  }

  //Metodo para validar inputs
  const validarInputs = () => {
    const {
      serial,
      connection_type,
      storage_system,
      condition,
      owner,
      location,
      manufacturer,
      i_max,
      i_b,
      i_n,
      seals,
    } = productInput;

    if (serial === "" || connection_type === "" || storage_system === "" || condition === "" || owner === "" || location === "" || manufacturer === "" || isNaN(i_max) || isNaN(i_b) || isNaN(i_n) || isNaN(seals)){
      sweetAlert("error", "Error", "Todos los campos son obligatorios", true);
      return;
    } else if ( connection_type !== "directa" && connection_type !== "indirecta" && connection_type !== "semi-directa"){
      sweetAlert("error", "Error", "El tipo de conexion debe ser unicamente directa, indirecta, semi-directa", true);
      return;
    } else if (storage_system !== "interno" && storage_system !== "externo") {
      sweetAlert("error", "Error", "El tipo de almacenamiento debe ser unicamente interno, externo", true);
      return;
    } else if (condition !== "nuevo" && condition !== "usado") {
      sweetAlert("error", "Error", "La condición debe ser unicamente nuevo, usado",true);
      return;
    } else if (owner !== "RF" && owner !== "OR") {
      sweetAlert("error", "Error", "El propietario debe ser unicamente RF, OR",true)
      return;
    }
  };

  const urlApiGet = "http://ops.enerbit.dev/learning/api/v1/meters?page=0&size=5";
    
  //Metodo GET para obtener los productos de la API
  const getProducts = async (urlApiGet) => {
    const url_next = `http://ops.enerbit.dev/learning/api/v1/meters?page=${info.next_page}&size=5`;
    console.log(url_next);
    await axios
      .get(urlApiGet)
      .then((res) => {
        setProducts(res.data.items);
        setInfo({
          page: res.data.page,
          url_actual: `http://ops.enerbit.dev/learning/api/v1/meters?page=${res.data.page}&size=5`,
          pages: res.data.pages,
          next_page: res.data.next_page,
          url_next: `http://ops.enerbit.dev/learning/api/v1/meters?page=${res.data.next_page}&size=5`,
          previous_page: res.data.previous_page,
          url_prev:
            res.data.previous_page !== null
              ? `http://ops.enerbit.dev/learning/api/v1/meters?page=${res.data.previous_page}&size=5`
              : null,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getProducts(urlApiGet);
  }, []);

  //Metodo POST para crear un producto en la API
  const postProducts = async () => {
    const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters";
    validarInputs();
    await axios
      .post(urlApi, productInput)
      .then((res) => {
        setOpen(false);
        getProducts(info.url_actual);
        sweetAlert("success", "Producto agregado", "El producto ha sido agregado correctamente", true, 3000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  //Metodo para identificar producto a editar o a leer
  const getProduct = (product) => {
    setProductInput(product);
    setOpen(true);
  };

  //Metodo PATCH para actualizar un producto en la API
  const putProduct = () => {
    const urlApi =
      "http://ops.enerbit.dev/learning/api/v1/meters/" + productInput.id;
    validarInputs();
    axios.patch(urlApi, productInput).then((res) => {
      setOpen(false);
      getProducts(info.url_actual);
      sweetAlert("success", "Producto actualizado", "El producto ha sido actualizado correctamente", true, 3000);
    })
    .catch((err)=>{
        console.log(err.response.data);
    })
  };

  //Metodo DELTE para eliminar un producto en la API
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const urlApi = "http://ops.enerbit.dev/learning/api/v1/meters/" + id;
        axios.delete(urlApi).then((res) => {
          getProducts(info.url_actual);
        });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  //Funcion para realizar una nueva llamada a la API pero con la página anterior
  const onPrevious = () => {
    getProducts(info.url_prev);
  };
  //Funcion para realizar una nueva llamada a la API pero con la página siguiente
  const onNext = () => {
    getProducts(info.url_next);
  };

  //Logica que envia a la siguiente pagina
  const handlePrevious = () => {
    onPrevious();
  };

  //Logica que envia a la pagina anterior
  const handleNext = () => {
    onNext();
  };

  //Enviar variables y metodos al contexto
  return (
    <ProductsContext.Provider
      value={{
        ProductList,
        user,
        //handleFrmInputLogin,
        sweetAlert,
        products,
        open,
        handleClickOpen,
        handleClose,
        handleProductInput,
        productInput,
        setProductInput,
        postProducts,
        getProduct,
        typeModal,
        setTypeModal,
        putProduct,
        deleteProduct,
        search,
        handleSearchChange,
        username,
        password,
        setUsername,
        setPassword,
        setLocalStorage,
        setLocalStorage2,
        handlePrevious,
        handleNext,
        info,
        onPrevious,
        onNext,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
export default ProductsContext;
