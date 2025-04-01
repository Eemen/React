import './MovieBanner.css'

function MovieBanner({ movie }) {
  if (!movie) return null

  return (
    <>
      <div className="banner-black-overlay"></div>
      <div className="movie-banner">
        <div className="banner-image">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="banner-info">
          <h2>{movie.Title}</h2>
          <p className="genre">{movie.Genre}</p>
          <button className="watch-btn">
            Watch Now
          </button>
        </div>
      </div>
    </>
  )
}

export default MovieBanner 