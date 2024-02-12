import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './Components/Sidebar/Sidebar';
import Upload from './Components/Upload/Upload';
import Transactions from './Components/Transactions/Transactions';
import Reports from './Components/Reports/Reports';
import WireList from './Components/WireList/WireList';
import WireBatch from './Components/WireBatch/WireBatch';
import Adjustments from './Components/Adjustments/Adjustments';

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
        <Route path="/wire-batch" element={<WireBatch isOpen={isOpen} />} />
        <Route path="/adjustments" element={<Adjustments isOpen={isOpen} />} />
        <Route path="/reports" element={<Reports isOpen={isOpen} />} />
      </Routes> 
    </Router>
  );
}

export default App;
