import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './imgUpload.css';
import rightarrow from '../../../../../images/right-arrow.svg';
import leftarrow from '../../../../../images/left-arrow.svg';

const Slider = ({ images }) => {
    const selector = useSelector(state => state.item)
    const [index, setIndex] = useState(selector.sliderIndex);

    const slideRight = () => {
        setIndex((index + 1) % images.length)
    }
    const slideLeft = () => {
        const nextIndex = index - 1;
        if(index > 0) {
            setIndex(nextIndex)
        } else {
            setIndex(images.length - 1)
        }
    }
    console.log(images);
    return (
        images.length > 0 && (
        <div>
            <div className="slider-row">
                <img src={leftarrow} className="left-arrow" onClick={slideLeft} width="40vw" height="40vh" />
                <div className="slider-img-row">
                    <img src={images[index]} className="slider-img" alt={index} width="300vw" height="300vh" />
                </div>
                <img src={rightarrow} className="right-arrow" onClick={slideRight} width="40vw" height="40vh" />
            </div>
        </div>
        )
    );
};

export default Slider;