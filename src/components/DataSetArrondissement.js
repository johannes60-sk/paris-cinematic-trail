import axios from "axios";

 export function DataSetArrondissement  (departementsInstance, mapInstance) {

    let departementsLayer = departementsInstance;
    let map = mapInstance;

    async function  fetchDataSetArrondissement () {

        if(mapInstance && departementsInstance){

            try {
  
                const response = await axios.get("http://localhost:3000/api/getDataSetArrondissement");
        
                if (response) {
                
                  departementsLayer.addGeoJson(response.data);

                  departementsLayer.setStyle({
                    fillColor: "lightblue",
                    strokeColor: "blue",
                    strokeWeight: 2,
                    clickable: true,
                  });
        
                  departementsLayer.setMap(map);
                }
              } catch (error) {
                console.error('Erreur lors de la récupération des données des arrondissement :', error);
              }
        }
      };

      fetchDataSetArrondissement();
}

