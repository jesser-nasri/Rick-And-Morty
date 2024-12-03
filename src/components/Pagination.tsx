// src/components/Pagination.tsx
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
      setPageInput(currentPage.toString()); // Reset to currentPage if invalid input
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={prevPage}
        className="px-4 py-2 bg-gray-700 text-white rounded-l-lg disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 flex items-center">
        {`Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        onClick={nextPage}
        className="px-4 py-2 bg-gray-700 text-white rounded-r-lg disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      {/* Go to page input */}
      <div className="ml-4 flex items-center">
        <input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg w-24"
        />
        <button
          onClick={goToPage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
