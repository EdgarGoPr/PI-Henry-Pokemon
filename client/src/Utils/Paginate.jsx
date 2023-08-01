import React from "react";

const PaginationButtons = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
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
      <button
        key={"<<<"}
        className={"<<<" === currentPage ? "active" : ""}
        onClick={handleFirstPage}
        disabled={currentPage === 0}
      >
        {"<<<"}
      </button>
      <button
        key={"<"}
        className={"<" === currentPage ? "active" : ""}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        key={">"}
        className={">" === currentPage ? "active" : ""}
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >{">"}</button>
      <button
        key={">>>"}
        className={">>>" === currentPage ? "active" : ""}
        onClick={handleLastPage}
        disabled={currentPage === totalPages - 1}
      >
        {">>>"}
      </button>
    </div>
  );
};

export default PaginationButtons;
