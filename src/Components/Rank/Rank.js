import React from 'react'

function Rank({name, entries}){
  return (
    <div>
      <div className='f3 fw6 navy'>
        {`Hey, ${name} you have detected`}
      </div>
      <div className='f2 fw6 navy'>
        {`${entries} photos.`}
      </div>
    </div>
  );
}

export default Rank 