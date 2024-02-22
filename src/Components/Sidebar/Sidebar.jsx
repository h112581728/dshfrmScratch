import React, { useState } from 'react';
import './Sidebar.css';

import Sidebar from '../../assets/sidebar-icon.png';
import UploadIcon from '../../assets/upload.png';
import TransactionsIcon from '../../assets/transactions.png';
import WireListIcon from '../../assets/wirelist.png';
import WireBatchIcon from '../../assets/wirebatch.png';
import AdjustmentsIcon from '../../assets/adjustments.png';
import ReportsIcon from '../../assets/reports.png';
import Menu from './Menu';

function NavBar({ isOpen, toggleSidebar }) {
  const [childMenus, setChildMenus] = useState(true);
  const [classValue, setClassValue] = useState('px-3 py-1 text-left hidden');

  function menuHandler() {
    if (childMenus) {
      setChildMenus(false);
      setClassValue('px-3 py-1 text-left');
    } else {
      setChildMenus(true);
      setClassValue('px-3 py-1 text-left hidden');
    }
  }
  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src={Sidebar} width={'20px'} alt="Sidebar Icon" />
      </button>
      <div className={`myfont sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><Menu icon={UploadIcon} text='Upload Data' link='/upload' width='21px' classV = 'px-3 py-1 text-left'/></li>
            <li><Menu icon={TransactionsIcon} text='View Transactions' link='/transactions' width='21px' classV = 'px-3 py-1 text-left'/></li>
            <li><Menu icon={TransactionsIcon} text='View Balances' link='/balance' width='21px' classV = 'px-3 py-1 text-left' /></li>    
            <li style={{marginBottom : '5px'}}><Menu icon={WireBatchIcon} text='Create Transfer' link='#' width='21px' handler={menuHandler} classV = 'px-3 py-1 text-left'/></li>   
            <li className='submenu'><Menu icon='' text='Machpay Wire' link='/machpay-wire' width='21px' classV = {classValue}/></li>    
            <li className='submenu' style={{marginBottom : '10px'}}><Menu icon='' text='Payout Wire' link='/payout-partner-wire' width='21px' classV = {classValue}/></li>         
            <li><Menu icon={WireListIcon} text='View Wire List' link='/wire-list' width='21px' classV = 'px-3 py-1 text-left'/></li>
            <li><Menu icon={AdjustmentsIcon} text='View Adjustments' link='/adjustments' width='21px' classV = 'px-3 py-1 text-left'/></li>
            <li><Menu icon={ReportsIcon} text='Generate Reports' link='/reports' width='21px' classV = 'px-3 py-1 text-left'/></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
