import { STORAGE_KEYS, GAME_CONFIG } from "../constants";

/**
 * Storage utility functions for managing game state persistence
 */

/**
 * Saves game state to session storage
 * @param {Object} gameState - Game state object
 */
export const saveGameState = (gameState) => {
  try {
    Object.entries(gameState).forEach(([key, value]) => {
      const storageKey = STORAGE_KEYS[key.toUpperCase()];
      if (storageKey) {
        const serializedValue =
          typeof value === "object" ? JSON.stringify(value) : String(value);
        sessionStorage.setItem(storageKey, serializedValue);
      }
    });
  } catch (error) {
    console.error("Error saving game state:", error);
  }
};

/**
 * Loads game state from session storage
 * @returns {Object|null} - Loaded game state or null if not found
 */
export const loadGameState = () => {
  try {
    const animeTitle = sessionStorage.getItem(STORAGE_KEYS.ANIME_TITLE);
    const animeCover = sessionStorage.getItem(STORAGE_KEYS.ANIME_COVER);

    if (!animeTitle || !animeCover) {
      return null;
    }

    return {
      animeTitle,
      animeCover,
      remainingAttempts:
        parseInt(sessionStorage.getItem(STORAGE_KEYS.REMAINING_ATTEMPTS)) ||
        GAME_CONFIG.INITIAL_ATTEMPTS,
      correctAnime: JSON.parse(
        sessionStorage.getItem(STORAGE_KEYS.CORRECT_ANIME) || "null",
      ),
      alreadyInserted: JSON.parse(
        sessionStorage.getItem(STORAGE_KEYS.ALREADY_INSERTED) || "[]",
      ),
      pixelSize:
        parseInt(sessionStorage.getItem(STORAGE_KEYS.PIXEL_SIZE)) ||
        GAME_CONFIG.INITIAL_PIXEL_SIZE,
    };
  } catch (error) {
    console.error("Error loading game state:", error);
    return null;
  }
};

/**
 * Clears all game state from session storage
 */
export const clearGameState = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      sessionStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing game state:", error);
  }
};

/**
 * Updates a specific item in session storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const updateStorageItem = (key, value) => {
  try {
    const storageKey = STORAGE_KEYS[key.toUpperCase()];
    if (storageKey) {
      const serializedValue =
        typeof value === "object" ? JSON.stringify(value) : String(value);
      sessionStorage.setItem(storageKey, serializedValue);
    }
  } catch (error) {
    console.error(`Error updating storage item ${key}:`, error);
  }
};

/**
 * Gets a specific item from session storage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} - Retrieved value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const storageKey = STORAGE_KEYS[key.toUpperCase()];
    if (storageKey) {
      const item = sessionStorage.getItem(storageKey);
      if (item === null) return defaultValue;

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error getting storage item ${key}:`, error);
    return defaultValue;
  }
};
