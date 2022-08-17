import { FaEdit, FaTrash } from 'react-icons/fa';
const ProductList = () => {
  return (
    <div className="container mt-20 mb-20">
      <h1 className='text-white text-center my-20'>Productos</h1>
        <li className="product flex-col sm:flex-row gap-1 items-center">
            <div className="product_name">
                <h3 className='text-white'>Producto x</h3>
            </div>
            <div className="product_edit_delete flex-col sm:flex-row">
                <button className='btn-primary w-full sm:w-auto'>
                    <FaEdit className='m-auto' />
                </button>
                <button className='btn-secondary w-full sm:w-auto'>
                  <FaTrash className='m-auto'/>
                </button>
            </div>
        </li>
        <li className="product flex-col sm:flex-row gap-1 items-center">
            <div className="product_name">
                <h3 className='text-white'>Producto x</h3>
            </div>
            <div className="product_edit_delete flex-col sm:flex-row">
                <button className='btn-primary w-full sm:w-auto'>
                    <FaEdit className='m-auto' />
                </button>
                <button className='btn-secondary w-full sm:w-auto'>
                  <FaTrash className='m-auto'/>
                </button>
            </div>
        </li>
    </div>
  )
}

export default ProductList