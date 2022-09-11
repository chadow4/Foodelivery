import React, { useState, useContext, useEffect } from 'react';
import './CommandeEnCours.scss';
import { UserContext } from 'Context';
import Axios from 'axios';
import CardCommandeEnCours from './CardCommandeEnCours/CardCommandeEnCours';

function CommandeEnCours() {
const[commande, setListeCommande]=useState([]);
const [user]=useContext(UserContext);

useEffect(() => {
    const getCommande = async () => {
        const idLivreur = user.id;
        const result = await Axios.get('http://localhost:3001/api/commande/commandeSelectionnee/' + idLivreur);
        setListeCommande(result.data);
    }          
    getCommande();
}, [user.id]);

const DisplayCommande= ()=> {
    return commande.map((item, index)=>{return <CardCommandeEnCours idCommande={item.id_commande} idClient={item.id_client} horaire={item.horaire} idResto={item.id_resto} num={index+1}/>})
}
    return <div className="">
        {commande.length ? <DisplayCommande/>
        :
        <p>Aucune commande séléctionée</p>
    }
    </div>
}

export default CommandeEnCours; 