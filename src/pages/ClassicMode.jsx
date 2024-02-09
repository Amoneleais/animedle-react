import React, { useState, useEffect, useRef } from "react";
import { ImagePixelated } from "react-pixelate";
import '../styles/ClassicMode.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const allAnimeTitles = require('./animeTitles.json'); // Importing the anime titles from the file

export default function ClassicMode() {
    const [animeTitle, setAnimeTitle] = useState(null);
    const [animeCover, setAnimeCover] = useState(null);
    const [inputText, setInputText] = useState('');
    const [remainingAttempts, setRemainingAttempts] = useState(6);
    const [pixelSize, setPixelSize] = useState(17);
    const [score, setScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        getRandomAnime();
    }, []);

    const getRandomAnime = () => {
        const randomIndex = Math.floor(Math.random() * allAnimeTitles.length);
        const randomAnime = allAnimeTitles[randomIndex];
        const randomTitleIndex = Math.floor(Math.random() * randomAnime.titles.length);
        const randomTitle = randomAnime.titles[randomTitleIndex].title;
        setAnimeTitle(randomTitle);
        setAnimeCover(randomAnime.images.jpg.large_image_url);
    };

    const handleInputChange = (e) => {
        const searchText = e.target.value;
        setInputText(searchText);
        if (!searchText) {
            setSuggestions([]);
            return;
        }
        const filteredTitles = allAnimeTitles.filter(title => title.title.toLowerCase().includes(searchText.toLowerCase()));
        setSuggestions(filteredTitles.slice(0, 10)); // Limiting suggestions to first 10 matches
    }

    const handleSuggestionClick = (title) => {
        setInputText(title);
        setSuggestions([]);
    };

    const handleOutsideClick = (e) => {
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="App">
            <Header />
            <div className="title__container">
                <h3>QUAL O ANIME DA CAPA?</h3>
            </div>
            <div className="img__container">
                {animeCover && <ImagePixelated
                    width={300} height={430}
                    className="image"
                    pixelSize={pixelSize}
                    src={animeCover}
                />}
            </div>
            <div className="search__container" ref={inputRef}>
                <div className="input__autocomplete">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={inputText}
                        onChange={handleInputChange}
                    />
                    <div className="autocomplete__list">
                        {suggestions.length > 0 && (
                            <ul>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion.title)}>
                                        {suggestion.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="btn__container">
                    <button type="button" className="btn__pass" onClick={() => setInputText(animeTitle)}>NÃO SEI</button>
                    <button type="button" className="btn__check">ADIVINHAR 推測</button>
                </div>
            </div>
            <div className="info__container">
                <div className="effort__container">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="effort__box"></div>
                    ))}
                </div>
                <div className="score__container">
                    <p className="score__display">{`Pontuação: ${score}`}</p>
                </div>
            </div>
            <div className="effort__text">
                <h5>{`${remainingAttempts} tentativas restantes`}</h5>
            </div>
            <Footer />
        </div>
    )
}