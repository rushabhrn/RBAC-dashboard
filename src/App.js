import React from "react";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";

const App = () => {
  return (
    <div className="app">
      <h1>RBAC Dashboard</h1>
      <UserManagement />
      <RoleManagement />
    </div>
  );
};

export default App;
