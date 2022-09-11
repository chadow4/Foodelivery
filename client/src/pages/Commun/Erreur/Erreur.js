import React from 'react';
import './Erreur.scss';

import errimg from 'assets/erreur-pic.jpg';

function Erreur() {

    return <div className="errormain">
        <h2>
            Vous n'êtes pas autorisé à accéder à cette page !
        </h2>
        <img src={errimg} alt="errimg" />
    </div>
}

export default Erreur; 
