import React from "react";
import CoursePercentage from "../CoursePercentage";
import GradesDisplay from "../GradesDisplay";
import NEW_CourseAccordion from "../NEW_CourseAccordion";
import New_PerformanceDisplay from "../NEW_PerformanceDisplay";
import PresentationDisplay from "../PresentationDisplay";
import ScoreDisplay from "../ScoreDisplay";
import Logout from "../Logout";
export default function StudentDashboard(props) {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <div>
      <Logout />
      </div>
      <CoursePercentage
        score={props.score}
        ss_score={props.ss_score}
      />
      <GradesDisplay
        res={props.res}
        lastUpdated={props.lastUpdated}
        learningCenter={props.learningCenter}
      />
      <NEW_CourseAccordion
        grades={props.grades}
        courseStats={props.courseStats}
        learningCenter={props.learningCenter}
        lastUpdated={props.lastUpdated}
      />
      <New_PerformanceDisplay
        grades={props.grades}
        courseStats={props.courseStats}
        percentageIT={props.percentageIT}
        learningCenter={props.learningCenter}
        lastUpdated={props.lastUpdated}
      />
      <PresentationDisplay
        pptScores={props.pptScores}
        learningCenter={props.learningCenter}
        lastUpdated={props.lastUpdated}
        res={props.res}
      />
    <ScoreDisplay
        res={props.res}
        lastUpdated={props.lastUpdated}
        learningCenter={props.learningCenter}
        score={props.score}
        ss_score={props.ss_score}
      />
    </div>
  );
}
