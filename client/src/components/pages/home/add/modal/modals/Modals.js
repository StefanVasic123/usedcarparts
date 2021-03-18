import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal0 from './Modal0';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';

const Modals = () => {
    const selector = useSelector(state => state.item)
    console.log(selector, selector.modal0, selector.modal1)
    const modal0 = selector.modal0;
    const modal1 = selector.modal1;
    const modal2 = selector.modal2;
    const modal3 = selector.modal3;
    return (
        <div>
            {modal0 && (
                <Modal0 />
            )}
            {modal1 && (
                <Modal1 />
            )}
            {modal2 && (
                <Modal2 />
            )}
            {modal3 && (
                <Modal3 />
            )}
        </div>
    );
};

export default Modals;