import React from "react";
import { MESSAGES } from "../../constants";
import "./GameResult.css";

/**
 * Game result component that displays the anime title and next/play again button
 * @param {Object} props - Component props
 * @param {boolean} props.isGameWon - Whether the game is won
 * @param {boolean} props.isGameLost - Whether the game is lost
 * @param {string} props.animeTitle - The correct anime title
 * @param {Function} props.onNext - Function to call for next game
 * @returns {JSX.Element} GameResult component
 */
const GameResult = ({ isGameWon, isGameLost, animeTitle, onNext }) => {
  if (!isGameWon && !isGameLost) {
    return null;
  }

  return (
    <div className="if__correct">
      <h1 className="anime_title">{animeTitle}</h1>
      <button className="next_button" onClick={onNext}>
        {isGameWon ? MESSAGES.NEXT_BUTTON : MESSAGES.PLAY_AGAIN}
      </button>
    </div>
  );
};

export default GameResult;
