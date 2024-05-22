import axios from "axios";
import React, { useEffect, useState } from "react";

function StudentScores() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/single-student-score/gowthamneelam1@msitprogram.net",
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Add your desired headers here
            },
          }
        );
        setStudentData(response.data);
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

  const { "Name": name, "Email ID": email, "Discussions (10%)": discussions, "Quiz (10%)": quiz, "Assignment (20%)": assignment, "Weekly (30%)": weekly, "Total (70%)": total70, "End Sem (30%)": endSem, "Total (100)": total100, "Grade ": grade } = studentData;

  return (
    <div className="student-scores-card" style={{border: '1px solid #ccc', borderRadius: '10px', padding: '20px', margin: 'auto', width: '50%',  marginTop: '200px' }}>
      <h1 className="align-items" style={{textAlign: 'center'}}>Student Scores</h1>
      <div className="table-container" style={{overflowX: 'auto',textAlign: 'center' }}>
        <table style={{width: '70%', borderCollapse: 'collapse', alignItems: 'center' , margin:'auto'}}>
          <tbody>
            <tr>
              <td style={{border: '1px  #ddd', padding: '12px', textAlign: 'center' , backgroundColor: '#f2f2f2'}}>Name</td>
              <th style={{border: '1px  #ddd', padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'center'}}>{name}</th>
            </tr>
            <tr>
              <td style={{border: '1px  #ddd', padding: '12px', textAlign: 'center'}}>Email ID</td>
              <th style={{border: '1px  #ddd', padding: '12px', textAlign: 'center'}}>{email}</th>
            </tr>
            <tr>
              <td style={{border: '1px  #ddd', padding: '12px', textAlign: 'center' , backgroundColor: '#f2f2f2'}}>Discussions (10%)</td>
              <th style={{border: '1px  #ddd', padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'center'}}>{discussions}</th>
            </tr>
            <tr>
              <td style={{border: '1px  #ddd', padding: '12px', textAlign: 'center'}}>Quiz (10%)</td>
              <th style={{border: '1px  #ddd', padding: '12px',  textAlign: 'center'}}>{quiz}</th>
            </tr>
            <tr>
              <td style={{border: '1px  #ddd', padding: '12px', textAlign: 'center' , backgroundColor: '#f2f2f2'}}>Assignment (20%)</td>
              <th style={{border: '1px  #ddd', padding: '12px', backgroundColor: '#f2f2f2', textAlign: 'center'}}>{assignment}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default StudentScores;