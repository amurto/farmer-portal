import React, { useState } from './node_modules/react';
import { Modal, Button } from './node_modules/react-bootstrap';
import ReactTooltip from './node_modules/react-tooltip';
import StateChart from './StateChart';

const MapModal = props => {
    const [contentD, setContentD] = useState("");
    const [DTName, setDTName] = useState("");

    return (
        <Modal show={props.show} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.StateName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="map-chart">
                    <StateChart setTooltipContent={setContentD} setDistrictName={setDTName} selectedState={props.StateName} />
                    <ReactTooltip>{contentD}</ReactTooltip>
                </div>
            </Modal.Body>
            <Modal.Footer>
            {DTName}
            <Button variant="secondary" onClick={props.closeModal}>
                Close
            </Button>
            <Button variant="success" onClick={props.closeModal}>
                Go
            </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default MapModal;
