import React, { useState } from 'react';

function buy(props) {
  const [isPurchased, setIsPurchased] = useState(false);

  function buyProduct() {
    // logic for buying the product goes here
    // you can use props.price to get the price of the product

    setIsPurchased(true); // set isPurchased to true to indicate that the product has been bought
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <p>Price: {props.price}</p>
      {isPurchased ? (
        <p>You have already bought this product.</p>
      ) : (
        <button onClick={buyProduct}>Buy</button>
      )}
    </div>
  );
}

export default buy;
