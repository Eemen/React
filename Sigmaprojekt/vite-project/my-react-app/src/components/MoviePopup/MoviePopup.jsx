import './MoviePopup.css'

function MoviePopup({ movie, onClose }) {
  if (!movie) return null

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
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
        <img id="popup-poster" src={movie.Poster} alt={`${movie.Title} Poster`} />
      </div>
    </div>
  )
}

export default MoviePopup 