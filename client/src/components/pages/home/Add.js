import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ImgUploadRowContext } from '../../../context/ImgUploadRowContext';
import ImgUpload from './add/img-upload/ImgUpload';
import ManufacturersList from './add/manufacturerslist/ManufacturersList';
import Articles from './add/articles/Articles';

const Add = () => {
    const [context, setContext] = useState([]);

    const selector = useSelector(state => state.item);

    const dispatch = useDispatch();

    function addItem(e) {
        e.preventDefault();
        dispatch({
            type: 'ADD_ITEM',
            payload: e.target.value
        })
    }
    function inputText(e) {
        console.log(e.target.value);
        dispatch({
            type: 'ADD_MANUFACTURER',
            payload: e.target.value
        })
    }
    return (
        <ImgUploadRowContext.Provider value={[context, setContext]}>
        <div className="add-container" style={{ height: "50vh", margin: "0 5%" }}>
            <div className="add-main-row" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="add-main-row-title" style={{ padding: "3vh" }}>
                    <h2>ADD ITEM</h2>
                </div>
                <div className="add-main-row-item" style={{ textAlign: "center" }}>
                    <input type="text" placeholder="item" onChange={(e) => addItem(e)} value={selector.item} />
                </div>
                <div className="add-main-row-button" style={{ paddingBottom: "5vh" }}>
                    <ImgUpload />
                </div>
                <div className="add-main-row-input">
                    <input type="text" placeholder="manufacturer" onChange={(e) => inputText(e)} value={selector.manufacturer.slice(-1)} />
                </div>                
            </div>

            <div style={{ paddingTop: "4vh", paddingBottom: "4vh" }} className="add-amblems-row">
                <div className="add-amblems-row-container">
                    <ManufacturersList />
                </div>
            </div>

            <div style={{ paddingBottom: "4vh" }} className="add-articles-row">
                <div className="add-articles-row-container">
                    <Articles />
                </div>
            </div>
        </div>
        </ImgUploadRowContext.Provider>
    );
};

export default Add;