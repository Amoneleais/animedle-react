import { useState, useEffect } from "react";
import { GAME_CONFIG, GAME_STATES } from "../constants";
import {
  loadGameState,
  saveGameState,
  updateStorageItem,
} from "../utils/storageUtils";
import {
  getRandomAnime,
  getDefaultTitle,
  calculateNextPixelSize,
  isValidAnimeTitle,
  isAlreadyInserted,
  playAudio,
} from "../utils/gameUtils";
import correctAnswerSound from "../assets/mp3/correct-answer.mp3";
import wrongAnswerSound from "../assets/mp3/wrong-answer.mp3";

const allAnimeTitles = require("../pages/animeTitles.json");

/**
 * Custom hook for managing game state
 * @returns {Object} Game state and actions
 */
export const useGameState = () => {
  const [animeTitle, setAnimeTitle] = useState(null);
  const [animeCover, setAnimeCover] = useState(null);
  const [remainingAttempts, setRemainingAttempts] = useState(
    GAME_CONFIG.INITIAL_ATTEMPTS,
  );
  const [pixelSize, setPixelSize] = useState(GAME_CONFIG.INITIAL_PIXEL_SIZE);
  const [score, setScore] = useState(0);
  const [alreadyInserted, setAlreadyInserted] = useState([]);
  const [correctAnime, setCorrectAnime] = useState(null);
  const [gameState, setGameState] = useState(GAME_STATES.PLAYING);

  // Load game state on mount
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setAnimeTitle(savedState.animeTitle);
      setAnimeCover(savedState.animeCover);
      setRemainingAttempts(savedState.remainingAttempts);
      setCorrectAnime(savedState.correctAnime);
      setAlreadyInserted(savedState.alreadyInserted);
      setPixelSize(savedState.pixelSize);
    } else {
      initializeNewGame();
    }
  }, []);

  /**
   * Initializes a new game with random anime
   */
  const initializeNewGame = () => {
    const randomAnime = getRandomAnime(allAnimeTitles);
    const title = getDefaultTitle(randomAnime);

    setCorrectAnime(randomAnime);
    setAnimeTitle(title);
    setAnimeCover(randomAnime.images.jpg.large_image_url);
    setPixelSize(GAME_CONFIG.INITIAL_PIXEL_SIZE);
    setRemainingAttempts(GAME_CONFIG.INITIAL_ATTEMPTS);
    setAlreadyInserted([]);
    setGameState(GAME_STATES.PLAYING);

    // Save to storage
    saveGameState({
      animeTitle: title,
      animeCover: randomAnime.images.jpg.large_image_url,
      correctAnime: randomAnime,
      remainingAttempts: GAME_CONFIG.INITIAL_ATTEMPTS,
      alreadyInserted: [],
      pixelSize: GAME_CONFIG.INITIAL_PIXEL_SIZE,
    });
  };

  /**
   * Processes a guess attempt
   * @param {string} guess - User's guess
   * @returns {boolean} Whether the guess was processed
   */
  const processGuess = (guess) => {
    const trimmedGuess = guess.trim();

    // Check if already inserted
    if (isAlreadyInserted(alreadyInserted, trimmedGuess)) {
      return false;
    }

    // Check if valid anime title
    if (!isValidAnimeTitle(allAnimeTitles, trimmedGuess)) {
      return false;
    }

    const newAlreadyInserted = [trimmedGuess, ...alreadyInserted];
    setAlreadyInserted(newAlreadyInserted);
    updateStorageItem("alreadyInserted", newAlreadyInserted);

    // Check if correct answer
    if (trimmedGuess.toLowerCase() === animeTitle?.toLowerCase()) {
      handleCorrectAnswer();
      return true;
    }

    // Handle wrong answer
    const newAttempts = remainingAttempts - 1;
    setRemainingAttempts(newAttempts);
    updateStorageItem("remainingAttempts", newAttempts);

    if (newAttempts === 0) {
      handleGameOver();
    } else {
      // Reduce pixel size
      const newPixelSize = calculateNextPixelSize(pixelSize);
      setPixelSize(newPixelSize);
      updateStorageItem("pixelSize", newPixelSize);
    }

    return true;
  };

  /**
   * Handles correct answer
   */
  const handleCorrectAnswer = () => {
    setGameState(GAME_STATES.WON);
    setPixelSize(0);
    setScore((prevScore) => prevScore + 1);
    playAudio(correctAnswerSound);
  };

  /**
   * Handles game over
   */
  const handleGameOver = () => {
    setGameState(GAME_STATES.LOST);
    setPixelSize(0);
    setScore(0);
    playAudio(wrongAnswerSound);
  };

  /**
   * Resets the game
   */
  const resetGame = () => {
    setScore(0);
    initializeNewGame();
  };

  /**
   * Starts next game (after winning)
   */
  const nextGame = () => {
    initializeNewGame();
  };

  return {
    // State
    animeTitle,
    animeCover,
    remainingAttempts,
    pixelSize,
    score,
    alreadyInserted,
    correctAnime,
    gameState,

    // Actions
    processGuess,
    resetGame,
    nextGame,

    // Computed values
    isGameWon: gameState === GAME_STATES.WON,
    isGameLost: gameState === GAME_STATES.LOST,
    isGameActive: gameState === GAME_STATES.PLAYING,
  };
};
