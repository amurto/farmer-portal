import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom';

import veg from '../images/veg.png';
import nonveg from '../images/nonveg.png';

import './ProductItem.css';

const ProductItem = props => {
    var foodType;
    if (props.category === "Poultry") {
        foodType = <img src={nonveg} alt="Food Type" />
    } else {
        foodType = <img src={veg} alt="Food Type" />
    }

    return (
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <div className="card border-0 shadow">
                    <div className="card-body border rounded-bottom">
                        <div className="view ">
                            <img className="card-img-top rounded-top" src={`http://localhost:5000/${props.image}`} alt={props.title} />
                        </div>
                            {foodType}
                            <h4 className="card-text small mb-2 d-block">
                                {props.category}
                            </h4>
                            <Link className="h5 card-title" style={{color: 'black'}} to="./id">{props.title}</Link>
                            <hr></hr>
                            <ul className="list-unstyled d-flex justify-content-between mb-3 text-center small">
                                <li className="pledged">
                                    <p className="mb-1 font-weight-bold text-dark">Price</p>
                                    <span className="amount">Rs {props.price} / {props.unit}</span> 
                                </li>
                                <li className="funded">
                                    <p className="mb-1 font-weight-bold text-dark">Quantity left</p>
                                    <span className="amount">
                                        {props.quantity} {props.unit}
                                    </span> 
                                </li>
                            </ul>
                    </div>
                </div>
            </div>
  );
};

export default ProductItem;