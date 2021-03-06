import React, { useState, useEffect }  from "react";
import { Text, View, Button } from 'react-native';

const { useReducer, useRef } = React

const initialState = {
  additionalPrice: 0,
Jeans: {
    price: 13,
    name: "Stylish Jeans",
    image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tc-jeans-1549912945.jpg?crop=1.00xw:1.00xh;0,0&resize=480:*",
    features: []
  },
  store: [
    { id: 1, name: "Small", price: 0},
    { id: 2, name: "Medium", price: 2 },
    { id: 3, name: "Large", price: 3 },
    { id: 4, name: "XL ", price: 5  }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
   Jeans: { ...state.Jeans, features: state.Jeans.features.filter((x) => x.id !== action.item.id)},
        store: [...state.store, action.item]
      };
    case "BUY_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
    Jeans: { ...state.Jeans, features: [...state.Jeans.features, action.item] },
        store: state.store.filter((x) => x.id !== action.item.id)
      }
    default:
      return state;
  }
}

const App = () => {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const removeFeature = (item) => {
    dispatch({ type: 'REMOVE_ITEM', item });
  }
  
  const buyItem = (item) => {
    dispatch({ type: 'BUY_ITEM', item })
  }
  
  return (
    <div className="boxes">
      <div className="box">
        <figure className="image is-128x128">
          <img src={state.Jeans.image} />
        </figure>
        <h2>{state.Jeans.name}</h2>
        <p>Amount: ${state.Jeans.price}</p>
        <div className="content">
          <h6>Added features:</h6>
          {state.Jeans.features.length ? 
            (
              <ol type="1">
                {state.Jeans.features.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => removeFeature(item)}
                      className="button">X
                    </button>
                    {item.name}
                  </li>
                ))}
              </ol>
            ) : <p>Stretchy and UltraComfort Fit!</p>
          }
        </div>
      </div>
      <div className="box">
        <div className="content">
          <h4>Additional Features</h4>
          {state.store.length ? 
            (
            <ol type="1">
              {state.store.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => buyItem(item)}
                    className="button">Add</button>
                  {item.name} (+{item.price})
                </li>
              ))}
            </ol>
            ) : <p>Goes Great with any Cute Top!</p>
          }
        </div>

        <div className="content">
        <h4>
          Total Amount: ${state.Jeans.price + state.additionalPrice}
        </h4>
      </div>
      </div>
    </div>
  );
}
export default App;