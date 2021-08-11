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
                        <h4>Sym</h4>
                        {this.state.sym.map((entry,index)=>{
                                return(<th>{entry}</th>)
                            })}
                        </tr>
                        <tr>
                        <h4>Current Price</h4>
                        {this.state.price.map((entry,index)=>{
                                return(<td>{entry}</td>)
                            })}
                        </tr>
                      </table>
                  </div>
                  

                  {/* <BarChart width={600} height={600} data={this.state.all_data}>
              <Bar dataKey="price" fill="pink" />
                <CartesianGrid/>
                <XAxis dataKey="sym" />
                <YAxis />
            </BarChart> */}

                </div>
    )
  }  
}



