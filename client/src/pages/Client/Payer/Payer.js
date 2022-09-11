import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Axios from 'axios';
import { useHistory } from 'react-router';
import './Payer.scss'; 
import { PanierContext } from "Context";
import { UserContext } from "Context";
import HoraireCard from "./HorairesCard/HorairesCard";
function Payer() {

    const [panier,setPanier] = useContext(PanierContext);
    const [user,] = useContext(UserContext);
    const [somme,setSomme ] = useState(0);
    const taille = panier.length + 1 ;
    const [error, setError] = useState(null);
    const [horairetab, setHorairetab] = useState([]);
    const [adresseLivraison, setAdresseLivraison] = useState(user.adress);
    const history = useHistory();

    const AfficherPanier = () => {   
 
        return panier.map((item, index) => { 
            return <tr key={index}>
                <td className="plat">{item.quantite}</td>
                <td className="plat">{item.nom}</td>
                <td className="price">{(item.prix*item.quantite)} €</td>
            </tr>
        })
    }

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

            // https://medium.com/nerd-for-tech/integrating-paypal-sandbox-with-react-js-project-191caf0a7b53

    const createOrder = (data, actions) =>{
        // if (adresseLivraison) {
            return actions.order.create({
                purchase_units: [
                    {
                    amount: {
                            currency: "EUR",
                            value: 0.01 ,    //somme* 1.09885
                            },
                    },
                ],
            });
        // } else {
        //     if(window.confirm('Vous devez renseigner une adresse de livraison !')){
        //         window.location.reload(false);
        //     }
        // }
        
    };

    const onApprove = (data, actions) => { 
        creationCommande();
        envoyerMailConfirmation();
        history.push('/suivi-commande');
        return actions.order.capture();       
    }

    if(error){
        if(window.confirm('Une erreur est survenue lors du paiement, veuillez réesayer.')){
            window.location.reload(false);
        }
    }

    const envoyerMailConfirmation = () => {
        Axios({
            method: 'post',
            url: 'http://localhost:3001/api/user/node-mailer',
            data: {
                mail: user.mail
            }
        })
        .catch(error => {
            console.error(error)
        })        
    }

     const creationCommande = async () => {
            const today = new Date() ;
            const dateC = today.getFullYear() + '-' + (today.getMonth()+ 1) + '-' + today.getDate();
            const horaire = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var harrondi = today.getHours() + ":00:00";
            if (today.getMinutes() >= 30){
                harrondi = today.getHours() + ":30:00";
            }
        
            var idResto = -1;
            panier.map(element => { 
                idResto = element.idresto
                return <></>
            });

             const result = await Axios({
                method: 'post',
                url: 'http://localhost:3001/api/commande/',
                data: {
                    idClient: user.id,
                    idResto: idResto,
                    dateC: dateC,
                    horaire: horaire,
                    harrondi : harrondi, 
                    adresseLivraison: adresseLivraison,
                }
            })
            const lastId = result.data.insertId
            panier.map(element => { 
                const idPlat = element.idplat 
                const nbPlat = element.quantite
                insertionListePanier(idPlat,nbPlat,lastId);
                return <></>
            }); 
            setPanier([]);                        
        }

    const insertionListePanier = (idPlat,nbPlat,lastId) => {
        Axios({
            method: 'post',
            url: 'http://localhost:3001/api/commande/insererpanier',
            data: {
                idCommande: lastId,
                idPlat: idPlat,
                nbPlat: nbPlat
            }
        })
        .then(res => {
            //console.log(res);
        })
        .catch(error => {
            console.error(error)
        })        
    }    

    const Displaycard = () => {
        // console.log(horairetab);
        return horairetab.map((item) => {
            return <HoraireCard horaire={item} />;
        })            
    }

    useEffect(() => {
        const buildHoraire = () => {
            Axios({
                method: 'get',
                url: 'http://localhost:3001/api/restaurant/infoResto/' + panier[0].idresto            
            })
            .then(res => {
                const debutmatin = res.data[0].debutMatin;
                const finmatin = res.data[0].finMatin;
                const debutsoir = res.data[0].debutSoir;
                const finsoir = res.data[0].finSoir;
                // const debutSoir = res.data[0].debutSoir;
                // const finSoir = res.data[0].finSoir;
    
                let time_template = [];
                for (let i=0; i<24; i++) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                time_template.push(`${i}:00:00`);
                time_template.push(`${i}:30:00`);
                }         

                const i_debutm = time_template.indexOf(debutmatin);
                const i_finm = time_template.indexOf(finmatin);
                const i_debuts = time_template.indexOf(debutsoir);
                const i_fins = time_template.indexOf(finsoir);
                const final_tab = time_template.filter((item, index) => (i_debutm <= index && i_finm >= index) || (i_debuts <= index && i_fins >= index));
                setHorairetab([...final_tab]);
            })
        }
        buildHoraire();

        let test = 0 ;
        panier.forEach((item) => { 
            test += item.prix*item.quantite ;
            
        })
        setSomme(test.toFixed(2));
    }, [panier, horairetab]); 

        return(
            <div className="validerPanier">
                    
                    <div className="top">
                        <h1>Valider mon panier</h1>
                        <p id="note">*Uniquement via Paypal</p>
                    </div>
                    
                <div className="entiere">    
                    <div className="gauche">
                        <div className='cardhoraireslivraison'>
                            {horairetab.length !== 0 ? <Displaycard /> : <></>}
                        </div>                        
                        <div className="formu">
                            <form method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">
                                <p>
                                <label >Adresse de livraison </label> </p>
                                    <input type="text" name="adresse" value={adresseLivraison} onChange={(event) => {setAdresseLivraison(event.target.value)}} required></input>                               
                                                       
                            </form>
                            
                            <div id="payer">
                                <PayPalButton 
                                    createOrder={(data, actions) => createOrder(data, actions)}
                                    onApprove={(data, actions) => onApprove(data, actions)}
                                    onError={() => setError(true)}                                
                                />
                            </div> 
                        </div>

                        
                            
                                    
                                          
                    </div>
                    

                    
                    
                    <div className="droite">
                        

                        <div className="macommande">
                                <h2>Ma Commande</h2>
                        </div>
                        
                        
                        <div className="tabcommande">
                            <table cellPadding={taille} >
                                <AfficherPanier />
                                    
                                <tr className="somme">
                                    <td colSpan="2">Total</td>
                                    <td className="price">{somme} €</td>
                                </tr>
                            </table>
                        </div>
                        

                    </div>
                </div>
           
           
           
            </div>

        );
    
    
}
export default Payer;
