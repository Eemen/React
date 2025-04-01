import { useState } from 'react'
import Header from './components/Header/Header'
import MovieSlider from './components/MovieSlider/MovieSlider'
import SearchResults from './components/SearchResults/SearchResults'
import MoviePopup from './components/MoviePopup/MoviePopup'
import MovieBanner from './components/MovieBanner/MovieBanner'
import './App.css'

function App() {
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [currentSearchTerm, setCurrentSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [bannerMovie, setBannerMovie] = useState(null)
  const apiKey = "5206816f" // Replace with your actual API key

  const handleReturnHome = () => {
    setShowSearchResults(false)
    setSearchResults([])
    setCurrentSearchTerm("")
    setTotalResults(0)
    setCurrentPage(1)
    setBannerMovie(null)
  }

  const fetchMovies = async (searchTerm, page = 1) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=${page}`
      )
      const data = await response.json()
      
      if (data.Response === "True") {
        const filteredMovies = data.Search.filter(movie => movie.Poster !== "N/A")
        setTotalResults(parseInt(data.totalResults))
        return filteredMovies
      }
      return []
    } catch (error) {
      console.error("Error fetching search results:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMovieDetails = async (imdbID, forBanner = false) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
      )
      const data = await response.json()
      if (data.Response === "True") {
        if (forBanner) {
          setBannerMovie(data)
        } else {
          setSelectedMovie(data)
        }
      }
    } catch (error) {
      console.error("Error fetching movie details:", error)
    }
  }

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      setCurrentSearchTerm(searchTerm)
      setCurrentPage(1)
      const newResults = await fetchMovies(searchTerm, 1)
      setSearchResults(newResults)
      setShowSearchResults(true)
      setBannerMovie(null)
    } else {
      setShowSearchResults(false)
      setSearchResults([])
      setCurrentSearchTerm("")
      setTotalResults(0)
    }
  }

  const loadMoreMovies = async () => {
    if (isLoading || !currentSearchTerm) return
    const nextPage = currentPage + 1
    const moreMovies = await fetchMovies(currentSearchTerm, nextPage)
    if (moreMovies.length > 0) {
      setSearchResults(prev => [...prev, ...moreMovies])
      setCurrentPage(nextPage)
    }
  }

  const handleMovieSelect = (imdbID) => {
    fetchMovieDetails(imdbID)
  }

  const handleMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID, true)
  }

  const handleClosePopup = () => {
    setSelectedMovie(null)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} onLogoClick={handleReturnHome} />
      
      {!showSearchResults && bannerMovie && (
        <MovieBanner movie={bannerMovie} />
      )}
      
      {showSearchResults ? (
        <SearchResults 
          results={searchResults} 
          isLoading={isLoading}
          hasMore={searchResults.length < totalResults}
          onLoadMore={loadMoreMovies}
          onMovieSelect={handleMovieSelect}
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
          onClose={handleClosePopup}
        />
      )}
    </div>
  )
}

export default App
