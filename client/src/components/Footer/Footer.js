import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {

    return <div className="footer">
    <footer className="bg-light text-center text-lg-start">

    <div className="text-center p-3">
        © 2020 Copyright -
        <Link to='/' className="text-dark">Foodelivery</Link>
    </div>

    </footer>
</div>
}

export default Footer; 
