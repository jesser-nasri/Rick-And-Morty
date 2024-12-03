import React, { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const [pageInput, setPageInput] = useState<string>(currentPage.toString());

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = () => {
    const page = parseInt(pageInput);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setPageInput(currentPage.toString()); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
      <button
        onClick={prevPage}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="px-4 py-2 text-center">
        {`Page ${currentPage} of ${totalPages}`}
      </span>

      <button
        onClick={nextPage}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg w-16 sm:w-24 text-center"
        />
        <button
          onClick={goToPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
