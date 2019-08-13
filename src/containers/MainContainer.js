import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    sortedAlphabetically: true,
    portfolio: [],
    filteredType: "All"
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(res => this.setState({stocks: res}))
  }

  onStockClick = (id) => {
    this.state.portfolio.includes(id) ? this.setState({portfolio: this.state.portfolio.filter(stockId => stockId !== id)}) : this.setState(prevState => ({portfolio: [...prevState.portfolio, id]}))
  }

  onRadioButtonChange = (e) => {
    e.target.value === "Price" ? this.setState({sortedAlphabetically: false}) : this.setState({sortedAlphabetically: true})
  }

  onTypeChange = (e) => {
    this.setState({filteredType: e.target.value})
  }


  render() {

    const sortedStocks = this.state.sortedAlphabetically ? this.state.stocks.sort((stockA, stockB) => stockA.name.localeCompare(stockB.name)) : this.state.stocks.sort((stockA, stockB) => stockA.price - stockB.price)
    const filteredStocks = sortedStocks.filter(stock => this.state.filteredType === "All" || stock.type === this.state.filteredType)
    const portfolioStocks = filteredStocks.filter(stock => this.state.portfolio.includes(stock.id))
    const nonportfolioStocks = filteredStocks.filter(stock => !this.state.portfolio.includes(stock.id))
  //  const nonportfolioStocks = filteredStocks 

    return (
      <div>
        <SearchBar onTypeChange={this.onTypeChange} filteredType={this.state.filteredType} onRadioButtonChange={this.onRadioButtonChange} sortedAlphabetically={this.state.sortedAlphabetically}/>

          <div className="row">
            <div className="col-8">

              <StockContainer onStockClick={this.onStockClick} stocks={nonportfolioStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer onStockClick={this.onStockClick} stocks={portfolioStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
