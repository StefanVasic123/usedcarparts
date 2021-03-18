// !!! NE KORISTI SE - POKAZNO KAKO NE PRAVITI COMPONENTE

import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../../../actions/itemActions';
import typesCollection from './collections/typesCollection';
import { carsData } from './collections/dataSet';

const SearchableDDCollection = ({ placeholder }) => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);

  // Collection of types for choosen manufacturer
// switch/case for progressive search that return collection of types for manufacturer
// Have to become custom react hook
// type "audi" get all audi types (a3, a4, a5 etc)
    const selector = useSelector(state => state.item.manufacturer);
    const dispatch = useDispatch();
  
      const selectorLastItem = selector.slice(-1)[0];
  
      if(selectorLastItem !== undefined) {
      console.log(selectorLastItem)
      console.log(selectorLastItem.concat());
      }

      const selectorManufacturer = selectorLastItem === undefined ? false : selectorLastItem;
      const selectorManufacturerLowerCase = selectorManufacturer === false ? false : selectorManufacturer.toLowerCase();
      const manufacturerSearchedModels = () => {
          switch(selectorManufacturerLowerCase) {
              case "audi":
                  return typesCollection.map(item => item).map(data => data.Audi.map(model =>  model.type));
              case "bmw":
                  return typesCollection.map(item => item).map(data => data.BMW.map(model => ({ "data": model.type })));
              case "opel":
                  return typesCollection.map(item => item).map(data => data.Opel.type);
              default:
                  return "No manufacturer selected from list"
          }
      }  

      const carsList = carsData.map(item => item.manufacturers);
      console.log(carsData);
      console.log(carsList);
      console.log(selectorManufacturerLowerCase)

      const choosenManufacturer = carsList.map(item => item).map(car => car.filter(choosenCar => choosenCar.manufacturer === selectorManufacturerLowerCase))

      console.log(choosenManufacturer)
  // To set choosen option as value
  const setType = carModel => {
    setSearch(carModel);
    setDisplay(false);
    console.log(carModel);
    dispatch({ type: 'ADD_MODEL',
               payload: carModel
              })
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleClickOutside = e => {
    const {current: wrap} = wrapperRef;
    if(wrap && !wrap.contains(e.target)) {
      setDisplay(false)
    }
  }
  return (
    <div ref={wrapperRef} className="main-SearchableDDCollection-container">
      <input 
        id="auto" 
        value={search} 
        onClick={() => setDisplay(!display)} 
        placeholder={placeholder} 
        onChange={(e) => setSearch(e.target.value)}
        />
        {display && (
          <div className="display-SearchableDDCollection-container">
            {choosenManufacturer.map(item => item.map(arr => arr.models.map((model, index) => {
              return <div
                key={index}
                tabIndex="0"
                onClick={() => setType(model)}
                className="option"
                >
                  <li key={index}>{model}</li>
                </div>
            })))
}
          </div>
        )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems })(SearchableDDCollection);