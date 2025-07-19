import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const Leaderboard = ({ refreshFlag }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/users`);
        const sortedUsers = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [refreshFlag]);

  return (
    <div className="mt-6 bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading leaderboard...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-red-500">No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={user._id}
              className={`flex justify-between items-center p-2 rounded ${
                index === 0
                  ? "bg-yellow-100 font-bold"
                  : index === 1
                  ? "bg-gray-100 font-semibold"
                  : index === 2
                  ? "bg-orange-100"
                  : ""
              }`}
            >
              <span>{index + 1}. {user.name}</span>
              <span>{user.totalPoints} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;






