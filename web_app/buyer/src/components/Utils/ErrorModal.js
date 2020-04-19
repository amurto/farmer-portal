  
import React from './node_modules/react';

import { Modal, Button } from './node_modules/react-bootstrap';

const ErrorModal = props => {
  return (
    <>
    <Modal show={!!props.error} onHide={props.onClear}>
      <Modal.Header closeButton>
        <Modal.Title>An Error Occurred!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.error}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClear}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ErrorModal;