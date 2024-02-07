import React from 'react';

import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header>
            <div className='title'>
                <h1>ANIMEDLE</h1>
                <p>アニメの言葉</p>
            </div>
            <div className='navigation__container'>
                <Link to={"/"} className='button'>Modos de Jogo</Link>
                <Link to={"/"} className='button'>Como jogar?</Link>
                <Link to={"/"} className='button'>Suporte</Link>
            </div>
        </header>
    );
};