import React, { useState } from 'react';

function UploadMarksheet() {
    const buttonStyle = {
        marginTop: '10px',
        backgroundColor: '#66737c',
        color: '#fff',
        padding: '8px 30px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
      };
      const [showFetchData, setShowFetchData] = useState(false);
      const buttonHoverStyle = {
        backgroundColor: '#babfc5'
      };
    const [selectedFile, setSelectedFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        // Check file extension
        const fileName = selectedFile.name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension !== 'xls' && fileExtension !== 'xlsx') {
            alert('Please select a file with .xls or .xlsx extension.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload-marksheet/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSuccess(true);
            alert('File uploaded successfully!');
            
            // Store uploaded file name in local storage without extension
            const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
            uploadedFiles.push(fileName.split('.').slice(0, -1).join('.'));
            localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

            setTimeout(() => {
                window.location.reload();
            }, 2000); // Refresh after 2 seconds
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to upload file. Please try again.');
        }
    };

    return (
        <div className="upload-container">
            <h1 className='heading'>Upload Marksheet</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput" className="custom-file-upload">
                    <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xls,.xlsx" />
                     
                </label>
                <button 
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                onClick={() => setShowFetchData(false)}
                
                type="submit">Upload</button>
            </form>
            {success && <p className="success-message">File uploaded successfully!</p>}
            <style>
                {`
                .heading{
                    text-align:center;
                    color:#434950;
                    marginTop:40px;

                }
                    .upload-container {
                        text-align: center;
                        padding:10px 10px;
                        top:200px;
                    }

                    .custom-file-upload {
                        display: inline-block;
                        margin: 20px;
                        background-color:#66737c;
                       
                       
                        
                        color: #fff;
                        padding: 5px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    .custom-file-upload:hover {
                        background-color: #c5c9ce;
                        padding: 5px 20px;
                    }

                    .custom-file-upload input[type="file"] {
                        // display: none;
                    }

                    // button {
                    //     margin-top: 10px;
                    //     background-color: #2ecc71;
                    //     color: #fff;
                    //     padding: 10px 20px;
                    //     border: none;
                    //     border-radius: 5px;
                    //     cursor: pointer;
                    //     transition: background-color 0.3s ease;
                    // }

                    // button:hover {
                    //     background-color: #babfc5;
                    // }

                    .success-message {
                        margin-top: 20px;
                        color: black;
                        font-weight: bold;
                        animation: fadein 1s;
                    }

                    @keyframes fadein {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default UploadMarksheet;
