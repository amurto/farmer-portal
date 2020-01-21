import React from 'react';

import ControlledCarousel from './ControlledCarousel';
import FlaticonList from './FlaticonList';
import Gallery from './Gallery';
import About from './About';
import CardCarousel from './CardCarousel';

import './Landing.css';

const Landing = () => {
    return (
        <React.Fragment>
            <ControlledCarousel />
            <FlaticonList />
            <Gallery />
            <About />
            <CardCarousel />
        </React.Fragment>
    );
};

export default Landing;