import React from 'react';
import DatePicker from '../Transactions/DatePicker';


function WireBatch({ isOpen }) {
  
  return (
    <div  className={`mycontents ${isOpen ? '' : 'close'}`}>
      <h2>Reports</h2>
      This is wire Batcb
      <DatePicker/>
    </div>
  );
}

export default WireBatch;
