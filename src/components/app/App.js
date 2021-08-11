import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
import CurrentPrice from './CurrentPrice';
import Yesterday from './Yesterday';
import TestComponent from './TestComponent';
import Graph from './Graph'
import TimeSeries from './TimeSeries';
import Select from 'react-select';
//import { CSSTransition } from 'react-transition-group';


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
    <form>
        <label for="framework">Select Data</label>
        <select id="framework">            
            <option>Today </option>
            <option> Yesterday</option>
            <option>2 Day's Ago</option>
        </select>
        <button id="btn">Get the Selected Data</button>
    </form>
          <div><Graph/></div>
          <div><Yesterday/></div>





          {/* <p>Move the mouse over the button to open the dropdown menu.</p>
          <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                <div id="myDropdown" class="dropdown-content">
                    <a href="#">Today</a>
                    <a href="AppGraph">Yesterday</a>
                    <a href="#">2 Day's</a>
                </div>
          </div> */}
          
          <div><MostTradedSym /><MinPriceSym /><MaxPriceSym /></div>
          <div><LastValueCache /></div>
         <div><Graph/></div>
         <div><TestComponent/></div>

        </div>
    )
  }
}

//<div><TimeSeries /></div>
