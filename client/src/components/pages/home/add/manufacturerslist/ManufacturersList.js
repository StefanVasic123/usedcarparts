import React, { useState, useContext } from 'react';
import './ManufacturersList.css';
import { carsData } from '../../search/collections/dataSet';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../modal/Modal';
import Modals from '../modal/modals/Modals';

import audi from '../../../../../images/audi.png';
import bmw from '../../../../../images/bmw.png';
import opel from '../../../../../images/opel.png';
import mercedes from '../../../../../images/mercedes.png';
import peugeot from '../../../../../images/peugeot.png';
import renault from '../../../../../images/renault.png';
import volkswagen from '../../../../../images/volkswagen.png';
import skoda from '../../../../../images/skoda.png';
import volvo from '../../../../../images/volvo.png';
import ford from '../../../../../images/ford.png';
import lexus from '../../../../../images/lexus.png';
import mini from '../../../../../images/mini.png';
import mitsubishi from '../../../../../images/mitsubishi.png';
import jaguar from '../../../../../images/jaguar.png';
import landrover from '../../../../../images/landrover.png';
import bentley from '../../../../../images/bentley.png';
import astonmartin from '../../../../../images/astonmartin.png';
import porshe from '../../../../../images/porshe.png';
import tesla from '../../../../../images/tesla.png';
import lamborgini from '../../../../../images/lamborgini.png';
import { ImgUploadRowContext } from '../../../../../context/ImgUploadRowContext';

const modals = <Modals />

const ManufacturersList = () => {
    const selector = useSelector(state => state.item);
    const [context, setContext] = useContext(ImgUploadRowContext);

    const openModal = selector.mainModalState;
    const [clickedLogo, setClickedLogo] = useState('');
    
    const dispatch = useDispatch();

    const inputText = selector.manufacturer.slice(-1);

    const logo = (name) => {
        switch(name) {
            case "audi":
                return audi;
            case "bmw":
                return bmw;
            case "opel":
                return opel;
            case "mercedes":
                return mercedes;
            case "peugeot":
                return peugeot;
            case "renault":
                return renault;
            case "volkswagen":
                return volkswagen;
            case "skoda":
                return skoda;
            case "volvo":
                return volvo;
            case "ford":
                return ford;
            case "lexus":
                return lexus;
            case "mini":
                return mini;
            case "mitsubishi":
                return mitsubishi;
            case "jaguar":
                return jaguar;
            case "astonmartin":
                return astonmartin;
            case "landrover":
                return landrover;
            case "bentley":
                return bentley;
            case "porshe":
                return porshe;
            case "tesla":
                return tesla;
            case "lamborgini":
                return lamborgini;
        }
    }

    const allLogos = carsData[0].manufacturers.map((data, index) => data.manufacturer);
    const filteredLogos = inputText !== false ? allLogos.filter(item => item.toLowerCase().includes(inputText)) : carsData[0].manufacturers;
    
    function clickedImage(data) {
        setClickedLogo(data);
        dispatch({
            type: 'ADD_MANUFACTURER',
            payload: data
        })
        dispatch({
            type: 'UPLOAD_MAIN_MODAL_STATE',
            payload: true
        })   
        dispatch({
            type: 'CHANGE_MODAL0_STATE',
            payload: true
        })
    }
    function onCloseModal() {
        dispatch({
            type: 'UPLOAD_MAIN_MODAL_STATE',
            payload: false
        })   
        dispatch({
            type: 'CHANGE_MODAL0_STATE',
            payload: false
        })
        dispatch({
            type: 'CHANGE_MODAL1_STATE',
            payload: false
        })
        dispatch({
            type: 'CHANGE_MODAL2_STATE',
            payload: false
        })
        dispatch({
            type: 'CHANGE_MODAL3_STATE',
            payload: false
        })
        dispatch({
            type: 'UPLOAD_IMG_ROW',
            payload: true
        })
        dispatch({
            type: 'SLIDER_ROW',
            payload: false
        })
        dispatch({
            type: 'UPLOAD_IMG_FILE',
            payload: null
        })
        dispatch({
            type: 'UPLOAD_IMG_FILE_ARR',
            payload: []
        })
        dispatch({
            type: 'REMOVE_ITEM',
            payload: []
        });
        dispatch({
            type: 'REMOVE_MANUFACTURER',
            payload: []
        });
        dispatch({
            type: 'REMOVE_MODEL',
            payload: []
        });
        dispatch({
            type: 'REMOVE_PRODUCTION_YEAR',
            payload: []
        });
        dispatch({
            type: 'REMOVE_GAS',
            payload: []
        });
        dispatch({
            type: 'REMOVE_CC',
            payload: []
        });
        dispatch({
            type: 'REMOVE_HP',
            payload: []
        });

        setContext([]);
    }
    return (
    <div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            {filteredLogos
                .map((data, index) => (
                    <img 
                        src={logo(data)} 
                        key={index} 
                        style={{ margin: "1em" }} 
                        onClick={() => clickedImage(data)}
                        width="60px" 
                        height="60px" />
                ))}
        </div>
        <div>
            <Modal 
                open={openModal}
                onClose={onCloseModal}
                children={modals}
            />
        </div>
    </div>
    );
};

export default ManufacturersList;