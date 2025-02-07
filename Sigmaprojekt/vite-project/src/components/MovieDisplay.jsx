import React, { useState } from 'react';

const MovieDisplay = () => {
    const [searchResults, setSearchResults] = useState([]);
    const apiKey = "5206816f";

    const handleSearch = async (query) => {
        const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}&type=movie`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === "True" && data.Search) {
            setSearchResults(data.Search.filter(movie => movie.Poster !== "N/A"));
        }
    };

    return (
        <div id="movie-display-area" className="flex flex-wrap p-5 mt-[450px]">
            {searchResults.map((movie) => (
                <div key={movie.imdbID} className="movie-item flex flex-col items-center mt-2.5">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-[200px] h-[300px] mb-2.5 rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    <p className="text-white text-center">{movie.Title}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieDisplay;