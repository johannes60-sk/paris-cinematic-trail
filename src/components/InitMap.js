import React, { useEffect, useState } from "react";
import './../styles/main.css';
import { Loader } from "@googlemaps/js-api-loader";
import ArrondissementSelector from "./ArrondissementSelector ";
import { DataSetArrondissement } from "./DataSetArrondissement";
import { DataSetLieuTournage } from "./DataSetLieuTournage";


const InitMap = () => {
  const [map, setMap] = useState();
  const [departementsLayer, setDepartementsLayer] = useState(null);
  const [lieuxTournageLayer, setLieuxTournageLayer] = useState(null);
  const [loader, setLoader] = useState();
  const [buttonSubmitted, setButtonSubmitted] = useState(false);


  const handleButtonSubmit = (e) => {
    setButtonSubmitted(true);
  };


  useEffect(() => {

    setLoader(new Loader({
      apiKey: "AIzaSyDgyWTlYOUbBWJWFdqyW35_Gg4iuDKQqhI",
      version: "weekly",
    }));
  }, [])

  useEffect(() => {
    // Initialisation de la carte et des couches

    if (loader) {

      loader.load().then(async () => {
        const { Map } = await window.google.maps.importLibrary("maps");

        const departmentsLayerInstance = new window.google.maps.Data();

        const lieuxTournageInstance = new window.google.maps.Data();

        const paris = { lat: 48.8566, lng: 2.3522 };

        const initMap = new Map(document.getElementById("map"), {
          center: paris,
          zoom: 12,
        });


        setMap(initMap);
        setDepartementsLayer(departmentsLayerInstance);
        setLieuxTournageLayer(lieuxTournageInstance)

      });

    }
  }, [loader]);


  useEffect(() => {
    // Fonction pour récupérer les données des arrondissements
    if (map && departementsLayer) {

      DataSetArrondissement(departementsLayer, map);
      DataSetLieuTournage(lieuxTournageLayer, map, 10);

    }
  }, [map, lieuxTournageLayer, departementsLayer]);



  return (
    <div className="container-fluid main">

      <h1 className="text-center fw-bold fs-2 my-3">Paris Cinematic Trail</h1>

      <div className="container-fluid  offset-2" >

        <div className="row">

          {map &&
            <ArrondissementSelector lieuxTournageInstance={lieuxTournageLayer} mapInstance={map}
              buttonSubmitted={buttonSubmitted}
              resetButtonState={() => setButtonSubmitted(false)} />
          }

          <div className="col-md-3" >
            <input type="number" className="form-control" id="limit_lieux_tournage"
              placeholder="limite de lieux de tournage " style={{ height: '57px' }} />
          </div>

          {/* <div className="col-md-3">
            <SelectFiled buttonSubmitted={buttonSubmitted} 
            resetButtonState={() => setButtonSubmitted(false)}/>
          </div> */}

          <div className="col-md-3">

            <button type="submit" id="submitRequestBtn" className="btn btn-outline-success mt-2"
              onClick={handleButtonSubmit}>Envoyer</button>
          </div>

        </div>
      </div>

      <div id="map" ></div>
    </div>
  )
}

export default InitMap;
