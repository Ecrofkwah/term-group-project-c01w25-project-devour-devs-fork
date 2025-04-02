import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
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
    // <div className='search-bar'>
    //   <input 
    //     type="text" 
    //     placeholder='Search here'
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     onKeyPress={(e) => e.key==="Enter" && handleSearch()}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
    <InputGroup className="mb-3" style={{
       maxWidth: '500px',
       margin: '0 auto', 
       position: 'relative',
       zIndex: 0 // this line is needed so that "search" button does behind the navbar
       }}>
      <FormControl
        placeholder="Search For Recipes Here!"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        style={{ borderRadius: '10px 0 0 10px' }}
      />
      <Button 
        variant="dark" 
        onClick={handleSearch}
        style={{ borderRadius: '0 10px 10px 0' }}
      >
        Search
      </Button>
    </InputGroup>
  )
}

export default SearchBar
