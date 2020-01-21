import React from 'react';
import { restaurants } from "./data";
import { RestaurantContext } from './restaurant-context';

function Results() {
    const { rating, price } = React.useContext(RestaurantContext);
    const filtered = restaurants.filter(
      restaurant => restaurant.rating >= rating && restaurant.price >= price
    );
  
    return (
      <ul>
        {filtered.map(restaurant => (
          <li key={restaurant.name}>
            <h2>{restaurant.name}</h2>
  
            <p>
              {[...Array(restaurant.rating)].map((_, n) => (
                <span role="img" aria-label="star" key={n}>
                  ⭐️
                </span>
              ))}
              <br />
              {[...Array(restaurant.price)].map((_, n) => (
                <span role="img" aria-label="money bag" key={n}>
                  💰
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    );
}

export default Results;