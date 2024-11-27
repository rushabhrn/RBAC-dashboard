import React, { useState, useEffect } from "react";
import { fetchRoles, addRole } from "../api/api";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState("");

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const response = await fetchRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error.message);
    }
  };

  const handleAddRole = async () => {
    if (!roleName || !permissions) {
      alert("Please fill in all fields.");
      return;
    }
    const newRole = {
      name: roleName,
      permissions: permissions.split(",").map((p) => p.trim()),
    };
    try {
      await addRole(newRole);
      await loadRoles();
      setRoleName("");
      setPermissions("");
    } catch (error) {
      console.error("Error adding role:", error.message);
    }
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      <div>
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
        />
        <button onClick={handleAddRole}>Add Role</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
