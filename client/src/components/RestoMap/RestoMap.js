import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import "./RestoMap.css";

function RestoMap(props) {
  // GUIDE pour la suite de ce composant :
  // lorsque le restaurateur va ajouter son restaurant, une API recevra en entrée le str de l'addresse du restaurant
  // et nous offrira en sortie des coordonnées latitude/longitude
  // Ces coordonnées nous permettrons d'ajouter un PIN (ici Marker) sur cette carte.
  // On voit ici qu'un console.log fait l'objet du onCLick d'un des PINS
  // A terme, il faudra grâce à ce même onClick faire apparaître une petite fenêtre en transparence
  // avec les informations du restaurant concerné + un bouton de type "Accéder à la carte du restaurant".

  const [markers, setMarkers] = useState([
    { lat: 45.76731, lng: 4.83431 }, // INSA Lyon
    { latitude: 45.72954, longitude: 4.99492 }, // j'habite ici LOL
    { latitude: 45.766682, longitude: 5.00358 },
  ]); // Joris habite par là xD

  const mapStyles = {
    width: "100%",
    height: "70%",
  };

  const displayMarkers = () => {
    return markers.map((marker, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  return (
    <div>
      <Map
        google={props.google}
        zoom={11}
        style={mapStyles}
        initialCenter={{ lat: 45.78641, lng: 4.88198 }}
      >
        {displayMarkers()}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.apiKey,
})(RestoMap);
