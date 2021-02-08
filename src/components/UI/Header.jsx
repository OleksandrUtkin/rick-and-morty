import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {

    return (
        <header className='header'>
            <nav>
                <Link to="/" className="header__link">Characters</Link>
                <Link to="/episodes" className="header__link">Episodes</Link>
                <Link to="/locations" className="header__link">Location</Link>
                <Link to="/my-watch-list" className="header__link">My Watch List</Link>
            </nav>
        </header>
    );
};

export default Header;
