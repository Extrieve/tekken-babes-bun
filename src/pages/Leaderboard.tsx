import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { characterService } from "../services/dataService";
import type { Character } from "../types/database";
import "./Leaderboard.css";

type SortType = "wins" | "votes" | "winrate";

const Leaderboard: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [sortBy, setSortBy] = useState<SortType>("wins");
  const [isLoading, setIsLoading] = useState(true);

  // Load characters from the data service
  const loadCharacters = async () => {
    try {
      setIsLoading(true);
      const leaderboard = await characterService.getLeaderboard();
      setCharacters(leaderboard);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const calculateWinRate = (wins: number, battles: number) => {
    return battles > 0 ? ((wins / battles) * 100).toFixed(1) : "0.0";
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    switch (sortBy) {
      case "wins":
        return b.wins - a.wins;
      case "votes":
        return b.votes - a.votes;
      case "winrate": {
        const aWinRate = parseFloat(calculateWinRate(a.wins, a.battles));
        const bWinRate = parseFloat(calculateWinRate(b.wins, b.battles));
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

  if (isLoading) {
    return (
      <div className="leaderboard-container">
        <div
          style={{
            textAlign: "center",
            marginTop: "50vh",
            transform: "translateY(-50%)",
          }}
        >
          <h2>Loading leaderboard...</h2>
        </div>
      </div>
    );
  }

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
        </div>{" "}
        <div className="summary-card">
          <span className="summary-number">
            {characters.reduce((sum, char) => sum + char.battles, 0)}
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
          <Link
            to={`/character/${character.id}`}
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
              {" "}
              <img
                src={character.imageUrl}
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
              </div>{" "}
              <div className="stat-item">
                <span className="stat-icon">⚔️</span>
                <span className="stat-value">{character.battles}</span>
                <span className="stat-label">Battles</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📊</span>
                <span className="stat-value">
                  {calculateWinRate(character.wins, character.battles)}%
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
          </Link>
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
