import React from './node_modules/react';
import { Card, CardGroup } from './node_modules/react-bootstrap';

import shipping from '../images/truck.png';
import fresh from '../images/vegetable.png';
import quality from '../images/medal.png';
import support from '../images/customer-service.png';

import './FlaticonList.css';

const FlaticonList = () => {
    return (
            <CardGroup className="flat-space">
                <Card className="flaticon-design">
                    <Card.Body>
                    <Card.Title><img src={shipping} alt="Shipping" /></Card.Title>
                    <Card.Title>FREE SHIPPING</Card.Title>
                    <Card.Text>
                    ON ORDER OVER 1000
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="flaticon-design">
                    <Card.Body>
                    <Card.Title><img src={fresh} alt="Fresh" /></Card.Title>
                    <Card.Title>ALWAYS FRESH</Card.Title>
                    <Card.Text>
                    PRODUCT WELL PACKAGE
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="flaticon-design">
                    <Card.Body>
                    <Card.Title><img src={quality} alt="Quality" /></Card.Title>
                    <Card.Title>SUPERIOR QUALITY</Card.Title>
                    <Card.Text>
                    QUALITY PRODUCTS
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="flaticon-design">
                    <Card.Body>
                    <Card.Title><img src={support} alt="Support" /></Card.Title>
                    <Card.Title>SUPPORT</Card.Title>
                    <Card.Text>
                    24/7 SUPPORT
                    </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
            );
        };

export default FlaticonList;