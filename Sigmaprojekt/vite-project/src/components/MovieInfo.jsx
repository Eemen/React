import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieInfo = () => {
    const { imdbID } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = "5206816f";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Netzwerkfehler');
                const data = await response.json();
                
                if (data.Response === "True") {
                    setMovie(data);
                } else {
                    throw new Error(data.Error || 'Film nicht gefunden');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button 
                onClick={() => navigate('/')}
                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
                Zurück zur Startseite
            </button>
        </div>
    );

    if (!movie) return null;

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                    <img src="/public/Logo.png" alt="logo" className="h-16" />
                </div>
                
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
                        <img 
                            src={movie.Poster} 
                            alt={movie.Title} 
                            className="w-full h-screen object-cover"
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-16 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.Title}</h1>
                        
                        <div className="flex items-center space-x-4 text-sm">
                            <span className="px-2 py-1 bg-white/20 rounded">{movie.Year}</span>
                            <span className="px-2 py-1 bg-white/20 rounded">{movie.Rated}</span>
                            <span className="px-2 py-1 bg-white/20 rounded">{movie.Runtime}</span>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xl leading-relaxed">{movie.Plot}</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InfoItem label="Genre" value={movie.Genre} />
                                <InfoItem label="Director" value={movie.Director} />
                                <InfoItem label="Cast" value={movie.Actors} />
                                <InfoItem label="IMDb Rating" value={`${movie.imdbRating}/10`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => navigate('/')}
                className="fixed bottom-8 right-8 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
            >
                Zurück zur Startseite
            </button>
        </div>
    );
};

const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-gray-400">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

export default MovieInfo;