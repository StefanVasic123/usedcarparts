import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carsData } from '../../../search/collections/dataSet';
import { ImgUploadRowContext } from '../../../../../../context/ImgUploadRowContext';
import axios from 'axios';

const Modal0 = () => {
    const [choosenModels, setChoosenModels] = useState([]);
    const [selected, setSelected] = useState([]);
    const [clickableTitle, setClickableTitle] = useState(true);
    const [hoveredTitle, setHoveredTitle] = useState(false);
    const [context, setContext] = useContext(ImgUploadRowContext);

    const [instanceSaved, setInstanceSaved] = useState(false);

    const selector = useSelector(state => state.item);
    const dispatch = useDispatch();

    const selectedManufacturer = selector.manufacturer.slice(-1);
    const manufacturersList = carsData[0].manufacturers.filter((data, index) => data.manufacturer === selectedManufacturer.join()); // choosen manufacturer carTypes
    const types = manufacturersList !== undefined ? manufacturersList[0].models.map(data => data.model) : [];   

    useEffect(() => {
        choosenModels.length === 0 ? setClickableTitle(true) : setClickableTitle(false);
    }, [choosenModels]);

    useEffect(() => {
        // e kada je true onda da ostavlja redux state, ali da izbrise ime
        // ili da otvori modal 3 gde moze da menja samo iem item-a i da ima submit i back to default
        // ugasi modal 0, posalji u db, zatvori modal 0, otvori modal 3, ostavi redux state osim item-a

    }, [instanceSaved])

    async function clickedManufacturer() {
        if(clickableTitle) {
            // -> send data of manufacturer and item to db
            dispatch({
                type: 'UPLOAD_MANUFACTURERS_LIST',
                payload: selectedManufacturer
            })
            dispatch({
                type: 'ADD_IMAGES',
                payload: context
            })
            dispatch({
                type: 'CHANGE_MODAL0_STATE',
                payload: false
            })
            dispatch({
                type: 'UPLOAD_MAIN_MODAL_STATE',
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
            await axios.post('/api/items', {
                userId: localStorage.getItem('userId'),
                item: selector.item,
                manufacturer: selectedManufacturer
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

            dispatch({
                type: 'REMOVE_ITEM',
                payload: []
            });
            dispatch({
                type: 'REMOVE_MANUFACTURER',
                payload: []
            });
            setContext([]);
        } else {
            alert('Cannot submit title when models are checked!');
            setHoveredTitle(false)
        }
    }
    function mouseEnter() {
        setHoveredTitle(true)
    }
    function mouseLeave() {
        setHoveredTitle(false)
    }

    function clickedModel(model) {
        const selectIndex = types.indexOf(model);

        if(!choosenModels.includes(model)) {
        setChoosenModels([...choosenModels, model])
        setSelected([...selected, selectIndex])
        } else {
            const filtered = choosenModels.filter(item => item !== model)
            const filteredSelected = selected.filter(item => item !== selectIndex);
            setChoosenModels(filtered);
            setSelected(filteredSelected);
        }
    } 

    async function submitModal0() {
        if(choosenModels.length === 0) {
            return alert('Must choose model or submit manufacturer for all models')
        }

        if(choosenModels.length === 1) {
            dispatch({
                type: 'UPLOAD_MANUFACTURERS_LIST',
                payload: selectedManufacturer
            })
            dispatch({
                type: 'ADD_MODEL',
                payload: choosenModels
            })
            dispatch({
                type: 'CHANGE_MODAL0_STATE',
                payload: false
            })
            dispatch({
                type: 'CHANGE_MODAL1_STATE',
                payload: true
            })
        }
        
        if(choosenModels.length > 1) {
              // ako je instanceSaved
        if(instanceSaved) {
            dispatch({
                type: 'UPLOAD_MANUFACTURERS_LIST',
                payload: selectedManufacturer
            })
            dispatch({
                type: 'ADD_MODEL',
                payload: choosenModels
            })
            dispatch({
                type: 'CHANGE_MODAL0_STATE',
                payload: false
            })
            dispatch({
                type: 'CHANGE_MODAL3_STATE',
                payload: true
            })
            setContext([]);
            await axios.post('/api/items', {
                userId: localStorage.getItem('userId'),
                item: selector.item,
                manufacturer: selectedManufacturer.join(),
                model: choosenModels
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        } else {
                dispatch({
                    type: 'UPLOAD_MANUFACTURERS_LIST',
                    payload: selectedManufacturer
                })
                dispatch({
                    type: 'ADD_MODEL',
                    payload: choosenModels
                })
                dispatch({
                    type: 'CHANGE_MODAL0_STATE',
                    payload: false
                })
                dispatch({
                    type: 'UPLOAD_MAIN_MODAL_STATE',
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
                setContext([]);
                await axios.post('/api/items', {
                    userId: localStorage.getItem('userId'),
                    item: selector.item,
                    manufacturer: selectedManufacturer.join(),
                    model: choosenModels
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));

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
                alert('uspesno ste uneli deo primenjiv na izabranim modelima')
            }
        }
    }

    console.log(selector);
    console.log(context);

    function saveInstance() {
        setInstanceSaved(!instanceSaved)
    }
    
    return (
        <div>
            <div className="modal-0-title">
                <h3 style={{ backgroundColor: hoveredTitle ? 'grey' : '', border: clickableTitle ? '1px solid black' : '' }} onMouseEnter={() => mouseEnter()} onMouseLeave={() => mouseLeave()} onClick={clickedManufacturer}>{selectedManufacturer}</h3>
            </div>
            <div className="modal-0-section">
                {types.map((car, index) => (
                    <li style={{ backgroundColor: selected.includes(index) ? 'grey' : '' }} key={index} onClick={() => {
                        clickedModel(car);
                    }}>{car} {(choosenModels.length === 1) && (choosenModels.join() === car) && <button onClick={submitModal0}>submit</button>}</li>
                ))} 
            </div>
            <div>
                <button onClick={submitModal0}>Submit</button>
            </div>
            <div>
                <input type="checkbox" id="modal-0-save-instance" name="modal-0-save-instance" onChange={saveInstance} />
                <label htmlFor="modal-0-save-instance">save instance</label>
            </div>
        </div>
    );
};

export default Modal0;