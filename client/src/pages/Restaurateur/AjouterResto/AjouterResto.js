import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { UserContext } from "Context";
import './AjouterResto.scss';

function AjouterResto() {
    const [user, setUser] = useContext(UserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null); 
    const [ouvertureMatin, setOuvertureMatin] = useState(null);
    const [fermetureMatin, setFermetureMatin] = useState(null);
    const [ouvertureSoir, setOuvertureSoir] = useState(null);
    const [fermetureSoir, setFermetureSoir] = useState(null);

    const history = useHistory();

    const getImageUpload = (event) => {
        setImage(event.target.files[0]);
    }

    const addMyRestaurant = () => {
        const file = image;

        if (!file) {
            alert("Image manquante");
            return;
        }
        
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('name', name);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('sessionID', user.id);
        formData.append('debutMatin', ouvertureMatin);
        formData.append('finMatin', fermetureMatin);
        formData.append('debutSoir', ouvertureSoir);
        formData.append('finSoir', fermetureSoir);

        axios.post('http://localhost:3001/api/restaurant', formData, { 
            headers: { 'Content-Type': 'multipart/form-data' },
            credentials: 'include',
        })
        .then((res, error) => {
            if (!res.err) {
                const change_user = Object.assign({}, user);
                change_user.isRestaurantCompleted = 1;
                
                setUser(change_user);
                
                setUser(change_user);                
                history.push('/info-resto');
            } else {
                console.log(res.err)
                console.log(res.err);
            }
        })
        .catch(error => {
            console.error(error)
            console.error(error);
        })
    }

    return(
        <div>
          <div className='mainContainerAjouterMonResto'>                  
              <div class="login-box">
                  <h2>Mon Restaurant</h2>
                    <form>
                      <div class="user-box">
                          <input type="text" name="name" required="required" onChange={(event) => { setName(event.target.value) }}/>
                          <label>Nom du restaurant</label>
                      </div>
                      <div class="user-box">
                          <input type="text" name="address" required="required" onChange={(event) => { setAddress(event.target.value) }}/>
                          <label>Adresse du restaurant</label>
                      </div>
                      <div class="user-box">
                          <input type="text" name="description" required="required" onChange={(event) => { setDescription(event.target.value) }}/>
                          <label>Description</label>
                      </div>
                      <div class="user-box">
                          <input type="file" name="photo" accept="image/*" multiple={false} onChange={getImageUpload} />
                          <label>Importer une photo de votre établissement</label>
                      </div>  
                      <div class="user-box">
                          <input type="time" name="debut-matin" required="required" onChange={(event) => {setOuvertureMatin(event.target.value)}} />
                          <label>Le matin, j'ouvre à ?</label>
                      </div>
                      <div class="user-box">
                          <input type="time" name="fin-matin" required="required" onChange={(event) => {setFermetureMatin(event.target.value)}} />
                          <label>Le matin, je ferme à ?</label>
                      </div>    
                      <div class="user-box">
                          <input type="time" name="debut-apresmidi" required="required" onChange={(event) => {setOuvertureSoir(event.target.value)}} />
                          <label>En fin d'après-midi, j'ouvre à ?</label>
                      </div>    
                      <div class="user-box">
                          <input type="time" name="debut-matin" required="required" onChange={(event) => {setFermetureSoir(event.target.value)}} />
                          <label>Le soir, je ferme à ?</label>
                      </div>        
                      <button type="button" onClick={addMyRestaurant}>Ajouter le restaurant</button>                    
                    </form>
              </div>
          </div>
      </div>
    );

}

export default AjouterResto;
