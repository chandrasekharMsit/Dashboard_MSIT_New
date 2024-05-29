import React, { useState, useEffect } from 'react';

function SheetData() {
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [subjectScores, setSubjectScores] = useState([]);

  useEffect(() => {
    // Fetch sheet names from API
    fetch('http://127.0.0.1:5000/sheet-names')
      .then(response => response.json())
      .then(data => setSheetNames(data))
      .catch(error => console.error('Error fetching sheet names:', error));
  }, []);

  useEffect(() => {
    if (selectedSheet) {
      // Fetch subject scores based on selected sheet
      fetch(`http://127.0.0.1:5000/subject-scores/${selectedSheet}`)
        .then(response => response.json())
        .then(data => setSubjectScores(data))
        .catch(error => console.error('Error fetching subject scores:', error));
    }
  }, [selectedSheet]);

  const handleSheetSelect = (event) => {
    setSelectedSheet(event.target.value);
  };

  const handleClose = () => {
    setSelectedSheet('');
    setSubjectScores([]);
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const selectSheetContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
  };

  const selectSheetStyle = {
    marginRight: '10px',
    flexGrow: 1,
  };

  const sheetSelectStyle = {
    padding: '8px',
    fontSize: '16px',
    width: '100%',
  };

  const closeButtonStyle = {
    padding: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    border: 'none',
  
    backgroundColor: 'transparent',
    marginTop: '42px',  // Adjust this value to move the button down
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  const nowrapStyle = {
    whiteSpace: 'nowrap',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const hoverRowStyle = {
    backgroundColor: '#f1f1f1',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Subject Scores Dashboard</h1>
      <div style={selectSheetContainerStyle}>
        <div style={selectSheetStyle}>
          <h2>Select Sheet</h2>
          <select
            onChange={handleSheetSelect}
            style={sheetSelectStyle}
            value={selectedSheet}
          >
            <option value="">Select Sheet</option>
            {sheetNames.map(sheetName => (
              <option key={sheetName} value={sheetName}>{sheetName}</option>
            ))}
          </select>
        </div>
        <button onClick={handleClose} style={closeButtonStyle}>
          <span role="img" aria-label="close">close</span>
        </button>
      </div>
      <div>
        <h2>Subject Scores</h2>
        {subjectScores.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thTdStyle, ...thStyle }}>Name</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Email ID</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Assignment (20%)</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Discussions (10%)</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Quiz (10%)</th>
                <th style={{ ...thTdStyle, ...thStyle }}>End Sem (30%)</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Total (70%)</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectScores.map((score, index) => (
                <tr key={index} style={index % 2 === 0 ? evenRowStyle : {}}>
                  <td style={{ ...thTdStyle, ...nowrapStyle }}>{score.Name}</td>
                  <td style={thTdStyle}>{score["Email ID"]}</td>
                  <td style={thTdStyle}>{score["Assignment (20%)"]}</td>
                  <td style={thTdStyle}>{score["Discussions (10%)"]}</td>
                  <td style={thTdStyle}>{score["Quiz (10%)"]}</td>
                  <td style={thTdStyle}>{score["End Sem (30%)"]}</td>
                  <td style={thTdStyle}>{score["Total (70%)"]}</td>
                  <td style={thTdStyle}>{score["Grade "]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SheetData;
