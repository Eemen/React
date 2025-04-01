import { useEffect, useState, useRef } from 'react'
import './MovieSlider.css'

function MovieSlider({ onMovieSelect, onMovieClick }) {
  const [movies, setMovies] = useState({
    action: [],
    drama: [],
    comedy: [],
    horror: []
  })
  
  const apiKey = "5206816f"
  const sliderRefs = useRef({})

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

  const scrollSlider = (genre, direction) => {
    const slider = sliderRefs.current[genre]
    if (slider) {
      const scrollAmount = direction === 'left' ? -400 : 400
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleClick = (movie) => {
    onMovieClick(movie.imdbID)
  }

  const handleDoubleClick = (movie) => {
    onMovieSelect(movie.imdbID)
  }

  return (
    <div id="movie-slider-wrapper">
      <h2>Genres</h2>
      {Object.entries(movies).map(([genre, movieList]) => (
        <div key={genre} className="genre-section">
          <h3>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h3>
          <div className="slider-container">
            <button 
              className="scroll-button left"
              onClick={() => scrollSlider(genre, 'left')}
              aria-label={`Scroll ${genre} movies left`}
            >
              ‹
            </button>
            <div 
              ref={el => sliderRefs.current[genre] = el}
              className="movie-slider"
            >
              {movieList.map((movie) => (
                <div 
                  key={movie.imdbID} 
                  className="movie-item"
                  onClick={() => handleClick(movie)}
                  onDoubleClick={() => handleDoubleClick(movie)}
                >
                  <img src={movie.Poster} alt={movie.Title} />
                  <p>{truncateTitle(movie.Title)}</p>
                </div>
              ))}
            </div>
            <button 
              className="scroll-button right"
              onClick={() => scrollSlider(genre, 'right')}
              aria-label={`Scroll ${genre} movies right`}
            >
              ›
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieSlider 