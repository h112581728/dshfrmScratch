import React from 'react';
import './Machpay Wire.css';

function TransactBtns({ onClick, label }) {
    return (
        <div style={{ display: 'inline' }}>
            <button onClick={onClick} className='Button'>{label}</button>
        </div>
    );
}
export default TransactBtns;
