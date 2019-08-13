import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderStocks = () => this.props.stocks.map(stock => <Stock key={stock.id} onStockClick={this.props.onStockClick} {...stock}/>)

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.renderStocks()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
