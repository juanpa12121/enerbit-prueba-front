import useProducts from "../hooks/useProducts"

const Pagination = () => {
    const {handlePrevious, handleNext, info} = useProducts();
  return (
    <div className="container">
        <div className="pagination mb-20 mt-5">
        <ul>
            {
              info.url_prev ?
              <li>
                  <button className="btn-primary" onClick={handlePrevious} >Previous</button>
              </li>
              :
              ""
            }
            {
              info.url_next ?
              <li>
                  <button className="btn-primary" onClick={handleNext} >Next</button>
              </li>
              :
              ""
            }
          </ul>
        </div>

    </div>
  )
}

export default Pagination