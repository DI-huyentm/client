import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Reports from "./components/Reports";
import AddReport from "./components/AddReport";
import ViewReport from "./components/ViewReport";
import UpdateReport from "./components/UpdateReport";
import ResponsiveAppBar from "./components/Appbar";
import Labels from "./components/Labels";
import "./css/styles.css";

const App = () => {
  return (
    <div style={{height: "100vh", width: "100%", backgroundColor: "#E9F1FA"}}>
      <ResponsiveAppBar style={{color: "red"}}/>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/labels" element={<Labels />} />
          <Route path="/add-report" element={<AddReport />} />
          <Route path="/reports/:id" element={<ViewReport />} />
          <Route path="/reports/:id/update" element={<UpdateReport />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
