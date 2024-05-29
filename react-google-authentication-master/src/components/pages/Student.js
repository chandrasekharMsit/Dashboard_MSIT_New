import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import FetchDatasingles from "../../FetchDatasingls";
import Logout from "../Logout";
export default function StudentDashboard(props) {
  return (
    // <div>
    //   <h1>Student Dashboard</h1>
    //   <div>
    //   <Logout />
    //   </div>
    //   <CoursePercentage
    //     score={props.score}
    //     ss_score={props.ss_score}
    //   />
    //   <GradesDisplay
    //     res={props.res}
    //     lastUpdated={props.lastUpdated}
    //     learningCenter={props.learningCenter}
    //   />
    //   <NEW_CourseAccordion
    //     grades={props.grades}
    //     courseStats={props.courseStats}
    //     learningCenter={props.learningCenter}
    //     lastUpdated={props.lastUpdated}
    //   />
    //   <New_PerformanceDisplay
    //     grades={props.grades}
    //     courseStats={props.courseStats}
    //     percentageIT={props.percentageIT}
    //     learningCenter={props.learningCenter}
    //     lastUpdated={props.lastUpdated}
    //   />
    //   <PresentationDisplay
    //     pptScores={props.pptScores}
    //     learningCenter={props.learningCenter}
    //     lastUpdated={props.lastUpdated}
    //     res={props.res}
    //   />
    // <ScoreDisplay
    //     res={props.res}
    //     lastUpdated={props.lastUpdated}
    //     learningCenter={props.learningCenter}
    //     score={props.score}
    //     ss_score={props.ss_score}
    //   />
    // </div>
    <div>
      <BrowserRouter>
      <FetchDatasingles />
      </BrowserRouter>
      <Logout/>
    </div>
  );
}
