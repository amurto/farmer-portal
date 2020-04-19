import React from './node_modules/react';
import FilterAccordion from './FilterAccordion';

const FilterSidediv = () => {
    const filterStyle = {
        fontWeight: 300,
        fontSize: '19px',
        padding: '10px 0 10px 10px',
        color: '#555b54',
        display: 'block',
        fontFamily: 'Tahoma, Geneva, sans-serif'
    }

    return (
            <React.Fragment>
                <div style={filterStyle}>FILTER</div>
                <hr style={{marginTop: '2px', marginBottom: '5px'}}></hr>
                <FilterAccordion />
            </React.Fragment>
    )
}
export default FilterSidediv;