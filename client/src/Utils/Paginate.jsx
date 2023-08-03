import React from "react";

const PaginationButtons = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePageCount = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  const showPrevButton = currentPage > 1;
  const showNextButton = currentPage < totalPages;
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="pagination-buttons">
      {showPrevButton && (
        <button
          key={"<<<"}
          className={"<<<" === currentPage ? "active" : ""}
          onClick={handleFirstPage}
          disabled={currentPage === 0}
        >
          {"<<<"}
        </button>
      )}

      {showPrevButton && (
        <button
        key={"<"}
          onClick={handlePreviousPage}
          className={"<" === currentPage ? "active" : ""}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      )}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {showNextButton && (
        <button
        key={">"}
          onClick={handleNextPage}
          className={">" === currentPage ? "active" : ""}
          disabled={currentPage === totalPages - 1}
        >
          {">"}
        </button>
      )}
      {showNextButton && (
        <button
          key={">>>"}
          className={">>>" === currentPage ? "active" : ""}
          onClick={handleLastPage}
          disabled={currentPage === totalPages + 1}
        >
          {">>>"}
        </button>
      )}
    </div>
  );
};

export default PaginationButtons;
