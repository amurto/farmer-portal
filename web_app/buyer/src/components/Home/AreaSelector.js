import React, { useState } from './node_modules/react';
import ReactTooltip from './node_modules/react-tooltip';
import { Container, Row, Col } from './node_modules/react-bootstrap';

import MapChart from './MapChart';
import MapModal from './MapModal';
import AutoCompleteLocation from './AutoCompleteLocation';

import './AreaSelector.css';

const AreaSelector = () => {
    const [content, setContent] = useState("");
    const [STName, setSTName] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const getLocationHandle = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
            });
        } else {
            console.log("Cannot support geolocation.")
        }
    };

    return (
        <React.Fragment>
            <MapModal show={show} StateName={STName} closeModal={handleClose} />

            <Container className="map-container">
                <Row>
                    <Col sm={true}>
                        <Container className="area-selector-div">
                            <Row className="area-label">
                                <h3>Select your Area</h3>
                            </Row>
                            <div className="center">
                                <AutoCompleteLocation />
                            </div>
                            <div className="center">
                                <button className="geolocation-button" onClick={getLocationHandle}>
                                    <p style={{ 
                                        marginBottom: "5px"
                                    }}>
                                        <i className="fas fa-map-marker-alt"></i>
                                        &nbsp; Get current Location
                                    </p>
                                    <p style={{ 
                                        color: "grey",
                                    }}>
                                        using GPS
                                    </p>
                                    </button>
                            </div>
                        </Container>
                    </Col>
                    <Col sm={true}>
                        <div className="map-chart">
                            <MapChart setTooltipContent={setContent} setStateName={setSTName} setShowDistrict={setShow} />
                            <ReactTooltip>{content}</ReactTooltip>
                        </div>
                    </Col>
                </Row>   
            </Container>
        </React.Fragment>
    );
}

export default AreaSelector;