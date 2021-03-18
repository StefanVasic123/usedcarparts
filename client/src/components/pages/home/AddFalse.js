import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SubmitDD from './add/SubmitDD';


import { carsData } from './search/collections/dataSet';

import ImgUpload from '../home/add/img-upload/ImgUpload';
import Modal from '../home/add/modal/Modal';
    

const Add = () => {
    // NEW TRY - NEW TIME - BETTER PLACE - IF I DONT GO TO WASTE

    // OLD TIME - GOLD TIME - GOLDEN RUSH IS OVER - LA LA LA DONT BE SOBER
    const [isOpen, setIsOpen] = useState(false);

    const [firstInstanceSelection, setFirstInstanceSelection] = useState(true);

    const [stateYearsList, setStateYearsList] = useState({
        forModel: ''
    });
    const [stateGasList, setStateGasList] = useState({
        forYear: null
    })
    const [stateCCList, setStateCCList] = useState({
        forGas: ''
    })
    const [submit, setSubmit] = useState({});
    const [stateManufacturerIndex, setStateManufacturerIndex] = useState({ manufacturerIndex: [] });

    const [submitList, setSubmitList] = useState([]);

    function referenceList() {
        const arr = [];
        console.log(submitList)
        for(let i = 0; i < submitList.length; i++) {
        arr.push(Object.values(submitList.map(item => item)[i]))
        }
        
        return arr; 
    }

    function refList() {
        const list = submitList.map(obj => {
            return ({ "manufacturer": obj.manufacturer, "model": obj.model })
        })
        console.log(list);
        return list;
    }
    console.log(refList());

    const selector = useSelector(state => state.item);
    const callState = () => {
        console.log(selector)
    }

    const dispatch = useDispatch();
    /* 
Add modal ce imati prvo upload image
onda naziv dela
proizvodjaci
marke tih proizvodjaca npr audi, bmw => izadju svi audiji i bmw-ji
itd
na submit image ide u amazon S2, vraca instancu koja se lepi za post request
post request salje instancu fotke u amazonovom serveru i info o delu za kasniji search
pitanje! mesto u magacinu -> tome imaju pristup samo vlasnici magacina
*/
const manufacturersList = carsData[0].manufacturers.map(item => item.manufacturer); 

const manufacturerSelector = useSelector(state => state.item.manufacturersList);
const manufacturerSelected = useSelector(state => state.item.manufacturerSelected);

   const modelSelector = useSelector(state => state.item.model);
    
    const productionYearSelector = useSelector(state => state.item.productionYear);
    
    const subTypeSelector = useSelector(state => state.item.subType);
    
    const gasSelector = useSelector(state => state.item.gas);
    
    const ccSelector = useSelector(state => state.item.cc);
    
    const horsePowerSelector = useSelector(state => state.item.horsePower);
    
    // selector manufacturer to lower case
        const selectorLastManufacturer = manufacturerSelector.slice(-1)[0];
    
        const selectorManufacturer = selectorLastManufacturer === undefined ? false : selectorLastManufacturer;
        const selectorManufacturerLowerCase = selectorManufacturer === false ? false : selectorManufacturer.toLowerCase(); 
    // selector model to lower case 
        const selectorLastModel = modelSelector.slice(-1)[0];
    
        const selectorModel = selectorLastModel === undefined ? false : selectorLastModel;
        const selectorModelLowerCase = selectorModel == false ? false : selectorModel.toLowerCase();
    
    // selector production year to lower case
    const selectorLastProductionYear = productionYearSelector.slice(-1)[0];
    
    const selectorProductionYear = selectorLastProductionYear === undefined ? false : selectorLastProductionYear;
    const selectorProductionYearLowerCase = selectorProductionYear == false ? productionYearSelector : selectorProductionYear.toLowerCase();
    
    // selector sub-type to lower case 
    const selectorLastSubType = subTypeSelector.slice(-1)[0];
    
    const selectorSubType = selectorLastSubType === undefined ? false : selectorLastSubType;
    const selectorSubTypeLowerCase = selectorSubType == false ? subTypeSelector : selectorSubType.toLowerCase();
    
    // selector gas to lower case 
    const selectorLastGas = gasSelector.slice(-1)[0];
    
    const selectorGas = selectorLastGas === undefined ? false : selectorLastGas;
    const selectorGasLowerCase = selectorGas == false ? gasSelector : selectorGas.toLowerCase();
    
    // selector cc 
    const selectorLastCC = ccSelector.slice(-1)[0];
    
    const selectorCC = selectorLastCC === undefined ? ccSelector : selectorLastCC;
    
    // selector horse power 
    const selectorLastHorsePower = horsePowerSelector.slice(-1)[0];
    
    const selectorHorsePower = selectorLastHorsePower === undefined ? horsePowerSelector : selectorLastHorsePower;
    
        function modelsList() {
            // if it is lower case and it is in dataSet => becouse when typing redux state model add one letter on typing
            if(selectorManufacturerLowerCase &&
               carsData[0].manufacturers.map(item => item.manufacturer).includes(selectorManufacturerLowerCase)
               ) {
                    const modelsList = 
                            carsData[0].manufacturers
                            .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                            .map(item => item.model);
                            console.log(modelsList);
                    return modelsList;
            }
        }
    
        // production years list
        function productionYearsList() {
            if(selectorManufacturerLowerCase && 
                selectorModelLowerCase  &&
                selectorProductionYearLowerCase
                ) {
                    const instance = carsData[0].manufacturers
                    .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                    .filter(item => item.model === selectorModelLowerCase)
                    
                    const instanceTwo = instance !== undefined ? instance.map(obj => obj.productionYears)[0] : undefined;
                    const yearsList = instanceTwo !== undefined ? instanceTwo.map(item => item.productionYear) : [];
                            
                    console.log(yearsList)
                    return yearsList;
                    } else {
                        console.log('else. . .')
                        return []
                    }
            }     
    
        function subTypesList() {
            if(selectorManufacturerLowerCase && 
               selectorModelLowerCase &&
               selectorProductionYearLowerCase &&
               selectorSubTypeLowerCase) {
                    const instance = carsData[0].manufacturers
                            .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                            .filter(item => item.model === selectorModelLowerCase)
                    const instanceTwo = instance !== undefined ? instance.map(obj => obj.productionYears)[0] : undefined;
                    const instanceThree = instanceTwo !== undefined ? instanceTwo.map(item => item.subTypes)[0] : undefined;
                    const subTypesList = instanceThree !== undefined ? instanceThree.map(sub => sub.subType) : [];
                    return subTypesList;
            } else {
                console.log('... subtypes ele. . .');
                return []
            }
        }
    
        function gasList() {
            if(selectorManufacturerLowerCase && 
                selectorModelLowerCase &&
                selectorProductionYearLowerCase &&
                selectorSubTypeLowerCase &&
                selectorGasLowerCase) {
                    const instance = carsData[0].manufacturers
                        .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                        .filter(item => item.model === selectorModelLowerCase)
                        .filter(obj => obj.productionYears)
                    const instanceTwo = instance !== undefined ? instance.map(item => item.productionYears) : undefined;
                    const instanceThree = instanceTwo !== undefined ? instanceTwo.map(item => item.filter(obj => obj.productionYear === selectorProductionYearLowerCase)) : undefined;
                    const instanceFour = instanceThree !== undefined ? instanceThree.map(item => item.map(obj => obj.subTypes)) : undefined;
                    const instanceFive = instanceFour !== undefined ? instanceFour.map(item => item)[0] : undefined;
                    const instanceSix = instanceFive !== undefined ? instanceFive.map(item => item.filter(obj => obj.subType === selectorSubType).map(item => item.gasTypes)) : undefined;
                    const instanceSeven = instanceSix !== undefined ? instanceSix.map(item => item.map(arr => arr))[0] : undefined;   
                    const gasList = instanceSeven !== undefined ? instanceSeven.map(item => item.map(obj => obj.gasType))[0] : [];
                
                    return gasList;
            } else {
                console.log('else... gasList')
            }
        }
    
        function ccList() {
            if(selectorManufacturerLowerCase && 
                selectorModelLowerCase &&
                selectorProductionYearLowerCase &&
                selectorSubTypeLowerCase &&
                selectorGasLowerCase &&
                selectorCC) 
                {
                    const instance = carsData[0].manufacturers
                        .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                        .filter(item => item.model === selectorModelLowerCase)
                        .filter(obj => obj.productionYears)
                    const instanceTwo = instance !== undefined ? instance.map(item => item.productionYears) : undefined;
                    const instanceThree = instanceTwo !== undefined ? instanceTwo.map(item => item.filter(obj => obj.productionYear === selectorProductionYearLowerCase)) : undefined;
                    const instanceFour = instanceThree !== undefined ? instanceThree.map(item => item.map(obj => obj.subTypes)) : undefined;
                    const instanceFive = instanceFour !== undefined ? instanceFour.map(item => item)[0] : undefined;
                    const instanceSix = instanceFive !== undefined ? instanceFive.map(item => item.filter(obj => obj.subType === selectorSubType).map(item => item.gasTypes)) : undefined;
                    const instanceSeven = instanceSix !== undefined ? instanceSix.map(item => item.map(arr => arr))[0] : undefined;
                    const instanceEight = instanceSeven !== undefined ? instanceSeven.map(item => item.filter(obj => obj.gasType === "petrol")) : undefined;
                    const instanceNine = instanceEight !== undefined ? instanceEight.map(item => item.map(obj => obj.ccs)) : undefined;
                    const instanceTen = instanceNine !== undefined ? instanceNine.map(item => item.map(arr => arr.filter(obj => obj.cc)))[0] : undefined;
                    const instanceEleven = instanceTen !== undefined ? instanceTen.map(item => item.map(arr => arr))[0] : undefined;
                    const gasList= instanceEleven !== undefined ? instanceEleven.map(obj => obj.cc) : [];                            
    
                    return gasList
                } else {
                    console.log('else...cc liset')
                }
        }
    
        function horsePowerList() {
            if(selectorManufacturerLowerCase && 
                selectorModelLowerCase &&
                selectorProductionYearLowerCase &&
                selectorSubTypeLowerCase &&
                selectorGasLowerCase &&
                selectorCC)  
                {
                    const instance = carsData[0].manufacturers
                    .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                    .filter(item => item.model === selectorModelLowerCase)
                    .filter(obj => obj.productionYears)
                    const instanceTwo = instance !== undefined ? instance.map(item => item.productionYears) : undefined;
                    const instanceThree = instanceTwo !== undefined ? instanceTwo.map(item => item.filter(obj => obj.productionYear === selectorProductionYearLowerCase)) : undefined;
                    const instanceFour = instanceThree !== undefined ? instanceThree.map(item => item.map(obj => obj.subTypes)) : undefined;
                    const instanceFive = instanceFour !== undefined ? instanceFour.map(item => item)[0] : undefined;
                    const instanceSix = instanceFive !== undefined ? instanceFive.map(item => item.filter(obj => obj.subType === selectorSubType).map(item => item.gasTypes)) : undefined;
                    const instanceSeven = instanceSix !== undefined ? instanceSix.map(item => item.map(arr => arr))[0] : undefined;
                    const instanceEight = instanceSeven !== undefined ? instanceSeven.map(item => item.filter(obj => obj.gasType === selectorGasLowerCase)) : undefined;
                    const instanceNine = instanceEight !== undefined ? instanceEight.map(item => item.map(obj => obj.ccs)) : undefined;
                    const instanceTen = instanceNine !== undefined ? instanceNine.map(item => item.map(arr => arr.filter(obj => obj.cc)))[0] : undefined;
                    const instanceEleven = instanceTen !== undefined ?instanceTen.map(item => item.filter(obj => obj.cc === selectorCC)) : undefined;
                    const instanceTwelve= instanceEleven !== undefined ? instanceEleven.map(item => item.map(obj => obj.horsePower)) : undefined;
                    const instanceThirteen = instanceTwelve !== undefined ? instanceTwelve.map(item => item.map(item => item.map(obj => obj.hp))) : undefined;
                    const instanceFourteen = instanceThirteen !== undefined ? instanceThirteen.map(item => item.map(item => item.map(obj => obj)))[0] : undefined;
                    const instanceFifteen = instanceFourteen !== undefined ? instanceFourteen: undefined;
                    const horsePowerList = instanceFifteen !== undefined ? instanceFifteen[0] : undefined;
                    
                return horsePowerList
    
                } else {
                    console.log('else horse power')
                }
        }

        const modelSelected = e => {
            console.log(e)
            setStateYearsList({
                forModel: e
            })
            if(stateYearsList.forModel === e) {
                setStateYearsList({
                    forModel: ''
                })
            }
            setFirstInstanceSelection(false);
            // svaki ce da pushuje u objekat svoje reference
            // i svaki ce da ima submit dugme sa referencom izdvajanja objekta i pushovanja u arr obj
        }

        const yearSelected = e => {
            console.log(e);
            setStateGasList({
                forYear: e
            })
            if(stateGasList.forYear === e) {
                setStateGasList({
                    forYear: ''
                })
            }
        }

        const gasSelected = e => {
            console.log(e);
            setStateCCList({
                forGas: e
            })
            if(stateCCList.forGas === e) {
                setStateCCList({
                    forGas: ''
                })
            }
        }
        function specificModel(inputModel) {
            if(inputModel &&
                carsData[0].manufacturers.map(item => item.manufacturer).includes(inputModel)
                ) {
                     const modelsList = 
                             carsData[0].manufacturers
                             .filter(item => item.manufacturer === inputModel)[0].models
                             .map(item => item.model);
                             console.log(modelsList);
                     return modelsList;
             }
        }

        function specificProductionYearsList(inputModel) {
            if(selectorManufacturerLowerCase && 
                inputModel
                ) {
                    const instance = carsData[0].manufacturers
                    .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                    .filter(item => item.model === inputModel)
                    
                    const instanceTwo = instance !== undefined ? instance.map(obj => obj.productionYears)[0] : undefined;
                    const yearsList = instanceTwo !== undefined ? instanceTwo.map(item => item.productionYear) : [];
                            
                    console.log(yearsList)
                    return yearsList;
                    } else {
                        console.log('else. . .')
                        return []
                    }
        }

        function specificGasList(model, year) {
            const subType = year < 2000 ? '8L' : '8P'
            if(selectorManufacturerLowerCase) {
                const instance = carsData[0].manufacturers
                    .filter(item => item.manufacturer === selectorManufacturerLowerCase)[0].models
                    .filter(item => item.model === model)
                    .filter(obj => obj.productionYears)
                const instanceTwo = instance !== undefined ? instance.map(item => item.productionYears) : undefined;
                const instanceThree = instanceTwo !== undefined ? instanceTwo.map(item => item.filter(obj => obj.productionYear === year)) : undefined;
                const instanceFour = instanceThree !== undefined ? instanceThree.map(item => item.map(obj => obj.subTypes)) : undefined;
                const instanceFive = instanceFour !== undefined ? instanceFour.map(item => item)[0] : undefined;
                const instanceSix = instanceFive !== undefined ? instanceFive.map(item => item.filter(obj => obj.subType === subType).map(item => item.gasTypes)) : undefined;
                const instanceSeven = instanceSix !== undefined ? instanceSix.map(item => item.map(arr => arr))[0] : undefined;
                const gasList = instanceSeven !== undefined ? instanceSeven.map(item => item.map(obj => obj.gasType))[0] : [];
            
                return gasList;
        } else {
            console.log('else... gasList')
        }
        }

console.log(referenceList());
        // SUBMIT BUTTON
        const submitManufacturer = (name, index) => {
            // salje item samo sa manufacturer properties-om
            console.log(name, index);
            setSubmit({
                manufacturer: name
            })
            const submitObj = {
                manufacturer: name
            }
            if(submitList !== []) {
                console.log('not undefined', submitList)
                submitList.push(submitObj)
            } else {
                console.log('undefined')
                setSubmitList([...submitList, submitObj])
            }
            
            setStateManufacturerIndex({
                manufacturerIndex: [...stateManufacturerIndex.manufacturerIndex, index]
            })
            if(submit.manufacturer === undefined || submit.manufacturer === name) {
                console.log('Vec ste uneli ovaj deo u bazu.')
            }
            setFirstInstanceSelection(true);
        }


        const submitModel = (x, y, index) => {
            setSubmit({
                manufacturer: x,
                model: y
            })
            const submitObj = {
                manufacturer: x,
                model: y
            }
            if(submitList !== []) {
                console.log('not undefined', submitList)
                submitList.push(submitObj)
            } else {
                console.log('undefined')
                setSubmitList([
                    ...submitList, submitObj
                ])
            }
            setStateManufacturerIndex({
                manufacturerIndex: [...stateManufacturerIndex.manufacturerIndex, index]
            })
            setStateYearsList({
                forModel: ''
            })
            dispatch({ type: "MANUFACTURER_SELECTED", payload: true })
            setIsOpen(false);
            setFirstInstanceSelection(false);
        }

        console.log(submit)
        console.log(referenceList())


        // UPLOAD IMAGE

    return (
    <>
        <button onClick={callState}>call state</button>

        <button onClick={() => {
            setIsOpen(true);
            dispatch({ type: "MANUFACTURER_SELECTED", payload: true });
            if(manufacturerSelected === true) {
                setFirstInstanceSelection(true)
            } else {
                setFirstInstanceSelection(false);
            }
            }}>
                Add
        </button>
           <Modal open={isOpen} onClose={() => setIsOpen(false)}>
           <div>
               {manufacturerSelected && (
                    <div>
                        <SubmitDD 
                            placeholder={"submit"}
                            option={manufacturersList}
                            reduxType={"UPLOAD_MANUFACTURERS_LIST"}
                        />
                    </div>
               )}
                <div>
                    {manufacturerSelector.map((manufacturer, manufacturerIndex) => (
                    <div>
                        {stateManufacturerIndex.manufacturerIndex.includes(manufacturerIndex) === false && (
                        <div>
                             <div>
                                 {firstInstanceSelection && (
                                    <div>
                                        <li key={manufacturerIndex} onClick={() => {
                                            submitManufacturer(manufacturer, manufacturerIndex);
                                            setIsOpen(false);
                                            dispatch({ type: "MANUFACTURER_SELECTED", payload: true })
                                            }} 
                                            style={{ border: "1px solid grey", backgroundColor: "grey", cursor: "pointer", listStyleType: "none", textDecoration: "none" }}>
                                                {manufacturer}
                                        </li>
                                    </div>
                                 )}
                            {specificModel(manufacturer) !== undefined ? specificModel(manufacturer).map((model, modelIndex) => (
                            <div>
                                {firstInstanceSelection && (
                                    <div>
                                        <li key={modelIndex} onClick={() => modelSelected(model)}>{model}</li> 
                                    </div>
                                )}
                                {stateYearsList.forModel === model && (
                                    <div>
                                        <div onClick={() => submitModel(manufacturer, model, modelIndex)} style={{ border: "1px solid grey", backgroundColor: "grey", cursor: "pointer", listStyleType: "none", textDecoration: "none" }}>
                                            <h3>{manufacturer}</h3>
                                            <h4>{model}</h4>
                                        </div>
                                        {specificProductionYearsList(model).map((year, yearIndex) => (
                                            <div>
                                                <li key={yearIndex} onClick={() => yearSelected(year)}>{year}</li>
                                                {stateGasList.forYear === year && (
                                                    <div>
                                                        {specificGasList(model, year).map((gas, gasIndex) => (
                                                            <li key={gasIndex} onClick={() => gasSelected(gas)}>{gas}</li>
                                                        ))}
                                                    </div>
                                                        )} 
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                            </div>
                            )) : []}
                        </div>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>                
            </Modal>

        <div>
 {/*           Lista specifikacija:
            {referenceList().map((item, index) => (
                <li key={index}>{item.length < 1 ? item : item.map((obj, objIndex) => (
                    <li key={objIndex}>{obj.length < 2 ? item : obj}</li>
                ))}</li> 
            ))} */} 
        </div>
        <div>
            PROBA:
            {refList().map((item, i) => (
                <li key={i}>
                    manufacturer: {item.manufacturer} <br />
                    {item.model !== undefined ? `model: ${item.model}` : ""}
                </li>
            ))}
        </div>

        <div style={{ padding: "20px", backgroundColor: "black" }} />

        <div className="add-bar-start">
            <div className="title">
                <h2>Add item</h2>                
            </div>

            <div className="image-upload">
                <ImgUpload />
            </div>

            <div className="add-manufacturer-row">
                <div className="add-manufacturer-input">
                    <div>
                        <SubmitDD 
                            placeholder={"submit"}
                            option={manufacturersList}
                            reduxType={"UPLOAD_MANUFACTURERS_LIST"}
                        />
                    </div>
                </div>
                <div className="add-manufacturer-manufacturers-list">

                </div>
            </div>

        </div>
    </>
    );
};

export default Add;