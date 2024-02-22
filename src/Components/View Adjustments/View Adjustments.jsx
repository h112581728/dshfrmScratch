import React from 'react';

function Adjustments({ isOpen }) {
  return (
    <div className={`mycontents ${isOpen ? '' : 'close'} px-5 py-2`}>
      <div className='myfont py-4 uppercase'>Adjustments</div>
      <ul className='myfont text-sm'>
      </ul>
    </div>
  );
}

export default Adjustments;
