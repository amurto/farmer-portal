import React, { useState, useEffect } from './node_modules/react';
import { Card, Container } from './node_modules/react-bootstrap';
import ItemsCarousel from './node_modules/react-items-carousel';
import leftChevron from '../images/left-chevron.png';
import rightChevron from '../images/right-chevron.png';
import person1 from '../images/person_1.jpg';
import person2 from '../images/person_2.jpg';
import person3 from '../images/person_3.jpg';
import person4 from '../images/person_4.jpg';

import './CardCarousel.css';

const CardCarousel = () => {
    const [CardCount, SetCardCount] = useState(() => {
        if (window.innerWidth > 1000) {
            return 3;
        } else if (window.innerWidth > 800) {
            return 2;
        } else {
            return 1;
        }
    });
    
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1000) {
                SetCardCount(3);
            } else if (window.innerWidth > 800) {
                SetCardCount(2);
            } else {
                SetCardCount(1);
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    });

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const chevronWidth = 0;

    return (
        <React.Fragment>
        <Container className="comment-container">
            <h1 className="comment-h">Our satisfied customer says</h1>
            <p className="comment-p">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
        </Container>
        <Container className="card-carousel-container">
        <ItemsCarousel
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            numberOfCards={CardCount}
            gutter={20}
            leftChevron={<img src={leftChevron} alt="Left" />}
            rightChevron={<img src={rightChevron} alt="Right" />}
            outsideChevron
            chevronWidth={chevronWidth}
        >
            <Card className="card-carousel-div">
                <Card.Img className="circular--portrait" src={person1} alt="Person1" />
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Title>- John Cena</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person2} alt="Person2" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Title>- Randy Orton</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person3} alt="Person3" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Title>- Naresh Michaels</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person4} alt="Person4" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Title>- Brett Lee</Card.Title>
                </Card.Body>
            </Card>
            <Card className="card-carousel-div">
                <div className="circular--portrait">
                <img src={person1} alt="Person1" />
                </div>
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Title>- Not Em Yee</Card.Title>
                </Card.Body>
            </Card>
        </ItemsCarousel>
        </Container>
        </React.Fragment>
)};

export default CardCarousel;