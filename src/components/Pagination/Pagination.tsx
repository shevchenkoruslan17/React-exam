import "./Pagination.css";
interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
const Pagination = ({page, totalPages, onPageChange,}:PaginationProps)=> {
    return (
        <div className="pagination">
            <button type="button" disabled={page <= 1} onClick={()=> onPageChange(page - 1)}>
                Previous
            </button>
            <span>
                Page {page} of {totalPages}
            </span>
            <button type="button" disabled={page >= totalPages} onClick={()=> onPageChange(page + 1)}>
                Next
            </button>
        </div>
    )
}
export default Pagination;