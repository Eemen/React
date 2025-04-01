import { useState } from 'react'
import './Header.css'
import Logo from '../../assets/Logo.png'

function Header({ onSearch, onLogoClick }) {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchClick = () => {
    onSearch(searchInput)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick()
    }
  }

  return (
    <div id="content-wrapper">
      <div id="header-wrapper">
        <div id="img-wrapper" onClick={onLogoClick} role="button" tabIndex={0}>
          <img src={Logo} alt="WolfFlix - Return to home" />
        </div>

        <div id="search-wrapper">
          <input
            type="text"
            id="search"
            placeholder="Search movies..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="search-btn" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header 