import React, { useEffect, useState } from 'react';

const MovieSlider = ({ genre, sliderId }) => {
    const [movies, setMovies] = useState([]);
    const apiKey = "5206816f";

    useEffect(() => {
        const fetchGenreMovies = async () => {
            const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(genre)}&type=movie`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.Response === "True" && data.Search) {
                setMovies(data.Search.filter(movie => movie.Poster !== "N/A"));
            }
        };

        fetchGenreMovies();
    }, [genre]);

    return (
        <div id={sliderId} className="movie-slider flex overflow-x-auto scroll-smooth p-5">
            {movies.map((movie) => (
                <div key={movie.imdbID} className="movie-item">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-[200px] h-[300px] mr-5 rounded-[10px] transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    <p className="text-white text-center">{movie.Title}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieSlider;