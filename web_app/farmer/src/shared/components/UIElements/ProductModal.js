import React from 'react';

import { Modal } from 'react-bootstrap';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <>
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="view ">
            <img className="card-img-top rounded-top" src={`http://localhost:5000/${props.image}`} alt={props.title}/>
            <a href="#!">
                <div className="mask rgba-white-slight"></div>
            </a>
        </div>
        {props.foodType}
        <div>
        <h5>Description</h5>
        <p>{props.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default ErrorModal;