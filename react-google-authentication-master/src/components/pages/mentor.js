import React, { useState } from "react";
import { Jumbotron, Tab, Tabs } from "react-bootstrap";
import DisplayGrades from "../GradesDisplay";
import PerformanceDisplay from "../NEW_PerformanceDisplay";
import PresentationDisplay from "../PresentationDisplay";
import Display from "../ScoreDisplay";
import SearchBar from "../SearchBar";
import FetchData from "../../FetchData";
import Subject from "../../Subject";
import Logout from "../Logout";

export default function MentorDashboard(props) {
  // Hooks to store the values
  const [displayFlag, setDisplayFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [data, setData] = useState("");
  const [score, setScore] = useState("");
  const [ss_score, setSSScore] = useState("");
  const [dropoutFlag, setDropoutFlag] = useState(false);
  const [key, setKey] = useState("performance");
  const [showFetchData, setShowFetchData] = useState(true);
  

  return (
    // Displays the page heading
    <div>
      <br />
      <Jumbotron
        style={{
          height: "100px",
          padding: "0px",
          fontFamily: "Raleway",
          backgroundColor: "#001340",
        }}
      >
        <img
          style={{
            height: "100px",
          }}
          src={process.env.PUBLIC_URL + "/msit_new_logo.png"}
          alt="MSIT Logo"
          align="left"
        />
        <br />
        <h1 style={{ color: "white" }}>Mentor Dashboard</h1>
      </Jumbotron>

      <div>
        <SearchBar
          mentorEmail={props.mentorEmail}
          updateDisplayFlag={setDisplayFlag}
          updateErrorFlag={setErrorFlag}
          updateErrorMsg={setErrorMsg}
          updateStudentEmail={setStudentEmail}
          updateData={setData}
          updateScore={setScore}
          updateSSScore={setSSScore}
          options={props.studentEmailList}
          updateDropoutFlag={setDropoutFlag}
        />
      </div>

      {errorFlag && <h5>{errorMsg}</h5>}

      {dropoutFlag && <h5 style={{ fontFamily: "Raleway" }}>Student has dropped out</h5>}

      {displayFlag ? (
        <div>
          {data.dashboard_data && data.dashboard_data !== "File Does not exist" ? (
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
              <Tab eventKey="performance" title="Performance">
                <PerformanceDisplay
                  mentor={props.mentorFlag}
                  email={studentEmail}
                  attendance={data.dashboard_data.attendance}
                  grades={data.dashboard_data.grades}
                  lastUpdated={data.dashboard_data.last_updated}
                  courseStats={data.course_stats}
                  percentageIT={data.course_attendance.IT}
                  percentageSS={data.course_attendance.SS}
                  learningCenter={data.dashboard_data.learning_center}
                />
              </Tab>
              <Tab eventKey="attendance" title="Attendance">
                <Display
                  mentor={props.mentorFlag}
                  userEmail={studentEmail}
                  res={data}
                  lastUpdated={data.last_updated}
                  learningCenter={data.dashboard_data.learning_center}
                  score={score}
                  ss_score={ss_score}
                />
              </Tab>
              <Tab eventKey="presentation" title="Presentations">
                <PresentationDisplay
                  mentor={props.mentorFlag}
                  email={studentEmail}
                  lastUpdated={data.last_updated}
                  res={data}
                  learningCenter={data.dashboard_data.learning_center}
                  pptScores={data.dashboard_data.ppt_scores}
                />
              </Tab>
              <Tab eventKey="transcript" title="Transcript">
                <DisplayGrades
                  mentor={props.mentorFlag}
                  email={studentEmail}
                  res={data}
                  lastUpdated={data.last_updated}
                  learningCenter={data.dashboard_data.learning_center}
                />
              </Tab>
            </Tabs>
          ) : (
            <div></div>
          )}
          <br />
        </div>
      ) : (
        <div>
          <div>
            {/* <button onClick={() => setShowFetchData(true)} style={{
    backgroundColor: '#66737c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginRight: '15px',
    marginTop:'20px',
    cursor: 'pointer',
  }}>Upload Score</button>
            <button onClick={() => setShowFetchData(false)} style={{
    backgroundColor: '#66737c',
    color: 'white',
    border: 'none',
    padding: '10px 20px ',
    marginRight: '15px',
    cursor: 'pointer',
    
  }}>Subject Scores</button> */}
  <button onClick={() => setShowFetchData(true)} style={{
    backgroundColor: '#001340',
    borderRadius:'5px',
    color: 'white',
    // border: 'none',
    padding: '10px 20px',
    marginRight: '15px',
    marginTop:'20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    // Hover effect
    ':hover': {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black'
    }
}}>Upload Score</button>

<button onClick={() => setShowFetchData(false)} style={{
    backgroundColor: '#001340',
   
    borderRadius:'5px',
    color: 'white',
    // border: 'none',
    padding: '10px 20px ',
    marginRight: '15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    // Hover effect
    ':hover': {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid black'
    }
}}>Subject Scores</button>
          </div>

          {showFetchData ? <FetchData /> : <Subject />}
        </div>
      )}
      <Logout />
    </div>
  );
}
