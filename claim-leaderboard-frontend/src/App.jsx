import React, { useState } from "react";
import UserSelect from './components/UserSelect';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';

function App() {
  const [lastClaimed, setLastClaimed] = useState(null);
  const [winner, setWinner] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); // used to trigger re-render

  const handleClaim = async (userId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/claim/${userId}`);
      const claimedUser = res.data.user;

      setLastClaimed({
        name: claimedUser.name,
        points: res.data.points,
      });

      const allUsers = await axios.get('http://localhost:5000/api/users');
      const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
      setWinner(randomUser.name);

      // 🔁 Trigger Leaderboard to reload
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Error claiming points:", err);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/reset");
      alert("✅ Game reset successfully!");
      setRefreshFlag((prev) => !prev); // Trigger reload
      setLastClaimed(null);
      setWinner(null);
    } catch (err) {
      alert("❌ Reset failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🎯 Point Claim Leaderboard</h1>

      <button
        onClick={handleReset}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 mb-4"
      >
        🔁 Reset Game
      </button>

      <UserSelect onClaim={handleClaim} />

      {lastClaimed && (
        <div className="mt-4 text-green-600 text-lg font-semibold">
          ✅ {lastClaimed.name} earned {lastClaimed.points} points!
        </div>
      )}

      {winner && (
        <div className="mt-2 text-blue-600 text-lg font-bold">
          🎉 Random Winner: {winner}
        </div>
      )}

      {/* 🔁 Leaderboard reloads when refreshFlag changes */}
      <Leaderboard refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;







