import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { carsData } from '../search/collections/dataSet';

const SubmitDD = ({ option, placeholder, reduxType }) => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([])

  const manufacturersList = carsData[0].manufacturers.map(item => item.manufacturer); 

  const wrapperRef = useRef(null); 
 
  const selector = useSelector(state => state.item.items);
  const dispatch = useDispatch();

    const addType = manufacturer => {
        dispatch({ type: reduxType, payload: manufacturer });
        setDisplay(!display);
        setSearch(manufacturer);
        dispatch({ type: "MANUFACTURER_SELECTED", payload: false })
    }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleClickOutside = e => {
    // wrapperRef is destructured to invoke wrap as current value (value after)
    // wrap is null, so when div with ref={wrapperRef} isn't clicked, wrap doesnt contains e.target (div) becouse its null
    const {current: wrap} = wrapperRef;
    if(wrap && !wrap.contains(e.target)) {
      setDisplay(false)
    }
  }
  return (
    <div ref={wrapperRef} className="main-SubmitDD-container">
       <input 
        autoComplete="off"
        id="auto" 
        value={search} 
        onClick={() => setDisplay(!display)} 
        placeholder={placeholder} 
        onChange={(e) => {
          setSearch(e.target.value);
          if(option.includes(e.target.value)) {
            dispatch({ type: reduxType, payload: e.target.value });
          }
        }}
        // we need to specify the last item in the array - it is searched value
        // from here we send manufacuter to redux state 
        // and use it in typesState functional component - for classification (audi searched: audi types, bmw searched: bmw types etc.)
        />
        {display && (
          <div 
          className="display-SubmitDD-container"
          onClick={() => setDisplay(!display)}>
            {option
              .filter(val => val === String ? val.toLowerCase().includes(search.toLowerCase())
                      :
                      val.toString().includes(search)
                      ) 
              .map((data, index) => {
              return <div 
              tabIndex="0"
              className="option"
              key={index}
              onClick={() => {
                addType(data);
                console.log(option, data);
                if(list === []) {
                    setList(data)
                } else {
                    setList([...list, data])
                }
                setSearch('')
              }}
              >
                  <li key={index}>{data}</li>
                  {option.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </div>
            })}
          </div>
        )} 
    </div>
  );
};

export default  SubmitDD;