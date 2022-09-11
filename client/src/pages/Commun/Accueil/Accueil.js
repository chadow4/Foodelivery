import React, { useContext } from 'react';
import './Accueil.scss';

import circle1 from 'assets/circle1.png';
import circle2 from 'assets/circle2.png';
import circle3 from 'assets/circle3.png';
import circle4 from 'assets/circle4.png';

import { Link } from "react-router-dom";
import { PanierContext } from 'Context';
function Accueil() {

    const [panier] = useContext(PanierContext);

    return <div className="home"> 
    <section  className='top'>
        <h2>Un petit creux ? Vous êtes au bon endroit !</h2>
        <p className="separator">Commander ici</p>
        <p>Entrez votre adresse pour trouver les restaurants à proximité</p>
        <form className="form-inline">
            <input className="tailleinput form-control mr-sm-2" type="search" placeholder="Rechercher" aria-label="Rechercher" />
            <Link to='/foodelivery-maps'><button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => console.log(panier.lenght)}>Rechercher</button></Link>
        </form>
    </section>

    <section className='bottom'>
        <h2>Vous faire livrer n'a jamais été aussi simple</h2>
        <div className="separator">en 4 étapes</div>
        <div className='stepImages'>
        <img src={circle1} alt="circle1" />
        <img src={circle2} alt="circle2" />
        <img src={circle3} alt="circle3" />
        <img src={circle4} alt="circle4" />
        </div>
    </section>
</div>

}

export default Accueil; 