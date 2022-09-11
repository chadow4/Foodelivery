import Axios from 'axios';
import { UserContext } from 'Context';
import React, { useContext } from 'react';
import './CardPlage.scss';

function CardPlage({horaire, dispo}) {

    const [user] = useContext(UserContext);

    const ChangerStatutHoraire = () => {
        console.log(user.id);
        console.log(horaire);
        Axios({
            method: 'put',
            url: 'http://localhost:3001/api/user/mes-horaires', 
            data: {
                id: user.id,
                horaire: horaire,
            }
        })
        window.location.reload(false); 
    }

    let btn_class = (dispo === 1) ? 'greenButton' : 'redButton'; 

    return <div className="card-plage">
        <button className={btn_class} onClick={ChangerStatutHoraire}>{horaire}</button>
    </div>
}

export default CardPlage; 