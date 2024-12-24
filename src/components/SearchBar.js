import React, { useState } from 'react'

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
    <div>
      <h3>Wpisz hasło</h3>
      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='hasełko' onChange={handleChange} value={term}/>
      </form>
    </div>
  )
}

export default SearchBar