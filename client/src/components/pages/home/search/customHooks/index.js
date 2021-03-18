import { useSelector } from 'react-redux';
import { carsData } from '../collections/dataSet';

const manufacturerSelector = useSelector(state => state.item.manufacturer);

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

    export function useModelsList() {
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
    export function useProductionYearsList() {
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

    export function useSubTypesList() {
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

    export function useGasList() {
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

    export function useCCList() {
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

    export function useHorsePowerList() {
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