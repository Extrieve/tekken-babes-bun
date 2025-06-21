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
  const [winnerPosition, setWinnerPosition] = useState<"left" | "right" | null>(
    null
  );
  const [winStreak, setWinStreak] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [battleStats, setBattleStats] = useState(tekkenCharacters);
  const getRandomCharacter = (exclude: number[]) => {
    const available = tekkenCharacters.filter(
      (char) => !exclude.includes(char.id)
    );
    return available[Math.floor(Math.random() * available.length)];
  };
  const handleVote = (
    winner: (typeof tekkenCharacters)[0],
    loser: (typeof tekkenCharacters)[0]
  ) => {
    // Determine winner's current position
    const isWinnerOnLeft = winner.id === leftCharacter.id;
    const newWinnerPosition = isWinnerOnLeft ? "left" : "right";

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

    // Check if this is the same winner in the same position as before
    let newStreak: number;
    if (
      currentWinner?.id === winner.id &&
      winnerPosition === newWinnerPosition
    ) {
      newStreak = winStreak + 1;
    } else {
      newStreak = 1;
    }

    // Check for victory
    if (newStreak >= 5) {
      setBattleStats(newStats);
      setWinStreak(newStreak);
      setCurrentWinner(winner);
      setWinnerPosition(newWinnerPosition);
      setShowVictory(true);
      return;
    }

    // Get a completely new character that's not currently on screen
    const newOpponent = getRandomCharacter([
      leftCharacter.id,
      rightCharacter.id,
    ]);

    // Batch all state updates to minimize re-renders
    setBattleStats(newStats);
    setWinStreak(newStreak);
    setCurrentWinner(winner);
    setWinnerPosition(newWinnerPosition);

    // Update only the opponent's position - winner stays in same place
    if (isWinnerOnLeft) {
      // Winner stays on left, new opponent goes to right
      setRightCharacter(newOpponent);
    } else {
      // Winner stays on right, new opponent goes to left
      setLeftCharacter(newOpponent);
    }
  };
  const resetBattle = () => {
    setShowVictory(false);
    setWinStreak(0);
    setCurrentWinner(null);
    setWinnerPosition(null);

    // Get two different random characters
    const char1 =
      tekkenCharacters[Math.floor(Math.random() * tekkenCharacters.length)];
    const availableForChar2 = tekkenCharacters.filter(
      (char) => char.id !== char1.id
    );
    const char2 =
      availableForChar2[Math.floor(Math.random() * availableForChar2.length)];

    setLeftCharacter(char1);
    setRightCharacter(char2);
  };
  useEffect(() => {
    // Initialize with random characters ONLY on component mount
    const char1 =
      tekkenCharacters[Math.floor(Math.random() * tekkenCharacters.length)];
    const availableForChar2 = tekkenCharacters.filter(
      (char) => char.id !== char1.id
    );
    const char2 =
      availableForChar2[Math.floor(Math.random() * availableForChar2.length)];

    setLeftCharacter(char1);
    setRightCharacter(char2);
  }, []); // Empty dependency array - only run once on mount

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
        <h1 className="battle-title">⚔️ BATTLE ARENA ⚔️</h1>{" "}
        <div className="streak-counter">
          {currentWinner && winStreak > 0 && (
            <span className="streak-info">
              🔥 {currentWinner.name}: {winStreak}/5 wins
            </span>
          )}
        </div>
      </div>

      <div className="battle-question">
        <h2>Who's hotter? Click to vote! 💫</h2>
      </div>

      <div className="battle-arena">
        {" "}
        <div
          className={`character-card left-character ${
            currentWinner?.id === leftCharacter.id ? "winning-streak" : ""
          }`}
          onClick={() => handleVote(leftCharacter, rightCharacter)}
        >
          {currentWinner?.id === leftCharacter.id && winStreak > 0 && (
            <div className="streak-badge">🔥 {winStreak}/5</div>
          )}
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
        </div>{" "}
        <div
          className={`character-card right-character ${
            currentWinner?.id === rightCharacter.id ? "winning-streak" : ""
          }`}
          onClick={() => handleVote(rightCharacter, leftCharacter)}
        >
          {currentWinner?.id === rightCharacter.id && winStreak > 0 && (
            <div className="streak-badge">🔥 {winStreak}/5</div>
          )}
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
