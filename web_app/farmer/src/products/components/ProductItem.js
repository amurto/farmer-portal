import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ProductModal from '../../shared/components/UIElements/ProductModal';

import veg from './veg.png';
import nonveg from './nonveg.png';

import './ProductItem.css';

const ProductItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDescription, setShowDescription] = useState(false);

    const handleCloseDescription = () => setShowDescription(false);
    const handleShowDescription = () => setShowDescription(true);

    var foodType;
    if (props.category === "Poultry") {
        foodType = <img src={nonveg} alt="Food Type" />
    } else {
        foodType = <img src={veg} alt="Food Type" />
    }
    const confirmDelete = async () => {
        setShow(false);
        try {
            await sendRequest(
                `http://localhost:5000/api/products/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <ProductModal 
                title={props.title}
                description={props.description}
                quantity={props.quantity}
                foodType={foodType}
                unit={props.unit}
                price={props.price}
                category={props.category}
                image={props.image}
                show={showDescription} 
                onHide={handleCloseDescription} 
            />
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 product__card">
                {isLoading  && <LoadingSpinner asOverlay />}
                <div className="card border-0 shadow">
                    <div className="card-body rounded-bottom">
                        <div className="view ">
                            <img className="card-img-top rounded-top" src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                            <a href="#!">
                                <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>
                            {foodType}
                            <h4 className="card-text small mb-2 d-block">
                                {props.category}
                            </h4>
                            <Link className="h5 card-title" style={{color: 'black'}} to="./id">{props.title}</Link>
                            <hr></hr>
                            <ul className="list-unstyled d-flex justify-content-between mb-3 text-center small">
                                <li className="price">
                                    <p className="mb-1 font-weight-bold text-dark">Price</p>
                                    <span className="amount">Rs {props.price} / {props.unit}</span> 
                                </li>
                                <li className="quantity">
                                    <p className="mb-1 font-weight-bold text-dark">Quantity left</p>
                                    <span className="amount">{props.quantity} {props.unit}</span> 
                                </li>
                                <li className="days">
                                    <p className="mb-1 font-weight-bold text-dark">Days Left</p>
                                    <span className="amount">15</span> 
                                </li>
                            </ul>
                                    
                            <ul className="list-unstyled d-flex justify-content-between mb-3 text-center small">
                                <li className="view">
                                    <Button inverse onClick={handleShowDescription}>VIEW</Button>
                                </li>
                                <li className="edit">
                                    {auth.userId === props.creatorId && (
                                    <Button to={`/products/${props.id}`}><i className="far fa-edit"></i></Button>
                                    )}
                                </li>
                                <li className="delete">
                                    {auth.userId === props.creatorId && (
                                    <Button danger onClick={handleShow}><i className="fas fa-trash-alt"></i></Button>
                                    )}
                                </li>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>DELETE</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Do you want to delete this product?</Modal.Body>
                                    <Modal.Footer>
                                    <Button inverse onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                    <Button danger onClick={confirmDelete}>
                                        DELETE
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </ul>
                    </div>
                </div>  
            </div>
        </React.Fragment>
    );
};

export default ProductItem;
