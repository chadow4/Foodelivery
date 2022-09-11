import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';

import './CarteResto.scss';
import CardPlat from './CardPlat/CardPlat';

import ClosingImage from 'assets/closing.png';
import EditPlat from './EditPlat/EditPlat';

import { UserContext } from "Context";

function CarteResto() {
    const [hasPlatCompleted,setHasPlatCompleted]= useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    const [displayFormUpdate, setDisplayFormUpdate] = useState(false);
    const [infosPlat, setInfosPlat] = useState([]);
    const [image, setImage] = useState("");
    const [update, setUpdate] = useState(0);

    const [nomPlat, setNom ]= useState("");
    const [prixPlat, setPrix] = useState();

    const [user] = useContext(UserContext);

    useEffect(() => {
        Axios({
            method: 'post',
            url: 'http://localhost:3001/api/plat/user',
            data: {
                id: user.id
            }
        })
        .then((response) => {
            if (!response.err){
                setInfosPlat(response);
                setHasPlatCompleted(true);
            } 
        })
        .catch((error) => {
            console.log(error)
        })
    }, [user, update]); 


    const ajouterUnPlat = (e) => { 
        e.preventDefault();
        const file = image;
        const formData = new FormData(); 
        formData.append('photo', file);
        formData.append('nomPlat', nomPlat);
        formData.append('prixPlat', prixPlat);
        formData.append('id', user.id);

        Axios.post('http://localhost:3001/api/plat', formData, { 
            headers: { 'Content-Type': 'multipart/form-data' },
            credentials: 'include',
        })
        .then(res => {
            setUpdate(old => old + 1);
            setDisplayForm(false);
        })
        .catch(error => {
            console.error(error)
        })
    }; 

    const getImageUpload = (event) => {
        setImage(event.target.files[0]);
    }

    const DisplayCard = () => {
        return infosPlat.data.map((item, index) => {       
           return <CardPlat key={index} setUpdate={setUpdate} setDisplayFormUpdate={setDisplayFormUpdate} idplat={item.id} nom={item.nom} prix={item.prix} image={'http://localhost:3001/upload/plat/' + item.image} />
        });
    };


        return(
            <div className="maindivGererMaCarte">                 

                {hasPlatCompleted && <DisplayCard />}                
                                                                            
                <button className="boutonAjouterPlat" onClick={() => setDisplayForm(true)}>Ajouter un plat</button>

                {displayForm && (  
                    <div className="formPlat">
                        <form onSubmit={ajouterUnPlat} class="form-plat-body">
                            <div className="divCloseButton">
                                <input type="image" className="imageClose" alt="close" src={ClosingImage} onClick={() => setDisplayForm(false)}/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="name ">Nom : </label>
                                <input type="text" name="name" id="name" required onChange={(e) => { setNom(e.target.value); }} />
                            </div>
                            <div class="form-example">
                                <label htmlFor="prix">Prix :</label>
                                <input type="text" name="prix" id="prix" required 
                                onChange={(e) => {
                                 setPrix(e.target.value);
                                }}/>
                            </div>
                            <div class="form-example">
                                <label htmlFor="img">Image de votre plat :</label>
                                <input type="file" name="photo" accept="image/*" multiple={false} onChange={getImageUpload}/>
                            </div>
                            <div class="input-enregistrer">
                                <button type="submit" value="Enregistrer">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                )
                }

                {displayFormUpdate && <EditPlat setUpdate={setUpdate} plat={infosPlat.data.find(item => parseInt(displayFormUpdate) === parseInt(item.id))} setDisplayFormUpdate={setDisplayFormUpdate} />}
                    

            </div>
        );
    
}

export default CarteResto;