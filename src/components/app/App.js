import './App.css';
import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import chart1 from './chart1.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const links = [  
  {  
    name: 'chart1',  
    path: '/A'  
  }
]



export default class App extends React.Component {


  constructor () {
    super()
    this.state = {
        result: []
    }
  
  
  
}

async  componentDidMount() {

    const url = "https://homer.aquaq.co.uk:8040/executeQuery";
    const response = await 
    fetch (url,{
          "body": JSON.stringify({
            "query": "select last price by sym from trade",
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
    console.log(data.result)
    this.setState({result: data.result})
}



render() {
  return (
    <div>
      <h1>Bar Chart Showing End of Day Price by Sym</h1>
      
      <div>{JSON.stringify(this.state.result)}</div>
    </div>
        )
  }
}