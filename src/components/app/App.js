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
import VolumePie from './VolumePie'
import AmountPie from './AmountPie'
import { Button } from '@material-ui/core';
import duck4 from './../duck4clear2.png'
import quaq from './../quaq3.png'
import { ResponsiveContainer } from 'recharts'
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
      darkMode: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.modeSwitch = this.modeSwitch.bind(this)
}

handleClick(){
  this.setState({btnOption : !this.state.btnOption})
}
modeSwitch(){
  this.setState({darkMode: !this.state.darkMode})
}


 
render() {
    return (
      <div style={{
        backgroundColor: (this.state.darkMode ? '#000000' : '#FFFFFF'),
      }}>

<span>
<img position="absolute" src={quaq} width="350" height="110" />
<div class="center"><strong>Qu</strong>antitative <strong>A</strong>nalytics using <strong>Q</strong></div>
{/* <marquee width="75%" scrollamount="20" behavior="alternate" direction="left" ><strong>QU</strong>antitative <strong>A</strong>nalytics using <strong>Q</strong></marquee>  */}
</span>

<ResponsiveContainer width="100%" height={135}>
 <div>
 <marquee class="marq" scrollamount="20" behavior="scroll" direction="right"><img src={duck4} width="200" height="200" /></marquee>
 </div>       
 </ResponsiveContainer>
          <div><Button variant="contained"  id='btnDark'  onClick={this.modeSwitch}>{this.state.darkMode ? 'Light Mode' : 'Dark Mode'}</Button></div>
          <div><LastValueCache darkMode={this.state.darkMode}/></div>
          <div class="float-child"><MostTradedSym darkMode={this.state.darkMode}/></div>
          <div class="float-child"><MinPriceSym darkMode={this.state.darkMode}/></div>
          <div class="float-child"><MaxPriceSym darkMode={this.state.darkMode}/></div>
          <div><Graph/></div>
          <div>Click to change day</div>
          <Button id="btn" onClick={this.handleClick}>{this.state.btnOption ? "2 Days Ago": "Yesterday"} </Button>
          <div>
          {this.state.btnOption === true ? <div><Yesterday/></div> :
          <div><TwoDaysAgo/></div>}</div>
          <div><Volatility/></div>
          <div><VolumePie/><AmountPie/></div>
        </div>
    )
  }
}