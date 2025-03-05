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

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      
      <div className="hero-section">
        {selectedMovie && (
          <>
            <div className="hero-content">
              <h1 className="hero-title">{selectedMovie.Title}</h1>
              <div className="hero-genres">
                <p>Genres</p>
                <p>{selectedMovie.Genre}</p>
              </div>
              <button className="watch-now">Watch now</button>
            </div>
            <img 
              className="hero-image" 
              src={selectedMovie.Poster} 
              alt={selectedMovie.Title} 
            />
          </>
        )}
      </div>
      
      {showSearchResults ? (
        <SearchResults results={searchResults} onMovieSelect={handleMovieSelect} />
      ) : (
        <MovieSlider onMovieSelect={handleMovieSelect} />
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
