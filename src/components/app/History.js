import './App.css';
import React from 'react';
//import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default class History extends React.Component {
  constructor () {
    super()
    this.state = {
      sym:[],
      today:[],
      yesterday:[]
      first:[]
    }
}


async  componentDidMount() {

  const url = "https://homer.aquaq.co.uk:8040/executeFunction";
  try {
      setInterval(async () => {
          const response = await 
          fetch (url,{
              "body": JSON.stringify({
                  "arguments": {
                  "db":"rdb",
                  "query": "select last price by sym from trade"},
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

          this.setState({all_data: data.result})
          var priceArr=[]
          var symArr=[]
          for (let i = 0;i<10;i++){
              priceArr.push(data.result[i].price)
              symArr.push(data.result[i].sym)
          }
          this.setState({sym: symArr})
          this.setState({price: priceArr})
        },1000);
        } catch(e) {
        console.log(e);
        }
}

//<div>{JSON.stringify(this.state.all_data)}  </div>

render() {
    return (
          <div className="a">
            <h3>{JSON.stringify(this.state.sym[0])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[0])}</h5>
            <h3>{JSON.stringify(this.state.sym[1])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[1])}</h5>
            <h3>{JSON.stringify(this.state.sym[2])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[2])}</h5>
            <h3>{JSON.stringify(this.state.sym[3])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[3])}</h5>
            <h3>{JSON.stringify(this.state.sym[4])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[4])}</h5>
            <h3>{JSON.stringify(this.state.sym[5])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[5])}</h5>
            <h3>{JSON.stringify(this.state.sym[6])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[6])}</h5>
            <h3>{JSON.stringify(this.state.sym[7])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[7])}</h5>
            <h3>{JSON.stringify(this.state.sym[8])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[8])}</h5>
            <h3>{JSON.stringify(this.state.sym[9])}</h3>
            <p>Current Price</p>
            <h5>{JSON.stringify(this.state.price[9])}</h5>
        </div>
       

      
 
    )
  }  
}



