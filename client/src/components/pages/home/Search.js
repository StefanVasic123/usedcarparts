import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { carsData } from '../../pages/home/search/collections/dataSet';
import SearchableDD from '../home/search/SearchableDD';
import porshe from '../../../images/porshe.png';

const Search = () => {
    const [itemVal, setItemVal] = useState('');
    const [manufacturerVal, setManufacturerVal] = useState('');
    const [modelVal, setModelVal] = useState('');
    const [prodYearVal, setProdYearVal] = useState('');
    const [gasVal, setGasVal] = useState('');
    const [ccVal, setCCVal] = useState('');
    const [hpVal, setHPVal] = useState('');

    const [manufacturerInputRow, setManufacturerInputRow] = useState(false);
    const [modelInputRow, setModelInputRow] = useState(false);
    const [prodYearInputRow, setProdYearInputRow] = useState(false);
    const [gasInputRow, setGasInputRow] = useState(false);
    const [ccInputRow, setCCInputRow] = useState(false);
    const [hpInputRow, setHPInputRow] = useState(false);

    const [blockedInput, setBlockedInput] = useState(true);
    const [blockedManufacturer, setBlockedManufacturer] = useState(true);
    const [blockedModel, setBlockedModel] = useState(true);
    const [blockedProdYear, setBlockedProdYear] = useState(true);
    const [blockedGas, setBlockedGas] = useState(true);
    const [blockedCC, setBlockedCC] = useState(true);

    const [respond, setRespond] = useState([]);

    const [manufacturerSearchInput, setManufacturerSearchInput] = useState('');
    const [modelSearchInput, setModelSearchInput] = useState('');
    const [productionYearSearchInput, setProductionYearSearchInput] = useState('');
    const [subTypeSearchInput, setSubTypeSearchInput] = useState('');
    const [gasSearchInput, setGasSearchInput] = useState('');
    const [ccSearchInput, setCCSearchInput] = useState('');
    const [hpSearchInput, setHPSearchInput] = useState(null);

    const selector = useSelector(state => state.item);
    const dispatch = useDispatch();

    const items = ['alnaser', 'akumulator', 'motor', 'gogotov'];
    const manufacturers = carsData[0].manufacturers.map(item => item.manufacturer);

    const manufacturerInstance = carsData[0].manufacturers.filter(item => item.manufacturer === selector.manufacturerInput); 
    
    const models = manufacturerInstance[0] !== undefined ? manufacturerInstance[0].models.map(data => data.model) : [];
    const choosenModelInstance = manufacturerInstance[0] !== undefined ? manufacturerInstance[0].models.filter(data => data.model === selector.modelInput) : [];

    const productionYears = choosenModelInstance[0] !== undefined ? choosenModelInstance[0].productionYears.map(data => data.productionYear) : [];
    const choosenProductionYearsInstance = choosenModelInstance[0] !== undefined ? choosenModelInstance[0].productionYears.filter(item => item.productionYear === selector.prodYearInput) : [];
    
    const gas = choosenProductionYearsInstance[0] !== undefined ? choosenProductionYearsInstance[0].subTypes[0].gasTypes.map(data => data.gasType) : [];
    const choosenGasInstance = choosenProductionYearsInstance[0] !== undefined ? choosenProductionYearsInstance[0].subTypes[0].gasTypes.filter(item => item.gasType === selector.gasInput) : []
    
    const cc = choosenGasInstance[0] !== undefined ? choosenGasInstance[0].ccs.map(data => data.cc) : [];
    const choosenCCInstance = choosenGasInstance[0] !== undefined ? choosenGasInstance[0].ccs.filter(item => item.cc === selector.ccInput) : [];
    
    const hp = choosenCCInstance[0] !== undefined ? choosenCCInstance[0].horsePower.map(data => data.hp) : [];

    function manufacturerClear() {
        setBlockedManufacturer(false)
        setModelInputRow(false);
        setProdYearInputRow(false);
        setGasInputRow(false);
        setCCInputRow(false);

        dispatch({
            type: 'ADD_SEARCH_INPUT_MODEL',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_PRODUCTION_YEAR',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_GAS',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_CC',
            payload: "" 
        });
    }
    function modelClear() {
        setBlockedModel(false);
        setProdYearInputRow(false);
        setGasInputRow(false);
        setCCInputRow(false);

        dispatch({
            type: 'ADD_SEARCH_INPUT_PRODUCTION_YEAR',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_GAS',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_CC',
            payload: "" 
        });
    }
    function prodYearClear() {
        setBlockedProdYear(false);
        setGasInputRow(false);
        setCCInputRow(false);

        dispatch({
            type: 'ADD_SEARCH_INPUT_GAS',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_CC',
            payload: "" 
        });
    }
    function gasClear() {
        setBlockedGas(false)
        setCCInputRow(false);

        dispatch({
            type: 'ADD_SEARCH_INPUT_CC',
            payload: "" 
        });
    }
    useEffect(() => {
        if(selector.invokeInputSearch) {
            setManufacturerInputRow(true);
        }

        // SET OF FUNCTION WHEN INPUT FIELD IS CLEARED/ERASED
        if(selector.searchInput === "") {
            // izbrisi iz redux-a manufacturerInput, i ostale i plus izbrisi inputValue i useState hook
            setBlockedInput(false);
            
            setManufacturerInputRow(false);
            setModelInputRow(false);
            setProdYearInputRow(false);
            setGasInputRow(false);
            setCCInputRow(false);
            setHPInputRow(false);

            dispatch({
                type: 'ADD_SEARCH_INPUT_MANUFACTURER',
                payload: ""
            });
            dispatch({
                type: 'ADD_SEARCH_INPUT_MODEL',
                payload: ""
            });
            dispatch({
                type: 'ADD_SEARCH_INPUT_PRODUCTION_YEAR',
                payload: ""
            });
            dispatch({
                type: 'ADD_SEARCH_INPUT_GAS',
                payload: ""
            });
            dispatch({
                type: 'ADD_SEARCH_INPUT_CC',
                payload: "" 
            });
        }

        if(selector.searchInput && selector.manufacturerInput === "") {
            setBlockedInput(true)
            findItem();
        }
        if(selector.manufacturerInput && selector.modelInput === "" && blockedInput) {
            setBlockedInput(true)
            setBlockedManufacturer(true)
            findManufacturer();
        }

        selector.manufacturerInput === "" ? manufacturerClear() : setModelInputRow(true)
        if(selector.modelInput && selector.prodYearInput === "" && blockedInput && blockedManufacturer) {
            setBlockedModel(true)
            findModel();
        }

        selector.modelInput === "" ? modelClear() : setProdYearInputRow(true)
        if(selector.prodYearInput && selector.gasInput === "" && blockedInput && blockedManufacturer && blockedModel) {
            setBlockedProdYear(true)
            findProdYear();
        }

        selector.prodYearInput === "" ? prodYearClear() : setGasInputRow(true)
        if(selector.gasInput && selector.ccInput === "" && blockedInput && blockedManufacturer && blockedModel && blockedProdYear) {
            setBlockedGas(true)
            findGas();
        }

        selector.gasInput === "" ? gasClear() : setCCInputRow(true)
        if(selector.ccInput && selector.hpInput === "" && blockedInput && blockedManufacturer && blockedModel && blockedProdYear && blockedGas) {
            setBlockedCC(true)
            findCC();
        }

        selector.ccInput === "" ? setHPInputRow(false) : setHPInputRow(true)
        if(selector.hpInput && blockedInput && blockedManufacturer && blockedModel && blockedProdYear && blockedGas && blockedCC) {
            findHP();
        }
        
    }, [selector.searchInput, 
        selector.manufacturerInput, 
        selector.modelInput,
        selector.prodYearInput,
        selector.gasInput,
        selector.ccInput,
        selector.hpInput]);

    async function findItem() {
            await axios.post('/api/items/findItem', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput 
            })
            .then(res => {
                console.log(res.data);
                setRespond(res.data)
            })
            .catch(err => console.log(err))
    }
    
    async function findManufacturer() {
            await axios.post('/api/items/findManufacturer', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput
            })
            .then(res => {
                setRespond(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    async function findModel() {
            await axios.post('/api/items/findModel', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput,
                model: selector.modelInput 
            })
            .then(res => {
                setRespond(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    async function findProdYear() {
            await axios.post('/api/items/findProdYear', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput,
                model: selector.modelInput,
                productionYear: selector.prodYearInput
            })
            .then(res => setRespond(res.data))
            .catch(err => console.log(err))
    }

    async function findGas() {
            await axios.post('/api/items/findGas', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput,
                model: selector.modelInput,
                productionYear: selector.prodYearInput,
                gas: selector.gasInput
            })
            .then(res => {
                setRespond(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    async function findCC() {
            await axios.post('/api/items/findCC', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput,
                model: selector.modelInput,
                productionYear: selector.prodYearInput,
                gas: selector.gasInput,
                cc: selector.ccInput
            })
            .then(res => {
                setRespond(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    async function findHP() {
            await axios.post('/api/items/findHP', {
                userId: localStorage.getItem('userId'),
                item: selector.searchInput,
                manufacturer: selector.manufacturerInput,
                model: selector.modelInput,
                productionYear: selector.prodYearInput,
                gas: selector.gasInput,
                cc: selector.ccInput,
                horsePower: selector.hpInput
            })
            .then(res => {
                setRespond(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    function eraseAllParameters() {
        setBlockedInput(false);
        // state
        setManufacturerInputRow(false);
        setModelInputRow(false);
        setProdYearInputRow(false);
        setGasInputRow(false);
        setCCInputRow(false);
        setHPInputRow(false);
        // selector
        dispatch({
            type: 'ADD_SEARCH_INPUT',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_MANUFACTURER',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_MODEL',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_PRODUCTION_YEAR',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_GAS',
            payload: ""
        });
        dispatch({
            type: 'ADD_SEARCH_INPUT_CC',
            payload: "" 
        });

        setRespond([])
    }

    function manufacturerSearch(e) {
        console.log(e.target.value);
        setManufacturerSearchInput(e.target.value)
    }
    function manufacturerSearchClicked() {
        axios.post('api/items/findSpecificManufacturer', {
            userId: localStorage.getItem('userId'),
            manufacturer: manufacturerSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function modelSearch(e) {
        console.log(e.target.value);
        setModelSearchInput(e.target.value)
    }
    function modelSearchClicked() {
        axios.post('api/items/findSpecificModel', {
            userId: localStorage.getItem('userId'),
            model: modelSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function productionYearSearch(e) {
        console.log(e.target.value);
        setProductionYearSearchInput(e.target.value)
    }
    function productionYearSearchClicked() {
        axios.post('api/items/findSpecificProductionYear', {
            userId: localStorage.getItem('userId'),
            productionYear: productionYearSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function subTypeSearch(e) {
        console.log(e.target.value);
        setSubTypeSearchInput(e.target.value)
    }
    function subTypeSearchClicked() {
        axios.post('api/items/findSpecificSubType', {
            userId: localStorage.getItem('userId'),
            subType: subTypeSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function gasSearch(e) {
        console.log(e.target.value);
        setGasSearchInput(e.target.value)
    }
    function gasSearchClicked() {
        axios.post('api/items/findSpecificGas', {
            userId: localStorage.getItem('userId'),
            gas: gasSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function ccSearch(e) {
        console.log(e.target.value);
        setCCSearchInput(e.target.value)
    }
    function ccSearchClicked() {
        axios.post('api/items/findSpecificCC', {
            userId: localStorage.getItem('userId'),
            cc: ccSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }

    function hpSearch(e) {
        console.log(e.target.value);
        setHPSearchInput(e.target.value)
    }
    function hpSearchClicked() {
        axios.post('api/items/findSpecificHP', {
            userId: localStorage.getItem('userId'),
            horsePower: hpSearchInput
        })
        .then(res => setRespond(res.data))
        .catch(err => console.log(err))
    }
    return (
        <div>
            Search
            <SearchableDD 
                option={items}
                placeholder="item"
                reduxType={'ADD_SEARCH_INPUT'}
                invokeList={'INVOKE_INPUT_SEARCH'}
            />
            {manufacturerInputRow && (
            <div>
                <SearchableDD  
                    option={manufacturers}
                    placeholder="manufacturer"
                    reduxType={'ADD_SEARCH_INPUT_MANUFACTURER'}
                    invokeList={'INVOKE_INPUT_SEARCH_MANUFACTURER'}
                />
            </div>
            )}
            {modelInputRow && (
            <div>
                <SearchableDD 
                    option={models}
                    placeholder="model"
                    reduxType={'ADD_SEARCH_INPUT_MODEL'}
                    invokeList={'INVOKE_INPUT_SEARCH_MODEL'}
                />
            </div>
            )}
            {prodYearInputRow && (
            <div>
                <SearchableDD 
                    option={productionYears}
                    placeholder="production year"
                    reduxType={'ADD_SEARCH_INPUT_PRODUCTION_YEAR'}
                    invokeList={'INVOKE_INPUT_SEARCH_PRODUCTION_YEAR'}
                />
            </div>
            )}
            {gasInputRow && (
            <div>
                <SearchableDD 
                    option={gas}
                    placeholder="gas"
                    reduxType={'ADD_SEARCH_INPUT_GAS'}
                    invokeList={'INVOKE_INPUT_SEARCH_GAS'}
                />
            </div>
            )}
            {ccInputRow && (
            <div>
                <SearchableDD 
                    option={cc}
                    placeholder="cc"
                    reduxType={'ADD_SEARCH_INPUT_CC'}
                    invokeList={'INVOKE_INPUT_SEARCH_CC'}
                />
            </div>
            )}
            {hpInputRow && (
            <div>
                <SearchableDD 
                    option={hp}
                    placeholder="hp"
                    reduxType={'ADD_SEARCH_INPUT_HP'}
                    invokeList={'INVOKE_INPUT_SEARCH_HP'}
                />
            </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {respond.map((item, index) => (
                    <ul style={{ display: "flex" }}>
                        <li key={index} style={{ height: "100%", display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', listStyleType: 'none', textDecoration: 'none' }}>
                            <img 
                            style={{ textAlign: 'center' }}
                            src={porshe} 
                            key={index} 
                            style={{ margin: "1em" }} 
                            width="60px" 
                            height="60px" />
                            <p>{item.manufacturer.map((man, indx) => (<li key={indx}>{man}</li>))}</p>
                            <p>{item.model.map((m, i) => (<li key={i}>{m}</li>))}</p>
                            <p>{item.productionYear.map((pY, i) => (<li key={pY}>{pY}</li>))}</p>
                            <p>{item.gas.map((g, indxG) => (<li key={indxG}>{g}</li>))}</p>
                            <p>{item.cc.map((c, iCC) => (<li key={iCC}>{c}</li>))}</p>
                            <p>{item.horsePower.map((hpp, iHP) => (<li key={iHP}>{hpp}</li>))}</p>
                        </li>
                    </ul>
                    ))}
                    <button onClick={eraseAllParameters}>Erase All</button>
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="manufacturer" className="manufacturer-search-input" id="manufacturer-search-input" name="manufacturer-search-input" onChange={(e) => manufacturerSearch(e)} />
                        <button onClick={manufacturerSearchClicked}>Search</button>
                    </div>  
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="model" className="model-search-input" id="model-search-input" name="model-search-input" onChange={(e) => modelSearch(e)} />
                        <button onClick={modelSearchClicked}>Search</button>
                    </div>   
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="production year" className="production-year-search-input" id="production-year-search-input" name="production-year-search-input" onChange={(e) => productionYearSearch(e)} />
                        <button onClick={productionYearSearchClicked}>Search</button>
                    </div>  
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="subType" className="subType-search-input" id="subType-search-input" name="subType-search-input" onChange={(e) => subTypeSearch(e)} />
                        <button onClick={subTypeSearchClicked}>Search</button>
                    </div>  
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="gas" className="gas-search-input" id="gas-search-input" name="gas-search-input" onChange={(e) => gasSearch(e)} />
                        <button onClick={gasSearchClicked}>Search</button>
                    </div>  
                    <div style={{ display: "flex" }}>
                        <input type="text" placeholder="cc" className="cc-search-input" id="cc-search-input" name="cc-search-input" onChange={(e) => ccSearch(e)} />
                        <button onClick={ccSearchClicked}>Search</button>
                    </div>  
                    <div style={{ display: "flex" }}>
                        <input type="number" placeholder="hp" className="hp-search-input" id="hp-search-input" name="hp-search-input" onChange={(e) => hpSearch(e)} />
                        <button onClick={hpSearchClicked}>Search</button>
                    </div>                   
            </div>
        </div>
    );
};

export default Search;