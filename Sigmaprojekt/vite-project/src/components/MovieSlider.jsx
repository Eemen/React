import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieSlider = ({ genre, sliderId }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const apiKey = "5206816f";

    useEffect(() => {
        const fetchGenreMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(genre)}&type=movie`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Netzwerkfehler');
                const data = await response.json();
                
                if (data.Response === "True" && data.Search) {
                    setMovies(data.Search.filter(movie => movie.Poster !== "N/A"));
                } else {
                    throw new Error(data.Error || 'Keine Filme gefunden');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenreMovies();
    }, [genre]);

    const handleMovieClick = (imdbID) => {
        navigate(`/info/${imdbID}`);
    };

    if (isLoading) return <div className="loading-spinner">Laden...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold mb-4 px-5 capitalize">{genre} Filme</h2>
            <div id={sliderId} className="movie-slider relative">
                <div className="flex overflow-x-auto scroll-smooth p-5 scrollbar-hide">
                    {movies.map((movie) => (
                        <div 
                            key={movie.imdbID} 
                            className="movie-item flex-shrink-0 cursor-pointer group"
                            onClick={() => handleMovieClick(movie.imdbID)}
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-[200px] h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="font-semibold">{movie.Title}</p>
                                        <p className="text-sm">{movie.Year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSlider;