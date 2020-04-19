import React from './node_modules/react';

import { Row, Card } from './node_modules/react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = props => {
    if (props.items.length === 0) {
        return <div className="product-list center">
            <Card>
                <h2>No products found.</h2>
            </Card>
        </div>
    }
    return (
            <Row>
                {props.items.map(product => 
                    <ProductItem 
                        key={product.id} 
                        id={product.id} 
                        image={product.image} 
                        title={product.title} 
                        description={product.description} 
                        quantity={product.quantity}
                        unit={product.unit} 
                        price={product.price}
                        category={product.category}
                        creatorId={product.creator} 
                    />
                )}
            </Row>
    )
};

export default ProductList;