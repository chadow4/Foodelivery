import React from 'react';
import Axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from 'react-router';

import './Connexion.scss';

import { UserContext } from "Context";

function Connexion() {

    const [mailLog, setMailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");
    const [LoginAlert, setLoginAlert] = useState("");
    const [checked, setChecked] = useState(false);
    const history = useHistory();
    const [, setUser] = useContext(UserContext);

    const connect = (data_user) => {
        setUser(data_user);

        window.localStorage.setItem("user", JSON.stringify(data_user));

        history.push("/");
    }
  
    const login = () => {
      Axios.post("http://localhost:3001/api/user/login", {
        mail: mailLog,
        password: passwordLog,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginAlert(response.data.message);
        } else {
          connect(response.data[0]);
        }
      });
    };

    return(
        <div className="login">
          <div id='container' >
            <form className="former" data-aos="fade-down" data-aos-duration="1500">
              <div className="card">
                <h2>CONNEXION</h2>
                <div className="mb-4">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email :</label>
                  <input type="email" name="email" className="form-control" placeholder="Email" required="required" autoComplete="username"
                      onChange={(e) => {
                          setMailLog(e.target.value);
                        }}
                      />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe :</label>
                  <input type="password" name="password" autoComplete='current-password' className="form-control" placeholder="Mot de passe" required="required"
                      onChange={(e) => {
                          setPasswordLog(e.target.value);
                        }}
                      />
                </div>
                <div className="mb-4 form-check">
                <input type="checkbox" onChange={() => setChecked(checked)}/> 
                  <label className="form-check-label" htmlFor="exampleCheck1">Se souvenir de moi</label>
                 </div>
                 <button type="button" className="btn btn-primary btn-block" onClick={login}> Se connecter </button>
                 <div className='alert'>
                    <div data-aos="fade-right">
                      {LoginAlert}
                    </div>                      
                  </div>  
              </div>
            </form>
         
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

export default Connexion;