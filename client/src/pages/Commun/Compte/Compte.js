import React, { useEffect, useState, useContext } from 'react'; // import necessaire pour utiliser le useState
import './Compte.scss';
import Axios from "axios";
import myaccount from 'assets/myaccount.png';
import { UserContext } from "Context";
import { Link } from 'react-router-dom';
import ClosingImage from 'assets/closing.png';

function Compte() {
    const [user,setUser] = useContext(UserContext);
    const type = user.TypeInscription;
    const id=user.id;
    const [displayForm, setDisplayForm] = useState(false); // on défini la displayForm
    const [displayFormPassword, setDisplayFormPassword] = useState(false); // on défini la displayFormPassword
    const [firstnameModif, setFirstnameModif] = useState(user.firstname);
    const [lastnameModif, setLastnameModif] = useState(user.lastname);
    const [mailModif, setMailModif] = useState(user.mail);
    const [phoneModif, setPhoneModif] = useState(user.phone);
    const [update, setUpdate] = useState(0);
    const [passwordModif, setpasswordModif] = useState();
    const [passwordModifRetape, setpasswordModifRetape] = useState();


    useEffect(() => {
      const recupInfos = () =>{
        Axios({
          method:'get',
          url:'http://localhost:3001/api/user/'+ id
        })
        .then(res=>{
          console.log(res.data[0]);
          setUser(res.data[0]);
        })
      }
      recupInfos();
      
      
  }, [update, id, setUser]); 

    const modificationdDuCompte = (e) => {
      e.preventDefault();
      console.log("hello");
      console.log(firstnameModif);
      console.log(lastnameModif);
      console.log(id);
      console.log(mailModif);
      console.log(phoneModif);
      Axios.put("http://localhost:3001/api/user", {
      firstname: firstnameModif,
      lastname: lastnameModif,
      id:id,
      mail: mailModif,
      phone: phoneModif,
    }).then((response) => {
      setUpdate(old => old + 1);
      setDisplayForm(false);
    })
    .catch(error => {
        console.error(error)
    })
  };

  const modificationdMotdePasse = (e) => {
    if (passwordModif === passwordModifRetape)
    Axios.put("http://localhost:3001/api/user/modifmdp/", {
    id:id,
    passwordModif: passwordModif,
  }).then((response) => {
    setDisplayFormPassword(false);
  })
  .catch(error => {
      console.error(error)
  })
};

    return  <div id="Compte">
    <div id="container2">
       <div className="secondchild">
         <div className="menu">
           <div className="personne"><img className="logo" src={myaccount} alt="myAccount" />
             {user.firstname}
           </div>
           <div className="infodateinscription">
             <h2>Date inscription :</h2>
             <h6>{user.date_inscription}</h6> 
           </div>
         </div>
         <div className="details">
             <h1 id="details">Details du compte : </h1>
             <p><b>Nom :</b> {user.lastname} </p>
             <p><b>Prénom :</b> {user.firstname} </p>
             <p><b>Mail :</b> {user.mail} </p>
             <p><b>Telephone :</b> {user.phone} </p>

             {type === "R"  && <p><b>Type de compte :</b> Restaurateur</p>}
             {type === "L"  && <p><b>Type de compte :</b> Livreur</p>}   
             {type === "C"  && <p><b>Type de compte :</b> Client</p>} 
             <button className="boutonModifierCompte" onClick={() => setDisplayForm(true)}>Modifier mes Informations</button> 
             <button className="boutonModifierCompte" onClick={() => setDisplayFormPassword(true)}>Modifier le mot de passe</button>
         </div>

       </div>
       
       {type === "R" ? <div className="ZoneGererResto"><Link to='/info-resto'><button className="boutonGererResto" >+</button></Link></div> : <div></div>} 
       {displayForm && (  
                    <div className="formCompte">
                        <form onSubmit={modificationdDuCompte} class="form-compte-body">
                            <div className="divCloseButton">
                                <input type="image" className="imageClose" alt="close" src={ClosingImage} onClick={() => setDisplayForm(false)}/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="name ">Nom : </label>
                                <input type="text" name="nom" id="nom"  value={lastnameModif}   onChange={(e) => {
                              setLastnameModif(e.target.value);
                            }} required/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="prix">Prenom :</label>
                                <input type="text" name="prenom" id="prenom" value={firstnameModif} onChange={(e) => {
                              setFirstnameModif(e.target.value);
                            }}required/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="prix">Mail :</label>
                                <input type="text" name="mail" id="mail" value={mailModif} onChange={(e) => {
                             setMailModif(e.target.value);
                            }}required/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="prix">Telephone :</label>
                                <input type="text" name="tel" id="tel" value={phoneModif} onChange={(e) => {
                             setPhoneModif(e.target.value);
                            }} required/>
                            </div>
                            <div class="input-enregistrer">
                                <button type="submit" value="Enregistrer">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                )
        }
        {displayFormPassword && (  
                    <div className="formCompte">
                        <form onSubmit={modificationdMotdePasse} class="form-compte-body">
                            <div className="divCloseButton">
                                <input type="image" className="imageClose" alt="close" src={ClosingImage} onClick={() => setDisplayForm(false)}/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="name ">Nouveau mot de passe : </label>
                                <input type="password" name="password" id="password"   onChange={(e) => {
                              setpasswordModif(e.target.value);
                            }}/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="prix">Retapez le mot de passe :</label>
                                <input type="password" name="passwordretape" id="passwordretape" onChange={(e) => {
                              setpasswordModifRetape(e.target.value);
                            }}/>
                            </div>
                            <div class="input-enregistrer">
                                <button type="submit" value="Enregistrer">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                )
        }
        <div id='wave'>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
     </div>  

      
                       
 </div>
}

export default Compte; 