import React, { useState, useEffect } from "react";
import { fetchUsers, addUser } from "../api/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleAddUser = async () => {
    if (!userName || !userRole || !userStatus) {
      alert("Please fill in all fields.");
      return;
    }
    const newUser = { name: userName, role: userRole, status: userStatus };
    try {
      await addUser(newUser);
      await loadUsers(); // Refresh user list
      setUserName("");
      setUserRole("");
      setUserStatus("");
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
        />
        <select
          value={userStatus}
          onChange={(e) => setUserStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
