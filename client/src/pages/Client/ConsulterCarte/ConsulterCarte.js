import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

import './ConsulterCarte.scss';

import Plat from './Plat/Plat';

function ConsulterCarte() {
    const [allPlats, setAllPlats] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        Axios.get(("http://localhost:3001/api/plat/" + id))
        .then((response) => {
            if (response){
                setAllPlats(response);
                //console.log(response);
            } 
        })
    }, [id]); 


    const DisplayAllCard = () => {
        return allPlats.data.map((item, index) => {       
            return <Plat key={index} idplat={item.id} image={'http://localhost:3001/upload/plat/' + item.image} nom={item.nom} prix={item.prix} idresto={item.id_resto}/>
        });
    }

    return <div className="consulterCarte">
            {allPlats ? <DisplayAllCard /> : <h1>Ooops, le restaurateur ne semble pas avoir renseigné de plats pour le moment...</h1>}            
    </div>

}

export default ConsulterCarte;