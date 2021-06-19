import React from 'react'
import Tilt from 'react-tilt'
import face from './logo.png'

function Logo()
{
   return (
      <div>
         <Tilt className="Tilt ma5 mt0" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner">
               <img src = {face} alt = 'logo'/>
            </div>
         </Tilt>
      </div>
   )
}

export default Logo 