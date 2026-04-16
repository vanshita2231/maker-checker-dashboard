import React, { useState } from "react";
import MakerDashboard from "./components/MakerDashboard";
import CheckerDashboard from "./components/CheckerDashboard";
import "./App.css";

function App() {
  const [role, setRole] = useState("maker");

  return (
    <div className="app">
      <header className="header">
        <h1>Maker-Checker Dashboard</h1>
        <div className="role-toggle">
          <button
            className={role === "maker" ? "active" : ""}
            onClick={() => setRole("maker")}
          >
            Maker
          </button>
          <button
            className={role === "checker" ? "active" : ""}
            onClick={() => setRole("checker")}
          >
            Checker
          </button>
        </div>
      </header>
      <main>
        {role === "maker" ? <MakerDashboard /> : <CheckerDashboard />}
      </main>
    </div>
  );
}

export default App;
