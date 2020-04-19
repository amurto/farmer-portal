import React from './node_modules/react';
import { Container, Row, Col, Button, Card, Jumbotron } from './node_modules/react-bootstrap';
import farm from '../images/farm.jpg';
import jumbo from '../images/jumbo.jpg';

import './About.css';

const About = () => {
    return (
        <React.Fragment>
        <Jumbotron style={{ backgroundImage: `url(${jumbo})`, backgroundSize: 'cover', textAlign: 'center', marginBottom: '0px' }}>
            <h1 className="jumbo-title">ABOUT US</h1>
        </Jumbotron>
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <div>
                        <img className="about-img" src={farm} alt="Farmer" />
                    </div>
                </Col>
                <Col sm>
                <Card className="about-card">
                    <Card.Body>
                        <Card.Title className="about-card-title">Welcome to FarmFresh</Card.Title>
                        <Card.Text className="about-card-text">
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        </Card.Text>
                        <Card.Text className="about-card-text">
                        But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
                        </Card.Text>
                        <Button variant="success">Shop now</Button>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </React.Fragment>
    );
};

export default About;
