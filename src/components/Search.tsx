// src/components/Search.tsx
import React from 'react';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6 text-center">
      <input
        type="text"
        className="p-2 w-64 border border-gray-300 rounded-lg"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
      />
    </div>
  );
};

export default Search;
