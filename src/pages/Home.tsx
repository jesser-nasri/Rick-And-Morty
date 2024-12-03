import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../apis/rickAndMorty"; // Import the API function
import Card from "../components/Card"; // Import the Card component
import Search from "../components/Search"; // Import the Search component
import Filters from "../components/Filters"; // Import the Filters component
import Pagination from "../components/Pagination"; // Import the Pagination component
import DarkModeToggle from "../components/DarkModeToggle"; // Import the DarkModeToggle component

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [allCharacters, setAllCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [charactersPerPage] = useState<number>(20);

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
      filtered = filtered.filter((character) => character.status === statusFilter);
    }

    if (speciesFilter) {
      filtered = filtered.filter((character) => character.species === speciesFilter);
    }

    if (genderFilter) {
      filtered = filtered.filter((character) => character.gender === genderFilter);
    }

    setFilteredCharacters(filtered.slice(0, 10));
  }, [searchQuery, statusFilter, speciesFilter, genderFilter, allCharacters]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSpeciesFilter("");
    setGenderFilter("");
  };

  if (loading) return <div>Loading...</div>;

  const displayedCharacters = searchQuery || statusFilter || speciesFilter || genderFilter
    ? filteredCharacters
    : characters;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold text-center">Rick and Morty Characters...</h1>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
