import React from 'react'

function Navigation({onRouteChange, isSignedIn})
{
   if (isSignedIn) {
      return (
      <nav style = {{display: 'flex', justifyContent: 'flex-end', paddingRight: 25}}>
         <h2 
            className='f4 dim link pointer white' 
            onClick={() => onRouteChange('signin')}
         >Sign Out</h2>
      </nav>
      )
   } else {
      return (
         <nav style = {{display: 'flex', justifyContent: 'flex-end', paddingRight: 25}}>
            <h2 
               className='f4 dim link pointer white mr3' 
               onClick={() => onRouteChange('signin')}
            >Sign In</h2>
            <h2 
               className='f4 dim link pointer white ml3' 
               onClick={() => onRouteChange('register')}
            >Register</h2>
         </nav>
      )
   }
}

export default Navigation
