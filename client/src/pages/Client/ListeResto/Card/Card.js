import React from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

function Card({idresto, img, name, description}){

    return (
    <div className="card">
        <div className="card-body">
            <img src={img} className="card-img-top" alt="..." />
            <h5 className="card-title text-uppercase font-weight-bold">{name}</h5>
            <p className="card-text">{description}</p>
            <div className="button-link-plat">
                <Link to={'consulter-carte/' + idresto}><button>Voir la carte</button></Link>
            </div>
        </div>
    </div>
    );
}

export default Card;

