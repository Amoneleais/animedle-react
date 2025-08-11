import React from "react";
import { MESSAGES } from "../../constants";
import SearchInput from "../SearchInput/SearchInput";
import "./GameControls.css";

/**
 * Game controls component that handles user input and actions
 * @param {Object} props - Component props
 * @param {Object} props.searchProps - Search input props
 * @param {Function} props.onGuess - Function to handle guess submission
 * @param {Function} props.onDontKnow - Function to handle "don't know" action
 * @returns {JSX.Element} GameControls component
 */
const GameControls = ({ searchProps, onGuess, onDontKnow }) => {
  const handleGuess = () => {
    if (searchProps.inputText.trim()) {
      onGuess(searchProps.inputText);
      searchProps.clearInput();
    }
  };

  const handleDontKnow = () => {
    searchProps.clearInput();
    onDontKnow();
  };

  return (
    <div className="search__container">
      <SearchInput {...searchProps} />
      <div className="btn__container">
        <button type="button" className="btn__pass" onClick={handleDontKnow}>
          {MESSAGES.DONT_KNOW}
        </button>
        <button type="button" className="btn__check" onClick={handleGuess}>
          {MESSAGES.GUESS}
        </button>
      </div>
    </div>
  );
};

export default GameControls;
