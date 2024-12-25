import React, { useState } from 'react'
import './SearchBar.scss';

function SearchBar({onSubmit}) {
  const [term, setTerm] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  }

  const handleChange = (event) => {
    setTerm(event.target.value);
  }

  return (
    <div className="search-bar-container">
      <h3>Wpisz hasło</h3>
      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='hasełko' onChange={handleChange} value={term}/>
      </form>
    </div>
  )
}

export default SearchBar