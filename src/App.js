import React, { useState } from 'react'
import searchImages from './api'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'

function App() {
  const [images, setImages] = useState([])

  const onSubmit = async (term) => {
    // setImages(await searchImages(term))
    const result = await searchImages(term);
    console.log(result);
    setImages(result)
  }
  
  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <ImageList images={images} />
    </div>
  )
}

export default App