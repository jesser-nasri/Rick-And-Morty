// src/components/Filters.tsx
import React from "react";

interface FiltersProps {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  speciesFilter: string;
  setSpeciesFilter: React.Dispatch<React.SetStateAction<string>>;
  genderFilter: string;
  setGenderFilter: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
  genderFilter,
  setGenderFilter,
  resetFilters,
}) => {
  return (
    <div className="mb-6 text-center flex justify-center space-x-4">
      <select
        className="p-2 w-64 border border-gray-300 rounded-lg"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Filter by Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        className="p-2 w-64 border border-gray-300 rounded-lg"
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
      >
        <option value="">Filter by Species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Robot">Robot</option>
      </select>

      <select
        className="p-2 w-64 border border-gray-300 rounded-lg"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      >
        <option value="">Filter by Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
      </select>

      {/* Reset Filters Button */}
      <button
        onClick={resetFilters}
        className="p-2 bg-red-500 text-white rounded-lg ml-4"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;