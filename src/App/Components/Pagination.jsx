import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ totalPages = 1, maxVisiblePages = 5, currentPage, setCurrentPage}) {

  const next = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPages = () => {
    let pages = [];
    let half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const getItemClass = (page, isActive) =>
    `min-w-[36px] h-9 flex items-center justify-center rounded-md transition 
     ${
       isActive
         ? "bg-[rgb(67,94,72)] text-white font-semibold shadow-md"
         : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
     }`;

  const pages = getPages();

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      {/* Prev Button */}
      <button
        onClick={prev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-3 py-2 rounded-md 
                  bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
                  dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
      >
        <FaChevronLeft className="h-4 w-4" /> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(Number(page))}
              className={getItemClass(page, page === currentPage)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={next}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-3 py-2 rounded-md 
                  bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
                  dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
      >
        Next <FaChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
