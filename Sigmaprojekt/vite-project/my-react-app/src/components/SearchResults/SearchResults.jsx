import { useState, useEffect, useCallback } from 'react'
import './SearchResults.css'

function SearchResults({ results, isLoading, hasMore, onLoadMore, onMovieSelect }) {
  const [movieResults, setMovieResults] = useState([])
  
  const truncateTitle = (title, maxLength = 20) => {
    return title.length > maxLength ? title.substring(0, maxLength) + "..." : title
  }

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return

    const scrollPosition = window.innerHeight + window.scrollY
    const threshold = document.documentElement.scrollHeight - 800 // Load more when 800px from bottom

    if (scrollPosition >= threshold) {
      onLoadMore()
    }
  }, [isLoading, hasMore, onLoadMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleDoubleClick = (movie) => {
    onMovieSelect(movie.imdbID)
  }

  return (
    <div id="movie-search-wrapper">
      <h2>Search Results</h2>
      <div id="movie-display-area">
        {results.map((movie) => (
          <div 
            key={movie.imdbID} 
            className="movie-item"
            onDoubleClick={() => handleDoubleClick(movie)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <p>{truncateTitle(movie.Title)}</p>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="loading-indicator">
          Loading more movies...
        </div>
      )}
    </div>
  )
}

export default SearchResults 