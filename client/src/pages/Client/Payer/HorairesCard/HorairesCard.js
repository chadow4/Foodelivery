import React from 'react';

import './HorairesCard.scss';

function HorairesCard({horaire}){

    return(
    <div className="horaires-card">
        <button className='buttonhoraireliv'>{horaire}</button>
    </div>
    );
}

export default HorairesCard;

