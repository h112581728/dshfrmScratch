import React from 'react';

function Adjustments({ isOpen }) {
  return (
    <div  className={`mycontents ${isOpen ? '' : 'close'}`}>
      This is ADjustment
    </div>
  );
}

export default Adjustments;
