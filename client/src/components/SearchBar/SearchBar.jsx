import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if(searchTerm.trim()){
        navigate(`/search?query=${searchTerm}`);
    } else {
        console.log("invalid search term")
    }
  }
  return (
    <div className='search-bar'>
      <input 
        type="text" 
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key==="Enter" && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar
