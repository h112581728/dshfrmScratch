import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import DropDown from './DropDown';

function Upload({ isOpen }) {

  const [fileValue, setFileValue] = useState('TransactionData')

  function handleDropDownChange(e) {
    const obj = e;
    setFileValue(obj.target.value)
  }

  useEffect(() => {
    serverAdd(fileValue);
  }, [fileValue]);

  function serverAdd(value) {
    switch (value) {
      case "TransactionData": { return "http://localhost:3000/transaction/upload" }
      case "CardFile": { return "http://localhost:3000/cardProcessed/upload" }
      case "ChargebackFile": { return "http://localhost:3000/chargeback/upload" }
      case "InterWire": { return "http://localhost:3000/transaction/upload" }
      case "IntlWire": { return "http://localhost:3000/transaction/upload" }
      case "AdjustmentFile": { return "http://localhost:3000/transaction/upload" }
      case "SenderReport": { return "http://localhost:3000/transaction/upload" }
      default: return "http://localhost:3000/transaction/upload";
    }
  }

  return (
    <div className={`mycontents ${isOpen ? '' : 'close'} px-5 py-2`}>
      <div className='myfont py-4 uppercase'>Upload Files</div>
      <div className='container'>
        <DropDown valueOnChange={handleDropDownChange} />
        <FileUpload link={serverAdd(fileValue)} />
      </div>
    </div>
  );
}

export default Upload;
