import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import './App.css';
import DisplayGrades from './components/GradesDisplay';
import LandingPage from './components/LandingPage';
import Logout from './components/Logout';
import PerformanceDisplay from './components/NEW_PerformanceDisplay';
import PresentationDisplay from './components/PresentationDisplay';
import Display from './components/ScoreDisplay';
import MentorDashboard from './components/pages/mentor';
import AdminDashboard from './components/pages/AdminDashboard';
import StudentDashboard from './components/pages/Student';
import ProtectRoute from './components/ProtectRoute'; // Assuming you have a ProtectRoute component

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [email, setEmail] = useState("");
  const [mentorFlag, setMentorFlag] = useState(false);
  const [studentEmailList, setStudentEmailList] = useState([]);
  const [data, setData] = useState("");
  const [score, setScore] = useState("");
  const [ss_score, setSSScore] = useState("");
  const [dropoutFlag, setDropoutFlag] = useState(false);
  const [activeKey, setActiveKey] = useState('performance');

  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Router>
      <div className="App" style={{ marginLeft: 15, marginRight: 15 }}>
        <Switch>
          <ProtectRoute path="/admin-dashboard" component={AdminDashboard} allowedRoles={['admin']} />
          <ProtectRoute path="/mentor-dashboard" component={MentorDashboard} allowedRoles={['mentor']} />
          <ProtectRoute path="/student-dashboard" component={StudentDashboard} allowedRoles={['student']} />

          <Route path="/" exact>
            {!isLoggedin ? (
              <LandingPage
                updateLogin={setIsLoggedin}
                updateEmail={setEmail}
                updateMentorFlag={setMentorFlag}
                updateStudentEmailList={setStudentEmailList}
                updateData={setData}
                updateScore={setScore}
                updateSSScore={setSSScore}
                mentor={mentorFlag}
                studentEmail=""
                updateDropoutFlag={setDropoutFlag}
              />
            ) : (
              mentorFlag ? (
                <Redirect to="/mentor-dashboard" />
              ) : (
                <Redirect to="/student-dashboard" />
              )
            )}
          </Route>
        </Switch>
        {isLoggedin && (
          <React.Fragment>
            {mentorFlag ? (
              <div>
                <MentorDashboard
                  mentorFlag={mentorFlag}
                  updateMentorFlag={setMentorFlag}
                  mentorEmail={email}
                  studentEmailList={studentEmailList}
                />
                <br />
                <Logout
                  updateStudentEmailList={setStudentEmailList}
                  updateLogin={setIsLoggedin}
                  updateMentorFlag={setMentorFlag}
                />
                <br />
              </div>
            ) : (
              <React.Fragment>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={activeKey}
                  onSelect={(key) => setActiveKey(key)}
                >
                  <Tab eventKey="performance" title="Performance">
                    <PerformanceDisplay
                      mentor={mentorFlag}
                      email={email}
                      attendance={data?.dashboard_data?.attendance || []}
                      grades={data?.dashboard_data?.grades || []}
                      lastUpdated={data?.last_updated || ''}
                      courseStats={data?.course_stats || {}}
                      percentageIT={data?.course_attendance?.IT || 0}
                      percentageSS={data?.course_attendance?.SS || 0}
                      learningCenter={data?.dashboard_data?.learning_center || ''}
                    />
                  </Tab>
                  <Tab eventKey="attendance" title="Attendance">
                    <Display
                      mentor={mentorFlag}
                      userEmail={email}
                      res={data}
                      lastUpdated={data?.last_updated || ''}
                      learningCenter={data?.dashboard_data?.learning_center || ''}
                      score={score}
                      ss_score={ss_score}
                    />
                  </Tab>
                  <Tab eventKey="presentation" title="Presentations">
                    <PresentationDisplay
                      mentor={mentorFlag}
                      email={email}
                      lastUpdated={data?.last_updated || ''}
                      res={data}
                      learningCenter={data?.dashboard_data?.learning_center || ''}
                      pptScores={data?.dashboard_data?.ppt_scores || []}
                    />
                  </Tab>
                  <Tab eventKey="transcript" title="Transcript">
                    <DisplayGrades
                      mentor={mentorFlag}
                      email={email}
                      res={data}
                      lastUpdated={data?.last_updated || ''}
                      learningCenter={data?.dashboard_data?.learning_center || ''}
                    />
                  </Tab>
                </Tabs>
                {dropoutFlag && <h5>Student has dropped out.</h5>}
                <br />
                <Logout
                  updateLogin={setIsLoggedin}
                  updateMentorFlag={setMentorFlag}
                />
                <br />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </Router>
  );
}

export default App;
