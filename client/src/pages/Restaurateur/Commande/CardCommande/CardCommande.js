import './CardCommande.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function CardCommande({num,idCommande, idClient}) {
    
    const [couleur, setCouleur ]= useState("red")
    const [listeProduitCommande , setListeProduitCommande] = useState([]) ;
    const [ total, setTotal ]= useState(0) ;

    useEffect(() => {
        const getListeProduit = async () => {
            const result = await Axios.get('http://localhost:3001/api/commande/liste/' + idCommande) ;
            setListeProduitCommande(result.data)      
            var somme = 0 ;
            result.data.forEach(item=>{
                somme = somme+ (item.nb_plat*item.prix); 
            });
            setTotal(somme.toFixed(2));
        }
        getListeProduit();
    }, [idCommande]); 

    const DisplayCard =() => {
        return listeProduitCommande.map((item, index)=>{
            
            return <li key={index} className="commande-li"><p>{item.nb_plat} {item.nom} </p><p className="commande-prix-produit">{item.prix} €</p></li> 
        }) ;   
    }
    
    function ChangerCouleur(){
        Axios({
            method: 'put',
            url: 'http://localhost:3001/api/commande/etatPreparation',
            data: {
                idCommande: idCommande, 
            }
        })
        setCouleur("green");

    }

    return (
        <div className='commande-container'>
            
            <div>
                <div className="commande-num">              
                    <Link to={`/detailCommande/${num}`}> <h3  >Commande N°{num} </h3> </Link>
                    <p>A préparer avant </p>
                </div>
                <div className="commandev-card-body">
                    <ul className="commande-liste">
                        {listeProduitCommande.length && <DisplayCard/>}
                    </ul>
                </div>
            </div>
            <div>
                <hr className="commande-hr"></hr>
                <div className="commande-prix" >
                    <button id="commande-bouton" onClick={ChangerCouleur} style={{backgroundColor: couleur , borderColor: couleur }} >Commande prête</button>
                    <p className="commande-somme"> {total !== 0 && total} €</p>
                    
                </div>
            </div>
        </div>
    )
}

export default CardCommande;