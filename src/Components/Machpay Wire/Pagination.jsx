import ReactPaginate from 'react-paginate'

function Pagination({ click, pages }) {
    return (
        <>
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={click}
                containerClassName="container-style"
                pageClassName="page-style"
                previousClassName="previous-style"
                nextClassName="next-style"
                disabledClassName="inactivepage-style"
                activeClassName="activepage-style"
                breakClassName='page-style' />
        </>)
}

export default Pagination