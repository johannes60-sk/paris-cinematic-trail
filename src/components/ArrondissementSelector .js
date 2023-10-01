import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PopulateArrondissements } from './PopulateArrondissementsSelect';
import {FilterByBorough} from './FilterByBorough';
import { DataSetLieuTournage } from './DataSetLieuTournage';


const ArrondissementSelector = ({ lieuxTournageInstance, mapInstance, buttonSubmitted, resetButtonState }) => {
    let lieuxTournageLayer = lieuxTournageInstance;
    const [map, setmap] = useState(mapInstance);
    const [arrondissementSeleted, setArrondissementSelected] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [id_arrondissement, setIdArrondissement] = useState('arrondissement');
    const [limit_lieux_tournage, setLimitLieuxTournage] = useState();
    const [isSelected, setSelected] = useState(false)
    
    const disabledLimitInput = (e) => {

        const selectedValue = e.target.getAttribute('data-value');

        const limit_lieux_tournage = document.getElementById('limit_lieux_tournage')

        setArrondissementSelected(selectedValue);

        if (selectedValue === 'tous') {
            
            setSelected(true);
            
            limit_lieux_tournage.disabled = true
            setLimitLieuxTournage(limit_lieux_tournage)

        }else if(selectedValue != 'tous'){

            setSelected(true);

            limit_lieux_tournage.disabled = false;

            setLimitLieuxTournage(limit_lieux_tournage)
        }
    }


    // Voir plus d'Arrondissement
    const handleShowMoreArdt = async (e) => {

        e.preventDefault();
        e.stopPropagation();
        setShowMore(true)

            const showMore = e.target.getAttribute('data-value') 

            if(showMore === 'showMore'){

                console.log('showMore')

                DataSetLieuTournage(lieuxTournageLayer, map, 0);

            }
    }
      
    useEffect(() => {

        if(isSelected && buttonSubmitted && lieuxTournageLayer && map && arrondissementSeleted ){

            
            if (arrondissementSeleted && arrondissementSeleted === 'tous') {

                DataSetLieuTournage(lieuxTournageLayer, map);

                setShowMore(true)

                setSelected(false);

                resetButtonState();
            }
            
        }
    }, [isSelected,buttonSubmitted,lieuxTournageLayer, map, arrondissementSeleted])


    useEffect(() => {
        
        if( isSelected && buttonSubmitted && lieuxTournageLayer && map && id_arrondissement && arrondissementSeleted ){

            if(arrondissementSeleted && arrondissementSeleted != 'tous'){
    
                console.log('buttonSubmitted', buttonSubmitted)
                    FilterByBorough(lieuxTournageLayer, map, id_arrondissement, arrondissementSeleted, limit_lieux_tournage);

                    setSelected(false);

                    resetButtonState();
            }
        }
    },[buttonSubmitted, lieuxTournageLayer, map, isSelected])


    return (
        <>

            <div className="col-md-3 dropdown">
                <button className="btn btn-light dropdown-toggle" style={{ height: '57px' }} type="button" data-bs-toggle="dropdown" >

                     { arrondissementSeleted ? arrondissementSeleted : " Choisir un arrondissement"}
                </button>
                <ul className="dropdown-menu" id={id_arrondissement} onClick={disabledLimitInput}>
                    <li><a className="dropdown-item" href="#" data-value="tous">Voir  les arrondissements</a></li>
                    {!showMore && (
                        <li className='see-more-button mt-3'>
                            <a
                                className="dropdown-item "
                                data-value="showMore"
                                href="#"
                                type="button"
                                onClick={(e) => {
                                    handleShowMoreArdt(e);
                                }}
                            >
                                Voir tout sur la carte 
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}

export default ArrondissementSelector;
