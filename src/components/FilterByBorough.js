import axios from "axios";

export function FilterByBorough(lieuxTournageInstance, mapInstance, id_arrondissement, arrondissementSeleted,
    limit_lieux_tournage) {

    let lieuxTournageLayer = lieuxTournageInstance
    let map = mapInstance;


    if (lieuxTournageInstance && map && id_arrondissement && arrondissementSeleted && limit_lieux_tournage ) {

        async function Filter() {

            try {
                const response = await axios.get('http://localhost:3000/api/getDatasetLieuTournage?limit='+ limit_lieux_tournage.value);
        
                if (response) {

                    console.log('response', response.data);
        
                    lieuxTournageLayer.addGeoJson(response.data);

                    lieuxTournageLayer.setStyle((feature) => {

                        const arrondissement = feature.getProperty("ardt_lieu");
                        const visibility = arrondissement === arrondissementSeleted;

                        limit_lieux_tournage.disabled = false;
        
                        return {
                            visible: visibility,
                            icon: {
                                url: visibility ? "https://i.imgur.com/w2C5lmr.png" : "",
                                scaledSize: new window.google.maps.Size(20, 20),
                            },
                        };
                    });

        
                    lieuxTournageLayer.setMap(map);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

      Filter();

    }
}
