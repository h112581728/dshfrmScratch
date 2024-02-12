function DropDown({ valueOnChange }) {
    return (
        <div>
            <div className="text-xs inline-block p-3">Select File Type: </div>
            <div className='dropdown'>
                <select style={{ border: 'rgba(51,51,51,0.25) solid 1px', width: '50vh' }} onChange={valueOnChange}>
                    <option value="TransactionData">Transaction File (Dashboard)</option>
                    <option value="CardFile">Card Processed File (Tabapay)</option>
                    <option value="ChargebackFile">Chargeback File (Tabapay)</option>
                    <option value="InterWire">Internal Wire List</option>
                    <option value="IntlWire">International Wire List</option>
                    <option value="AdjustmentFile">Adjustment File</option>
                    <option value="SenderReport">Sender Report (Dashboard)</option>
                </select>
            </div>
        </div>
    )
}

export default DropDown