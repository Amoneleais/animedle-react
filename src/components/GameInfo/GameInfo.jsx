import React from "react";
import { MESSAGES, TABLE_HEADERS } from "../../constants";
import { extractYear } from "../../utils/gameUtils";
import "./GameInfo.css";

const allAnimeTitles = require("../../pages/animeTitles.json");

/**
 * Game info component that displays game statistics and inserted anime information
 * @param {Object} props - Component props
 * @param {number} props.remainingAttempts - Number of remaining attempts
 * @param {number} props.score - Current score
 * @param {Array} props.alreadyInserted - List of already inserted anime titles
 * @param {Object} props.correctAnime - Correct anime object
 * @returns {JSX.Element} GameInfo component
 */
const GameInfo = ({
  remainingAttempts,
  score,
  alreadyInserted,
  correctAnime,
}) => {
  const getTableData = (insertedName) => {
    const anime = allAnimeTitles.find((anime) => {
      return anime.titles.some((title) => title.title === insertedName);
    });

    if (!anime || !correctAnime) return null;

    const correctYear = extractYear(correctAnime.aired.string);
    const year = extractYear(anime.aired.string);

    return {
      anime,
      correctYear,
      year,
      isTitleCorrect: correctAnime.title === anime.title,
      isTypeCorrect: correctAnime.type === anime.type,
      isStatusCorrect: correctAnime.status === anime.status,
      isYearCorrect: correctYear === year,
      isStudioCorrect: correctAnime.studios[0].name === anime.studios[0].name,
    };
  };

  return (
    <div className="game-info">
      <div className="info__container">
        <div className="effort__container">
          {[...Array(remainingAttempts)].map((_, index) => (
            <div key={index} className="effort__box"></div>
          ))}
        </div>
        <div className="score__container">
          <p className="score__display">{`${MESSAGES.SCORE_LABEL} ${score}`}</p>
        </div>
      </div>

      <div className="effort__text">
        <h5>{`${remainingAttempts} ${MESSAGES.ATTEMPTS_REMAINING}`}</h5>
      </div>

      <div className="inserted__container">
        {alreadyInserted.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>{TABLE_HEADERS.TITLE}</th>
                <th>{TABLE_HEADERS.TYPE}</th>
                <th>{TABLE_HEADERS.STATUS}</th>
                <th>{TABLE_HEADERS.RELEASE_DATE}</th>
                <th>{TABLE_HEADERS.STUDIO}</th>
              </tr>
            </thead>
            <tbody>
              {alreadyInserted.map((insertedName, index) => {
                const tableData = getTableData(insertedName);

                if (!tableData) {
                  return (
                    <tr key={index} className="inserted__info">
                      <td colSpan="5" className="inserted__name">
                        {MESSAGES.ANIME_NOT_FOUND}
                      </td>
                    </tr>
                  );
                }

                const {
                  anime,
                  correctYear,
                  year,
                  isTitleCorrect,
                  isTypeCorrect,
                  isStatusCorrect,
                  isYearCorrect,
                  isStudioCorrect,
                } = tableData;

                return (
                  <tr key={index} className="inserted__info">
                    <td
                      className={`table-cell ${isTitleCorrect ? "correct-cell" : "incorrect-cell"}`}
                    >
                      {anime.title}
                    </td>
                    <td
                      className={`table-cell ${isTypeCorrect ? "correct-cell" : "incorrect-cell"}`}
                    >
                      {anime.type}
                    </td>
                    <td
                      className={`table-cell ${isStatusCorrect ? "correct-cell" : "incorrect-cell"}`}
                    >
                      {anime.status}
                    </td>
                    <td
                      className={`table-cell ${isYearCorrect ? "correct-cell" : "incorrect-cell"}`}
                    >
                      {correctYear > year
                        ? year + "▸"
                        : "◂" + year || correctYear === year}
                    </td>
                    <td
                      className={`table-cell ${isStudioCorrect ? "correct-cell" : "incorrect-cell"}`}
                    >
                      {anime.studios[0].name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
