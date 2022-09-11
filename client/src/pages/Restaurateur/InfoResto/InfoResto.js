import React from 'react';
import Axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import './InfoResto.scss';
import errorImage from 'assets/error.png';
import { Link } from 'react-router-dom';
import { UserContext } from "Context";


function InfoResto() {
    const [RestaurantInformations, setRestaurantInformations] = useState([]);
    const [imageRestaurant, setImageRestaurant] = useState("");

    const [user] = useContext(UserContext);

    useEffect(() => {
      if (user.isRestaurantCompleted) {
        Axios.get('http://localhost:3001/api/restaurant/' + user.id).then((response) => {   
            setRestaurantInformations(response.data[0]);
            setImageRestaurant('http://localhost:3001/upload/restaurant/' + response.data[0].image_resto);
        });
      }
    }, [user])

    
    return(
        <div>
            <div className='mainContainerGererMonResto'>
                {user?.isRestaurantCompleted ? <div className='XXX'>
                  
                  <h2>Vous avez renseigné un restaurant : </h2>
                  <div className="div-infos-resto">
                      <img src={imageRestaurant} alt="imgRestaurant"/>
                      <div className="infos-resto">
                        <p>Nom :</p><p> {RestaurantInformations.name}</p>
                        <p>Adresse :</p><p> {RestaurantInformations.address}</p>
                        <p>Description :</p><p> {RestaurantInformations.description}</p>
                    </div>
                    <div className="divBoutonGererCarte">
                      <Link to="/carte-resto"><button className="boutonGererCarte">Ma Carte</button></Link>
                    </div>
                  </div>
                </div>  
                : <div className='restoNonRenseigne'> 

                    <img className="errorImg" src={errorImage} alt="errorImg" />
                    <p className='whiteCardText'> Aïe ! Vous n'avez pas encore renseigné votre restaurant dans notre base de données. <br></br>
                    <Link to='/ajouter-resto'>Lancez-vous</Link> dans l'aventure Foodelivery ! </p>

                  </div>
                }      
            </div>
            
        </div>                    
    );

};

export default InfoResto;
