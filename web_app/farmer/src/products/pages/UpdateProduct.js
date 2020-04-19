import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NUMBER
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import './ProductForm.css';


const UpdateProduct = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProduct, setLoadedProduct] = useState();
    const productId = useParams().productId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
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
      },
      false
    );
      
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/products/${productId}`
                );
                setLoadedProduct(responseData.product);
                setFormData(
                  {
                    title: {
                      value: responseData.title,
                      isValid: true
                    },
                    description: {
                      value: responseData.description,
                      isValid: true
                    },
                    quantity: {
                      value: responseData.quantity,
                      isValid: true
                    },
                    price: {
                      value: responseData.price,
                      isValid: true
                    }
                  },
                  true
                );
            } catch (err) {}
        };
        fetchProducts();
    }, [sendRequest, productId, setFormData]);
  
    const productUpdateSubmitHandler = async event => {
      event.preventDefault();
      try {
        await sendRequest(
          `http://localhost:5000/api/products/${productId}`,
          'PATCH',
          JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
            quantity: formState.inputs.quantity.value,
            price: formState.inputs.price.value
          }),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token
          }
        );
        history.push('/' + auth.userId + '/products');
      } catch (err) {}
    };
      
    if (isLoading) {
      return (
        <div className="center">
          <LoadingSpinner />
        </div>
      );
    }
  
    if (!loadedProduct && !error) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find product!</h2>
          </Card>
        </div>
      );
    }
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedProduct && <form className="product-form" onSubmit={productUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedProduct.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedProduct.description}
            initialValid={true}
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
                initialValue={loadedProduct.quantity}
                initialValid={true}
              />
            </Col>
            <Col>
              <Input
                  type="number"
                  id="price"
                  element="input"
                  label={`Price(Rs) per ${loadedProduct.unit}`}
                  validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                  errorText="Please enter valid price."
                  onInput={inputHandler}
                  initialValue={loadedProduct.price}
                  initialValid={true}
                />
            </Col>
          </Row>
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PRODUCT
          </Button>
      </form>}
    </React.Fragment>
    );
};

export default UpdateProduct;
