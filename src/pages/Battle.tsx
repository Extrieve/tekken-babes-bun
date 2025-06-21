import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  battleService,
  characterService,
  streakService,
} from "../services/dataService";
import type { Character } from "../types/database";
import "./Battle.css";

const Battle: React.FC = () => {
  const [leftCharacter, setLeftCharacter] = useState<Character | null>(null);
  const [rightCharacter, setRightCharacter] = useState<Character | null>(null);
  const [currentWinner, setCurrentWinner] = useState<Character | null>(null);
  const [winnerPosition, setWinnerPosition] = useState<"left" | "right" | null>(
    null
  );
  const [winStreak, setWinStreak] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize battle with two random characters
  const initializeBattle = async () => {
    try {
      setIsLoading(true);
      const randomCharacters = await characterService.getRandomCharacters(2);
      if (randomCharacters.length >= 2) {
        setLeftCharacter(randomCharacters[0]);
        setRightCharacter(randomCharacters[1]);
      }
    } catch (error) {
      console.error("Error initializing battle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomOpponent = async (
    excludeIds: number[]
  ): Promise<Character | null> => {
    try {
      const allCharacters = await characterService.getAllCharacters();
      const available = allCharacters.filter(
        (char) => !excludeIds.includes(char.id)
      );
      if (available.length === 0) return null;
      return available[Math.floor(Math.random() * available.length)];
    } catch (error) {
      console.error("Error getting random opponent:", error);
      return null;
    }
  };

  const handleVote = async (winner: Character, loser: Character) => {
    if (!leftCharacter || !rightCharacter) return;

    try {
      // Determine winner's current position
      const isWinnerOnLeft = winner.id === leftCharacter.id;
      const newWinnerPosition = isWinnerOnLeft ? "left" : "right";

      // Record the battle
      await battleService.recordBattle(
        leftCharacter.id,
        rightCharacter.id,
        winner.id
      );

      // Update streak
      await streakService.updateStreak(winner.id, true);
      if (loser.id !== winner.id) {
        await streakService.updateStreak(loser.id, false);
      }

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
        setWinStreak(newStreak);
        setCurrentWinner(winner);
        setWinnerPosition(newWinnerPosition);
        setShowVictory(true);
        return;
      }

      // Get a new opponent that's not currently on screen
      const newOpponent = await getRandomOpponent([
        leftCharacter.id,
        rightCharacter.id,
      ]);
      if (!newOpponent) return;

      // Update state
      setWinStreak(newStreak);
      setCurrentWinner(winner);
      setWinnerPosition(newWinnerPosition);

      // Update characters - winner stays in same position
      if (isWinnerOnLeft) {
        setRightCharacter(newOpponent);
      } else {
        setLeftCharacter(newOpponent);
      }
    } catch (error) {
      console.error("Error handling vote:", error);
    }
  };

  const resetBattle = async () => {
    setShowVictory(false);
    setWinStreak(0);
    setCurrentWinner(null);
    setWinnerPosition(null);
    await initializeBattle();
  };

  // Initialize on component mount
  useEffect(() => {
    initializeBattle();
  }, []);

  if (isLoading || !leftCharacter || !rightCharacter) {
    return (
      <div className="battle-container">
        <div
          style={{
            textAlign: "center",
            marginTop: "50vh",
            transform: "translateY(-50%)",
          }}
        >
          <h2>Loading characters...</h2>
        </div>
      </div>
    );
  }

  if (showVictory && currentWinner) {
    return (
      <div className="victory-screen">
        <div className="victory-content">
          <h1 className="victory-title">🏆 CHAMPION! 🏆</h1>
          <div className="champion-card">
            <img
              src={currentWinner.imageUrl}
              alt={currentWinner.name}
              className="champion-image"
            />
            <h2 className="champion-name">{currentWinner.name}</h2>
            <p className="victory-text">Achieved a {winStreak}-win streak!</p>
            <div className="victory-stats">
              <span className="stat">🏆 {currentWinner.wins} wins</span>
            </div>
          </div>
          <div className="victory-actions">
            <button onClick={resetBattle} className="play-again-btn">
              Play Again
            </button>
            <Link to="/leaderboard" className="leaderboard-btn">
              View Leaderboard
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
        <h1 className="battle-title">💖 Tekken Babes Battle 💖</h1>
        <div className="streak-counter">
          <div className="streak-info">
            Streak: {winStreak}/5
            {currentWinner && (
              <div style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>
                {currentWinner.name} winning!
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="battle-question">
        <h2>Who's hotter? Click to vote! 🔥</h2>
      </div>

      <div className="battle-arena">
        <div
          className={`character-card left-character ${
            currentWinner?.id === leftCharacter.id && winnerPosition === "left"
              ? "winning-streak"
              : ""
          }`}
          onClick={() => handleVote(leftCharacter, rightCharacter)}
        >
          {winStreak > 0 &&
            currentWinner?.id === leftCharacter.id &&
            winnerPosition === "left" && (
              <div className="streak-badge">{winStreak} wins!</div>
            )}
          <div className="character-image-container">
            <img
              src={leftCharacter.imageUrl}
              alt={leftCharacter.name}
              className="character-image"
            />
          </div>
          <h3 className="character-name">{leftCharacter.name}</h3>
          <div className="character-stats">
            <span className="stat">💝 {leftCharacter.votes}</span>
            <span className="stat">🏆 {leftCharacter.wins}</span>
          </div>
        </div>

        <div className="vs-divider">
          <div className="vs-text">VS</div>
        </div>

        <div
          className={`character-card right-character ${
            currentWinner?.id === rightCharacter.id &&
            winnerPosition === "right"
              ? "winning-streak"
              : ""
          }`}
          onClick={() => handleVote(rightCharacter, leftCharacter)}
        >
          {winStreak > 0 &&
            currentWinner?.id === rightCharacter.id &&
            winnerPosition === "right" && (
              <div className="streak-badge">{winStreak} wins!</div>
            )}
          <div className="character-image-container">
            <img
              src={rightCharacter.imageUrl}
              alt={rightCharacter.name}
              className="character-image"
            />
          </div>
          <h3 className="character-name">{rightCharacter.name}</h3>
          <div className="character-stats">
            <span className="stat">💝 {rightCharacter.votes}</span>
            <span className="stat">🏆 {rightCharacter.wins}</span>
          </div>
        </div>
      </div>

      <div className="battle-instructions">
        <p>Click on the character you think is hotter!</p>
        <p>Get 5 wins in a row to become champion! 🏆</p>
      </div>
    </div>
  );
};

export default Battle;
