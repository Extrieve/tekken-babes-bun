import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { characterService } from "../services/dataService";
import type { Character } from "../types/database";
import "./CharacterProfile.css";

const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const charData = await characterService.getCharacterById(parseInt(id));
        setCharacter(charData);
      } catch (error) {
        console.error("Error loading character:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading character...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="profile-container">
        <div className="error">Character not found</div>
        <Link to="/leaderboard" className="back-btn">
          ← Back to Leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Link to="/leaderboard" className="back-btn">
          ← Back to Leaderboard
        </Link>
        <h1 className="profile-title">Character Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="character-image-section">
            <img
              src={character.imageUrl}
              alt={character.name}
              className="profile-image"
            />
            <div className="character-stats-summary">
              <div className="stat-card">
                <span className="stat-number">{character.wins}</span>
                <span className="stat-label">Wins</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{character.votes}</span>
                <span className="stat-label">Votes</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{character.battles}</span>
                <span className="stat-label">Battles</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {character.battles > 0
                    ? ((character.wins / character.battles) * 100).toFixed(1)
                    : 0}
                  %
                </span>
                <span className="stat-label">Win Rate</span>
              </div>
            </div>
          </div>

          <div className="character-details">
            <h2 className="character-name">{character.name}</h2>
            {character.fullName && character.fullName !== character.name && (
              <p className="character-full-name">({character.fullName})</p>
            )}

            <p className="character-bio">{character.bio}</p>

            <div className="character-info-grid">
              {character.age && (
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{character.age}</span>
                </div>
              )}
              {character.country && (
                <div className="info-item">
                  <span className="info-label">Country</span>
                  <span className="info-value">{character.country}</span>
                </div>
              )}
              {character.height && (
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">{character.height}</span>
                </div>
              )}
              {character.weight && (
                <div className="info-item">
                  <span className="info-label">Weight</span>
                  <span className="info-value">{character.weight}</span>
                </div>
              )}
              {character.bloodType && (
                <div className="info-item">
                  <span className="info-label">Blood Type</span>
                  <span className="info-value">{character.bloodType}</span>
                </div>
              )}
              {character.fightingStyle && (
                <div className="info-item">
                  <span className="info-label">Fighting Style</span>
                  <span className="info-value">{character.fightingStyle}</span>
                </div>
              )}
              {character.occupation && (
                <div className="info-item">
                  <span className="info-label">Occupation</span>
                  <span className="info-value">{character.occupation}</span>
                </div>
              )}
              {character.debut && (
                <div className="info-item">
                  <span className="info-label">Debut</span>
                  <span className="info-value">{character.debut}</span>
                </div>
              )}
              {character.hobbies && (
                <div className="info-item">
                  <span className="info-label">Hobbies</span>
                  <span className="info-value">{character.hobbies}</span>
                </div>
              )}
              {character.likes && (
                <div className="info-item">
                  <span className="info-label">Likes</span>
                  <span className="info-value">{character.likes}</span>
                </div>
              )}
              {character.dislikes && (
                <div className="info-item">
                  <span className="info-label">Dislikes</span>
                  <span className="info-value">{character.dislikes}</span>
                </div>
              )}
            </div>

            <div className="character-actions">
              <Link to="/battle" className="battle-btn">
                🔥 Battle with {character.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterProfile;
