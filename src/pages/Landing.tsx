import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="title">
          <span className="tekken-text">TEKKEN</span>
          <span className="babes-text">BABES</span>
        </h1>
        <p className="subtitle">
          Who's the hottest fighter in the Iron Fist Tournament? 💫
        </p>

        <div className="navigation-cards">
          <Link to="/battle" className="nav-card battle-card">
            <div className="card-icon">⚔️</div>
            <h3>Battle Arena</h3>
            <p>Vote for the hottest fighter!</p>
          </Link>

          <Link to="/leaderboard" className="nav-card leaderboard-card">
            <div className="card-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>See who's ruling the rankings</p>
          </Link>
        </div>
      </div>

      <div className="floating-hearts">
        <span className="heart">💖</span>
        <span className="heart">💝</span>
        <span className="heart">💕</span>
        <span className="heart">💗</span>
        <span className="heart">✨</span>
      </div>
    </div>
  );
};

export default Landing;
