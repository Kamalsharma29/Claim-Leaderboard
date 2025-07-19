import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const UserSelect = ({ onClaim, disabled = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading users...</p>;

  if (users.length === 0) {
    return <p className="text-center text-red-500">No users found.</p>;
  }

  return (
    <div className="mb-4 space-y-3">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow-sm"
        >
          <span className="font-medium">{user.name}</span>
          <button
            disabled={disabled}
            className={`px-4 py-1 rounded transition ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => onClaim(user._id)}
          >
            {disabled ? "Processing..." : "Claim"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserSelect;



