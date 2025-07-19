import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({ refreshFlag }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const sortedUsers = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
        setUsers(sortedUsers);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, [refreshFlag]); // re-fetch when `refreshFlag` changes

  return (
    <div className="mt-6 bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-2">🏆 Leaderboard</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user._id} className="flex justify-between py-1 border-b">
            <span>{index + 1}. {user.name}</span>
            <span>{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;




