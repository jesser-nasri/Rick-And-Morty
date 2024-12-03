import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../apis/rickAndMorty";
import Card from "../components/Card";
import Search from "../components/Search";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import DarkModeToggle from "../components/DarkModeToggle";
import { CircularProgress } from "@mui/material";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [allCharacters, setAllCharacters] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [speciesFilter, setSpeciesFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");

  useEffect(() => {
    const loadCurrentPage = async () => {
      setLoading(true);
      try {
        const response = await fetchCharacters(currentPage);
        setCharacters(response.results);
        setTotalPages(response.info.pages);
      } catch (error) {
        console.error("Error loading characters:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentPage();
  }, [currentPage]);

  useEffect(() => {
    const loadAllCharacters = async () => {
      try {
        let allChars: any[] = [];
        let page = 1;
        let morePages = true;

        while (morePages) {
          const response = await fetchCharacters(page);
          allChars = [...allChars, ...response.results];
          page++;
          if (!response.info.next) {
            morePages = false;
          }
        }
        setAllCharacters(allChars);
      } catch (error) {
        console.error("Error loading all characters:", error);
      }
    };

    loadAllCharacters();
  }, []);

  useEffect(() => {
    let filtered = allCharacters;

    if (searchQuery) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (character) => character.status === statusFilter
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter(
        (character) => character.species === speciesFilter
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(
        (character) => character.gender === genderFilter
      );
    }

    setFilteredCharacters(filtered.slice(0, 10));
  }, [
    searchQuery,
    statusFilter,
    speciesFilter,
    genderFilter,
    characters,
    allCharacters,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSpeciesFilter("");
    setGenderFilter("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <CircularProgress size={100} />
      </div>
    );
  }

  const displayedCharacters =
    searchQuery || statusFilter || speciesFilter || genderFilter
      ? filteredCharacters
      : characters;

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex-1 text-center">
          Rick and Morty Characters...
        </h1>
        <DarkModeToggle />
      </div>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        resetFilters={resetFilters}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mx-auto">
        {displayedCharacters.map((character: any) => (
          <Card
            key={character.id}
            id={character.id}
            image={character.image}
            name={character.name}
            status={character.status}
            location={character.location.name}
          />
        ))}
      </div>

      {!searchQuery && !statusFilter && !speciesFilter && !genderFilter && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
