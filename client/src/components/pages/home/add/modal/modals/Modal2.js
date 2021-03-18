import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { carsData } from '../../../search/collections/dataSet';
import { ImgUploadRowContext } from '../../../../../../context/ImgUploadRowContext';
import axios from 'axios';

const Modal2 = () => {
    const selector = useSelector(state => state.item);
    const dispatch = useDispatch();
    const [context, setContext] = useContext(ImgUploadRowContext);

    const [ccs, setCCS] = useState(false);
    const choosenGas = selector.gas;
    const [ccRow, setCCRow] = useState([]);
    const [horsePowers, setHorsePowers] = useState([]);
    const [choosenCC, setChoosenCC] = useState(null);
    const [choosenHP, setChoosenHP] = useState([]);

    const [instanceSaved, setInstanceSaved] = useState(false);

    const [checkedVal, setCheckedVal] = useState(false);
    
    const [checkedGas, setCheckedGas] = useState(false);
    const [checkedGaspetrol, setCheckedGaspetrol] = useState(false);
    const [checkedGasdiesel, setCheckedGasdiesel] = useState(false);

    const selectedCC = selector.cc;
    const selectedHP = selector.horsePower;

    const [dropdown, setDropdown] = useState(false);

    const [clickableTitle, setClickableTitle] = useState(true);

    useEffect(() => {
        choosenGas.length === 0 ? setClickableTitle(true) : setClickableTitle(false);
    })

    useEffect(() => {
        if(checkedVal) {
            // salji u redux array sa petrolom i dizelom
            dispatch({
                type: 'ADD_GAS_ALL',
                payload: ["petrol", "diesel"]
            })
        } else {
            dispatch({
                type: 'REMOVE_GAS',
                payload: []
            })
        }
    }, [checkedVal])

    const selectedManufacturer = selector.manufacturer.slice(-1);
    const selectedModel = selector.model[0];
    const selectedYear = selector.productionYear[0][0][0];
    const selectedSubType = selector.productionYear[0][0][1];
    const manufacturersList = carsData[0].manufacturers.filter((data, index) => data.manufacturer === selectedManufacturer.join());
    const choosenModel = manufacturersList[0].models.filter(item => item.model === selectedModel.join());
    console.log(`${selectedYear} = selectedyear; ${selectedSubType} = subty[e]; ${selector.model}, ${typeof selector.productionYear}`)
    console.log(choosenModel[0].productionYears.filter(data => data.productionYear))
    const prodYears = choosenModel[0].productionYears.filter(data => data.productionYear === selectedYear);
const checkFirst = prodYears[0].subTypes[0];
// const checkSecond = prodYears[0].subTypes[0].filter(item => item.gasType === choosenGas)[0];
    const gas = prodYears[0].subTypes[0].gasTypes.map(item => item.gasType);
    console.log(`zeroThCheck = ${prodYears}, firtsCheck = ${choosenGas ? checkFirst : 'else'}, secondCheck = ${choosenGas ? 'checkSecond' : 'else'}, choosenGas: ${choosenGas}`)
    const ccFirst = prodYears[0].subTypes[0];
    console.log(ccFirst.gasTypes)
    const ccSecond = ccFirst ? ccFirst.gasTypes.filter(item => item.gasType === choosenGas.join())[0] : [];
    console.log(ccSecond);
    const ccThird = ccSecond !== undefined ? ccSecond.ccs.map(item => item.cc) : [];
    console.log(ccThird)
    const cc = choosenGas ? ccThird : [];
 // change hp value   const hp = choosenGas ? prodYears[0].subTypes[0].gasTypes.filter(item => item.gasType === choosenGas)[0].ccs.filter(item => item.cc === 1600)[0].horsePower.map(item => item.hp) : [];

    function checkboxClicked(e) {
        // ako je checked e onda da uradi remove gas, ako nije onda neka add gas
        console.log(e.target.value)
        if(e.target.value === 'petrol') {
            setCheckedGaspetrol(!checkedGaspetrol)
            console.log('petrol')
        }
        if(e.target.value === 'diesel') {
            setCheckedGasdiesel(!checkedGasdiesel)
            console.log('diesel')
        }
        if(selector.gas.includes(e.target.value)) {
            dispatch({
                type: 'REMOVE_GAS',
                payload: selector.gas.filter(item => item !== e.target.value)
            })
            console.log('checked')
            console.log(selector.gas, typeof selector.gas, [`${e.target.value}`], typeof [`${e.target.value}`])
            if(selector.gas.length === 1 && selector.gas.includes(e.target.value)) {
                setCCS(false)
            }
        } else {
            dispatch({
                type: 'ADD_GAS',
                payload: e.target.value
            })
            setCCS(true)
        }
    }

    function buttonCC() {
        ccRow.length > 0 ? setCCRow([]) : setCCRow(cc);
    }
    function clickedCC(ccClicked) {
        setChoosenCC(ccClicked)
        const hp = prodYears[0].subTypes[0].gasTypes.filter(item => item.gasType === choosenGas.join())[0].ccs.filter(item => item.cc === ccClicked)[0].horsePower.map(item => item.hp);
        horsePowers.length > 0 ? setHorsePowers([]) : setHorsePowers(hp);
        selectedCC.includes(ccClicked) ? 
            dispatch({
                type: 'ADD_CC',
                payload: selectedCC.filter(item => item !== ccClicked)
            })
            :  
            dispatch({
                type: 'ADD_CC',
                payload: [...selectedCC, ccClicked]
            });  
    }

    function ccExpand(ccClicked) {
        setDropdown(!dropdown);
    }   

    function clickedHP(hpClicked) {
        console.log(selectedHP, selector.horsePower)
        choosenHP.length > 0 ? setChoosenHP(choosenHP.filter(item => item !== hpClicked)) : setChoosenHP(hpClicked);
        return selectedHP.includes(hpClicked) ? 
            dispatch({
                type: 'ADD_HORSE_POWER',
                payload: selectedHP.filter(item => item !== hpClicked)
            })
            : 
            dispatch({
                type: 'ADD_HORSE_POWER',
                payload: [...selectedHP, hpClicked]
            });
    }

    async function clickedTitle() {
        console.log(clickableTitle)
        if(clickableTitle) {
        dispatch({
            type: 'CHANGE_MODAL2_STATE',
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
            productionYear: selector.productionYear[0][0][0]
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
        } else {
            alert('Cannot submit model if fields are checked!')
        }
    }

    async function submitModal() {
        if(choosenGas === '') {
           return alert('Odaberite tip goriva')
        }
        // add cc
        if(selectedCC !== []) {
            dispatch({
                type: 'ADD_CC',
                payload: selectedCC
            })
        }
        if(selectedHP !== []) {
            dispatch({
                type: 'ADD_HORSE_POWER',
                payload: selectedHP
            })
        }
        if(instanceSaved) {
            dispatch({
                type: 'CHANGE_MODAL2_STATE',
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
                productionYear: selector.productionYear[0][0][0],
                subType: selector.productionYear[0][0][1],
                gas: selector.gas,
                cc: selector.cc,
                horsePower: selector.horsePower
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
            setContext([]);
        } else {
            dispatch({
                type: 'CHANGE_MODAL2_STATE',
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
            console.log(selector)
            await axios.post('/api/items', {
                userId: localStorage.getItem('userId'),
                item: selector.item,
                manufacturer: selector.manufacturer.slice(-1).join(),
                model: selector.model[0],
                productionYear: selector.productionYear[0][0][0],
                subType: selector.productionYear[0][0][1],
                gas: selector.gas,
                cc: selector.cc,
                horsePower: selector.horsePower
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
            setChoosenCC(null);
            setDropdown(false);
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
            dispatch({
                type: 'REMOVE_GAS',
                payload: []
            })
            dispatch({
                type: 'REMOVE_CC',
                payload: []
            })
            dispatch({
                type: 'REMOVE_HORSE_POWER',
                payload: []
            })
            setContext([]);
        }
    }
    console.log(selector, `clickableTitle: ${clickableTitle}`)

    function handleCheckedAll() {
        setCheckedVal(!checkedVal)
        setCheckedGas(!checkedGas)
    }
    console.log(checkedGas)
    function saveInstance() {
        setInstanceSaved(!instanceSaved)
    }

    return (
        <div>
            <div className="modal-2-title">
                <h3 onClick={clickedTitle}>{selector.model[0]} {selector.productionYear[0][0][0]}</h3>
            </div>
            <div className="modal-2-radio-buttons">
                {gas.map((item, index) => (
                    <div>
                        <div>
                            <input type="checkbox" id={`modal-2-checkbox-gas-${index}`} name="modal-2-gas-checkbox" value={item} checked={selector.gas.includes(item)} onChange={(e) => checkboxClicked(e)} />
                            <label htmlFor={`modal-2-checkbox-gas-${index}`}>{item}</label>
                        </div>
                    </div>
                ))} 
            </div>
            <div>
                <input type="checkbox" id="modal-2-checkbox" name="modal-2-checkbox" defaultChecked={checkedVal} onChange={handleCheckedAll} />
                <label htmlFor="modal-2-checkbox">choose all</label>
            </div>
            {ccs && (checkedVal === false) && (
                <div className="cc-row-modal-2">
                    <button onClick={buttonCC}>CC</button>
                    {ccRow.map((item, index) => (
                        <li key={index} style={{ listStyleType: "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span onClick={() => clickedCC(item)} style={{  backgroundColor: selectedCC.includes(item) ? 'grey' : '' }}>{item}</span> 
                                {choosenCC === item && (<span onClick={() => ccExpand(item)}>v</span>)}
                            </div>
                            {(choosenCC === item) && dropdown && horsePowers.map((hp, i) => (
                                <p key={i} onClick={() => clickedHP(hp)}  style={{  backgroundColor: selectedHP.includes(hp) ? 'grey' : '' }}>{hp}</p>
                            ))}
                        </li>
                    ))}
                   
                </div>
            )}
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

export default Modal2;

/*
 {horsePowers.map((hp, index) => (
                        <li key={index}>{hp}</li>
                    ))}
*/