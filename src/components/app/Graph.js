import './App.css';
import React, {Component} from 'react';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default class Graph extends React.Component {
  constructor () {
    super()
    this.state = {
      sym:[],
      price:[],
      result:[]
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
                  "db":"hdb",
                  "query": "select time, price from trade where sym=`DOW, (`date$time)= -1 + .z.d"},
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

render() {
    return (
        <div>Graph Of Previous Day's History</div>
    )
  }  
}

//<div>{JSON.stringify(this.state.all_data)}</div>

//<BarChart width={600} height={600} data={this.state.all_data}>
//<Bar dataKey="price" fill="pink" />
 //   <CartesianGrid/>
  //  <XAxis dataKey="sym" />
   // <YAxis />
//</BarChart>

