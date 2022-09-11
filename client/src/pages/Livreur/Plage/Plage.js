import Axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import CardPlage from './CardPlage/CardPlage';
import { UserContext } from 'Context';
import './Plage.scss';

function Plage() {

    //distribuer la liste dans un state tableau + mapping du tableau dans cardplage
    const [user] = useContext(UserContext);
    const [plageTab, setPlageTab] = useState([]); 
    

    useEffect(() => {
        const GetDispo = () => {
            Axios({
                method: 'get',
                url : 'http://localhost:3001/api/user/getdispo/'+ user.id
            })
            .then((response) => {
                setPlageTab(response.data);     
            })
            .catch((error) => {
                console.log(error);
            })
        }
        GetDispo(); // remplir les cartes à chaque chargement de la page
    }, [user.id]);

    const AfficherCardPlage = () => {
        return plageTab.map((item, index) => {       
            return <CardPlage key={index} horaire={item.horaire} dispo={item.disponible}/>
         });
    }

    return <div className="plage">
        <div className='title'>
            <h1>
                J'indique mes disponibilités de la journée
            </h1>
        </div>
        <div className='listePlage'>
            <AfficherCardPlage />
        </div>
    </div>
}

export default Plage; 
