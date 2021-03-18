import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getItems, addItem } from '../../../../actions/itemActions';
import { carsData } from './collections/dataSet';

const SearchableDD = ({ option, placeholder, reduxType, invokeList }) => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');

  const wrapperRef = useRef(null); 
 
  const selector = useSelector(state => state.item.items);
  const dispatch = useDispatch();

    const addType = manufacturer => {
        dispatch({ type: reduxType, payload: manufacturer });
        setDisplay(!display);
        setSearch(manufacturer);
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

  function handleEnterClicked(e) {
    if(e.keyCode === 13) {
      if((option
        .filter(val => val === String ? val.toLowerCase().includes(search.toLowerCase())
                :
                val.toString().includes(search)
                ) 
        .map((data, index) => {
          return e.target.value === data;
        }))[0]) {
          console.log((option
            .filter(val => val === String ? val.toLowerCase().includes(search.toLowerCase())
                    :
                    val.toString().includes(search)
                    ) 
            .map((data, index) => {
              return e.target.value === data
            }))[0])
          console.log(e.target.value, 'entered with data');
          dispatch({ type: reduxType, payload: e.target.value });
          setDisplay(!display);
          setSearch(e.target.value);
          dispatch({
            type: invokeList,
            payload: true
          })
        } else {
          console.log('doesnt include ')
        }
      console.log(e.target.value)
    }
  }

  return (
    <div ref={wrapperRef} className="main-SearchableDD-container">
       <input 
        autocomplete="off"
        id="auto" 
        value={search} 
        onClick={() => setDisplay(!display)} 
        placeholder={placeholder} 
        onChange={(e) => {
          setSearch(e.target.value);
          dispatch({ type: reduxType, payload: e.target.value });
        }}
        onKeyDown={handleEnterClicked}
        // we need to specify the last item in the array - it is searched value
        // from here we send manufacuter to redux state 
        // and use it in typesState functional component - for classification (audi searched: audi types, bmw searched: bmw types etc.)
        />
        {display && (
          <div 
          className="display-SearchableDD-container"
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
                dispatch({
                  type: invokeList,
                  payload: true
                })
              }}
              >
                  <li key={index}>{data}</li>
              </div>
            })}
          </div>
        )} 
    </div>
  );
};

export default  SearchableDD;