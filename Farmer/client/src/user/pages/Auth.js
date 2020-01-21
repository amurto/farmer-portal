import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_NUMBER,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          address: undefined,
          image: undefined,
          phone: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid && formState.inputs.address.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          address: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          },
          phone: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState.inputs);

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login', 
          'POST', 
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
              'Content-Type': 'application/json'
          }
        );   
        auth.login(responseData.userId, responseData.token);
      } catch (err) {

      }
    } else {
      try { 
        const formData = new FormData(); 
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value); 
        formData.append('password', formState.inputs.password.value); 
        formData.append('address', formState.inputs.address.value); 
        formData.append('phone', formState.inputs.phone.value); 
        formData.append('image', formState.inputs.image.value);   
        const responseData = await sendRequest(
            'http://localhost:5000/api/users/signup', 
            'POST',
            formData
          );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="phone"
              type="tel"
              label="Mobile"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              validators={[VALIDATOR_NUMBER(), VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]}
              errorText="Please enter a valid Mobile number"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              id="address"
              element="textarea"
              label="Address"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid address (at least 5 characters)."
              onInput={inputHandler}
            />
          )}

          {!isLoginMode && (
            <ImageUpload 
              center id="image" 
              onInput={inputHandler} 
              errorText="Please provide an image"
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
