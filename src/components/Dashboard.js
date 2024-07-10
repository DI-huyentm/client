import React from "react";
import DefectVisualization from "./DefectVisualization";
import MergeRequestsDetails from "./MergeRequestsDetails";

function Dashboard() {
  return (
    <div style={{ width: "100%", backgroundColor: "#E9F1FA" }}>
      {/* <ResponsiveAppBar /> */}
      <DefectVisualization />
      <MergeRequestsDetails />
    </div>
  );
}

export default Dashboard;
