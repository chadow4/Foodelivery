import React, { useState } from 'react';
import ClosingImage from 'assets/closing.png';
import axios from 'axios';

import './EditPlat.scss';

function EditPlat({ plat, setDisplayFormUpdate, setUpdate }) {    

    const [nom, setNom] = useState(plat.nom);
    const [prix, setPrix] = useState(plat.prix);
    const [image, setImage] = useState(null);

    const getImageUploaded = (event) => {
        setImage(event.target.files[0]);
    }

    const enregistrerLesModifications = () => {
            const file = image;
            const formData = new FormData();
            formData.append('idPlat', plat.id);
            formData.append('nom', nom);
            formData.append('prix', prix);
            formData.append('photo', file);
            formData.append('previousImagePath', plat.image);

            axios.put('http://localhost:3001/api/plat', formData, { 
                headers: { 'Content-Type': 'multipart/form-data' },
                credentials: 'include',
            })
            .then(res => {
                console.log(res);
                if (!res.err) {
                    setDisplayFormUpdate(false);
                    setUpdate(old => old + 1);
                }
            })
            .catch(error => {
                console.error(error)
            })
        
    }

    return(
    <div className="formPlatUpdate">
        <form action="" method="get" class="form-update">
            <div className="divCloseButtonUpdate">
                <input type="image" alt="close" className="imageCloseUpdate" src={ClosingImage} onClick={() => setDisplayFormUpdate(false)}/>
            </div>
            <div class="form-example">
                <label htmlFor="name ">Nom : </label>
                <input type="text" value={nom} onChange={e => setNom(e.target.value)} name="name" id="name" required />
            </div>
            <div class="form-example">
                <label htmlFor="prix">Prix :</label>
                <input type="text" value={prix} onChange={e => setPrix(e.target.value)} name="prix" id="prix" required />
            </div> 
            <div class="form-example">
                <label htmlFor="img">Choisir une nouvelle image :</label>
                <input type="file" name="photo" accept="image/*" multiple={false} onChange={getImageUploaded}/>
            </div> 
            <div class="input-enregistrer">
                <input type="button" value="Enregistrer" onClick={enregistrerLesModifications}/>
            </div>
        </form>
    </div>
    );
    
}

export default EditPlat;