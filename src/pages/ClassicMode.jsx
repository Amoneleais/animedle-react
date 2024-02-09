import React, { useState, useEffect, useRef } from "react";
import { ImagePixelated } from "react-pixelate";
import '../styles/ClassicMode.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const allAnimeTitles = require('./animeTitles.json');

export default function ClassicMode() {
    const [animeTitle, setAnimeTitle] = useState(null);
    const [animeCover, setAnimeCover] = useState(null);
    const [inputText, setInputText] = useState('');
    const [remainingAttempts, setRemainingAttempts] = useState(6);
    const [pixelSize, setPixelSize] = useState(17);
    const [score, setScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [alreadyInserted, setAlreadyInserted] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        getRandomAnime();
    }, []);

    const dontKnow = () => {
        if (remainingAttempts === 1) {
            setRemainingAttempts(6);
            setPixelSize(17);
            setScore(0);
            getRandomAnime();
        } else {
            getRandomAnime();
            setPixelSize(17);
            setRemainingAttempts(remainingAttempts - 1);
        }
    };

    const checkAnswer = () => {
        const isInputCorrect = allAnimeTitles.some(anime =>
            anime.titles.some(title =>
                title.title.toLowerCase() === inputText.trim().toLowerCase()
            )
        );
    
        if (isInputCorrect) {
            if (inputText.trim().toLowerCase() === animeTitle?.toLowerCase()) {
                setPixelSize(17);
                setRemainingAttempts(6);
                setAlreadyInserted();
                setScore(score + 1);
                getRandomAnime();
                setAlreadyInserted([]);
            } else if (remainingAttempts - 1 === 0) {
                setPixelSize(17);
                setRemainingAttempts(6);
                getRandomAnime();
                setScore(0);
                setAlreadyInserted([]);
            } else {
                setRemainingAttempts(prevAttempts => prevAttempts - 1);
                setPixelSize(pixelSize-3);
                setAlreadyInserted(prevNames => [...prevNames, inputText]);
            }
        }
    };
    
    const getRandomAnime = () => {
        const englishTitles = allAnimeTitles.filter(anime => anime.titles.some(title => title.type === "English"));
        const randomIndex = Math.floor(Math.random() * englishTitles.length);
        const randomAnime = englishTitles[randomIndex];
        const randomTitle = randomAnime.titles.find(title => title.type === "English").title;
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
        const filteredTitles = allAnimeTitles.filter(title => 
            title.titles.some(t => t.type === 'English' && t.title.toLowerCase().includes(searchText.toLowerCase()))
        );
        setSuggestions(filteredTitles.slice(0, 10));
    };

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
                    <button type="button" className="btn__pass" onClick={dontKnow}>NÃO SEI</button>
                    <button type="button" className="btn__check" onClick={checkAnswer}>ADIVINHAR 推測</button>
                </div>
            </div>
            <div className="info__container">
                <div className="effort__container">
                    {[...Array(remainingAttempts)].map((_, index) => (
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
            <div className="inserted__container">
                {alreadyInserted.map((name, index) => (
                    <div key={index} className="inserted__name">{name}</div>
                ))}
            </div>
            <Footer />
        </div>
    )
}