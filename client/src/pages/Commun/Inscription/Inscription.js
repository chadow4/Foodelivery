import React from 'react';
import { useState } from "react";
import Axios from "axios";

import './Inscription.scss';
import { useHistory } from 'react-router';

function Inscription() {
    const history = useHistory();

    const [firstnameReg, setFirstnameReg] = useState("");
    const [lastnameReg, setLastnameReg] = useState("");
    const [mailReg, setMailReg] = useState("");
    const [adressReg, setAdressReg] = useState("");
    const [phoneReg, setPhoneReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [typeReg, setTypeReg] = useState("");
  
    const register = () => {
        //console.log(typeReg);
        Axios.post("http://localhost:3001/api/user", {
        firstname: firstnameReg,
        lastname: lastnameReg,
        mail: mailReg,
        adress:adressReg,
        phone: phoneReg,
        password:passwordReg,
        typeReg:typeReg
      }).then((response) => {
        history.push('/');
      });
    };

    return(
        <div className="register">
          <div id='container'>
           
          <div className="former" data-aos="fade-down" data-aos-duration="1500">
              <div className="card">
              <h2>INSCRIPTION</h2>
                <div className="mb-4">
                  <label htmlFor="exampleInputLastName1" className="form-label">Nom :</label>
                  <input type="text" name="nom" className="form-control" placeholder="Nom" required="required" autoComplete="off" 
                          onChange={(e) => {
                              setLastnameReg(e.target.value);
                            }}
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputFirstName1" className="form-label">Prénom :</label>
                  <input type="text" name="prenom" className="form-control" placeholder="Prénom" required="required" autoComplete="off"
                          onChange={(e) => {
                              setFirstnameReg(e.target.value);
                            }}
                  
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
                  <input type="email" name="email" className="form-control" placeholder="Email" required="required" autoComplete="off"
                          onChange={(e) => {
                              setMailReg(e.target.value);
                            }}
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputAdress1" className="form-label">Adresse :</label>
                  <input type="text" name="adresse" className="form-control" placeholder="Adresse" required="required" autoComplete="off" 
                          onChange={(e) => {
                              setAdressReg(e.target.value);
                            }}
                  
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="examplePhone1" className="form-label">Numéro de téléphone :</label>
                  <input type="number" name="numéro de téléphone" className="form-control" placeholder="Numéro de téléphone" required="required" autoComplete="off" 
                          onChange={(e) => {
                              setPhoneReg(e.target.value);
                            }}
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe :</label>
                  <input type="password" name="password" className="form-control" placeholder="Mot de passe" required="required" autoComplete="off" 
                          onChange={(e) => {
                              setPasswordReg(e.target.value);
                            }}
                  
                          />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPasswordConfirm1" className="form-label">Confirmer le mot de passe :</label>
                  <input type="password" name="mot de passe" className="form-control" placeholder="Mot de passe" required="required" autoComplete="off" />
                </div>
                <div className="mb-4">
                          <p>Je suis :</p>
                          <div id="radio1">
                              <input value='C' onChange={(e) => {
                                  setTypeReg(e.target.value)
                              }} type="radio" id="radio" name="inputRadio" required="required"></input>
                              <label className="form-check-label" > Un client</label> 
                          </div>
                          <div id="radio2">
                              <input value='R' onChange={(e) => {
                                  setTypeReg(e.target.value)
                              }} type="radio" id="radio" name="inputRadio" required="required"></input>
                              <label className="form-check-label" > Un restaurateur</label> 
                          </div>
                          <div className="radio3">
                              <input value='L' onChange={(e) => {
                                  setTypeReg(e.target.value)
                              }} type="radio" id="radio" name="inputRadio" ></input>
                              <label className="form-check-label" > Un livreur </label> 
                          </div>
                      </div>
    
                <button type="button" className="btn btn-primary btn-block" onClick={register}>S'inscrire !</button>
                               
              
              </div>
            </div>
            
          
          
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
    );

}


export default Inscription;