import {v4 as uuidv4} from 'uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useProducts from '../hooks/useProducts';

const ProductList = () => {
  const {products, open, handleClose, handleProductInput, productInput, postProducts, getProduct, putProduct, typeModal, setTypeModal, deleteProduct, search } = useProducts();
  
  const seeProduct = (e, product) =>{
    e.preventDefault();
    setTypeModal("read");
    getProduct(product);
  }

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Options
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl ">
                          Id
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl ">
                          Serial
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                        connection_type"
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                        storage_system
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Condition
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Owner
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Location
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Manufacturer
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Purchase
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          i_max
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          i_b
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          i_n
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          Seals
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          created_at
                      </th>
                      <th scope="col" className="py-3 px-6 text-center text-xl">
                          updated_at
                      </th>
                  </tr>
              </thead>
              <tbody>
                {
                  products
                  .filter((product)=>product.serial.includes(search))
                  .map((product) => (
                    
                    <tr key={uuidv4()} className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                      <th className='px-8'>
                        <div className="product_edit_delete flex-col sm:flex-row">
                        <button onClick={(e)=>seeProduct(e,product)} className='btn-secondary w-full sm:w-auto bg-purple-700'>
                          Watch
                        </button>
                        <button onClick={(e)=>{e.preventDefault(); setTypeModal("edit"); getProduct(product)}}  className='btn-primary w-full sm:w-auto'>
                            <FaEdit  className='m-auto' />
                        </button>
                        <button onClick={(e)=>{e.preventDefault(); deleteProduct(product.id)}} className='btn-secondary w-full sm:w-auto'>
                          <FaTrash className='m-auto'/>
                        </button>

                        </div>
                      </th>
                      <th className='py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white' >
                        {product.id}
                      </th>
                      <td className='py-4 px-6 text-lg'>{product.serial}</td>
                      <td className='py-4 px-6 text-lg'>{product.connection_type}</td>
                      <td className='py-4 px-6 text-lg'>{product.storage_system}</td>
                      <td className='py-4 px-6 text-lg'>{product.condition}</td>
                      <td className='py-4 px-6 text-lg'>{product.owner}</td>
                      <td className='py-4 px-6 text-lg'>{product.location}</td>
                      <td className='py-4 px-6 text-lg'>{product.manufacturer}</td>
                      <td className='py-4 px-6 text-lg'>{product.purchase}</td>
                      <td className='py-4 px-6 text-lg'>{product.i_max}</td>
                      <td className='py-4 px-6 text-lg'>{product.i_b}</td>
                      <td className='py-4 px-6 text-lg'>{product.i_n}</td>
                      <td className='py-4 px-6 text-lg'>{product.seals}</td>
                      <td className='py-4 px-6 text-lg'>{product.created_at}</td>
                      <td className='py-4 px-6 text-lg'>{product.updated_at}</td>
                    </tr>  
                  ))
                }

              </tbody>
          </table>

      <div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{typeModal === "edit" ? "UPDATE PRODUCT" : typeModal === "read" ? "SEE PRODUCT" : "CREATE PRODUCT"}</DialogTitle>
          <DialogContent>
            <DialogContentText className='mb-5'>
              Ingrese los datos
            </DialogContentText>
            
            {/* Inputs */}
            <div className='grid grid-cols-2 gap-2'>
            <div className="relative z-0 mb-6 w-full group">
              <label>ID</label>
                <input
                  readOnly
                  placeholder='--ReadOnly--'
                  type="number" 
                  className="peer text-black" 
                  name="id"
                  onChange={handleProductInput}
                  value={productInput ? productInput.id : ""}
                  >
                </input>
              </div>
              <div className="relative z-0 mb-6 w-full group">
              <label>Serial</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="number" 
                  className="peer text-black" 
                  placeholder="Float"
                  name="serial"
                  onChange={handleProductInput}
                  value={productInput ? productInput.serial : ""}
                  >
                </input>
              </div>
              <div className="relative z-0 mb-6 w-full group">
              <label>Connection_type</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="directa, semi-directa, indirecta"
                  name="connection_type"
                  onChange={handleProductInput}
                  value={productInput ? productInput.connection_type : ""}
                  >
                </input>
              </div>
              <div className="relative z-0 mb-6 w-full group">
              <label>Storage_system</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="interno, externo"
                  name="storage_system"
                  onChange={handleProductInput}
                  value={productInput ? productInput.storage_system : ""}
                  >
                </input>
              </div>
              <div className="relative z-0 mb-6 w-full group">
              <label>Condition</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="nuevo, usado"
                  name="condition"
                  onChange={handleProductInput}
                  value={productInput ? productInput.condition : ""}
                  >
                </input>
              </div>
              <div className="relative z-0 mb-6 w-full group">
              <label>Owner</label>
                <input
                readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="RF, OR"
                  name="owner"
                  onChange={handleProductInput}
                  value={productInput ? productInput.owner : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Location</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="Location"
                  name="location"
                  onChange={handleProductInput}
                  value={productInput ? productInput.location : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Manufacturer</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="yes, no"
                  name="manufacturer"
                  onChange={handleProductInput}
                  value={productInput ? productInput.manufacturer : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Purchase</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="AAAA-MM-DD hh:mm:ss"
                  name="purchase"
                  onChange={handleProductInput}
                  value={productInput ? productInput.purchase : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>I_max</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="number" step={0.001}
                  className="peer text-black" 
                  placeholder="Float"
                  name="i_max"
                  onChange={handleProductInput}
                  value={productInput ? productInput.i_max : ""}
                  >
                </input>
              </div>


              <div className="relative z-0 mb-6 w-full group">
              <label>I_b</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="number" step={0.1}
                  className="peer text-black" 
                  placeholder="Float"
                  name="i_b"
                  onChange={handleProductInput}
                  value={productInput ? productInput.i_b : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>I_n</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="number" step={0.1}
                  className="peer text-black" 
                  placeholder="Float"
                  name="i_n"
                  onChange={handleProductInput}
                  value={productInput ? productInput.i_n : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Seals</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="number" 
                  className="peer text-black" 
                  placeholder="Float"
                  name="seals"
                  onChange={handleProductInput}
                  value={productInput ? productInput.seals : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Created_At</label>
                <input
                  readOnly
                  type="text" 
                  className="peer text-black" 
                  placeholder="ReadOnly"
                  name="created_at"
                  onChange={handleProductInput}
                  value={productInput ? productInput.created_at : ""}
                  >
                </input>
              </div>

              <div className="relative z-0 mb-6 w-full group">
              <label>Updated_At</label>
                <input
                  readOnly={typeModal !== "read" ? false : true}
                  type="text" 
                  className="peer text-black" 
                  placeholder="ReadOnly"
                  name="updated_at"
                  onChange={handleProductInput}
                  value={productInput.updated_at && productInput ? productInput.updated_at : ""}
                  >
                </input>
              </div>

            </div> 


          </DialogContent>
          <DialogActions>
            {

            }
            <button className='btn-secondary' onClick={handleClose}>Cancel</button>
            {
              typeModal === "create" ?
              <button className='btn-primary' onClick={postProducts}>Create</button>
              : typeModal === "edit" ?
              <button className='btn-primary' onClick={putProduct}>Update</button>
              : ""
            }

          </DialogActions>
        </Dialog>
      </div>

      </div>
    </>

  )
}

export default ProductList