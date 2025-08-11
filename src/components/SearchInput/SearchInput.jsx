import React from "react";
import { MESSAGES } from "../../constants";
import "./SearchInput.css";

/**
 * Search input component with autocomplete functionality
 * @param {Object} props - Component props
 * @param {string} props.inputText - Current input text
 * @param {Array} props.suggestions - Array of suggestions
 * @param {Object} props.inputRef - Ref for the input container
 * @param {Function} props.onInputChange - Input change handler
 * @param {Function} props.onSuggestionClick - Suggestion click handler
 * @param {boolean} props.hasSuggestions - Whether there are suggestions
 * @returns {JSX.Element} SearchInput component
 */
const SearchInput = ({
  inputText,
  suggestions,
  inputRef,
  onInputChange,
  onSuggestionClick,
  hasSuggestions,
}) => {
  return (
    <div className="input__autocomplete" ref={inputRef}>
      <input
        type="text"
        placeholder={MESSAGES.SEARCH_PLACEHOLDER}
        value={inputText}
        onChange={onInputChange}
      />
      <div className="autocomplete__list">
        {hasSuggestions && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => onSuggestionClick(suggestion.title)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
