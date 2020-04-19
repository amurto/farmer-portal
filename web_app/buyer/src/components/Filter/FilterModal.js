import React, { useState } from './node_modules/react';
import { Button, Modal } from './node_modules/react-bootstrap';
import filterIcon from '../images/filter.png';

import './FilterModal.css';
import FilterAccordion from './FilterAccordion';

const Example = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="light" style={{backgroundColor:'#EEEEEE'}} className="filter-modal-button" onClick={handleShow}>
            Filter &nbsp;
            <img src={filterIcon} alt="Filter" />
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="filter-modal-title">FILTER</Modal.Title>
          </Modal.Header>
          <FilterAccordion />
        </Modal>
      </>
    );
}

  
export default Example;