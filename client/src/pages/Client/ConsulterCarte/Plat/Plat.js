import React, { useState,useContext } from 'react';
import './Plat.scss';
import { PanierContext } from "Context";

function Plat({ idplat, nom, prix, image, idresto }){

    const [panier, setPanier] = useContext(PanierContext);
    const [update, setUpdate] = useState(0);

    const deletePanier = () => {
        let tab = panier;
        tab = tab.filter(element => element.idplat !== idplat);
        setPanier(tab);
        setUpdate(update + 1);
    }

    const getDernierIDRestoInseré = () => {
        let tab = [...panier];
        if (tab.length === 0) {
            return idresto;
        } else {
            return tab.at(-1).idresto;
        }
    }

        const addPanier = () => {
            let tab = [...panier];
            const dernierID = getDernierIDRestoInseré();
            const plat = tab.find(item => item.idplat === idplat);

            if (dernierID === idresto){
                if (!plat) {
                tab.push({idplat: idplat,nom: nom ,prix: prix, quantite: 1, idresto: idresto});
                } else {
                    tab = tab.map(item => {
                        if (item.idplat === idplat) 
                            item.quantite += 1; 
                        return item;
                    })
                }
                //console.log(tab);
                setUpdate(update + 1);
                setPanier(tab);
            } else {
                window.alert("Oops, vous ne pe pouvez pas commander dans plusieurs restaurants simultanément.");
            }            
        }

            const deleleElement = () => {
                let tab = [...panier];
                const plat = tab.find(item => item.idplat === idplat);
                let operation = false;

                tab = tab.map(element => {
                    if (element === plat) element.quantite -= 1;
                    if (element === 0) operation = true;
                    return element;
                })
                
                setPanier(tab);
                setUpdate(update + 1);
                if (operation) deletePanier();
            }

            const AfficherPanier  = () => {
                const quantite = panier.find(item => item.idplat === idplat)?.quantite;

                return <>{quantite ? 
                    <div className="bouton-quantite">
                        <button className='platBouton' onClick={addPanier}>+</button> 
                         <p>   {quantite}</p>
                        <button className='platBouton' onClick={deleleElement} >-</button>
                    </div>
                    :<div className="bouton-ajouter" onClick={addPanier}>
                       <p> Ajouter au panier</p>
                    </div>
                }</>
            }

    return(
    <div className="cardPlat">
        <div className="cardPlat-body">
            <div className='platImageCard'>
                <img src={image} className="cardPlat-img-top" alt="..." />
            </div>
            <h5 className="cardPlat-title text-uppercase font-weight-bold">{nom}</h5>
            <p className="cardPlat-text">{prix} €</p>
            <AfficherPanier />

        </div>        
    </div>
    )

}

export default Plat;

