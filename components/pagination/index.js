import { useState } from "react";

export default function Paginations({ totalPages, currentPage, onPageChange }) {
  const [page, setPage] = useState(currentPage);

  const handleClick = (pageNumber) => {
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    let pages = [];

    if (totalPages <= 7) {
      // Hiển thị tất cả các trang nếu tổng số trang <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
    } else {
      // Luôn hiển thị trang 1, 2, 3
      for (let i = 1; i <= 3; i++) {
        pages.push(createPageButton(i));
      }

      // Thêm dấu "..." nếu trang hiện tại > 4
      if (page > 4) {
        pages.push(
          <span key="start-dots" className="mx-2 text-white">
            ...
          </span>
        );
      }

      // Hiển thị trang hiện tại và 2 trang liền kề nó
      for (
        let i = Math.max(4, page - 1);
        i <= Math.min(totalPages - 3, page + 1);
        i++
      ) {
        pages.push(createPageButton(i));
      }

      // Thêm dấu "..." nếu trang hiện tại < totalPages - 3
      if (page < totalPages - 4) {
        pages.push(
          <span key="end-dots" className="mx-2 text-white	">
            ...
          </span>
        );
      }

      // Luôn hiển thị ba trang cuối cùng
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
    }

    return pages;
  };

  const createPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handleClick(pageNumber)}
      className={`px-3 py-1 mx-1 rounded-full ${
        page === pageNumber
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-white	 hover:bg-blue-500 hover:text-white"
      }`}
    >
      {pageNumber}
    </button>
  );

  if (totalPages <= 1) {
    return null; // Không hiển thị nếu chỉ có 1 trang hoặc ít hơn
  }
  return (
    <>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-5 flex-wrap	gap-2	">
          <button
            onClick={() => handleClick(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
            className="px-3 py-1 mx-1 bg-gray-700 text-white	 rounded-full hover:bg-blue-500 hover:text-white"
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            onClick={() =>
              handleClick(page < totalPages ? page + 1 : totalPages)
            }
            disabled={page === totalPages}
            className="px-3 py-1 mx-1 bg-gray-700 text-white	 rounded-full hover:bg-blue-500 hover:text-white"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
