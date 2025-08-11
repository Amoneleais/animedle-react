import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GameTitle from "../components/GameTitle/GameTitle";
import AnimeImage from "../components/AnimeImage/AnimeImage";
import GameResult from "../components/GameResult/GameResult";
import GameControls from "../components/GameControls/GameControls";
import GameInfo from "../components/GameInfo/GameInfo";
import { useGameState } from "../hooks/useGameState";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import "../styles/ClassicMode.css";

export default function ClassicMode() {
  const {
    // State
    animeTitle,
    animeCover,
    remainingAttempts,
    pixelSize,
    score,
    alreadyInserted,
    correctAnime,
    // Actions
    processGuess,
    resetGame,
    nextGame,
    // Computed values
    isGameWon,
    isGameLost,
    isGameActive,
  } = useGameState();

  const searchProps = useAnimeSearch();

  const handleDontKnow = () => {
    resetGame();
  };

  const handleGuess = (guess) => {
    processGuess(guess);
  };

  const handleNext = () => {
    if (isGameWon) {
      nextGame();
    } else {
      resetGame();
    }
  };

  return (
    <div className="App">
      <Header />
      <GameTitle isGameLost={isGameLost} />
      <AnimeImage
        animeCover={animeCover}
        pixelSize={pixelSize}
        remainingAttempts={remainingAttempts}
      />
      <GameResult
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        animeTitle={animeTitle}
        onNext={handleNext}
      />

      {isGameActive && (
        <GameControls
          searchProps={searchProps}
          onGuess={handleGuess}
          onDontKnow={handleDontKnow}
        />
      )}

      {isGameActive && (
        <GameInfo
          remainingAttempts={remainingAttempts}
          score={score}
          alreadyInserted={alreadyInserted}
          correctAnime={correctAnime}
        />
      )}
      <Footer />
    </div>
  );
}
