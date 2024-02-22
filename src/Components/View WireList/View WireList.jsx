import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper } from '@mui/material';
import DatePicker from './DatePicker';
import TransactBtns from './TransactBtns';
import Pagination from './Pagination';
import { jsonToExcel , downloadExcel} from '../Excel Utilities/excel';


function WireList({ isOpen }) {
  const [filteredData, setFilteredData] = useState([]);
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
      const url = `http://localhost:3000/wire_batch/view?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${dataPerPage}`;
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
      <div className='myfont py-4 uppercase'>Wire List</div>
      <div style={{ marginBottom: '0.75rem' }}>
        <DatePicker startDate={startDate} clickHandler={setStartDate} label='Start Date' />
        <DatePicker startDate={endDate} clickHandler={setEndDate} label='End Date' />
        <TransactBtns onClick={handleFilter} label='Filter' />
        <TransactBtns onClick={handleExport} label='Export' />
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
                    { field: 'wire_id', headerName: 'ID', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'rtrn', headerName: 'RTRN', width: 120, valueGetter: (params) => params.value.slice(0, 10), headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'wire_date', headerName: 'Wired Date', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'wire_amount', headerName: 'Wire Amount', width: 120, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right' },
                    { field: 'remarks', headerName: 'Remarks', width: 380, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    
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
    </div>
  );
}

export default WireList;
