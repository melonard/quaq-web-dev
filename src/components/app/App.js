import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
import MinPriceSym from './MinPriceSym';
import MaxPriceSym from './MaxPriceSym';
// import TimeSeries from './TimeSeries'
export default class App extends React.Component {



render() {
    return (
        <div>
          <div><MostTradedSym /></div>
          <div><MinPriceSym /></div>
          <div><MaxPriceSym /></div>
          <div><LastValueCache /></div>
          {/* <div><TimeSeries/></div> */}
        </div>
    )
  }
}