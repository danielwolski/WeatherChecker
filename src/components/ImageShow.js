import React from 'react'

function ImageShow({image}) {
  return (
    <div>
      <img src={image.urls.regular} alt={image.alt_description} />
    </div>
  )
}

export default ImageShow