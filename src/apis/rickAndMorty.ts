// src/apis/rickAndMorty.ts

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${API_BASE_URL}/character`,
  locations: `${API_BASE_URL}/location`,
  episodes: `${API_BASE_URL}/episode`,
};

// Fetch characters from the API
export const fetchCharacters = async (page: number = 1) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  return data; // Return the data, including 'results' and 'info'
};

// Fetch character details from the API
export const fetchCharacterDetails = async (id: number) => {
  try {
    const response = await fetch(`${endpoints.characters}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character details');
    }
    const data = await response.json();
    return data; // Return the detailed data for the character
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error; // Re-throw error for handling in the component
  }
};

// Fetch locations from the API
export const fetchLocations = async () => {
  try {
    const response = await fetch(endpoints.locations);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    return data.results; // Return the list of locations
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

// Fetch episodes from the API
export const fetchEpisodes = async () => {
  try {
    const response = await fetch(endpoints.episodes);
    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }
    const data = await response.json();
    return data.results; // Return the list of episodes
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};
