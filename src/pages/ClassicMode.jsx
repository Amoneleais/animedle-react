import React, { useState, useEffect } from "react";
import { ImagePixelated } from "react-pixelate";
import '../styles/ClassicMode.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function ClassicMode() {
    const [animeTitle, setAnimeTitle] = useState(null);
    const [animeCover, setAnimeCover] = useState(null);
    const [inputText, setInputText] = useState('');
    const [remainingAttempts, setRemainingAttempts] = useState(6);
    
    const total = 58066;
    let displayed = [];

    useEffect(() => {
        fetchAnimeTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAnswer = () => {
        if (inputText.trim().toLowerCase() === animeTitle?.toLowerCase()) {
            setRemainingAttempts(6); 
            fetchAnimeTitle();
        } else {
            setRemainingAttempts(prevAttempts => prevAttempts - 1);
        }
    }

    const fetchAnimeTitle = () => {
        setAnimeCover(null);
        let animeId = Math.floor(Math.random() * 58066) + 1;
        if(animeId > total){
            fetchAnimeTitle();
        }
        else{
            for(let i = 0; i < displayed.length; i++){
                if(displayed[i] === animeId){
                    animeId = Math.floor(Math.random() * 58066) + 1;
                    i = 0;
                }
            }
    
            const apiUrl = `https://api.jikan.moe/v4/anime/${animeId}`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const title = data.data.title;
                    const cover = data.data.images.jpg.large_image_url;
                    setAnimeCover(cover);
                    setAnimeTitle(title);
                })
                .catch(error => {
                    displayed.push(animeId);
                    fetchAnimeTitle();
                });
        }
    };

    return (
        <div className="App">
            <Header></Header>
            <div className="title__container">
                <h3>QUAL O ANIME DA CAPA?</h3>
            </div>
            <div className="img__container">
                {animeCover && <ImagePixelated 
                    width={300} height={430}
                    className="image"
                    pixelSize={1} 
                    src={animeCover}
                />}
            </div>
            <div className="search__container">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className="btn__container">
                    <button type="button" className="btn__pass" onClick={() => setInputText(animeTitle)}>NÃO SEI</button>
                    <button type="button" className="btn__check" onClick={checkAnswer}>ADIVINHAR 推測</button>
                </div>
            </div>
            <div className="info__container">
                <div className="effort__container">
                    <div className="effort__box"></div>
                    <div className="effort__box"></div>
                    <div className="effort__box"></div>
                    <div className="effort__box"></div>
                    <div className="effort__box"></div>
                    <div className="effort__box"></div>
                </div>
                <div className="score__container">
                    <p className="score__display">Placar: 0</p>
                </div>
            </div>
            <div className="effort__text">
                <h5>{`${remainingAttempts} tentativas restantes`}</h5>
            </div>
            <Footer></Footer>
        </div>
    )
}