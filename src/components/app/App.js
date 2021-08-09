import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
import MostTradedSym from './MostTradedSym';
export default class App extends React.Component {



render() {
    return (
        <div>
          <div><MostTradedSym /></div>
          <div><LastValueCache /></div>
        </div>
    )
  }
}