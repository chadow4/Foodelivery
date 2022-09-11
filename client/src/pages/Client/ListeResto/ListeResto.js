import React, { useState, useEffect } from 'react';
import './ListeResto.scss';
import Axios from 'axios';

import Card from './Card/Card';

function ListeResto() {

    const [allRestaurants, setAllRestaurants] = useState(null);

    useEffect(() => {
        getAllRestaurant();
    }, []); 

    const getAllRestaurant = () => {
        Axios.get("http://localhost:3001/api/restaurant")
        .then((response) => {
            if (response){
                setAllRestaurants(response);
            } 
        });
    }

    const DisplayAllCard = () => {
        return allRestaurants.data.map((item, index) => {       
            return <Card key={index} idresto={item.id} img={'http://localhost:3001/upload/restaurant/' + item.image_resto} name={item.name} description={item.description}/>
         });
    }

    return(
        <div className="partenaires">
            {allRestaurants && <DisplayAllCard />}
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
        
    );

}

export default ListeResto;