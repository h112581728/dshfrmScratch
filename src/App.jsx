import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './Components/Sidebar/Sidebar';
import Upload from './Components/Upload Data/Upload Data';
import Transactions from './Components/View Transactions/View Transactions';
import Reports from './Components/Generate Reports/Generate Reports';
import WireList from './Components/View WireList/View WireList';
import IntraWire from './Components/Machpay Wire/Machpay Wire';
import IntlWire from './Components/Payout Partner Wire/Payout Partner Wire';
import Adjustments from './Components/View Adjustments/View Adjustments';
import Balance from './Components/View Balances/View Balances';

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/upload" element={<Upload isOpen={isOpen}/>} /> 
        <Route path="/transactions" element={<Transactions isOpen={isOpen}/>} />
        <Route path="/wire-list" element={<WireList isOpen={isOpen} />} />
        <Route path="/balance" element={<Balance isOpen={isOpen} />} />
        <Route path="/machpay-wire" element={<IntraWire isOpen={isOpen} />} />
        <Route path="/payout-partner-wire" element={<IntlWire isOpen={isOpen} />} />
        <Route path="/adjustments" element={<Adjustments isOpen={isOpen} />} />
        <Route path="/reports" element={<Reports isOpen={isOpen} />} />
      </Routes> 
    </Router>
  );
}

export default App;
