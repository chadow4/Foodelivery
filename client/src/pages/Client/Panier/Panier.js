import React, { useContext} from 'react';
import './Panier.scss';
import { PanierContext } from "Context";
import { UserContext } from "Context";
import { Link } from 'react-router-dom';

function Panier() {
    const [panier, setPanier] = useContext(PanierContext);
    const [user] = useContext( UserContext);

    const Afficherliste = () => {

            return panier.map((item, index) => { 
                const deletePlat = () => {
                    let tab = panier;
                    tab = tab.filter(element => element !== item);
                    setPanier(tab);
                }

                const deleteElement = () => {
                    let tab = panier;
                    if (item.quantite === 1) {
                        deletePlat();
                        return;
                    }

                    tab = tab.map(element => {
                        if (element === item) element.quantite -= 1;
                        return element;
                    })
                    setPanier(tab);
                }

                const addElement = () => {
                    let tab = panier;
                    tab = tab.map(element => {
                        if (element === item) element.quantite += 1;
                        return element;
                    })
                    setPanier(tab);
                }

                if (item.quantite < 1) {
                    deletePlat();
                    return<></>
                }


                return <li key={index} className="article-panier">
                    <p>{item.nom}</p>
                    <p>{item.prix}</p>
                    <div onClick={addElement} className="buton-delete-element">+</div>
                    <p>{item.quantite}</p>
                    <div onClick={deleteElement} className="buton-delete-element">-</div>
                    <div onClick={deletePlat} className="buton-delete">Supprimer le plat</div>
                    
                </li>
                
             });
    };


    const CheckLogin = () => {

        if (user != null ){
            return  <Link to='/payer'> <p>Valider mon panier</p> </Link> 
        }
        else {
            return <Link to='/connexion'> <p>Se connecter </p> </Link>
        } 
    }

    return <div className="panier-infos">
            <h2>Vos articles :</h2>
            {panier.length ? <Afficherliste /> 
             
            : <p>Votre panier est vide</p>}
            {panier.length >=1 && 
            <div className="bouton-valider"> <CheckLogin /> </div>
            }
    </div>
}

export default Panier; 

