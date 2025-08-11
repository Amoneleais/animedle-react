import React from "react";
import { ImagePixelated } from "react-pixelate";
import "./AnimeImage.css";

/**
 * Anime image component that displays the pixelated anime cover
 * @param {Object} props - Component props
 * @param {string} props.animeCover - Anime cover image URL
 * @param {number} props.pixelSize - Current pixel size for pixelation
 * @param {number} props.remainingAttempts - Remaining attempts
 * @returns {JSX.Element} AnimeImage component
 */
const AnimeImage = ({ animeCover, pixelSize, remainingAttempts }) => {
  const shouldBlur = pixelSize < 6 && remainingAttempts === 1;

  return (
    <div className="img__container">
      <div className={`blur ${shouldBlur ? "strong-blur" : ""}`}>
        {animeCover && (
          <ImagePixelated
            width={300}
            height={430}
            className="image"
            pixelSize={pixelSize}
            src={animeCover}
          />
        )}
      </div>
    </div>
  );
};

export default AnimeImage;
