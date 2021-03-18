import React from 'react';
import ReactDOM from 'react-dom';

    // MODAL styles //
    const MODAL_STYLES = {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000, 
        height: "100vw",
        overflowY: 'scroll'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000,
    }
const Modal = ({ open, children, onClose }) => {
    if(!open) return null
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
            <button 
                style={{ cursor: "pointer", borderRadius: "50%", position: "absolute", top: "0", right: "0" }}
                onClick={onClose}
            >
                x
            </button>
                {children}
                <button onClick={onClose}>Close Modal</button>
            </div>
        </>, 
        document.getElementById("portal")
    );
};

export default Modal;