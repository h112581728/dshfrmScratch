import React, { useState, useEffect } from 'react';

function OrderDashboard() {
  let curDate = new Date(Date.now())

  const [filteredData, setFilteredData] = useState([]);
  const [enddate, setEnddate] = useState(`${curDate.toISOString().slice(0, 10)}`);
  const [startdate, setStartdate] = useState('')

  useEffect(() => {
    fetchData();
  }, [enddate, startdate]); // Fetch data when the end date changes

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/transaction/view?page=${1}&pageSize=${100}&startDate=${startdate}&endDate=${enddate}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterHandler = () => {
    fetchData();
  };

  const handleStartDateChange = (e) => {
    setStartdate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEnddate(e.target.value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', fontSize: '11px', fontWeight: 'lighter' }}>
      <div>
        <div className="date-picker">
          <input type="text" placeholder="Select Date" />
          <div className="calendar"></div>
        </div>
        <input type='date' value={startdate} onChange={handleStartDateChange} />
        <input type='date' value={enddate} onChange={handleEndDateChange} />
        <button className='border border-gray-400 mx-3 p-3' onClick={filterHandler}> Filter </button>
      </div>
      <table>
        <thead>
          <tr style={{ backgroundColor: 'white', color: 'black' }}>
            <th style={{ width: '150px' }}> RTRN</th>
            <th style={{ width: '100px' }}>Date</th>
            <th style={{ width: '100px' }}>Amount</th>
            <th style={{ width: '100px' }}>MTO</th>
            <th style={{ width: '150px' }}>MSB</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr style={{ border: "1px solid grey" }} key={index}>
              <td>{item.rtrn}</td>
              <td>{item.transaction_date_pst.slice(0, 10)}</td>
              <td align='right'>{Math.floor(Number(item.transaction_amount_in_us_dollars) * 100) / 100}</td>
              <td>{item.mto}</td>
              <td>{item.msb}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDashboard;
