import React, { useContext} from 'react';
import './Header.scss';

import logo from 'assets/logo.png';
import panier_image from 'assets/panier.png';
import myaccount from 'assets/myaccount.png'

import { UserContext } from "Context";
import { Link } from 'react-router-dom';

function Header() {

    const [user, setUser] = useContext(UserContext);

    const openNav = () => document.getElementById("myNav").style.height = "100%";
    const closeNav = () => document.getElementById("myNav").style.height = "0%";
    
    const type = user ? user.TypeInscription : "C";

    return <div className="header">
    <header>
        <div className='logo'>
            <Link to='/'><img src={logo} alt="Logo" /></Link>
        </div>
        <div className='contactAndButton'>
            <h1 className='questions'>Une question / Une suggestion ?</h1>
            <button className='contact'>Nous contacter</button>
        </div>
    </header>
    <nav>
        <div className='gauche'>
            <Link to='/'><li className="julien">Accueil</li></Link>

            {type === "C" && <>
                <Link to='/liste-resto'><li className="julien">Les Restaurants Partenaires</li></Link>
                <Link to='/contact'><li className="julien">Contact</li></Link>
            </>}
            {user != null && type==="C" && <>
                <Link to='/suivi-commande'><li className="julien">Suivi de ma commande</li></Link>
            </>}

            {type === "R" && <>
                <Link to='/info-resto'><li className="julien">Mon Restaurant</li></Link>
                <Link to='/carte-resto'><li className="julien">Modifier Ma Carte</li></Link>
                <Link to='/commande'><li className="julien">Mes Commandes</li></Link>
            </>}

            {type === "L" && <>
                <Link to='/mes-horaires'><li className="julien">Mes horaires</li></Link>  
                <Link to='/commande-dispo'><li className="julien">Livraisons Disponibles</li></Link>
                <Link to='/commande-en-cours'><li className="julien">Mes Livraisons</li></Link>
            </>}
        </div>

        <div className='droite'>
            {user ?
                <div className='droitecomponent'>
                    <div className="text-white">
                        <Link to='/compte'>
                            <img className="myaccount" src={myaccount} alt="myAccount" />
                        </Link>
                        <p>{user.firstname}</p>
                        <Link to="/" onClick={() => { window.localStorage.removeItem("user"); setUser(null); }}>                                
                            <li className='deco'>Se déconnecter</li>
                        </Link>
                        {type === "C" && <Link to="/panier" > <img className='img' src={panier_image} alt="Logo" />
                            <span className='badge badge-warning' id='lblCartCount'> 0 </span></Link>}
                    </div>
                </div>
            :
            <div className='droitecomponent'>
                <Link to="/inscription"><li>S'inscrire</li></Link>
                <Link to="/connexion"><li>Se connecter</li></Link>
                {type === "C" && <Link to="/panier" > <img className='img' src={panier_image} alt="Logo" />
            <span className='badge badge-warning' id='lblCartCount'> 0 </span></Link>
            }
            </div>
            }
            
            <li><span className="cursor" onClick={openNav}>&#9776;</span></li>          
          






            <div id="myNav" className="overlay">
                <div className="closebtn" onClick={closeNav}>&times;</div>
                    <div className="overlay-content">
                        <Link to='/' onClick={closeNav}>Accueil</Link>
                        {type === "C" && <>
                            <Link to='/liste-resto'>Les Restaurants Partenaires</Link>
                        </>}

                        {type === "R" && <>
                            <Link to='/info-resto'>Mon Restaurant</Link>
                            <Link to='/carte-resto'>Modifier Ma Carte</Link>
                            <Link to='/commande'>Mes Commandes</Link>
                        </>}

                        {type === "L" && <>
                            <Link to='/mes-horaires'>Mes horaires</Link>                        
                            <Link to='/commande-dispo'>Livraisons Disponibles</Link>
                            <Link to='/commande-en-cours'>Mes Livraisons</Link>
                        </>}
                        {user ?
                        <div>
                             <div>
                                 <Link to='/compte' onClick={closeNav}>Mon compte</Link>
                            </div>
                            <div onClick={() => { window.localStorage.removeItem("user"); setUser(null); }}>                                
                            <Link to="/" onClick={closeNav}>Se déconnecter</Link>
                            </div>
                        </div>
                    :                              
                    <div>
                        <Link to="/inscription" onClick={closeNav}>S'inscrire</Link>
                        <Link to="/connexion" onClick={closeNav}>Se connecter</Link>
                    </div>
                }
                </div>
            </div>
        </div>
    </nav>
</div>
}

export default Header; 