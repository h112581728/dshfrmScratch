import React, { useState } from "react";
import UploadIcon from '../../assets/upload.svg';
import './Upload.css';

const FileUpload = ({ link }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        } else {
            setFile(null);
        }
    };

    const openFileDialog = (event) => {
        event.preventDefault();
        document.querySelector('input[type="file"]').click();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFile(file);
        }
    };

    const clearFile = () => {
        setFile(null);
        document.getElementById('excelFile').value = null; // Clear the file input value
    };

    return (
        <div className='px-8 py-5 text-sm' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <form action={link} method="post" encType="multipart/form-data" className="form-style">
                <div className="form-wrapper">
                    <label htmlFor="excelFile" className="form-label">
                        <img src={UploadIcon} className="upload-icon" alt="Upload Icon" />
                        Drag & Drop file or&nbsp;
                        <a href="#" onClick={openFileDialog}>Browse </a>
                        <p style={{paddingLeft: '0', color:'rgba(51,51,51,0.5)', fontSize:'10.5px'}}>Supported Formats: CSV, XLSX, XLS</p>
                    </label>
                    <input type="file" id="excelFile" name="excelFile" accept=".xlsx, .xls, .csv" style={{ display: 'none' }} onChange={handleFileChange} />
                </div>
                {file && <p className="file-name">File selected: {file.name}</p>}
                <div style={{ position: 'relative', left: '-20px', top: '10px', marginBottom: '10px' }}>
                    <button type="submit" className='Button' style={{ backgroundColor: 'rgba(89, 86, 192,1)' }}>Upload</button>
                    <button type="button" className='Button clear-button' onClick={clearFile} style={{ backgroundColor: 'rgba(89, 86, 192,1)' }}>Clear</button>
                </div>
            </form>
        </div>
    );
};

export default FileUpload;
