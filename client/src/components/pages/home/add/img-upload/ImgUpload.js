import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './imgUpload.css';
import Slider from './Slider';
import { ImgUploadRowContext } from '../../../../../context/ImgUploadRowContext';


const ImgUpload = (props) => {
    const selector = useSelector(state => state.item);
    const [context, setContext] = useContext(ImgUploadRowContext)

    const upload = selector.uploadImg;
    const slider = selector.slider;

    let fileObj = [];
    let contextObj = [];

    const dispatch = useDispatch();

    // on ga push-uje i ne invokuje ga uoopste 
    function uploadMultipleFiles(e) {
        fileObj.push(e.target.files);
        for(let i = 0; i < fileObj[0].length; i++) {
            contextObj.push(URL.createObjectURL(fileObj[0][i]))

            setContext(contextObj)
        }
    } 

    function restartFileArr() {
        setContext([])
    }

    function onCloseClick(url) {
        const filtered = context.filter(item => item !== url);
        setContext(filtered);
    }

    function clickedImage(url) {
        console.log(url);
        const index = context.indexOf(url);
        dispatch({
            type: 'UPLOAD_IMG_ROW',
            payload: false
        })
        dispatch({
            type: 'SLIDER_ROW',
            payload: true
        })
        dispatch({ 
            type: 'UPLOAD_SLIDER_INDEX', 
            payload: index 
        })
    }


    return (
        <div>
            {upload && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="add-img-row">
                    <label className="add-file-upload">
                        <input type="file" className="add-image-input" onChange={uploadMultipleFiles} onClick={() => restartFileArr()} multiple />
                        Add photo
                    </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    {(context).map((url, index) => (
                        <div key={index} style={{ position: "relative" }}>
                            <img src={url} alt="choosen image" width="70vw" height="70vh" onClick={() => clickedImage(url)} />
                            <button 
                                style={{ cursor: "pointer", borderRadius: "50%", position: "absolute", top: "0", right: "0" }}
                                onClick={() => onCloseClick(url)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            )}
            
            <div>
                {slider && (
                    <Slider 
                        images={context}
                    />
                )}
            </div>
        </div>
    );
};

export default ImgUpload;