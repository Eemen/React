import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';

const MovieDisplay = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiKey = "5206816f";

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`;
                const response = await fetch(apiUrl);
                
                if (!response.ok) throw new Error('Netzwerkfehler');
                
                const data = await response.json();
                if (data.Response === "True" && data.Search) {
                    setSearchResults(data.Search.filter(movie => movie.Poster !== "N/A"));
                } else {
                    setSearchResults([]);
                    if (query.trim()) setError('Keine Filme gefunden');
                }
            } catch (err) {
                setError(err.message);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        []
    );

    const handleSearch = (event) => {
        const query = event.target.value;
        debouncedSearch(query);
    };

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto mb-8">
                <input
                    type="search"
                    placeholder="Film suchen..."
                    onChange={handleSearch}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-white transition-colors"
                />
            </div>

            {isLoading && (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 my-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map((movie) => (
                    <div 
                        key={movie.imdbID}
                        onClick={() => navigate(`/info/${movie.imdbID}`)}
                        className="group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-bold text-lg">{movie.Title}</h3>
                                    <p className="text-sm">{movie.Year}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDisplay;