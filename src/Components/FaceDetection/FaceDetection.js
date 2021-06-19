import React from 'react'
import './FaceDetection.css'

function FaceDetection({url, box})
{
   const faceArray = box.map(item => {
      return <div 
               className='bounding-box' 
               style={{top: item.top, bottom: item.bottom, left: item.left, right: item.right}}
               >
            </div>   
   })
   return (
      <div className='center ma'>
         <div className='absolute mt3'>
            <img 
               style={{width: 500, height: 'auto',}}
               id='image' className = "shadow-5" src={url} alt = 'face images from the website'
            />
            <div>
               {faceArray}
            </div>
         </div>
      </div>
   )
}

export default FaceDetection
