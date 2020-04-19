import React from './node_modules/react';
import Accordion from './Accordion';
import { Button } from './node_modules/react-bootstrap';
import CheckState from './CheckState';

import './Accordion.css';

const FilterAccordion = () => {
    return (
        <div>
            <div className="clear-filter-div">
                <Button variant="outline-success">CLEAR ALL</Button>
            </div>
            <Accordion title="Sort">
                <CheckState />
            </Accordion>
            <Accordion title="Category">
                <span className="accordion-text">aaaaaa</span>
            </Accordion>
            <Accordion title="Availability">
                <span className="accordion-text">aaaaaa</span>
            </Accordion>
            <Accordion title="Price">
                <span className="accordion-text">bbbbbb</span>
            </Accordion>
            <Accordion title="Location">
                <span className="accordion-text">cccccc</span>
            </Accordion>
        </div>
    )
};


export default FilterAccordion;
