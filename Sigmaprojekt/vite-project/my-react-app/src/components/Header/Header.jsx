import { useState } from 'react'
import './Header.css'
import Logo from '../../assets/Logo.png'

function Header({ onSearch }) {
  const [searchInput, setSearchInput] = useState('')

  const handleSearchClick = () => {
    onSearch(searchInput)
  }

  return (
    <div id="content-wrapper">
      <div id="header-wrapper">
        <div id="img-wrapper">
          <img src={Logo} alt="WolfFlix" />
        </div>

        <div id="search-wrapper">
          <input
            type="text"
            id="search"
            placeholder="Search in WolfFlix"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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