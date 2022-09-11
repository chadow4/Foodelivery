import Axios from 'axios';
import React, {useState,useEffect,useContext} from 'react';
import { UserContext } from 'Context';
import './SuiviCommande.scss';

import suiviG2 from 'assets/suiviG2.png';
import suiviG3 from 'assets/suiviG3.png';
import suiviG4 from 'assets/suiviG4.png';
import suiviO1 from 'assets/suiviO1.png';
import suiviO2 from 'assets/suiviO2.png';
import suiviO3 from 'assets/suiviO3.png';
import suiviO4 from 'assets/suiviO4.png';


function SuiviCommande() {
    const [etatLivraison, setEtatLivraison] = useState();
    const [etatPreparation, setEtatPreparation] = useState();
    const [idLivreur, setIdLivreur] = useState();
    const [user] = useContext(UserContext);
    useEffect(() => {
        const getInfosCommandes = () => {
            Axios.get("http://localhost:3001/api/commande/infosCommandes/"+ user.id)
            .then((response) => {
                if (response){
                    if(response.data[0]!=null){
                        setEtatPreparation(response.data[0].etat_preparation);
                        setEtatLivraison(response.data[0].etat_livraison);
                        setIdLivreur(response.data[0].id_livreur);
                    }
                   
                }
            });
        }
        getInfosCommandes();
    },[user.id]);
    

    return(
        <div className="suiviCommande">
                <div className="top">
                    <h1>Suivi de ma commande</h1>
                </div>
                {etatPreparation!=null?      
                <div className="stepImages">
                    <img src={suiviO1} alt="circle1" />
                    {etatPreparation === 0 ?  <img src={suiviG2} alt="circle2" /> : <img src={suiviO2} alt="circle2" />}
                    {idLivreur === 0 ?  <img src={suiviG3} alt="circle3" /> :  <img src={suiviO3} alt="circle3"/>}
                    {etatLivraison === 0 ?  <img src={suiviG4} alt="circle4" /> : <img src={suiviO4} alt="circle4" />}
                </div> 
                :
                <p>Vous n'avez pas de commande en cour !</p>
                }

        </div>     
    );
}

export default SuiviCommande; 