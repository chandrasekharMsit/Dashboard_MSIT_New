import axios from "axios";
import React, { useEffect, useState } from "react";

function StudentScores() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/students-scores",
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Add your desired headers here
            },
          }
        );
        setStudentData(response.data); // Assuming the backend response is an array of objects
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    border: '1px solid #ddd',
  };

  const cellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!studentData || studentData.length === 0) return <div>No data available</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Student Scores</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email ID</th>
            <th style={thStyle}>Discussions (10%)</th>
            <th style={thStyle}>Quiz (10%)</th>
            <th style={thStyle}>Assignment (20%)</th>
            <th style={thStyle}>Weekly (30%)</th>
            <th style={thStyle}>Total (70%)</th>
            <th style={thStyle}>End Sem (30%)</th>
            <th style={thStyle}>Total (100)</th>
            <th style={thStyle}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((item, index) => (
            <tr key={index}>
              <td style={cellStyle}>{item["Name"]}</td>
              <td style={cellStyle}>{item["Email ID"]}</td>
              <td style={cellStyle}>{item["Discussions (10%)"]}</td>
              <td style={cellStyle}>{item["Quiz (10%)"]}</td>
              <td style={cellStyle}>{item["Assignment (20%)"]}</td>
              <td style={cellStyle}>{item["Weekly (30%)"]}</td>
              <td style={cellStyle}>{item["Total (70%)"]}</td>
              <td style={cellStyle}>{item["End Sem (30%)"]}</td>
              <td style={cellStyle}>{item["Total (100)"]}</td>
              <td style={cellStyle}>{item["Grade "]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentScores;







