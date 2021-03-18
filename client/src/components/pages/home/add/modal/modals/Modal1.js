import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { carsData } from '../../../search/collections/dataSet';
import { ImgUploadRowContext } from '../../../../../../context/ImgUploadRowContext';
import axios from 'axios';

const Modal1 = () => {
    const [choosenYears, setChoosenYears] = useState([]);
    const [choosenSubType, setChoosenSubType] = useState('');
    const [selected, setSelected] = useState([]);
    const [context, setContext] = useContext(ImgUploadRowContext);
    
    const [instanceSaved, setInstanceSaved] = useState(false);

    const selector = useSelector(state => state.item);
    const dispatch = useDispatch();

    const [clickableTitle, setClickableTitle] = useState(true);
    
    const selectedManufacturer = selector.manufacturer.slice(-1);
    const selectedModel = selector.model[0];
    const manufacturersList = carsData[0].manufacturers.filter((data, index) => data.manufacturer === selectedManufacturer.join());
    const choosenModel = manufacturersList[0].models.filter(item => item.model === selectedModel.join());
    
    const prodYears = choosenModel[0].productionYears.map(data => data.productionYear)
    const subTypes = choosenModel[0].productionYears.map(item => item.subTypes).map(item => item[0].subType);

    const yearType = choosenModel[0].productionYears.map(data => {
        const year = data.productionYear;
        const type = data.subTypes[0].subType;
        
        return [year, type]
    })
    const subTypesUnique = subTypes.filter((item, index, array) => array.indexOf(item) === index);

    useEffect(() => {
        choosenYears.length === 0 ? setClickableTitle(true) : setClickableTitle(false)
    }, [choosenYears])

    function isEqual(a, b) {
        return Array.isArray(a) 
            && Array.isArray(b) 
            && a.length === b.length 
            && a.every((val, index) => val === b[index])
    }

    function clickedYear(year) {
        setChoosenSubType(year[1])
        const selectIndex = yearType.indexOf(year);
        const selectedYear = year[0];
        console.log(year[0]);
        console.log(selectIndex);
        const includesChecking = choosenYears.map(item => item === year);

        const equalityChecking = choosenYears.filter(item => item[0] === selectedYear);
        const equalityCheckingFiltered = equalityChecking.length === 0 ? false : true;
        console.log(equalityChecking, equalityCheckingFiltered)
        if(equalityCheckingFiltered === false) {
            setChoosenYears([...choosenYears, year]);
            setSelected([...selected, selectIndex]);
            console.log(choosenYears)
        } else {
            const filtered = choosenYears.filter(item => !isEqual(item, year));
            const filteredSelected = selected.filter(item => item !== selectIndex);
            setChoosenYears(filtered);
            setSelected(filteredSelected);
            console.log(choosenYears, filteredSelected)
        }
    }

    function checkboxValue(e) {
        let val = e.target.checked;

        const unVal = [];

        if(!val) {
            const unCheckedType = e.target.value;
            const unCheckedIndex = yearType.forEach(item => {
                return item[1] === unCheckedType ? unVal.push(yearType.indexOf(item)) : false
            })
        }
    
        const checkedArr = [];
        
        const checkedTypes = yearType.forEach(item => {
            return item[1] === e.target.value && val ? checkedArr.push(yearType.indexOf(item)) : false
        });

        if(checkedArr.length > 0) {
            const checkedArrConcated = selected.concat(checkedArr);
            setSelected(checkedArrConcated);
        } else {
            const unValFiltered = selected.filter(item => !unVal.includes(item)); 
            setSelected(unValFiltered)
        }
    }
    
    async function submitModal() {
        if(selected.length === 1) {
            dispatch({
                type: 'CHANGE_MODAL1_STATE',
                payload: false
            })
            dispatch({
                type: 'CHANGE_MODAL2_STATE',
                payload: true
            })
            // set productionYears redux state
            dispatch({
                type: 'ADD_PRODUCTION_YEAR',
                payload: choosenYears
            })
        }
        if(selected.length === 0) {
            return alert('Odaberite najmanje jedno polje kao parametar')
        }
        if(selected.length > 1) {
            if(instanceSaved) {
                dispatch({
                    type: 'ADD_PRODUCTION_YEAR',
                    payload: choosenYears
                })
                dispatch({
                    type: 'CHANGE_MODAL1_STATE',
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
                    manufacturer: selector.manufacturer.slice(-1).join(),
                    model: selector.model[0],
                    productionYear: choosenYears.map(item => item[0]),
                    subType: choosenYears.map(item => item[1])
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
                setContext([]);
            } else {
                dispatch({
                    type: 'ADD_IMAGES',
                    payload: context
                })
                dispatch({
                    type: 'CHANGE_MODAL1_STATE',
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
                    manufacturer: selector.manufacturer.slice(-1).join(),
                    model: selector.model[0],
                    productionYear: choosenYears.map(item => item[0]),
                    subType: choosenYears.map(item => item[1])
                })
                .then(res => console.log(res.data))
                .catch(err => console.log(err))

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
                })
                setContext([]);
            }
        }
    }
    async function onTitleClick() {
    if(clickableTitle) {
        dispatch({
            type: 'ADD_IMAGES',
            payload: context
        })
        dispatch({
            type: 'CHANGE_MODAL1_STATE',
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
        await axios.post('api/items', {
            userId: localStorage.getItem('userId'),
            item: selector.item,
            manufacturer: selector.manufacturer.slice(-1).join(),
            model: selector.model[0]
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
        setContext([]);
        } else {
            alert('Cannot submit model if years are marked.')
        }
    }

    function saveInstance() {
        setInstanceSaved(!instanceSaved)
    }

    return (
        <div>
            <div className="modal-1-title">
                <h3 onClick={onTitleClick}>{selectedModel}</h3>
            </div>
            <div>
                {yearType.map((item, index) => (
                    <li 
                    key={index} 
                    style={{ display: "flex", justifyContent: "space-between", listStyleType: "none", backgroundColor: selected.includes(index) ? 'grey' : '' }}
                    onClick={() => clickedYear(item)}>
                        <p>
                            {item[0]}
                        </p>
                        <p>
                            {item[1]}
                        </p> 
                        <p>{(choosenYears.length === 1) && (choosenYears[0][0] === item[0]) && (choosenSubType === item[1]) && <button onClick={submitModal}>submit</button>}</p>
                    </li>
                ))}
            </div>
            <div>
                {subTypesUnique.map((item, index) => (
                    <li key={index}>
                        <input type="checkbox" id={item} name={item} value={item} onChange={(e) => checkboxValue(e)}/>
                        <label htmlFor={item}>{item}</label>
                    </li>
                ))}
            </div>
            <div>
                <button onClick={submitModal}>Submit</button>
            </div>
            <div>
                <input type="checkbox" id="modal-0-save-instance" name="modal-0-save-instance" onChange={saveInstance} />
                <label htmlFor="modal-0-save-instance">save instance</label>
            </div>
        </div>
    );
};

export default Modal1;