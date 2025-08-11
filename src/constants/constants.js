// Game constants
export const GAME_CONFIG = {
  INITIAL_ATTEMPTS: 6,
  INITIAL_PIXEL_SIZE: 15,
  PIXEL_SIZE_REDUCTIONS: {
    LARGE: 3,
    MEDIUM: 2,
    SMALL: 6,
  },
  AUDIO_VOLUME: 0.5,
  MAX_SUGGESTIONS: 50,
};

// Pixel size thresholds
export const PIXEL_THRESHOLDS = {
  LARGE: 15,
  MEDIUM_MAX: 12,
  MEDIUM_MIN: 6,
  CLEAR: 0,
};

// Session storage keys
export const STORAGE_KEYS = {
  ANIME_TITLE: "animeTitle",
  ANIME_COVER: "animeCover",
  REMAINING_ATTEMPTS: "remainingAttempts",
  CORRECT_ANIME: "correctAnime",
  ALREADY_INSERTED: "alreadyInserted",
  PIXEL_SIZE: "pixelSize",
};

// Game states
export const GAME_STATES = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

// UI Messages
export const MESSAGES = {
  GAME_QUESTION: "QUAL O ANIME DA CAPA ?",
  GAME_OVER: "VOCÊ PERDEU!",
  NEXT_BUTTON: "Próximo",
  PLAY_AGAIN: "Jogar Novamente",
  DONT_KNOW: "NÃO SEI",
  GUESS: "ADIVINHAR 推測",
  SEARCH_PLACEHOLDER: "Buscar...",
  SCORE_LABEL: "Pontuação:",
  ATTEMPTS_REMAINING: "tentativas restantes",
  ANIME_NOT_FOUND: "Anime information not found",
};

// Table headers
export const TABLE_HEADERS = {
  TITLE: "Titulo",
  TYPE: "Tipo",
  STATUS: "Status",
  RELEASE_DATE: "Data de Estreia",
  STUDIO: "Estúdio",
};
