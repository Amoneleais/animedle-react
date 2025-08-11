import { PIXEL_THRESHOLDS, GAME_CONFIG } from "../constants";

/**
 * Calculates the next pixel size based on current pixel size
 * @param {number} currentPixelSize - Current pixel size
 * @returns {number} - Next pixel size
 */
export const calculateNextPixelSize = (currentPixelSize) => {
  if (currentPixelSize === PIXEL_THRESHOLDS.LARGE) {
    return currentPixelSize - GAME_CONFIG.PIXEL_SIZE_REDUCTIONS.LARGE;
  } else if (
    currentPixelSize <= PIXEL_THRESHOLDS.MEDIUM_MAX &&
    currentPixelSize > PIXEL_THRESHOLDS.MEDIUM_MIN
  ) {
    return currentPixelSize - GAME_CONFIG.PIXEL_SIZE_REDUCTIONS.MEDIUM;
  } else if (currentPixelSize === PIXEL_THRESHOLDS.MEDIUM_MIN) {
    return PIXEL_THRESHOLDS.CLEAR;
  }
  return currentPixelSize;
};

/**
 * Extracts year from anime aired string
 * @param {string} airedString - Anime aired date string
 * @returns {string} - Extracted year
 */
export const extractYear = (airedString) => {
  return airedString.split(" to ")[0].split(",")[1]?.trim() || "";
};

/**
 * Checks if an anime title matches the input
 * @param {Array} animeTitles - Array of anime titles
 * @param {string} input - User input
 * @returns {boolean} - Whether input matches any anime title
 */
export const isValidAnimeTitle = (animeTitles, input) => {
  return animeTitles.some((anime) =>
    anime.titles.some(
      (title) => title.title.toLowerCase() === input.trim().toLowerCase(),
    ),
  );
};

/**
 * Filters anime titles based on search text
 * @param {Array} animeTitles - Array of anime titles
 * @param {string} searchText - Search input
 * @param {number} maxResults - Maximum number of results
 * @returns {Array} - Filtered anime titles
 */
export const filterAnimeTitles = (
  animeTitles,
  searchText,
  maxResults = GAME_CONFIG.MAX_SUGGESTIONS,
) => {
  if (!searchText) return [];

  return animeTitles
    .filter((anime) =>
      anime.titles.some(
        (title) =>
          title.type === "Default" &&
          title.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    )
    .slice(0, maxResults);
};

/**
 * Gets a random anime from the list with English titles
 * @param {Array} animeTitles - Array of anime titles
 * @returns {Object} - Random anime object
 */
export const getRandomAnime = (animeTitles) => {
  const englishTitles = animeTitles.filter((anime) =>
    anime.titles.some((title) => title.type === "English"),
  );

  const randomIndex = Math.floor(Math.random() * englishTitles.length);
  return englishTitles[randomIndex];
};

/**
 * Gets the default title for an anime
 * @param {Object} anime - Anime object
 * @returns {string} - Default title
 */
export const getDefaultTitle = (anime) => {
  const defaultTitle = anime.titles.find((title) => title.type === "Default");
  return defaultTitle ? defaultTitle.title : anime.title;
};

/**
 * Plays audio with specified volume
 * @param {string} audioSrc - Audio source path
 * @param {number} volume - Volume level (0-1)
 */
export const playAudio = (audioSrc, volume = GAME_CONFIG.AUDIO_VOLUME) => {
  const audio = new Audio(audioSrc);
  audio.volume = volume;
  audio.play().catch(console.error);
};

/**
 * Checks if an item already exists in the inserted list
 * @param {Array} insertedList - List of already inserted items
 * @param {string} item - Item to check
 * @returns {boolean} - Whether item already exists
 */
export const isAlreadyInserted = (insertedList, item) => {
  return insertedList.some((inserted) => inserted === item);
};
