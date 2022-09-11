import React from 'react';
import Axios from 'axios';

import './CardPlat.scss';

function CardPlat({idplat,nom,prix,image, setDisplayFormUpdate, setUpdate }) {

    console.log(idplat);

    const supprimerLePlat = () => {
        Axios({
            method: 'delete',
            url: 'http://localhost:3001/api/plat',
            data: {
                id: idplat
            }
        })
        .then((result) => {
            setUpdate(old => old + 1);
        })
        
    }
        
    return(
    <div className="cardPlat">
        <div className="cardPlat-body">
            <div className='platImageCard'>
                <img src={image} className="cardPlat-img-top" alt="..." />
            </div>
            <h5 className="cardPlat-title text-uppercase font-weight-bold">{nom}</h5>
            <p className="cardPlat-text">{prix} €</p>
            <button className='platBouton' onClick={() => setDisplayFormUpdate(idplat)}>Modifier</button>
            <button className='platBouton' onClick={supprimerLePlat}>Supprimer</button>
        </div>        
    </div>
    
    )  

}

export default CardPlat;

