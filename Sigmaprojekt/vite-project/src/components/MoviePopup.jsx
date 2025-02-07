import React from 'react';

const MoviePopup = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div id="movie-popup" className="popup fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[2000]">
            <div className="popup-content bg-[#333] p-5 rounded-[10px] w-[80%] max-w-[600px] text-white relative text-left">
                <span className="close-btn absolute top-2.5 right-2.5 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 id="popup-title">{movie.Title}</h2>
                <p><strong>Year:</strong> <span id="popup-year">{movie.Year}</span></p>
                <p><strong>Rated:</strong> <span id="popup-rated">{movie.Rated}</span></p>
                <p><strong>Released:</strong> <span id="popup-released">{movie.Released}</span></p>
                <p><strong>Runtime:</strong> <span id="popup-runtime">{movie.Runtime}</span></p>
                <p><strong>Genre:</strong> <span id="popup-genre">{movie.Genre}</span></p>
                <p><strong>Director:</strong> <span id="popup-director">{movie.Director}</span></p>
                <p><strong>Writer:</strong> <span id="popup-writer">{movie.Writer}</span></p>
                <p><strong>Actors:</strong> <span id="popup-actors">{movie.Actors}</span></p>
                <p><strong>Plot:</strong> <span id="popup-plot">{movie.Plot}</span></p>
                <p><strong>IMDb Rating:</strong> <span id="popup-imdbRating">{movie.imdbRating}</span></p>
                <img id="popup-poster" src={movie.Poster} alt="Movie Poster" className="w-[20%] h-auto mt-2.5 rounded-[5px]" />
            </div>
        </div>
    );
};

export default MoviePopup;