import React from 'react';
import './View Transactions.css';

function TransactBtns({ onClick, label }) {
    return (
        <div style={{ display: 'inline' }}>
            <button onClick={onClick} className='Button'>{label}</button>
        </div>
    );
}
export default TransactBtns;
