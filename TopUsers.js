import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      if (data) {
        const sortedUsers = Object.entries(data)
          .map(([id, name]) => ({ id, name }))
          .slice(0, 5); // Get top 5 users
        setUsers(sortedUsers);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Top 5 Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (User ID: {user.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
