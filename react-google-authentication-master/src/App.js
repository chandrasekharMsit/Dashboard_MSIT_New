import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import "./App.css"; //
import DisplayGrades from "./components/GradesDisplay";
import LandingPage from "./components/LandingPage";
import Logout from "./components/Logout";
import MentorDashboard from "./components/MentorDashboard";
import PerformanceDisplay from "./components/NEW_PerformanceDisplay";
import PresentationDisplay from "./components/PresentationDisplay";
import Display from "./components/ScoreDisplay";
import AdminDashboard from './components/pages/Admin_Dashboard';
import StudentDashboard from './components/pages/Student_Dashboard';
export default function App() {
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [mentorFlag, setMentorFlag] = React.useState(false);
  const [studentEmailList, setStudentEmailList] = React.useState([]);
  const [data, setData] = React.useState("");
  const [score, setScore] = React.useState("");
  const [ss_score, setSSScore] = React.useState("");
  const [dropoutFlag, setDropoutFlag] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState('performance');
  useEffect(() => {
    let isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    // <Router>
    //   <div className="App" style={{ marginLeft: 15, marginRight: 15 }}>
    //     <Switch>
    //       <Route exact path="/">
    //         {!isLoggedin ? (
    //           <LandingPage
    //             updateLogin={setIsLoggedin}
    //             updateEmail={setEmail}
    //             updateMentorFlag={setMentorFlag}
    //             updateStudentEmailList={setStudentEmailList}
    //             updateData={setData}
    //             updateScore={setScore}
    //             updateSSScore={setSSScore}
    //             mentor={mentorFlag}
    //             studentEmail=""
    //             updateDropoutFlag={setDropoutFlag}
    //           />
    //         ) : mentorFlag ? (
    //           <MentorDashboard
    //             mentorFlag={mentorFlag}
    //             updateMentorFlag={setMentorFlag}
    //             mentorEmail={email}
    //             studentEmailList={studentEmailList}
    //           />
    //         ) : (
    //           <div>
    //             <Tabs
    //               id="controlled-tab-example"
    //               activeKey={activeKey}
    //               onSelect={(key) => setActiveKey(key)}
    //             >
    //              <Tab eventKey="performance" title="Performance">
    //             {data && data.dashboard_data && data.dashboard_data.learning_center ? (
    //               <PerformanceDisplay
    //                 mentor={mentorFlag}
    //                 email={email}
    //                 attendance={data.dashboard_data.attendance || []}
    //                 grades={data.dashboard_data.grades || []}
    //                 lastUpdated={data.last_updated}
    //                 courseStats={data.course_stats}
    //                 percentageIT={data.course_attendance?.IT || 0}
    //                 percentageSS={data.course_attendance?.SS || 0}
    //                 learningCenter={data.dashboard_data.learning_center}
    //               />
    //             ) : (
    //               <p>Loading performance data...</p>
    //             )}
    //           </Tab>
    //           <Tab eventKey="attendance" title="Attendance">
    //             <Display
    //               mentor={mentorFlag}
    //               userEmail={email}
    //               res={data}
    //               lastUpdated={data?.last_updated || ''}
    //               learningCenter={data?.dashboard_data?.learning_center || {}}
    //               score={score}
    //               ss_score={ss_score}
    //             />
    //           </Tab>
    //           <Tab eventKey="presentation" title="Presentations">
    //                 <PresentationDisplay
    //                   mentor={mentorFlag}
    //                   email={email}
    //                   lastUpdated={data?.last_updated || ''}
    //                   res={data}
    //                   learningCenter={data?.dashboard_data?.learning_center || {}}
    //                   pptScores={data?.dashboard_data?.ppt_scores || []}
    //                 />
    //               </Tab>
    //               <Tab eventKey="transcript" title="Transcript">
    //                 <DisplayGrades
    //                   mentor={mentorFlag}
    //                   email={email}
    //                   res={data}
    //                   lastUpdated={data?.last_updated || ''}
    //                   learningCenter={data?.dashboard_data?.learning_center || {}}
    //                 />
    //               </Tab>
    //             </Tabs>
    //             <br />
    //             <Logout
    //               updateStudentEmailList={setStudentEmailList}
    //               updateLogin={setIsLoggedin}
    //               updateMentorFlag={setMentorFlag}
    //             />
    //           </div>
    //         )}
    //       </Route>
    //       <Route path="/admin-dashboard">
    //         <AdminDashboard />
    //       </Route>
    //       <Route path="/student-dashboard">
    //         <StudentDashboard />
    //       </Route>
    //       <Route path="/mentor-dashboard">
    //         <MentorDashboard />
    //       </Route>
    //     </Switch>
    //     {dropoutFlag && <h5>Student has dropped out.</h5>}
    //   </div>
    // </Router>
    <Router>
      <div>hello</div>
    </Router>
  );
}