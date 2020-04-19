import React, { useState } from './node_modules/react';
import { Modal, Button } from './node_modules/react-bootstrap';
import SignUpForm from './SignUp';

import './LoginModal.css';

const LoginModal = props => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
      if (!isLoginMode) {
        console.log("Signup");
        setIsLoginMode(prevMode => !prevMode);
      } else {
        console.log("Login");
        setIsLoginMode(prevMode => !prevMode);
      }
    };

    return (
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{isLoginMode ? 'Register' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm isLogin ={isLoginMode} closeModal={props.close} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="switch-btn" variant="outline-success" onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
};

export default LoginModal;
