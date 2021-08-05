import './App.css';
import React from 'react';
import LastValueCache from './LastValueCache';
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

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  const response = await 
  fetch (url,{
        "body": JSON.stringify({
          "arguments": {
         "db":"rdb",
         "query":"select from (select from select sum size by sym from trade) where size = max size"},
          "function_name": ".aqrest.execute"
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
        <div className='App'>
          <table border="10" cellpadding="10">
            <tr>
              <th>Most Traded Sym</th>
              <th>Volume Traded</th>
            </tr>
            <tr>
              <td>{JSON.stringify(this.state.sym)}</td>
              <td>{JSON.stringify(this.state.size)}</td>
            </tr>
          </table>
          <div></div>
          <LastValueCache />
        </div>
    )
  }
}