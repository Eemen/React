import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieInfo = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const apiKey = "5206816f";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (data.Response === "True") {
                setMovie(data);
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    if (!movie) return null;

    return (
        <div id="freakyblock" className="w-screen h-screen overflow-hidden">
            <img src="/public/Logo.png" alt="logo" />
            <div id="movie-info" className="w-screen h-screen overflow-hidden flex">
                <div id="wrapper-info" className="w-[50%] bg-black bg-opacity-80">
                    <div id="poster" className="relative">
                        <div className="absolute top-0 left-0 right-0 bottom-0 w-[50vw] bg-gradient-to-b from-black to-transparent bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                        <img src={movie.Poster} alt={movie.Title} className="w-full h-auto block" />
                    </div>
                </div>
                <div id="details" className="w-[50%] p-[100px] mt-[-100px]">
                    <h1>{movie.Title}</h1>
                    <p><strong>Year:</strong> {movie.Year}</p>
                    <p><strong>Rated:</strong> {movie.Rated}</p>
                    <p><strong>Released:</strong> {movie.Released}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Writer:</strong> {movie.Writer}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Language:</strong> {movie.Language}</p>
                    <p><strong>Country:</strong> {movie.Country}</p>
                    <p><strong>Awards:</strong> {movie.Awards}</p>
                    <p><strong>Ratings:</strong> {movie.Ratings.map(rating => `${rating.Source}: ${rating.Value}`).join(", ")}</p>
                    <p><strong>Metascore:</strong> {movie.Metascore}</p>
                    <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>IMDb Votes:</strong> {movie.imdbVotes}</p>
                    <p><strong>BoxOffice:</strong> {movie.BoxOffice}</p>
                </div>
            </div>
            <div id="floating-btn" className="fixed bottom-5 right-5 p-[10px_20px] bg-black text-white border-none rounded-[5px] cursor-pointer z-[1000]">
                <a href="/">Go Back</a>
            </div>
        </div>
    );
};

export default MovieInfo;