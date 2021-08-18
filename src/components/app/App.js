import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
import CurrentPrice from './CurrentPrice';
import Yesterday from './Yesterday';
import TimeSeries from './TimeSeries';
import Graph from './Graph';
import Select from 'react-select';
import TwoDaysAgo from './TwoDaysAgo';
import Volatility from './Volatility';
import { Button } from '@material-ui/core';
//import { CSSTransition } from 'react-transition-group';

window.addEventListener("offline", function() {
  alert("The application is currently offline and is unable to display up-to-date data until the connection has been restored. \n \nPlease check your internet connection.");
});
window.addEventListener("online", function() {
  alert("The connection has been restored. \n \nThe application will now display up-to-date data.");
});

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      btnOption: true,
    }
    this.handleClick = this.handleClick.bind(this)
}

handleClick(){
  this.setState({btnOption : !this.state.btnOption})
}


render() {
    return (
        <div style={{
          backgroundColor: '#FFB8FC',
        }}>
          <div><LastValueCache /></div>
          <div class="float-child"><MostTradedSym /></div>
          <div class="float-child"><MinPriceSym /></div>
          <div class="float-child"><MaxPriceSym /></div>
          <div><Graph/></div>
          <div>Click to change day</div>
          <Button id="btn" onClick={this.handleClick}>{this.state.btnOption ? "2 Days Ago": "Yesterday"} </Button>
          <div>
          {this.state.btnOption === true ? <div><Yesterday/></div> :
          <div><TwoDaysAgo/></div>}</div>

          {/* <p>Move the mouse over the button to open the dropdown menu.</p>
          <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                <div id="myDropdown" class="dropdown-content">
                    <a href="#">Today</a>
                    <a href="AppGraph">Yesterday</a>
                    <a href="#">2 Day's</a>
                </div>
          </div> */}
          




          <div><Volatility/></div>

        </div>
    )
  }
}