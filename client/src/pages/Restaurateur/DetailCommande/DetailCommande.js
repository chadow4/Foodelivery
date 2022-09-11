import './DetailCommande.scss';
import React from 'react';
import { useParams } from 'react-router-dom';

function DetailCommande() {
    let { id } = useParams();  

    return (
        <div className='commande-container'>
            <div>
                <div className="commande-num">
                    <h3 >Commande N°{id}</h3>
                    <p>A préparer avant {'x-x-x'}</p>
                </div>
                <div className="commandev-card-body">
                    <ul className="commande-liste">
                       
                    </ul>
                </div>
            </div>
            <div>
                <hr className="commande-hr"></hr>
                <div className="commande-prix" >
                    <p className="commande-somme">€</p>
                    
                </div>
            </div>
        </div>
    )
}

export default DetailCommande;