import React from 'react';

function Reports({ isOpen }) {
  return (
    <div  className={`mycontents ${isOpen ? '' : 'close'}`}>
      <h2>Reports</h2>
      <li>Deposit Account Balance</li>
      <li>Custodial Account Balance</li>
      <li>Transaction Wallet Balance <input></input></li>
      <li>Available for Wire Balance <input></input></li>
      <li>Sender Report /GIB <input></input></li>
      <li>Transaction Report /GIB <input></input></li>
    </div>
  );
}

export default Reports;
