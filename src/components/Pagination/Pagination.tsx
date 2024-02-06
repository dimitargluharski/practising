type PaginationProps = {
    totalMatches: number;
    matchesPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination = ({ totalMatches, matchesPerPage, setCurrentPage, currentPage }: PaginationProps) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalMatches / matchesPerPage); i++) {
        pages.push(i);
    };

    return (
        <div className="flex justify-center">
            {pages.map((page, index) => (
                <button key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 mx-1 rounded-md ${page === currentPage ? 'bg-red-500 text-white hover:bg-red-700' : ''}`}>{page}</button>
            ))}
        </div>
    )
}

export default Pagination;