import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import './Commande.scss';
import CardCommande from './CardCommande/CardCommande';
import { UserContext } from "Context";
function Commande() {
    const [user] = useContext(UserContext);
    const [listeCommande , setListeCommande ]= useState([]) ;
    
        useEffect(() => {
          const getCommande = async () => {
            const result = await Axios.get('http://localhost:3001/api/restaurant/' + user.id);
            const idResto = result.data[0].id;
            const result2 = await Axios.get('http://localhost:3001/api/commande/' + idResto);
            setListeCommande(result2.data);
          }          
          getCommande();
      }, [user.id]); 
        
        const DisplayCard = () => {
          if (!listeCommande.length) return null;
           return listeCommande.map((item1, index) => {
            return <CardCommande key={index}  num={index+1}  idCommande={item1.id_commande}/>
          })
        }

        return(
            <div className="commande-body">
              <h2>Vos Commandes :</h2>
              <div className="commande-plats">
                {listeCommande.length && <DisplayCard/>}
              </div>
              
            </div>
        );
}

export default Commande; 