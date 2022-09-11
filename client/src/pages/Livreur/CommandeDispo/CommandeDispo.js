import React, { useState, useContext, useEffect } from 'react';
import './CommandeDispo.scss';
import { UserContext } from 'Context';
import Axios from 'axios';
import CardCommandeDispo from './CardCommandeDispo/CardCommandeDispo';

function CommandeDispo() {
const[commande, setListeCommande]=useState([]);
const [user]=useContext(UserContext);

useEffect(() => {
    const getCommande = () => {
        Axios({
            method: 'get',
            url : 'http://localhost:3001/api/commande/livreur/'+ user.id
        })
        .then((response) => {
            setListeCommande(response.data); 
            console.log(response.data); 
        })
        .catch((error) => {
            console.log(error);
        })       
    }  
    getCommande();
}, [user.id]);

const DisplayCommande= ()=> {
    return commande.map((item, index)=>{
        return <CardCommandeDispo idCommande={item.id_commande} idClient={item.id_client} horaire={item.horaire} date={item.date} idResto={item.id_resto} num={index+1}/>})
}
    return <div className="">
        {commande.length ? <DisplayCommande/>
        :
        <p>Aucune commande disponible</p>
    }
    </div>
}

export default CommandeDispo; 