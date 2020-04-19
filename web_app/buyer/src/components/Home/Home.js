import React from './node_modules/react';

import AreaSelector from './AreaSelector';
import ControlledCarousel from '../Landing/ControlledCarousel';

import './Home.css';
import { Container } from './node_modules/react-bootstrap';

const Home = () => {
    return (
        <React.Fragment>
            <Container className="carousel-container">
                <ControlledCarousel />
            </Container>
            <AreaSelector />   
        </React.Fragment>
    );
};

export default Home;