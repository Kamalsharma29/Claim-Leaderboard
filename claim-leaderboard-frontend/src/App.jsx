import React, { useState } from "react";
import UserSelect from './components/UserSelect';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

function App() {
  const [lastClaimed, setLastClaimed] = useState(null);
  const [winner, setWinner] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClaim = async (userId) => {
    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/api/claim/${userId}`);
      const claimedUser = res.data.user;

      setLastClaimed({
        name: claimedUser.name,
        points: res.data.points,
      });

      const allUsers = await axios.get(`${API_BASE}/api/users`);
      const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
      setWinner(randomUser.name);

      setRefreshFlag(prev => !prev);
    } catch (err) {
      console.error("Error claiming points:", err);
      alert("❌ Error claiming points");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE}/api/reset`);
      alert("✅ Game reset successfully!");
      setRefreshFlag(prev => !prev);
      setLastClaimed(null);
      setWinner(null);
    } catch (err) {
      console.error("Error resetting game:", err);
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

      <UserSelect onClaim={handleClaim} disabled={loading} />

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

      <Leaderboard refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;








