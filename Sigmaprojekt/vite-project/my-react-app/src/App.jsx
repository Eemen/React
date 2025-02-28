import { useState } from 'react'
import Header from './components/Header/Header'
import MovieSlider from './components/MovieSlider/MovieSlider'
import SearchResults from './components/SearchResults/SearchResults'
import './App.css'

function App() {
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const apiKey = "5206816f" // Replace with your actual API key

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

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      
      {showSearchResults ? (
        <SearchResults results={searchResults} />
      ) : (
        <MovieSlider />
      )}
    </div>
  )
}

export default App
