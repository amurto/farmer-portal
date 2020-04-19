import React, { useContext } from 'react';
import { RestaurantContext } from './restaurant-context';

function Filters() {
    const { rating, setRating, price, setPrice, reset } = useContext(RestaurantContext);
  
    return (
      <div>
        <div>
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => {
                setRating(num);
              }}
              className={rating >= num ? "active" : ""}
            >
              <span role="img" aria-label={`${num} star`}>
                ⭐️
              </span>
            </button>
          ))}
        </div>
  
        <div>
          {[1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => {
                setPrice(num);
              }}
              className={price >= num ? "active" : ""}
            >
              <span role="img" aria-label={`${num} money bag`}>
                💰
              </span>
            </button>
          ))}
        </div>
  
        <div>
          <button onClick={reset}>reset</button>
        </div>
      </div>
    );
}

export default Filters;