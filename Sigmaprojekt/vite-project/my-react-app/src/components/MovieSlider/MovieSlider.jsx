import { useEffect, useState } from 'react'
import './MovieSlider.css'

function MovieSlider({ onMovieSelect, onMovieClick }) {
  const [movies, setMovies] = useState({
    action: [],
    drama: [],
    comedy: [],
    horror: []
  })
  
  const apiKey = "5206816f"

  const fetchGenreMovies = async (genre) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`
      )
      const data = await response.json()
      
      if (data.Response === "True" && data.Search) {
        return data.Search.filter(movie => movie.Poster !== "N/A")
      }
      return []
    } catch (error) {
      console.error(`Error fetching ${genre} movies:`, error)
      return []
    }
  }

  useEffect(() => {
    const loadMovies = async () => {
      const genres = ['action', 'drama', 'comedy', 'horror']
      const movieData = {}
      
      for (const genre of genres) {
        movieData[genre] = await fetchGenreMovies(genre)
      }
      
      setMovies(movieData)
    }

    loadMovies()
  }, [])

  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  return (
    <div id="movie-slider-wrapper">
      <h2>Genres</h2>
      {Object.entries(movies).map(([genre, movieList]) => (
        <div key={genre} id={`${genre}-slider`} className="movie-slider">
          {movieList.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                onClick={() => onMovieClick(movie)}
                onDoubleClick={() => onMovieSelect(movie.imdbID)}
              />
              <p>{truncateTitle(movie.Title)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MovieSlider 