import './App.css';
import React from 'react';
//import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default class CurrentPrice extends React.Component {
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
          this.setState({price: priceArr.map(ele => parseFloat(ele.toFixed(2)))})
        },3000);
        } catch(e) {
        console.log(e);
        }
}

render() {
    return (
                <div className='App'>
                  <div> 
                    <h3>Sym's Latest Price </h3>
                  
                      <table border="10" cellpadding="10">
                  
                        <tr>
                          <th>{JSON.stringify(this.state.sym[0])}</th>
                          <th>{JSON.stringify(this.state.sym[1])}</th>
                          <th>{JSON.stringify(this.state.sym[2])}</th>
                          <th>{JSON.stringify(this.state.sym[3])}</th>
                          <th>{JSON.stringify(this.state.sym[4])}</th>
                          <th>{JSON.stringify(this.state.sym[5])}</th>
                          <th>{JSON.stringify(this.state.sym[6])}</th>
                          <th>{JSON.stringify(this.state.sym[7])}</th>
                          <th>{JSON.stringify(this.state.sym[8])}</th>
                          <th>{JSON.stringify(this.state.sym[9])}</th>
                        </tr>
                        <tr>
                          <td>{JSON.stringify(this.state.price[0])}</td>
                          <td>{JSON.stringify(this.state.price[1])}</td>
                          <td>{JSON.stringify(this.state.price[2])}</td>
                          <td>{JSON.stringify(this.state.price[3])}</td>
                          <td>{JSON.stringify(this.state.price[4])}</td>
                          <td>{JSON.stringify(this.state.price[5])}</td>
                          <td>{JSON.stringify(this.state.price[6])}</td>
                          <td>{JSON.stringify(this.state.price[7])}</td>
                          <td>{JSON.stringify(this.state.price[8])}</td>
                          <td>{JSON.stringify(this.state.price[9])}</td>
                        </tr>
                      </table>
                  </div>
                </div>


      
 
    )
  }  
}



