import React , { useState, useEffect, useContext } from './node_modules/react';

import ProductList from '../Products/ProductList';
import { useHttpClient } from '../Hooks/http-hook';
import LoadingSpinner from '../Utils/LoadingSpinner';
import ErrorModal from '../Utils/ErrorModal';
import { ShopContext } from '../Context/shop-context';

const AllProducts = () => {
    const shopContext = useContext(ShopContext);
    const [loadedProducts, setLoadedProducts] = useState();
    const [countProducts, setCountProducts] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/buyers/'
                );
                setLoadedProducts(responseData.products);
                setCountProducts(responseData.products.length);
                console.log(responseData.products);
            } catch (err) {}
        };
        fetchProducts();
    }, [sendRequest]);

    let filteredProducts = [];
    let c = countProducts;
    for (let i=0; i<countProducts; i++) {
        if (loadedProducts[i].title.toLowerCase().includes(shopContext.search.toLowerCase())) {
            filteredProducts.push(loadedProducts[i])
        }
        c = filteredProducts.length
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <React.Fragment>
                <div>
                    <h4>Showing {c} results</h4>
                </div>
                <hr></hr>
                {loadedProducts && <ProductList items={filteredProducts} />}               
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AllProducts;
