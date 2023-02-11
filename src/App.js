import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Config } from './Config';
import { useState, useEffect } from 'react';
import axios from 'axios'


function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState([])
  const [currentPage, setCurrectPage] = useState()
  const perpage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const start = perpage * 0;
        const end = start + perpage;
        const pagination = await axios.get(`${Config.api}/getdata`)
        setData(pagination.data)
        console.log(pagination.data)
        setPage(pagination.data.slice(start, end))
      } catch (error) {
        alert("something went wrong")
      }
    }
    fetchData()
  }, [])

  const paginate = async (index) => {
    try {
      const start = perpage * index;
      const end = start + perpage;
      const paginate = await axios.get(`${Config.api}/getdata`)
      setPage(paginate.data.slice(start, end))
      setCurrectPage(index)
    } catch (error) {
      alert("something went wronf")
    }
  }

  const prev = () => {
    if (currentPage !== 0) {
      paginate(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage !== (Math.ceil(data.length / perpage)) - 1) {
      paginate(currentPage + 1)
    }
  }

  const buttonlist = Math.ceil(data.length / perpage)
  console.log(buttonlist)
  
  return (
    <>

      <div className="container">
        <div className='row'>
          <div className='col-lg-12'>
            <h3 className='text-center my-5'>Pagination</h3>
          </div>
          <div className="col-lg-12">
            <table class="table  py-10">

              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>

              <tbody>
                {
                  page.map(dt => {
                    return (
                      <tr>
                        <td>{dt._id}</td>
                        <td>{dt.name}</td>
                        <td>{dt.age}</td>
                      </tr>
                    )
                  })
                }
              </tbody>

            </table>

            <nav aria-label="Page navigation example">
              <ul class="pagination">

                <li class="page-item">
                  <button class="page-link" onClick={prev}>
                    Previous
                  </button>
                </li>

                {
                  data.length > 5 ?
                    [...Array(buttonlist)].map((page, index) => {
                      return (
                        <li class="page-item">
                    {index  < 5 ?
                         <button class={`page-link ${currentPage === index ? 'active' : null}`} onClick={() => paginate(index)}>
                            {index + 1}
                          </button>:<button class={`page-link ${currentPage === index ? 'active' : null}`} style ={{display:"none"}}onClick={() => paginate(index)}>
                            {index + 1}
                          </button>
                    }
                        </li>
                      )
                    })
                    : null
                }

                <li class="page-item">
                  <button class="page-link" onClick={next}>
                    Next
                  </button>
                </li>

              </ul>
            </nav>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
