import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="title">
        <h1>ANIMEDLE</h1>
        <p>アニメの言葉</p>
      </div>
      <div className="navigation__container">
        <div
          className={`menu-icon ${isMenuOpen ? "hidden" : ""}`}
          onClick={openMenu}
        >
          ☰
        </div>
        {isMenuOpen && (
          <div ref={sideMenuRef} className="side-menu open" onClick={closeMenu}>
            <div className="close-btn">&times;</div>
            <Link to={"/"} className="button">
              Modos de Jogo
            </Link>
            <Link to={"/"} className="button">
              Como jogar?
            </Link>
            <Link to={"/"} className="button">
              Suporte
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
