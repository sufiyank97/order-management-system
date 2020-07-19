import React, { useState } from 'react'
import FileUpload from './components/FileUpload'
import Table from './components/Table'
import Pagination from './components/Pagination'

const App = () => {
    const [state, setState] = useState({ data: [], filteredData: [] })
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(15)
    const handleData = (data) => {
        setState({ ...state, data, filteredData: data })
    }


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = state.data.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (number) => setCurrentPage(number)

    return (
        <>
            <header style={{ position: "sticky", top: '0em', background: 'white' }}>
                <div className="d-flex justify-content-center py-2">
                    <h2>Order Management </h2>
                </div>
            </header>
            <div className="d-flex justify-content-center py-2">
                <div>
                    <FileUpload handleData={handleData} />
                </div>
            </div>

            {state.data.length > 0 ?
                (
                    <div className="container">
                        show <select onChange={(e) => { setPostsPerPage(Number(e.target.value)); setCurrentPage(1) }}>
                            <option value="15">Select</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> Entries
                        <Table jsonData={currentPosts} />
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={state.data.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                )
                : null}

        </>
    )
}

export default App
