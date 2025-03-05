import { useState } from 'react'
import Header from './components/Header/Header'
import MovieSlider from './components/MovieSlider/MovieSlider'
import SearchResults from './components/SearchResults/SearchResults'
import MoviePopup from './components/MoviePopup/MoviePopup'
import './App.css'

function App() {
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const apiKey = "5206816f"

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`
        )
        const data = await response.json()
        
        if (data.Response === "True" && data.Search) {
          setSearchResults(data.Search.filter(movie => movie.Poster !== "N/A"))
          setShowSearchResults(true)
        }
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    } else {
      setShowSearchResults(false)
      setSearchResults([])
    }
  }

  const handleMovieSelect = async (imdbID) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
      )
      const data = await response.json()
      
      if (data.Response === "True") {
        setSelectedMovie(data)
      }
    } catch (error) {
      console.error("Error fetching movie details:", error)
    }
  }

  const handleMovieClick = (movie) => {
    setFeaturedMovie(movie)
  }

  return (
    <div className="app">
      <div className="hero-section">
        <Header onSearch={handleSearch} />
        
        <div className="api-wrapper">
          <div className="api-content-wrapper">
            <div className="api-content-wrapper-wrapper1">
              <h1 id="display-title">{featuredMovie?.Title || 'Title'}</h1>
            </div>
            <div className="api-content-wrapper-wrapper2">
              <p id="display-genres">Genres</p>
            </div>
            <div className="api-content-wrapper-wrapper3">
              <p id="display-genre-list">{featuredMovie?.Genre || 'Action, mystery'}</p>
            </div>
            <p id="view-description">View Description</p>
            <button className="watch-now-btn">Watch now</button>
          </div>

          <div className="api-img-wrapper">
            {featuredMovie?.Poster && (
              <img id="display-image" src={featuredMovie.Poster} alt={featuredMovie.Title} />
            )}
          </div>
        </div>
      </div>
      
      {showSearchResults ? (
        <SearchResults 
          results={searchResults} 
          onMovieSelect={handleMovieSelect}
          onMovieClick={handleMovieClick} 
        />
      ) : (
        <MovieSlider 
          onMovieSelect={handleMovieSelect}
          onMovieClick={handleMovieClick}
        />
      )}

      {selectedMovie && (
        <MoviePopup 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  )
}

export default App
