import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

// This would normally come from a shared state management solution
const initialCharacters = [
  {
    id: 1,
    name: "Nina Williams",
    image: "https://via.placeholder.com/150x200/ff6b9d/fff?text=Nina",
    wins: 23,
    votes: 45,
    matches: 67,
  },
  {
    id: 2,
    name: "Anna Williams",
    image: "https://via.placeholder.com/150x200/c471ed/fff?text=Anna",
    wins: 19,
    votes: 38,
    matches: 52,
  },
  {
    id: 3,
    name: "Xiaoyu",
    image: "https://via.placeholder.com/150x200/12c2e9/fff?text=Xiaoyu",
    wins: 31,
    votes: 56,
    matches: 78,
  },
  {
    id: 4,
    name: "Asuka",
    image: "https://via.placeholder.com/150x200/ff9a9e/fff?text=Asuka",
    wins: 15,
    votes: 29,
    matches: 41,
  },
  {
    id: 5,
    name: "Lili",
    image: "https://via.placeholder.com/150x200/fecfef/fff?text=Lili",
    wins: 28,
    votes: 51,
    matches: 69,
  },
  {
    id: 6,
    name: "Alisa",
    image: "https://via.placeholder.com/150x200/a8edea/fff?text=Alisa",
    wins: 22,
    votes: 41,
    matches: 58,
  },
  {
    id: 7,
    name: "Christie",
    image: "https://via.placeholder.com/150x200/fed6e3/fff?text=Christie",
    wins: 17,
    votes: 33,
    matches: 48,
  },
  {
    id: 8,
    name: "Zafina",
    image: "https://via.placeholder.com/150x200/ffeb3b/fff?text=Zafina",
    wins: 26,
    votes: 49,
    matches: 63,
  },
];

type SortType = "wins" | "votes" | "winrate";

const Leaderboard: React.FC = () => {
  const [characters] = useState(initialCharacters);
  const [sortBy, setSortBy] = useState<SortType>("wins");

  const calculateWinRate = (wins: number, matches: number) => {
    return matches > 0 ? ((wins / matches) * 100).toFixed(1) : "0.0";
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    switch (sortBy) {
      case "wins":
        return b.wins - a.wins;
      case "votes":
        return b.votes - a.votes;
      case "winrate": {
        const aWinRate = parseFloat(calculateWinRate(a.wins, a.matches));
        const bWinRate = parseFloat(calculateWinRate(b.wins, b.matches));
        return bWinRate - aWinRate;
      }
      default:
        return 0;
    }
  });

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0:
        return "👑";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "💫";
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return "#FFD700";
      case 1:
        return "#C0C0C0";
      case 2:
        return "#CD7F32";
      default:
        return "#fff";
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
        <h1 className="leaderboard-title">🏆 TEKKEN BABES LEADERBOARD 🏆</h1>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <span className="summary-number">
            {characters.reduce((sum, char) => sum + char.votes, 0)}
          </span>
          <span className="summary-label">Total Votes</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">
            {characters.reduce((sum, char) => sum + char.matches, 0)}
          </span>
          <span className="summary-label">Total Battles</span>
        </div>
        <div className="summary-card">
          <span className="summary-number">{characters.length}</span>
          <span className="summary-label">Fighters</span>
        </div>
      </div>

      <div className="sort-controls">
        <span className="sort-label">Sort by:</span>
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortBy === "wins" ? "active" : ""}`}
            onClick={() => setSortBy("wins")}
          >
            🏆 Wins
          </button>
          <button
            className={`sort-btn ${sortBy === "votes" ? "active" : ""}`}
            onClick={() => setSortBy("votes")}
          >
            💝 Total Votes
          </button>
          <button
            className={`sort-btn ${sortBy === "winrate" ? "active" : ""}`}
            onClick={() => setSortBy("winrate")}
          >
            📊 Win Rate
          </button>
        </div>
      </div>

      <div className="leaderboard-grid">
        {sortedCharacters.map((character, index) => (
          <div
            key={character.id}
            className={`character-rank-card ${index < 3 ? "top-three" : ""}`}
            style={
              { "--rank-color": getRankColor(index) } as React.CSSProperties
            }
          >
            <div className="rank-badge">
              <span className="rank-emoji">{getRankEmoji(index)}</span>
              <span className="rank-number">#{index + 1}</span>
            </div>

            <div className="character-avatar">
              <img
                src={character.image}
                alt={character.name}
                className="avatar-image"
              />
            </div>

            <h3 className="character-name">{character.name}</h3>

            <div className="character-stats">
              <div className="stat-item">
                <span className="stat-icon">🏆</span>
                <span className="stat-value">{character.wins}</span>
                <span className="stat-label">Wins</span>
              </div>

              <div className="stat-item">
                <span className="stat-icon">💝</span>
                <span className="stat-value">{character.votes}</span>
                <span className="stat-label">Votes</span>
              </div>

              <div className="stat-item">
                <span className="stat-icon">⚔️</span>
                <span className="stat-value">{character.matches}</span>
                <span className="stat-label">Battles</span>
              </div>

              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <span className="stat-value">
                  {calculateWinRate(character.wins, character.matches)}%
                </span>
                <span className="stat-label">Win Rate</span>
              </div>
            </div>

            {index < 3 && (
              <div className="achievement-badge">
                {index === 0 && <span className="achievement">🌟 Queen</span>}
                {index === 1 && (
                  <span className="achievement">✨ Princess</span>
                )}
                {index === 2 && (
                  <span className="achievement">💖 Rising Star</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <Link to="/battle" className="battle-btn">
          ⚔️ Start Battle
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
