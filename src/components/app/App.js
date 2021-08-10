import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
import CurrentPrice from './CurrentPrice';
import Yesterday from './Yesterday';
import TimeSeries from './TimeSeries';
import Graph from './Graph'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
        sym : "",
        amount: 0
    }
}


render() {
    return (
        <div >
          <div><CurrentPrice/></div>
          
          <p>Move the mouse over the button to open the dropdown menu.</p>
                <div class="dropdown">
                  <button class="dropbtn">Select Day</button>
                      <div class="dropdown-content">
                        <a href="#no">
                          Today
                          <chart1></chart1>
                        </a>
                        <a href="#no">
                          Yesterday          
                          <div><Yesterday/></div>
                        </a>
                        <a href="#no">
                          2 Days Ago
                        </a>
                      </div>
                </div>
          
          <div><MostTradedSym /></div>
          <div><MinPriceSym /></div>
          <div><MaxPriceSym /></div>
          <div><LastValueCache /></div>
          <div><TimeSeries /></div>
          <div><Graph/></div>
        </div>
    )
  }
}