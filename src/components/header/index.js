import React from "react";
import './header.css'
import { FiSearch } from 'react-icons/fi'

function Header() {
    const name = 'Andrea';

    return (
        <header className="header">
            <div className="header__buttons-container">
                <button className="search-button"><FiSearch style={{color: '#86a2eb', fontSize: '24px'}}/></button>
            </div>
            <h1 className="header__greeting">What's up, { name }!</h1>
        </header>
    )
}

export { Header }