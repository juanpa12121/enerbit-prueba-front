import useProducts from "../hooks/useProducts"

const Pagination = () => {
    const {handlePrevious, handleNext, info} = useProducts();
  return (
    <div className="container">
        <div className="pagination mb-20 mt-5">
        <ul>
            {
              info.previous_page || info.previous_page === 0 ?
              <li>
                  <button className="btn-primary" onClick={handlePrevious} >Previous</button>
              </li>
              :
              ""
            }
            {
              info.next_page?
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