import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UserProducts = () => {
    const [loadedProducts, setLoadedProducts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/products/user/${userId}`
                );
                setLoadedProducts(responseData.products);
                console.log(responseData.products);
            } catch (err) {}
        };
        fetchProducts();
    }, [sendRequest, userId]);

    const productDeletedHandler = deletedProductId => {
        setLoadedProducts(prevProducts => 
            prevProducts.filter(product => product.id !== deletedProductId)
        );
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedProducts && <ProductList items={loadedProducts} onDeleteProduct={productDeletedHandler} />}
        </React.Fragment>
    );
};

export default UserProducts;
