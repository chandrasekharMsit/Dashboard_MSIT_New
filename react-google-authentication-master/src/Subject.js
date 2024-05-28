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

  return (
    <div>
      <h1>Fetch Subject Scores</h1>
      <select onChange={handleSheetSelect}>
        <option value="">Select Sheet</option>
        {sheetNames.map(sheetName => (
          <option key={sheetName} value={sheetName}>{sheetName}</option>
        ))}
      </select>
      <div>
        <h2>Subject Scores</h2>
        {subjectScores.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Assignment (%)</th>
                <th>Discussions (%)</th>
                <th>Quiz (%)</th>
                <th>End Sem (%)</th>
                <th>Total (%)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectScores.map((score, index) => (
                <tr key={index}>
                  <td>{score.Name}</td>
                  <td>{score["Email ID"]}</td>
                  <td>{score["Assignment (20%)"]}</td>
                  <td>{score["Discussions (10%)"]}</td>
                  <td>{score["Quiz (10%)"]}</td>
                  <td>{score["End Sem (30%)"]}</td>
                  <td>{score["Total (70%)"]}</td>
                  <td>{score["Grade "]}</td>
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
