import { useState, useEffect, useRef } from "react";
import { filterAnimeTitles } from "../utils/gameUtils";

const allAnimeTitles = require("../pages/animeTitles.json");

/**
 * Custom hook for anime search functionality
 * @returns {Object} Search state and actions
 */
export const useAnimeSearch = () => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  /**
   * Handles input change and filters suggestions
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);

    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const filteredTitles = filterAnimeTitles(allAnimeTitles, searchText);
    setSuggestions(filteredTitles);
  };

  /**
   * Handles suggestion click
   * @param {string} title - Selected title
   */
  const handleSuggestionClick = (title) => {
    setInputText(title);
    setSuggestions([]);
  };

  /**
   * Clears the input and suggestions
   */
  const clearInput = () => {
    setInputText("");
    setSuggestions([]);
  };

  /**
   * Handles outside click to close suggestions
   * @param {Event} e - Click event
   */
  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSuggestions([]);
    }
  };

  // Set up outside click listener
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return {
    inputText,
    suggestions,
    inputRef,
    onInputChange: handleInputChange,
    onSuggestionClick: handleSuggestionClick,
    clearInput,
    hasSuggestions: suggestions.length > 0,
  };
};
