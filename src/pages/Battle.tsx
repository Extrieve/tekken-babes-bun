import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Battle.css";

// Mock Tekken characters data
const tekkenCharacters = [
  {
    id: 1,
    name: "Nina Williams",
    image: "https://via.placeholder.com/300x400/ff6b9d/fff?text=Nina",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 2,
    name: "Anna Williams",
    image: "https://via.placeholder.com/300x400/c471ed/fff?text=Anna",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 3,
    name: "Xiaoyu",
    image: "https://via.placeholder.com/300x400/12c2e9/fff?text=Xiaoyu",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 4,
    name: "Asuka",
    image: "https://via.placeholder.com/300x400/ff9a9e/fff?text=Asuka",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 5,
    name: "Lili",
    image: "https://via.placeholder.com/300x400/fecfef/fff?text=Lili",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 6,
    name: "Alisa",
    image: "https://via.placeholder.com/300x400/a8edea/fff?text=Alisa",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 7,
    name: "Christie",
    image: "https://via.placeholder.com/300x400/fed6e3/fff?text=Christie",
    wins: 0,
    votes: 0,
    matches: 0,
  },
  {
    id: 8,
    name: "Zafina",
    image: "https://via.placeholder.com/300x400/ffeb3b/fff?text=Zafina",
    wins: 0,
    votes: 0,
    matches: 0,
  },
];

const Battle: React.FC = () => {
  const [leftCharacter, setLeftCharacter] = useState(tekkenCharacters[0]);
  const [rightCharacter, setRightCharacter] = useState(tekkenCharacters[1]);
  const [currentWinner, setCurrentWinner] = useState<
    (typeof tekkenCharacters)[0] | null
  >(null);
  const [winStreak, setWinStreak] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [battleStats, setBattleStats] = useState(tekkenCharacters);

  const getRandomCharacter = (exclude: number[]) => {
    const available = battleStats.filter((char) => !exclude.includes(char.id));
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleVote = (
    winner: (typeof tekkenCharacters)[0],
    loser: (typeof tekkenCharacters)[0]
  ) => {
    // Update stats
    const newStats = battleStats.map((char) => {
      if (char.id === winner.id) {
        return {
          ...char,
          wins: char.wins + 1,
          votes: char.votes + 1,
          matches: char.matches + 1,
        };
      }
      if (char.id === loser.id) {
        return { ...char, votes: char.votes + 1, matches: char.matches + 1 };
      }
      return char;
    });
    setBattleStats(newStats);

    if (currentWinner?.id === winner.id) {
      const newStreak = winStreak + 1;
      setWinStreak(newStreak);

      if (newStreak >= 5) {
        setShowVictory(true);
        return;
      }
    } else {
      setWinStreak(1);
      setCurrentWinner(winner);
    }

    // Set up next battle
    const newOpponent = getRandomCharacter([winner.id]);
    if (winner.id === leftCharacter.id) {
      setRightCharacter(newOpponent);
    } else {
      setLeftCharacter(newOpponent);
    }
  };

  const resetBattle = () => {
    setShowVictory(false);
    setWinStreak(0);
    setCurrentWinner(null);
    setLeftCharacter(getRandomCharacter([]));
    setRightCharacter(getRandomCharacter([leftCharacter.id]));
  };
  useEffect(() => {
    // Initialize with random characters
    const getRandomChar = (exclude: number[]) => {
      const available = battleStats.filter(
        (char) => !exclude.includes(char.id)
      );
      return available[Math.floor(Math.random() * available.length)];
    };

    const char1 = getRandomChar([]);
    const char2 = getRandomChar([char1.id]);
    setLeftCharacter(char1);
    setRightCharacter(char2);
  }, [battleStats]);

  if (showVictory && currentWinner) {
    return (
      <div className="victory-screen">
        <div className="victory-content">
          <h1 className="victory-title">🎉 TEKKEN BABE CHAMPION! 🎉</h1>
          <div className="champion-card">
            <img
              src={currentWinner.image}
              alt={currentWinner.name}
              className="champion-image"
            />
            <h2 className="champion-name">{currentWinner.name}</h2>
            <p className="victory-text">Achieved 5 consecutive victories!</p>
            <div className="victory-stats">
              <span className="stat">🔥 {winStreak} Win Streak</span>
            </div>
          </div>
          <div className="victory-actions">
            <button onClick={resetBattle} className="play-again-btn">
              Play Again ✨
            </button>
            <Link to="/leaderboard" className="leaderboard-btn">
              View Leaderboard 🏆
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="battle-container">
      <div className="battle-header">
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
        <h1 className="battle-title">⚔️ BATTLE ARENA ⚔️</h1>
        <div className="streak-counter">
          {currentWinner && (
            <span className="streak-info">
              🔥 {currentWinner.name}: {winStreak} wins
            </span>
          )}
        </div>
      </div>

      <div className="battle-question">
        <h2>Who's hotter? Click to vote! 💫</h2>
      </div>

      <div className="battle-arena">
        <div
          className="character-card left-character"
          onClick={() => handleVote(leftCharacter, rightCharacter)}
        >
          <div className="character-image-container">
            <img
              src={leftCharacter.image}
              alt={leftCharacter.name}
              className="character-image"
            />
          </div>
          <h3 className="character-name">{leftCharacter.name}</h3>
          <div className="character-stats">
            <span className="stat">
              💝{" "}
              {battleStats.find((c) => c.id === leftCharacter.id)?.votes || 0}
            </span>
            <span className="stat">
              🏆 {battleStats.find((c) => c.id === leftCharacter.id)?.wins || 0}
            </span>
          </div>
        </div>

        <div className="vs-divider">
          <span className="vs-text">VS</span>
        </div>

        <div
          className="character-card right-character"
          onClick={() => handleVote(rightCharacter, leftCharacter)}
        >
          <div className="character-image-container">
            <img
              src={rightCharacter.image}
              alt={rightCharacter.name}
              className="character-image"
            />
          </div>
          <h3 className="character-name">{rightCharacter.name}</h3>
          <div className="character-stats">
            <span className="stat">
              💝{" "}
              {battleStats.find((c) => c.id === rightCharacter.id)?.votes || 0}
            </span>
            <span className="stat">
              🏆{" "}
              {battleStats.find((c) => c.id === rightCharacter.id)?.wins || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="battle-instructions">
        <p>🎯 Get 5 consecutive wins to become the Tekken Babe Champion!</p>
      </div>
    </div>
  );
};

export default Battle;
