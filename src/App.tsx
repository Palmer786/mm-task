import React from "react";
import "./style.css";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
import AddContractor from "./components/AddContractor";

const App: React.FC = () => {
  return (
    <div className="main-wrapper">
      <ReactNotification />
      <AddContractor />
    </div>
  );
};

export default App;
