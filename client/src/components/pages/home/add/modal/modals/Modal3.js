import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import ImgUpload from '../../img-upload/ImgUpload';

import { ImgUploadRowContext } from '../../../../../../context/ImgUploadRowContext';

const Modal3 = () => {
    const selector = useSelector(state => state.item);
    const dispatch = useDispatch();

    const [inputItem, setInputItem] = useState('');

    const [context, setContext] = useState([]);
    
    const [instanceChanged, setInstanceChanged] = useState(false);
    // ovaj modal treba da ima item i upload slike i ispod submit i da vraca modal3 cist
    function handleChange(e) {
        console.log(e.target.value)
        setInputItem(e.target.value)
    }

    function handleChangeInstance() {
        setInstanceChanged(!instanceChanged)
    }

    function submitModal() {
        // sta submitujemo
        // novi item i nove slike ali ceo stari redux
        // item, manufacturer, model, 
        // if instanceChanged === true => odradi kao close modal, else samo obrisi item i slike
        if(!selector.item) {
            return alert('Morate upisati naziv dela')
        }
        function prodYearCheck() {
            if(selector.productionYear.length > 0) {
                return selector.productionYear[0].map(item => item[0])
            } else {
                return []
            }
        }
        function subTypeCheck() {
            if(selector.productionYear.length > 0) {
                return selector.productionYear[0].map(item => item[1])
            } else {
                return []
            }
        }
        axios.post('/api/items', {
            userId: localStorage.getItem('userId'),
            item: inputItem,
            manufacturer: selector.manufacturer.slice(-1).join(),
            model: selector.model[0],
            productionYear: prodYearCheck(),
            subType: subTypeCheck(),
            gas: selector.gas,
            cc: selector.cc,
            horsePower: selector.horsePower
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))

        if(instanceChanged) {
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
            setInputItem('');
        } else {
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
            setInputItem('');
            setContext([]);
        }
    }
    return (
        <ImgUploadRowContext.Provider value={[context, setContext]}>
        <div>
            <div>
                <input type="text" placeholder="item" value={inputItem} onChange={handleChange} />
                <ImgUpload />
            </div>
            <div>
                <button onClick={submitModal}>submit</button>
            </div>
            <div>
                <input type="checkbox" id="modal-3-checkbox" name="modal-3-checkbox" onChange={handleChangeInstance} />
                <label htmlFor="modal-3-checkbox">remove instance</label>
            </div>
        </div>
        </ImgUploadRowContext.Provider>
    );
};

export default Modal3;