import React from './node_modules/react'
import { Container, Row, Col, Button } from './node_modules/react-bootstrap';

import category0 from '../images/category.jpg';
import category1 from '../images/category-1.jpg';
import category2 from '../images/category-2.jpg';
import category3 from '../images/category-3.jpg';
import category4 from '../images/category-4.jpg';

import './Gallery.css';

const Gallery = () => {
    return (
        <Container>
            <Row>
                <Col sm>
                    <div className="card img-fluid">
                        <img className="card-img-top" src={category1} alt="Card" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">
                                <Button variant="success">
                                    Vegetables
                                </Button>
                            </h4>
                        </div>
                    </div>
                    <div className="card img-fluid">
                        <img className="card-img-top" src={category2} alt="Card" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">
                                <Button variant="success">
                                    Fruits
                                </Button>
                            </h4>
                        </div>
                    </div>
                </Col>
                <Col sm>
                    <div className="card img-fluid" id="gallery-center">
                        <img className="card-img-top" src={category0} alt="Card" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">Fresh Products</h4>
                            <p className="card-text">Straight from the farm</p>
                            <Button variant="success">
                                Shop now
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col sm>
                    <div className="card img-fluid">
                        <img className="card-img-top" src={category3} alt="Card" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">
                                <Button variant="success">
                                    Juices
                                </Button>
                            </h4>
                        </div>
                    </div>
                    <div className="card img-fluid">
                        <img className="card-img-top" src={category4} alt="Card" />
                        <div className="card-img-overlay">
                            <h4 className="card-title">
                                <Button variant="success">
                                    Dried
                                </Button>
                            </h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Gallery;
