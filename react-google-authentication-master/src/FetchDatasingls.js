import axios from "axios";
import React, { useEffect, useState } from "react";

function SingleStudentScores() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/single-student-score/${selectedSheet}",
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Add your desired headers here
            },
          }
        );
        setStudentData(response.data[0]); // Assuming the backend response is an array with one object
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!studentData) return null;

  const {
    "Name": name,
    "Email ID": email,
    "Discussions (10%)": discussions,
    "Quiz (10%)": quiz,
    "Assignment (20%)": assignment,
    "Weekly (30%)": weekly,
    "Total (70%)": total70,
    "End Sem (30%)": endSem,
    "Total (100)": total100,
    "Grade ": grade
  } = studentData;

  return (
    <div className="student-scores-card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', margin: 'auto', width: '50%', marginTop: '50px' }}>
      <h1 className="align-items" style={{ textAlign: 'center' }}>Student Scores</h1>
      <div className="table-container" style={{ overflowX: 'auto', textAlign: 'center' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: 'auto' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Name</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{name}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Email ID</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{email}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Discussions (10%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{discussions}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Quiz (10%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{quiz}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Assignment (20%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{assignment}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Weekly (30%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{weekly}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Total (70%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{total70}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>End Sem (30%)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{endSem}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Total (100)</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{total100}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', backgroundColor: '#f2f2f2' }}>Grade</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{grade}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SingleStudentScores;
