import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { Row, Col } from 'react-bootstrap';


import './ProductForm.css';

const NewProduct = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [unit, setUnit] = useState('Kilogram');
  const [category, setCategory] = useState('Fruits and Vegetables');

  function handleUnitChange(e){
    setUnit(e.target.value);
  };

  function handleCategoryChange(e){
    setCategory(e.target.value);
  };

  const [formState, inputHandler] = useForm(
  {
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    },
    quantity: {
      value: '',
      isValid: false
    },
    price: {
      value: '',
      isValid: false
    }
  }, false);

  const history = useHistory();

  const productSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData(); 
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value); 
      formData.append('quantity', formState.inputs.quantity.value); 
      formData.append('unit', unit);
      formData.append('price', formState.inputs.price.value);  
      formData.append('category', category);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(
        'http://localhost:5000/api/products',
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/');
    } catch (err) {}
  };
    
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="product-form" onSubmit={productSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <ImageUpload 
          id="image" 
          onInput={inputHandler} 
          errorText="Please provide an image" 
        />
        <Row>
          <Col>
            <Input
              type="number"
              id="quantity" 
              element="input"
              label="Quantity"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              errorText="Please enter valid quantity."
              onInput={inputHandler}
            />
          </Col>
          <Col>
            <div className="form-control">
              <label htmlFor="unit">Unit</label>
              <select 
                className="form-control" 
                onChange={handleUnitChange} 
                value={unit}
                style={{ 
                  marginTop: "0px", 
                  paddingTop: "0px",
                  paddingLeft: "0px",
                  backgroundColor: "#f8f8f8" 
                  }}>
                  <option value="Kilogram">Kilograms</option>
                  <option value="Litre">Litres</option>
                  <option value="Dozen">Dozen</option>
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="form-control">
              <label htmlFor="category">Category</label>
              <select 
                className="form-control" 
                onChange={handleCategoryChange} 
                value={category}
                style={{ 
                  marginTop: "0px", 
                  paddingTop: "0px",
                  paddingLeft: "0px",
                  backgroundColor: "#f8f8f8" 
                  }}>
                  <option value="Fruits and Vegetables">Fruits and Vegetables</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Poultry">Poultry</option>
              </select>
            </div>      
          </Col>
          <Col>
            <Input
              type="number"
              id="price"
              element="input"
              label={`Price(Rs) per ${unit}`}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
              errorText="Please enter valid price."
              onInput={inputHandler}
            />
          </Col>
        </Row>
        
        <Button type="submit" disabled={!formState.isValid}>
          ADD PRODUCT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewProduct;
