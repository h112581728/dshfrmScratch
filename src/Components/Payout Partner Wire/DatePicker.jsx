import React from 'react';
import './Payout Partner Wire.css';

function DatePicker({ startDate, clickHandler, label }) {
    return (
        <div className='date-picker'>
            <div className='date-label'>{label}</div>
            <div>
                <input
                    type='date'
                    label={label}
                    value={startDate}
                    onChange={(e) => clickHandler(e.target.value)}
                    className='date-input'
                />
            </div>
        </div>
    );
}

export default DatePicker;
