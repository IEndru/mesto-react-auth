import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import LogoInHeader from '../images/logo/header-logo.svg';

const Header = ({ loggedIn, userEmail, onSignOut }) => {
    return (
        <header className="header">
            <img src={LogoInHeader} className="header__logo" alt="Место" />
            <Routes>
                <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
                <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                <Route path="/" element={loggedIn && (
                    <nav className="header__block-link">
                        <span className="header__email">{userEmail}</span>
                        <button className="header__sign-exit" onClick={onSignOut}>
                            Выйти
                        </button>
                    </nav>
                )} />
            </Routes>
        </header>
    );
};

export default Header;




























