import { useNavigate } from "react-router-dom"
import useProducts from "../hooks/useProducts";

const LoginPage = () => {
  const {user, handleFrmInputLogin, sweetAlert, username, password,  setLocalStorage, setLocalStorage2} = useProducts();
  const navigate = useNavigate();
  //Metodo para validar ir hacia la pagina de Inventario
  const handleInventoryPage = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      sweetAlert("error", "Error!", "Ambos campos son obligatorios", true);
      return;
    } else if (username !== "admin" || password !== "admin") {
      sweetAlert("error", "Error!", "Usuario no encontrado", true);
      return;
    }
    navigate("/inventory", { replace: true });
  };

  return (
    <div className="flex alto items-center gap-x-6">
    <div className="container mt-32 h-1/2 flex flex-col justify-center items-center bg-purple-900">
      <h1 className="text-white mb-20 text-center">Login</h1>
      <form className="container">
        <h2 className="text-gray-300 mb-3">Username</h2>
        <div className="relative z-0 mb-6 w-full group">
          <input 
            type="text" 
            className="peer" 
            placeholder=" "
            name="username"
            value={username}
            onChange={setLocalStorage}
            >
          </input>
          <label>Usuario</label>
        </div>
        <h2 className="text-gray-300 mb-3">Password</h2>
        <div className="relative z-0 mb-6 w-full group">
          <input 
            type="password" 
            className="peer" 
            placeholder=" "
            name="password"
            value={password}
            onChange={setLocalStorage2}
            >
          </input>
          <label >Password</label>
        </div>
        <button
        onClick={handleInventoryPage}
        type="submit" 
        className="btn-primary w-100">Ingresar</button>
      </form>
    </div>
      <div className="bg-login sm:block mt-40 h-4/5" alt="bg-login"></div>
  </div>
  );
};

export default LoginPage;