import React from 'react';
import { 
    Button
 } from 'react-bootstrap';
 import {
     Link
 } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to='/submit'>
                <Button variant="primary">
                    <span>Unesi</span>
                </Button>
            </Link>
            <Link to='/search'>
                <Button variant="info">
                    <span>Pretrazi</span>
                </Button>
            </Link>
        </div>
    );
};

export default Home;