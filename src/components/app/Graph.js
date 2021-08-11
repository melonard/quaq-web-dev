import './App.css';
import React, {Component} from 'react';
//import LineChart from 'react-linechart';
import Chart from "react-apexcharts";

import '../../../node_modules/react-linechart/dist/styles.css';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line, ResponsiveContainer, LineChart} from 'recharts';
//import ReactTable from "react-table";  
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


export default class Graph extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      results:[],
      options: {
        chart: {
          id: "Price History"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "DOW",
          data: []
        }
      ]
    };
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
                  "query": "select sum price by `time$(60 xbar time.minute) from trade where sym = `AAPL, (`date$time) = -1 + .z.d"},
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
              // console.log(data)

this.setState({all_data: data.result})

var mytimeArray=[]
var mypriceArray=[]
for (let i = 0;i<24;i++){
  mypriceArray.push(data.result[i].price)
  mytimeArray.push(data.result[i].minute)
  
}
this.setState({time: mytimeArray})
this.setState({price: mypriceArray})

//this.setState({ options : {xaxis:{categories : mytimeArray } } })
// this.setState({ series : {data: mypriceArray}})

          // console.log(this.state.results)
          // console.log(this.state.options)
          // console.log(this.state.series)
        },30000);
        } catch(e) {
        console.log(e);
        }
    }

render() {
    return (
        // <div>Graph Of Previous Day's History</div>
        <div>
<div>{JSON.stringify(this.state.all_data)}</div> 

{/*               
              <div className="row">
                    <div className="mixed-chart">
                          <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                          /> */}

                        <div>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={this.state.all_data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                              <Tooltip />
                              <XAxis dataKey="minute" />
                              <YAxis />

                              <Legend/>
                              <Line type="monotone" sym="AIG" dataKey="price" stroke="#FB8833" />
                              {/* <Line type="monotone" sym="AAPL" dataKey="price" stroke="#17A8F5" /> */}
                            </LineChart>
                          </ResponsiveContainer>
                      </div>
                
          

        </div>
    )
  }  
}


