import React from "react";
import { ImagePixelated } from "react-pixelate";
import '../styles/ClassicMode.css';
import Header from '../components/Header/Header'

export default function ClassicMode() {

    return (
        <div className="App">
            <Header></Header>
            <div className="title__container">
                <h3>QUAL O ANIME DA CAPA?</h3>
            </div>
            <div className="img__container">
                <ImagePixelated 
                    width={320} height={450}
                    className="image"
                    pixelSize={12} 
                    src="https:\/\/cdn.myanimelist.net\/images\/anime\/1314\/108941l.jpg"
                />
            </div>
            <div className="search__container">
                <input
                    type="text"
                    placeholder="Buscar..."
                />
                <button type="submit" className="btn__pass">NÃO SEI</button>
                <button type="submit" className="btn__check">ADIVINHAR 推測</button>
            </div>
            <div className="effort__container">
                <div className="effort__box"></div>
                <div className="effort__box"></div>
                <div className="effort__box"></div>
                <div className="effort__box"></div>
                <div className="effort__box"></div>
                <div className="effort__box"></div>
            </div>
            <div className="effort__text">
                <h5>6 tentativas restantes</h5>
            </div>
        </div>
    )
}




