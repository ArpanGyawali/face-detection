import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm(props)
{
   const {onInputChange, onButtonClick} = props
   return (
      <div>
         <p className= 'white'>Add your picture and identify your face</p>
         <div>
            <input className='custom pa2 w-40' type = 'text' onChange={onInputChange}/>
            <button className = 'detect' onClick={onButtonClick} >Detect</button>
         </div>
      </div>
   )
}

export default ImageLinkForm
