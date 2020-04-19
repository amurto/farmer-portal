import React, { useContext } from './node_modules/react';
import { Container, Row, Col } from './node_modules/react-bootstrap';
import './Shop.css';

import FilterModal from '../Filter/FilterModal';
import FilterSidediv from '../Filter/FilterSidediv';
// import VersionContext from '../Context/VersionContext';
import AllProducts from './AllProducts';
import { ShopContext } from '../Context/shop-context';
import SearchBar from './SearchBar';

const Shop = () => {
    const shopContext = useContext(ShopContext);
    const handleInput = (e) => {
        shopContext.searched(e.target.value);
    }
    return (
        <React.Fragment>
            {/* <VersionContext /> */}
            <Container className="shopping-content">
                <div className="filter-modal-div">
                    <FilterModal />
                </div>
                <Row>
                    <Col xl={3} lg={3} md={3} className="filter-sidebar">
                        <FilterSidediv />
                    </Col>
                    <Col>
                        <SearchBar handleInput={handleInput} />
                        <AllProducts />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
};

export default Shop;
