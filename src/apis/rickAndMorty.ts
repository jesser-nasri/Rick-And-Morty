
const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${API_BASE_URL}/character`,
  locations: `${API_BASE_URL}/location`,
  episodes: `${API_BASE_URL}/episode`,
};

export const fetchCharacters = async (page: number = 1) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  return data; 
};

export const fetchCharacterDetails = async (id: number) => {
  try {
    const response = await fetch(`${endpoints.characters}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character details');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error; 
  }
};

export const fetchLocations = async () => {
  try {
    const response = await fetch(endpoints.locations);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

export const fetchEpisodes = async () => {
  try {
    const response = await fetch(endpoints.episodes);
    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};
