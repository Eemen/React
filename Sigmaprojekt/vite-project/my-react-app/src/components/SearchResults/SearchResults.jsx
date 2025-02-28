import { useState, useEffect } from 'react'
import './SearchResults.css'

function SearchResults({ results }) {
  const [movieResults, setMovieResults] = useState([])
  
  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  return (
    <div id="movie-search-wrapper">
      <h2>Search Results</h2>
      <div id="movie-display-area">
        {results.map((movie) => (
          <div key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <p>{truncateTitle(movie.Title)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults 