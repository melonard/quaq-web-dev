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
import duck4 from './../duck4clear2.png'
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

<marquee scrollamount="20" behavior="scroll" direction="right"><img src={duck4} width="140" height="140" /></marquee>
           <header className='title'> 
              
              <h2>Q.U.A.Q</h2>
              <marquee scrollamount="20" behavior="scroll" direction="left" font-size="2cm"><strong>QU</strong>antitative <strong>A</strong>nalytics using <strong>Q</strong></marquee>
                     
          </header>

          {/* <div><CurrentPrice/></div>  */}   
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
          <div><Volatility/></div>

        </div>
    )
  }
}