// Export all utility functions for easier importing
export {
  calculateNextPixelSize,
  extractYear,
  isValidAnimeTitle,
  filterAnimeTitles,
  getRandomAnime,
  getDefaultTitle,
  playAudio,
  isAlreadyInserted,
} from "./gameUtils";

export {
  saveGameState,
  loadGameState,
  clearGameState,
  updateStorageItem,
  getStorageItem,
} from "./storageUtils";
