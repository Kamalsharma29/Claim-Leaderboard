import React, { useEffect, useState } from "react";
import axios from "axios";

const UserSelect = ({ onClaim }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading users...</p>;

  if (users.length === 0) {
    return <p className="text-center text-red-500">No users found.</p>;
  }

  return (
    <div className="mb-4 space-y-2">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm"
        >
          <span className="font-medium">{user.name}</span>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            onClick={() => onClaim(user._id)}
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserSelect;


