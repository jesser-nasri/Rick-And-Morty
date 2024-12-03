import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { fetchCharacterDetails } from "../apis/rickAndMorty";
import { CircularProgress } from "@mui/material";

const CardDetails: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadCharacterDetails = async () => {
      if (id) {
        try {
          const characterData = await fetchCharacterDetails(Number(id));
          setCharacter(characterData);
        } catch (error) {
          console.error("Error loading character details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCharacterDetails();
  }, [id]);

  if (loading)
    return (
      <div
        className="flex items-center justify-center"
        style={{ height:"100vh" ,backgroundColor: "#f0f0f0" }}
      >
        <CircularProgress size={100} />
      </div>
    );
  if (!character)
    return <div className="text-center p-10 text-xl">No character found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-gray-700 hover:text-blue-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>

      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Character Details
      </h1>

      {/* Character details container with refined styling */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-2xl space-y-8 text-center">
        {/* Character image */}
        <div className="flex justify-center">
          <img
            src={character.image}
            alt={character.name}
            className="w-64 h-64 object-cover rounded-full border-4 border-gray-500 shadow-lg mb-6"
          />
        </div>

        {/* Character name */}
        <h2 className="text-4xl font-semibold text-gray-900">
          {character.name}
        </h2>

        {/* Character details */}
        <div className="space-y-6 text-lg text-gray-700 mt-6">
          <p>
            <span className="font-semibold text-gray-900">Status: </span>
            <span className={`text-${statusClass(character.status)}`}>
              {character.status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Location: </span>
            <span className="text-blue-600">{character.location.name}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-900">Species: </span>{" "}
            {character.species}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Gender: </span>{" "}
            {character.gender}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Origin: </span>{" "}
            {character.origin.name}
          </p>
          <p>
            <span className="font-semibold text-gray-900">First Seen In: </span>{" "}
            {character.episode.length} episode(s)
          </p>
        </div>

        {/* Episodes List */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Episodes:
          </h3>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            {character.episode.map((episodeUrl: string, index: number) => (
              <li
                key={index}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Episode: {episodeUrl.split("/").pop()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const statusClass = (characterStatus: string) => {
  if (characterStatus === "Alive") return "green-600";
  if (characterStatus === "Dead") return "red-600";
  return "gray-600";
};

export default CardDetails;
