import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper } from '@mui/material';
import DatePicker from './DatePicker';
import TransactBtns from './TransactBtns';
import Pagination from './Pagination';
import { jsonToExcel, downloadExcel } from '../Excel Utilities/excel';
import './Machpay Wire.css'
import Confirmation from './Confirmation';

function openModal() {
  popupModal.style.display = 'block';
  overlay.style.display = 'block';
};

function closeModal() {
  popupModal.style.display = 'none';
  overlay.style.display = 'none';
};




function IntraWire({ isOpen }) {
  const [filteredData, setFilteredData] = useState([]);
  const [mto, setMto] = useState('');
  const [startDate, setStartDate] = useState('2023-10-10');
  const [endDate, setEndDate] = useState('2024-02-19');
  const [loading, setLoading] = useState(false);
  const dataPerPage = 20
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:3000/machpay_wire/view?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${dataPerPage}`;
      if (mto !==''){
        url += `&filterValue=${mto}`;
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchData()
  };

  const handlePageClick = (page) => {
    setPage((page.selected + 1))
    fetchData()
  }

  const handleExport = () => {
    const fetchallData = async () => {
      try {
        const url = `http://localhost:3000/machpay_wire/view?startDate=${startDate}&endDate=${endDate}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const excelData = await jsonToExcel(jsonData);
        console.log(excelData)
        downloadExcel(excelData)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchallData();
  }

  return (
    <div className={`mycontents ${isOpen ? '' : 'close'} px-5 py-2`}>
      <div className='myfont py-4 uppercase'>Machpay Wire</div>
      <div style={{ marginBottom: '0.75rem' }}>

        <div className='date-picker'>
          <div className='date-label'>Affiliate's Name</div>
          <div>
            <input
              type='text'
              label="Affiliate's Name"
              value={mto}
              onChange={(e) => setMto(e.target.value)}
              className='date-input'
            />
          </div>
        </div>

        <DatePicker startDate={startDate} clickHandler={setStartDate} label='Start Date' />
        <DatePicker startDate={endDate} clickHandler={setEndDate} label='End Date' />
        <TransactBtns onClick={handleFilter} label='Filter' />
        <TransactBtns onClick={handleExport} label='Export' />
        <TransactBtns id='openPopupBtn' onClick={openModal} label='Create Batch' />
      </div>
      <div className='responsive-container'>
        <Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className='Paper' style={{ backgroundColor: 'rgba(246,246,246,1)' }} >
              {loading ? (
                <p>Loading, please wait...</p>
              ) : (
                <DataGrid
                  rows={filteredData}
                  getRowId={(row) => row.rtrn}
                  columns={[
                    { field: 'rtrn', headerName: 'RTRN', width: 150, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'transaction_date_pst', headerName: 'Created Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'processed_date', headerName: 'Processed Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'mto', headerName: 'MTO', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'msb', headerName: 'MSB', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'method_of_payment', headerName: 'Card/ACH', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'status', headerName: 'Wire Status', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'transaction_amount_in_us_dollars', headerName: 'Transaction Amount', width: 130, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right' },
                    { field: 'wallet_balance', headerName: 'Wallet Balance', width: 130, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right' },

                  ]}
                  rowHeight={20}
                  columnHeaderHeight={25}
                  hideFooter={true}
                  pagination={false}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div>
        <Pagination click={handlePageClick} pages={99} />
      </div>
      {/* Setting up an overlay */}
      <Confirmation click1 ={closeModal} datapassed = {filteredData}/>
    </div>
  );
}

export default IntraWire;



