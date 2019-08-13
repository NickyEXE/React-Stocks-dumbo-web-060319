import React from 'react'

const Stock = (props) => (
  <div onClick={() => props.onStockClick(props.id)}>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{
            props.name
          }</h5>
        <p className="card-text">{
            props.ticker + ": $" + props.price
            //ticker: stock price
          }</p>
      </div>
    </div>
  </div>
);

export default Stock
