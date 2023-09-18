import React from 'react';
import LogoInHeader from '../images/logo/header-logo.svg';

const Header = () => {
    return (
        <header className="header">
            <img src={LogoInHeader} className="header__logo" alt="Место"/>
        </header>
    );
};

export default Header;