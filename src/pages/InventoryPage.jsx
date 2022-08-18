import { Link } from "react-router-dom"
import useProducts from "../hooks/useProducts"

const InventoryPage = () => {

  const {ProductList, user, handleClickOpen, setTypeModal, handleSearchChange, username, password} = useProducts();
  const addProduct = (e) => {
    e.preventDefault();
    setTypeModal("create");
    handleClickOpen();
  }
  return (
    <div className="container mt-52">
      <h1 className="text-white mb-8">Hello <span className="text-gray-400">{username}</span> !</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          
          <Link to="/" className="btn-secondary text-center" >Back</Link>
        
        <button 
          onClick={addProduct} 
          className="btn-primary">
          Create Product
        </button>

        <input 
          className="text-white w-2/6" 
          type="search" 
          placeholder="Search serial"
          onChange={handleSearchChange}
          >
          
        </input>


        </div>
        <ProductList></ProductList>

    </div>
  )
}

export default InventoryPage