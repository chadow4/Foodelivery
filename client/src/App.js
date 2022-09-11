import 'App.css';
import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

/* librairies */
import 'assets/bootstrap.min.css';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';

/* composants commun */
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import Accueil from 'pages/Commun/Accueil/Accueil';
import Compte from 'pages/Commun/Compte/Compte';
import Connexion from 'pages/Commun/Connexion/Connexion';
import Inscription from 'pages/Commun/Inscription/Inscription';
import Contact from 'pages/Commun/Contact/Contact';
import Erreur from 'pages/Commun/Erreur/Erreur';

/* composants client */
import ConsulterCarte from 'pages/Client/ConsulterCarte/ConsulterCarte';
import ListeResto from 'pages/Client/ListeResto/ListeResto';
import Payer from 'pages/Client/Payer/Payer';
import Panier from 'pages/Client/Panier/Panier';
import SuiviCommande from 'pages/Client/SuiviCommande/SuiviCommande';

/* composants restaurateur */
import CarteResto from 'pages/Restaurateur/CarteResto/CarteResto';
import Commande from 'pages/Restaurateur/Commande/Commande';
import InfoResto from 'pages/Restaurateur/InfoResto/InfoResto'
import DetailCommande from 'pages/Restaurateur/DetailCommande/DetailCommande';
import AjouterResto from 'pages/Restaurateur/AjouterResto/AjouterResto';

/* composants livreur */
import Plage from 'pages/Livreur/Plage/Plage';
import CommandeDispo from 'pages/Livreur/CommandeDispo/CommandeDispo';
import CommandeEnCours from 'pages/Livreur/CommandeEnCours/CommandeEnCours';

import { UserContext } from "Context";

function App() {
  const [user] = useContext(UserContext);
  const type = user ? user.TypeInscription : "C";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <BrowserRouter>

        <Header /> 

        {!user && <Route exact path="/inscription" component={Inscription} />}
        {!user && <Route exact path="/connexion" component={Connexion} />}

        <Route exact path="/" component={Accueil} /> 
        <Route exact path="/compte" component={Compte} /> 
        <Route exact path="/contact" component={Contact} /> 
        
        {type === "C" && <> 
        <Route exact path="/liste-resto" component={ListeResto} />
        <Route exact path="/consulter-carte/:id">
          <ConsulterCarte />
        </Route>
        <Route exact path="/payer" component={Payer} />
        <Route exact path="/panier" component={Panier} />
        <Route exact path="/suivi-commande" component={SuiviCommande} />
        
        <Route exact path="/carte-resto" component={Erreur} />
        <Route exact path="/commande" component={Erreur} />
        <Route exact path="/info-resto" component={Erreur} />
        <Route exact path="/detail-commande/:id" component={Erreur} />
        <Route exact path="/ajouter-resto" component={Erreur} />
        <Route exact path="/mes-horaires" component={Erreur} />
        <Route exact path="/commande-dispo" component={Erreur} />
        <Route exact path="/commande-en-cours" component={Erreur} />
        </>}

        {type === "R" && <>
        <Route exact path="/info-resto" component={InfoResto} />
        <Route exact path="/detail-commande/:id" component={DetailCommande} />
        <Route exact path="/ajouter-resto" component={AjouterResto} />
        <Route exact path="/commande" component={Commande} />
        <Route exact path="/carte-resto" component={CarteResto} />

        <Route exact path="/liste-resto" component={Erreur} />
        <Route exact path="/consulter-carte/:id">
          <Erreur />
        </Route>
        <Route exact path="/payer" component={Erreur} />
        <Route exact path="/panier" component={Erreur} />
        <Route exact path="/suivi-commande" component={Erreur} />
        <Route exact path="/mes-horaires" component={Erreur} />
        <Route exact path="/commande-dispo" component={Erreur} />
        <Route exact path="/commande-en-cours" component={Erreur} />
        </>}

        {type === "L" && <>
        <Route exact path="/mes-horaires" component={Plage} />
        <Route exact path="/commande-dispo" component={CommandeDispo} />
        <Route exact path="/commande-en-cours" component={CommandeEnCours} />

        <Route exact path="/liste-resto" component={Erreur} />
        <Route exact path="/consulter-carte/:id">
          <Erreur />
        </Route>
        <Route exact path="/payer" component={Erreur} />
        <Route exact path="/panier" component={Erreur} />
        <Route exact path="/suivi-commande" component={Erreur} />
        <Route exact path="/carte-resto" component={Erreur} />
        <Route exact path="/commande" component={Erreur} />
        <Route exact path="/info-resto" component={Erreur} />
        <Route exact path="/detail-commande/:id" component={Erreur} />
        <Route exact path="/ajouter-resto" component={Erreur} />
        </>}

        <Footer />
       
      </BrowserRouter>
  );
}

export default App;
