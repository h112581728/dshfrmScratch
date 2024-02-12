import React from 'react';
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
  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <img src={Sidebar} width={'20px'} alt="Sidebar Icon" />
      </button>
      <div className={`myfont sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><Menu icon={UploadIcon} text='Upload' link='/upload' width='21px' /></li>
            <li><Menu icon={TransactionsIcon} text='Transactions' link='/transactions' width='21px' /></li>
            <li><Menu icon={WireListIcon} text='Wire List' link='/wire-list' width='21px' /></li>
            <li><Menu icon={WireBatchIcon} text='Wire Batch' link='/wire-batch' width='21px' /></li>
            <li><Menu icon={AdjustmentsIcon} text='Adjustments' link='/adjustments' width='21px' /></li>
            <li><Menu icon={ReportsIcon} text='Reports' link='/reports' width='21px' /></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
