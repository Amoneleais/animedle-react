import React, { useState, useEffect, useRef } from "react";
import { ImagePixelated } from "react-pixelate";
import '../styles/ClassicMode.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import correctAnswerSound from '../assets/mp3/correct-answer.mp3';
import wrongAnswerSound from '../assets/mp3/wrong-answer.mp3';

const allAnimeTitles = require('./animeTitles.json');

export default function ClassicMode() {
    const [animeTitle, setAnimeTitle] = useState(null);
    const [animeCover, setAnimeCover] = useState(null);
    const [inputText, setInputText] = useState('');
    const [remainingAttempts, setRemainingAttempts] = useState(6);
    const [pixelSize, setPixelSize] = useState(15);
    const [score, setScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [alreadyInserted, setAlreadyInserted] = useState([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isAnswerWrong, setIsAnswerWrong] = useState(false);
    const [playCorrectSound, setPlayCorrectSound] = useState(false);
    const [playWrongSound, setPlayWrongSound] = useState(false);
    const [correctAnime, setCorrectAnime] = useState(null);
    const [passButtonDisabled, setPassButtonDisabled] = useState(false);
    const [isButtonGray, setIsButtonGray] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const storedTitle = sessionStorage.getItem('animeTitle');
        const storedCover = sessionStorage.getItem('animeCover');
        const storedAttempts = sessionStorage.getItem('remainingAttempts');
        const storedCorrectAnime = sessionStorage.getItem('correctAnime');
        const storedInsertedAnime = sessionStorage.getItem('alreadyInserted');
        const storedPixelSize = sessionStorage.getItem('pixelSize');
        console.log(storedPixelSize)
        if (storedTitle && storedCover) {
            setAnimeTitle(storedTitle);
            setAnimeCover(storedCover);
            setRemainingAttempts(parseInt(storedAttempts));
            setCorrectAnime(JSON.parse(storedCorrectAnime));
            setAlreadyInserted(JSON.parse(storedInsertedAnime));
            setPixelSize(parseInt(storedPixelSize));
        } else {
            getRandomAnime();
        }
    }, []);

    useEffect(() => {
        if (playCorrectSound) {
            const audio = new Audio(correctAnswerSound);
            audio.volume = 0.5;
            audio.play();
            setPlayCorrectSound(false);
        }
    }, [playCorrectSound]);
    
    useEffect(() => {
        if (playWrongSound) {
            const audio = new Audio(wrongAnswerSound);
            audio.volume = 0.5;
            audio.play();
            setPlayWrongSound(false);
        }
    }, [playWrongSound]);

    const dontKnow = () => {
        setInputText("");
        setSuggestions([]);
        if (remainingAttempts === 1) {
            resetGame();
        } else {
            setPassButtonDisabled(true);
            setIsButtonGray(true);
            setTimeout(() => {
                setIsButtonGray(false);
                setPassButtonDisabled(false);
            }, 5000);
            setPixelSize(15);
            getRandomAnime();
            setRemainingAttempts(remainingAttempts - 1);
            setAlreadyInserted([]);
            sessionStorage.setItem('remainingAttempts', remainingAttempts - 1);
        }
    };

    const checkAnswer = () => {
        setInputText("");
        setSuggestions([]);
        const isInputCorrect = allAnimeTitles.some(anime =>
            anime.titles.some(title =>
                title.title.toLowerCase() === inputText.trim().toLowerCase()
            )
        );
        for(let i = 0; i < alreadyInserted.length; i++){
            if(inputText === alreadyInserted[i]){
                return;
            }
        }
        if (isInputCorrect) {
            if (inputText.trim().toLowerCase() === animeTitle?.toLowerCase()) {
                setAnswerCorrect();
            } else if (remainingAttempts - 1 === 0) {
                setAnswerWrong();
            } else {
                if(pixelSize === 15){
                    setPixelSize(pixelSize - 3);
                    sessionStorage.setItem('pixelSize', pixelSize - 3);
                }else if(pixelSize <= 12 && pixelSize > 6){
                    setPixelSize(pixelSize - 2);
                    sessionStorage.setItem('pixelSize', pixelSize - 2);
                }else if(pixelSize === 6){
                    setPixelSize(0);
                    sessionStorage.setItem('pixelSize', 0);
                }
                setRemainingAttempts(prevAttempts => prevAttempts - 1);
                setAlreadyInserted(prevNames => [inputText, ...prevNames]);
            }
        }
        sessionStorage.setItem('remainingAttempts', remainingAttempts - 1);
        sessionStorage.setItem('alreadyInserted', JSON.stringify([...alreadyInserted, inputText]));
    };
    
    const getRandomAnime = () => {
        const englishTitles = allAnimeTitles.filter(anime => anime.titles.some(title => title.type === "English"));
        const randomIndex = Math.floor(Math.random() * englishTitles.length);
        const randomAnime = englishTitles[randomIndex];
        const randomTitle = randomAnime.titles.find(title => title.type === "Default").title;
        setCorrectAnime(randomAnime);
        setAnimeTitle(randomTitle);
        setAnimeCover(randomAnime.images.jpg.large_image_url);
        setPixelSize(15);
        setIsAnswerCorrect(false);
        setIsAnswerWrong(false);
        sessionStorage.setItem('animeTitle', randomTitle);
        sessionStorage.setItem('animeCover', randomAnime.images.jpg.large_image_url);
        sessionStorage.setItem('correctAnime', JSON.stringify(randomAnime));
        sessionStorage.setItem('remainingAttempts', 6);
        sessionStorage.setItem('alreadyInserted', JSON.stringify([]));
        sessionStorage.setItem('pixelSize', 15);
    };
    

    const resetGame = () => {
        setPixelSize(15);
        setRemainingAttempts(6);
        setScore(0);
        getRandomAnime();
        setAlreadyInserted([]);
        sessionStorage.setItem('remainingAttempts', 6);
        sessionStorage.setItem('alreadyInserted', JSON.stringify([]));
    };

    const setAnswerWrong = () => {
        setIsAnswerWrong(true);
        setIsAnswerCorrect(false);
        setPixelSize(0);
        setRemainingAttempts(6);
        setScore(0);
        setAlreadyInserted([]);
        setPlayWrongSound(true);
    };

    const setAnswerCorrect = () => {
        setIsAnswerCorrect(true);
        setPixelSize(0);
        setRemainingAttempts(6);
        setAlreadyInserted([]);
        setScore(score + 1);
        setPlayCorrectSound(true);
    };

    const handleInputChange = (e) => {
        const searchText = e.target.value;
        setInputText(searchText);
        if (!searchText) {
            setSuggestions([]);
            return;
        }
        const filteredTitles = allAnimeTitles.filter(title => 
            title.titles.some(t => t.type === 'Default' && t.title.toLowerCase().includes(searchText.toLowerCase()))
        );
        setSuggestions(filteredTitles.slice(0, 50));
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
                {!(isAnswerWrong) && 
                <h3>QUAL O ANIME DA CAPA?</h3>
                }
                {(isAnswerWrong) && 
                <h3 className="title_game_over">VOCÊ PERDEU!</h3>
                }
            </div>
            <div className="img__container">
                <div className={`blur ${pixelSize < 6 && remainingAttempts === 1? 'strong-blur' : ''}`}>
                    {animeCover && <ImagePixelated
                        width={300} height={430}
                        className="image"
                        pixelSize={pixelSize}
                        src={animeCover}
                    />}
                </div>
            </div>
            <div className="if__correct">
                {(isAnswerCorrect || isAnswerWrong) && 
                    <h1 className="anime_title">{animeTitle}</h1>
                }
                {(isAnswerCorrect || isAnswerWrong) && 
                    <button className="next_button" onClick={getRandomAnime}>{isAnswerCorrect ? "Próximo" : "Jogar Novamente"}</button>
                }

            </div>
            {!(isAnswerCorrect || isAnswerWrong) &&
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
                        <button type="button" className={`btn__pass ${isButtonGray ? "gray" : ""}`} onClick={dontKnow} disabled={passButtonDisabled}>
                            NÃO SEI
                        </button>
                        <button type="button" className="btn__check" onClick={checkAnswer}>ADIVINHAR 推測</button>
                    </div>
                </div>
            }
            {!(isAnswerCorrect || isAnswerWrong) &&
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
            }
            {!(isAnswerCorrect || isAnswerWrong) &&
                <div className="effort__text">
                    <h5>{`${remainingAttempts} tentativas restantes`}</h5>
                </div>
            }
            {!(isAnswerCorrect || isAnswerWrong) &&
                <div className="inserted__container">
                    {alreadyInserted.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Tipo</th>
                                <th>Status</th>
                                <th>Data de Estreia</th>
                                <th>Estúdio</th>
                            </tr>
                        </thead>
                        <tbody>
                        {alreadyInserted.map((insertedName, index) => {
                            const anime = allAnimeTitles.find(anime => {
                                return anime.titles.some(title => title.title === insertedName);
                            });
                            if (anime) {
                                const correctYear = correctAnime.aired.string.split(" to ")[0].split(",")[1].trim();
                                const year = anime.aired.string.split(" to ")[0].split(",")[1].trim();
                                return (
                                    <tr key={index} className="inserted__info">
                                        <td className={`table-cell ${correctAnime.title === anime.title ? "correct-cell" : "incorrect-cell"}`}>{anime.title}</td>
                                        <td className={`table-cell ${correctAnime.type === anime.type ? "correct-cell" : "incorrect-cell"}`}>{anime.type}</td>
                                        <td className={`table-cell ${correctAnime.status === anime.status ? "correct-cell" : "incorrect-cell"}`}>{anime.status}</td>
                                        <td className={`table-cell ${correctYear === year ? "correct-cell" : "incorrect-cell"}`}>{correctYear > year ? year+"▸" : "◂"+year || correctYear === year}</td>
                                        <td className={`table-cell ${correctAnime.studios[0].name === anime.studios[0].name ? "correct-cell" : "incorrect-cell"}`}>{anime.studios[0].name}</td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <div key={index} className="inserted__info">
                                        <div className="inserted__name">{insertedName}</div>
                                        <div className="inserted__details">
                                            <p>Anime information not found</p>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        </tbody>
                    </table>
                    }
                </div>
            }
            <Footer />
        </div>
    )
}
