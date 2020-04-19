import React, { useState, useRef, useEffect } from './node_modules/react';

import AccordionChevron from '../images/AccordionChevron.png';

import './Accordion.css';

const Accordion = props => {
  const [active, setActive] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    contentRef.current.style.maxHeight = active ? `${contentRef.current.scrollHeight}px` : '0px'
  }, [contentRef, active])

  const toggleActive = () => {
    setActive(!active)
  }

  const titleStyle = {
    fontWeight: 600,
    fontSize: '16px',
    margin: '2px'
  }

  return (
    <div className="accordion-section">
      <button className="accordion-title" onClick={toggleActive}>
        <h1 style={titleStyle}>{props.title}</h1>
        <span className={active ? 'accordion-icon rotate': 'accordion-icon'}>
          <img src={AccordionChevron} alt="Drop" />
        </span>
      </button>

      <div
        ref={contentRef}
        className="accordion-content"
      >
        {props.children}
      </div>
    </div>
  )
}

export default Accordion;