import './CardCommandeEnCours.scss';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function CardCommandeDispo({num,idCommande, idResto, idClient, horaire}) {
    
    const [adresseResto , setAdresseResto] = useState("") ;
    const [adresseClient , setAdresseClient] = useState("") ;

    useEffect(() => {
        const getInfoCommande = async () => {
            
            const result = await Axios.get('http://localhost:3001/api/restaurant/infoResto/' + idResto) ;
            setAdresseResto(result.data[0].address);
            const result2 = await Axios.get('http://localhost:3001/api/user/' + idClient) ;
            setAdresseClient(result2.data[0].adress);
        }
        getInfoCommande();
    }, [idResto, idClient]); 

    
    function RefreshPage(){
        window.location.reload(false);
    }

    function ValiderLivraison(){
        console.log("Test");
        Axios({
            method: 'put',
            url: 'http://localhost:3001/api/commande/etatLivraison',
            data: {
                idCommande: idCommande 
            }
        })
        RefreshPage();

    }

    

    return (
        <div className='commande-container'>
            
            <div>
                <div className="commande-num">              
                    <p> Numéro de commande: {num}</p>
                </div>
                <div className="commandev-card-body">
                    <p> Restaurant: {adresseResto}</p>
                    <p> Adresse de livraison: {adresseClient}</p>
                </div>
            </div>
            <div>
                <hr className="commande-hr"></hr>
                <div className="commande-prix" >
                    <button id="commande-bouton" onClick={ValiderLivraison}>Commande livrée</button>
                    
                </div>
            </div>
        </div>
    )
}

export default CardCommandeDispo;