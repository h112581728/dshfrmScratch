import React from 'react';

function Balance({ isOpen }) {
  return (
    <div className={`mycontents ${isOpen ? '' : 'close'} px-5 py-2`}>
      <div className='myfont py-4 uppercase'>Balance Summary</div>
    </div>
  );
}

export default Balance;
