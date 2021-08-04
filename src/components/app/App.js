import './App.css';
import React from 'react';
//import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
//import chart1 from './chart1.js'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';




export default class App extends React.Component {


  constructor () {
    super()
    this.state = {
        sym : "",
        amount: 0
    }
  
  
  
}

async  componentDidMount() {

    const url = "https://homer.aquaq.co.uk:8040/executeQuery";
    const response = await 
    fetch (url,{
          "body": JSON.stringify({
            "query": "select from (select from select sum size by sym from trade) where size = max size",
            "response": "true",
            "type": "sync"
            }),
          method:"post",
          "headers": {
            'Accept': 'application/json',
            "Content-Type":"application/json",
            "accept": "*/*",
            "Authorization":"Basic dXNlcjpwYXNz"
    }}
    ) 
    const data = await response.json();
    console.log(data.result[0].sym)
    this.setState({sym: data.result[0].sym})
    this.setState({size: data.result[0].size})

}



render() {
    return (
        <div>
          <table>
            <tr>
              <th>Most Traded Sym</th>
              <th>Volume Traded</th>
            </tr>
            <tr>
              <div>{JSON.stringify(this.state)}</div>
              <td>{JSON.stringify(this.state.sym)}</td>
              <td>{JSON.stringify(this.state.size)}</td>
            </tr>
          </table>
          <div></div>
        </div>
    )
  }
}