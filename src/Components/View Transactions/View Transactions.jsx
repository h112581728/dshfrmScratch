import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper } from '@mui/material';
import DatePicker from './DatePicker';
import TransactBtns from './TransactBtns';
import Pagination from './Pagination';
import { jsonToExcel , downloadExcel} from '../Excel Utilities/excel';

function Transactions({ isOpen }) {
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('2023-10-10');
  const [endDate, setEndDate] = useState('2024-02-19');
  const [loading, setLoading] = useState(false);
  const [dataPerPage, setDatePerPage] = useState(20)
  const [mto, setMto] = useState('');
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData();
  }, [page]);


  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:3000/transaction/view?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${dataPerPage}`;
      if (mto !==''){
        url += `&filterValue=${mto}`;
      }
      console.log("clicked")
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
        let url = `http://localhost:3000/transaction/view?startDate=${startDate}&endDate=${endDate}`;
        if (mto !==''){
          url += `&filterValue=${mto}`;
        }
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
      <div className='myfont py-4 uppercase'>Transaction Reports</div>
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
      </div>
      <div className='responsive-container'>
        <Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Paper className='Paper' style={{ backgroundColor: 'rgba(246,246,246,1)', height: '28rem' }} >
              {loading ? (
                <p>Loading, please wait...</p>
              ) : (
                <DataGrid
                  rows={filteredData}
                  getRowId={(row) => row.rtrn}
                  columns={[
                    { field: 'rtrn', headerName: 'RTRN', width: 153, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'transaction_status', headerName: 'TxnStatus', width: 100, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internalwire_reversal_status', headerName: 'WireRev', width: 100, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internationalwire_reversal_status', headerName: 'PayoutRev', width: 100, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'mto', headerName: 'MTO', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'msb', headerName: 'MSB', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'method_of_payment', headerName: 'Payment Type', width: 100, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'debit_card_issuing_network', headerName: 'Card Network', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'regulated', headerName: 'Regulated', width: 80, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'method_of_payout', headerName: 'Payout Type', width: 120, headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'transaction_amount_in_us_dollars', headerName: 'Actual Amount', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right' },
                    { field: 'settled_amount', headerName: 'Settled Amount', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    { field: 'transaction_fee_or_commission_USD', headerName: 'Clients Revenue', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    { field: 'network_fee', headerName: 'Network Fee', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    { field: 'interchange', headerName: 'Interchange Fee', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    { field: 'wallet_balance', headerName: 'Wallet Balance', width: 100, valueGetter: (params) => Math.round(params.value * 1000) / 1000, headerClassName: 'table-header', cellClassName: 'row-prop', align: 'right', headerAlign: 'center' },
                    { field: 'transaction_date_pst', headerName: 'Created Date', width: 100, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'processed_date', headerName: 'Processed Date', width: 100, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'refunded_date', headerName: 'Refunded Date', width: 100, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'returned_date', headerName: 'Returned Date', width: 100, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'transaction_paid_date', headerName: 'Paid Date', width: 100, valueGetter: (params) => params.value ? params.value.slice(0,10) === '1899-12-29' ? '' : params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internalwire_date', headerName: 'Machpay Wire Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internationalwire_date', headerName: 'Payout Partner Wire Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internalwire_reversal_date', headerName: 'Machpay Reversal Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    { field: 'internationalwire_reversal_date', headerName: 'Payout Reversal Date', width: 120, valueGetter: (params) => params.value ? params.value.slice(0, 10) : '', headerClassName: 'table-header', cellClassName: 'row-prop' },
                    
                  ]}
                  rowHeight={20}
                  columnHeaderHeight={25}
                  hideFooter={true}
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

export default Transactions;
