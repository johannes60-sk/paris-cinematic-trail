import axios from "axios";
import { PopulateArrondissements } from "./PopulateArrondissementsSelect"; 

export function DataSetLieuTournage (lieuxTournageInstance, mapInstance, limit = null) {

    let lieuxTournageLayer = lieuxTournageInstance;
    let map = mapInstance;

    async function fetchDataSetLieuTournage  () {

       if(lieuxTournageInstance, mapInstance){

        try {
  
            const response = await axios.get('http://localhost:3000/api/getDatasetLieuTournage?limit=' + limit)
    
            if (response) {
    
              lieuxTournageLayer.addGeoJson(response.data)
    
              PopulateArrondissements(lieuxTournageLayer)
    
                    lieuxTournageLayer.setStyle({
                        icon: {
                          url: 'https://i.imgur.com/w2C5lmr.png',
                          scaledSize: new window.google.maps.Size(20, 20),
                        },
                      });
            
                      lieuxTournageLayer.addListener("click", function (event) {
                        let content = `
                          <div style="
                              background-color: white;
                              color: black;
                              padding: 10px;
                              font-family: Arial, sans-serif;">
                      `;
            
                        const propertiesToShow = [
                          "nom_tournage",
                          "nom_realisateur",
                          "date_debut",
                          "date_fin",
                          "adresse_lieu",
                          "ardt_lieu",
                          "nom_producteur",
                          "type_tournage",
                          "annee_tournage",
                        ];
            
                        event.feature.forEachProperty((value, property) => {
                          if (propertiesToShow.includes(property)) {
                            content += `
                          <div><span class="fw-bold"> ${property} :</span> &nbsp <span>  ${value} </span></div></br>`;
                          }
                        });
            
                        content += "</div>";
            
                        const infowindow = new window.google.maps.InfoWindow({
                          content: content,
                        });
            
                        infowindow.setPosition(event.latLng);
                        infowindow.open(map);
                      });

                lieuxTournageLayer.setMap(map)
            }
    
          } catch (error) {
            console.log('Erreur lors de la récupération des données des lieux de tournages', error)
          }
       }
      }

      fetchDataSetLieuTournage();

} 