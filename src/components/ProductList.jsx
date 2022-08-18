import { FaEdit, FaTrash } from 'react-icons/fa';
import useProducts from '../hooks/useProducts';

const ProductList = () => {
  const { products } = useProducts();
  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg py-12">
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
                  products.map((product) => (
                    <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                      <th className='px-8'>
                        <div className="product_edit_delete flex-col sm:flex-row">
                        <button className='btn-primary w-full sm:w-auto'>
                            <FaEdit className='m-auto' />
                        </button>
                        <button className='btn-secondary w-full sm:w-auto'>
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
      </div>
    </>

  )
}

export default ProductList