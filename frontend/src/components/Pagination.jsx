import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    if (rangeEnd < totalPages - 1) {
      pages.push('...');
    }
    
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-8 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md transition-colors duration-200 flex items-center justify-center
          ${currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pageNumbers?.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500 dark:text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200
              ${currentPage === page
                ? 'bg-indigo-600 text-white font-medium'
                : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md transition-colors duration-200 flex items-center justify-center
          ${currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;