import React from "react";
import { MESSAGES } from "../../constants";
import "./GameTitle.css";

/**
 * Game title component that displays the main question or game over message
 * @param {Object} props - Component props
 * @param {boolean} props.isGameLost - Whether the game is lost
 * @returns {JSX.Element} GameTitle component
 */
const GameTitle = ({ isGameLost }) => {
  return (
    <div className="title__container">
      <h3 className={isGameLost ? "title_game_over" : ""}>
        {isGameLost ? MESSAGES.GAME_OVER : MESSAGES.GAME_QUESTION}
      </h3>
    </div>
  );
};

export default GameTitle;
