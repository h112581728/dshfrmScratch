import React from 'react';

function Reports({ isOpen }) {
  return (
    <div className={`mycontents ${isOpen ? '' : 'close'} px-5 py-2`}>
      <div className='myfont py-4 uppercase'>Reports</div>
      <ul className='myfont text-sm'>
        <li>Deposit Account Balance</li>
        <li>Custodial Account Balance</li>
        <li>Transaction Wallet Balance <input></input></li>
        <li>Available for Wire Balance <input></input></li>
        <li>Sender Report /GIB <input></input></li>
        <li>Transaction Report /GIB <input></input></li>
      </ul>
    </div>
  );
}

export default Reports;
